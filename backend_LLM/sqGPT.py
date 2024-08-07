import requests, json, ollama, logging, time
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from fp.fp import FreeProxy
from PyPDF2 import PdfReader
from io import BytesIO
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import sqlite3

# Determine if MPS is available
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
print(f"Using device: {device}")

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(threadName)s - %(levelname)s - %(message)s')

app = Flask(__name__)
CORS(app)

# Initialize SQLite Database
def init_db():
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS websites (
            id INTEGER PRIMARY KEY,
            start_url TEXT NOT NULL UNIQUE,
            timestamp TEXT NOT NULL,
            text TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Call this function to initialize the database (only needs to be done once)
init_db()

# Proxy init
def get_proxy():
    logging.info("Starting proxy ...")
    try:
        proxy_url = FreeProxy(country_id=['US', 'CA', 'FR', 'NZ', 'SE', 'PT', 'CZ', 'NL', 'ES', 'SK', 'UK', 'PL', 'IT', 'DE', 'AT', 'JP'], https=True, rand=True, timeout=3).get()
        proxy_obj = {
            "http": proxy_url,
            "https": proxy_url
        }
        logging.info(f"Proxy generated: {proxy_url}")
    except Exception as e:
        logging.error(f"Failed to get proxy: {e}")
        proxy_obj = None
    return proxy_obj

def save_to_db(text, url):
    timestamp = datetime.now().isoformat()
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR REPLACE INTO websites (start_url, timestamp, text)
        VALUES (?, ?, ?)
    ''', (url, timestamp, text))
    conn.commit()
    conn.close()

def get_from_db(url):
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute('SELECT text FROM websites WHERE start_url = ?', (url,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None

def get_context(question, text, chunk_size=500, chunk_overlap=100, batch_size=5000):
    print("Embedding model started ...")
    all_scraped_text = text
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    documents = text_splitter.split_text(all_scraped_text)
    embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')

    batches = [documents[i:i + batch_size] for i in range(0, len(documents), batch_size)]
    db = None

    for batch in batches:
        if db is None:
            db = Chroma.from_texts(batch, embedding=embeddings)
        else:
            db.add_texts(batch)

    retriever = db.as_retriever(search_kwargs={"k": 3})
    context = retriever.get_relevant_documents(question)
    print(f"Embedding Model returned: {context}")
    return context

def scrape_webpages(urls, proxy):
    print("Starting to scrape webpages...")
    scraped_texts = []
    for url in urls:
        try:
            if url.endswith('.pdf'):
                response = requests.get(url, proxies=proxy)
                reader = PdfReader(BytesIO(response.content))
                number_of_pages = len(reader.pages)
                for p in range(number_of_pages):
                    page = reader.pages[p]
                    text = page.extract_text()
                    scraped_texts.append(text)
            else:
                page = requests.get(url, proxies=proxy)
                soup = BeautifulSoup(page.content, 'html.parser')
                text = ' '.join([p.get_text() for p in soup.find_all('p')])
                scraped_texts.append(text)
        except Exception as e:
            logging.error(f"Failed to scrape {url}: {e}")
    all_scraped_text = '\n'.join(scraped_texts)
    logging.info("Finished scraping the text from webpages!")
    return all_scraped_text

def get_domain(url):
    return urlparse(url).netloc

def get_robots_file(url, proxy):
    base_url = url if url.startswith(('http://', 'https://')) else f"https://{url}"
    robots_url = urljoin(base_url, '/robots.txt')
    try:
        response = requests.get(robots_url, proxies=proxy)
        if response.status_code == 200:
            return response.text
        else:
            logging.error(f"Error fetching robots.txt: HTTP {response.status_code}")
            return ""
    except Exception as e:
        logging.error(f"Error fetching robots.txt: {e}")
        return ""

def parse_robots(content):
    disallowed = []
    for line in content.splitlines():
        if line.startswith('Disallow:'):
            path = line[len('Disallow:'):].strip()
            disallowed.append(path)
    return disallowed

def is_allowed(url, disallowed_paths, base_domain):
    parsed_url = urlparse(url)
    if parsed_url.netloc != base_domain:
        return False
    for path in disallowed_paths:
        if parsed_url.path.startswith(path):
            return False
    return True

def get_sitemap_url(base_domain):
    return f"{base_domain}/sitemap.xml"

def request_with_retry(url, proxies=None, retries=3, delay=5, timeout=10):
    for attempt in range(retries):
        try:
            response = requests.get(url, proxies=proxies, timeout=timeout)
            response.raise_for_status()  # Raise an error for bad responses
            return response
        except requests.RequestException as e:
            logging.error(f"Attempt {attempt + 1} failed for {url}: {e}")
            time.sleep(delay)
    raise Exception(f"Failed to fetch {url} after {retries} retries")


def scrape_site_links(start_url, proxy=None, max_depth=3):
    visited_links = set()
    to_visit = [(start_url, 0)]  # (URL, current_depth)
    base_domain = get_domain(start_url)
    disallowed_paths = parse_robots(get_robots_file(base_domain, proxy)) if proxy else []
    last_found_time = time.time()

    while to_visit:
        if time.time() - last_found_time > 15:
            logging.info("FINISHED scraping the links")
            break
        
        current_url, depth = to_visit.pop(0)

        # Check depth limit
        if depth > max_depth:
            logging.info(f"Skipping {current_url} as it is beyond the maximum depth of {max_depth}")
            continue

        # Avoid revisiting URLs
        if current_url in visited_links:
            logging.info(f"Already visited {current_url}")
            continue

        visited_links.add(current_url)
        
        try:
            logging.info(f"Visiting {current_url} at depth {depth}")
            response = request_with_retry(current_url, proxies=proxy)  # Use proxy if available
            soup = BeautifulSoup(response.text, 'html.parser')

            # Enqueue new URLs
            for link in soup.find_all('a', href=True):
                new_url = urljoin(current_url, link['href'])
                # Ensure new_url is not visited, is within the base domain, and is allowed
                if (new_url.startswith(base_domain) and 
                    new_url not in visited_links and 
                    (not disallowed_paths or is_allowed(new_url, disallowed_paths, base_domain))):
                    logging.info(f"Adding {new_url} to visit list at depth {depth + 1}")
                    to_visit.append((new_url, depth + 1))
                    last_found_time = time.time()

        except Exception as e:
            logging.error(f" !!! COULD NOT VISIT: {current_url} - {e}")

    return visited_links


def generate_answer_local(question, context):
    logging.info("LLM is generating answer ...")
    prompt = f"""Use the following pieces of context to answer the question at the end. 
    You are an agent for Standard Chartered Bank in Singapore. 
    Only limit answers based on Standard Chartered Bank from Singapore. 
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    Answer only factual information based on the context.
    Give answers in point form.
    Context: {context}.\n
    Question: {question}
    Helpful Answer:"""
    response = ollama.chat(model='phi3', messages=[
        {'role': 'system', 'content': 'You are a question answering AI Bot for Standard Chartered Bank that uses context from the user prompt to answer the question.'},
        {'role': 'user', 'content': prompt},
    ])
    output = response['message']['content']
    logging.info("LLM output:\n")
    return output

def analyze_website(start_url):
    website_text = get_from_db(start_url)
    if website_text:
        logging.info('Website data found in db.sqlite3!')
        return website_text

    logging.info("Scraper activated!")
    proxy = get_proxy()
    all_links = scrape_site_links(start_url, proxy)
    all_scraped_texts = scrape_webpages(all_links, proxy)
    save_to_db(all_scraped_texts, start_url)
    return all_scraped_texts

@app.route('/analyze', methods=['POST'])
def analyze_website_api():
    start_url = request.json.get('url')
    if not start_url:
        return jsonify({"error": "No URL provided"}), 400

    website_text = analyze_website(start_url)
    return jsonify({"text": website_text})

@app.route('/ask', methods=['POST'])
def ask_question():
    question = request.json.get('question')
    start_url = request.json.get('url')

    if not question or not start_url:
        return jsonify({"error": "Missing question or URL"}), 400

    website_text = analyze_website(start_url)
    context = get_context(question, website_text)
    result = generate_answer_local(question, context)
    return jsonify({"answer": result})

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
