import requests
import json
import datetime
import logging
import time
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from fp.fp import FreeProxy
from PyPDF2 import PdfReader
from io import BytesIO
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
import concurrent.futures
import threading
import ollama

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(threadName)s - %(levelname)s - %(message)s')

def get_proxy():
    logging.info("Starting proxy ...")
    try:
        proxy_url = FreeProxy(
            country_id=['US', 'CA', 'FR', 'NZ', 'SE', 'PT', 'CZ', 'NL', 'ES', 'SK', 'UK', 'PL', 'IT', 'DE', 'AT', 'JP'],
            https=True, rand=True, timeout=5
        ).get()
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
    timestamp = datetime.datetime.now().isoformat()
    try:
        with open('db.json', 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        data = []

    website = {'date': timestamp, 'text': text}
    new_entry = {'start_url': url, 'data': website}
    data.append(new_entry)

    with open('db.json', 'w') as f:
        json.dump(data, f, indent=4)

def get_context(question, text, chunk_size=500, chunk_overlap=100, max_batch_size=41666):
    logging.info("Embedding model started ...")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    documents = text_splitter.split_text(text)
    embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')

    all_contexts = []
    num_documents = len(documents)
    for i in range(0, num_documents, max_batch_size):
        batch_documents = documents[i:i + max_batch_size]
        db = Chroma.from_texts(batch_documents, embedding=embeddings)
        retriever = db.as_retriever(search_kwargs={"k": 3})
        batch_contexts = retriever.get_relevant_documents(question)
        all_contexts.extend(batch_contexts)
        
        # Limit the number of documents retrieved for speed
        if len(all_contexts) >= 3:
            break

    logging.info(f"Embedding Model returned: {all_contexts[:3]}")
    return all_contexts[:3]

def scrape_webpage(url, proxy):
    thread_name = threading.current_thread().name
    logging.info(f"Thread {thread_name} is scraping {url}")

    try:
        response = requests.get(url, proxies=proxy, timeout=15)
        if url.endswith('.pdf'):
            reader = PdfReader(BytesIO(response.content))
            text = ''.join(page.extract_text() for page in reader.pages)
        else:
            soup = BeautifulSoup(response.content, 'html.parser')
            text = ' '.join(p.get_text() for p in soup.find_all('p'))
        return text
    except Exception as e:
        logging.error(f"Thread {thread_name} failed to scrape {url}: {e}")
        return ''

def scrape_webpages(urls, proxy):
    logging.info("Starting to scrape webpages...")
    scraped_texts = []

    # Filter URLs to include only those containing '/sg/' or '/en/'
    filtered_urls = [url for url in urls if '/sg/' in url or '/en/' in url]

    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        future_to_url = {executor.submit(scrape_webpage, url, proxy): url for url in filtered_urls}
        for future in concurrent.futures.as_completed(future_to_url):
            url = future_to_url[future]
            try:
                data = future.result()
                if data:
                    scraped_texts.append(data)
                else:
                    logging.info(f"Data from {url} is empty")
            except Exception as e:
                logging.error(f"Exception in thread for {url}: {e}")

    all_scraped_text = '\n'.join(scraped_texts)
    logging.info("Finished scraping webpages.")
    return all_scraped_text

def get_domain(url):
    return urlparse(url).netloc

def get_robots_file(url, proxy):
    robots_url = urljoin(url, '/robots.txt')
    try:
        response = requests.get(robots_url, proxies=proxy, timeout=15)
        return response.text
    except Exception as e:
        logging.error(f"Error fetching robots.txt: {e}")
        return None

def parse_robots(content):
    if content is None:
        return []
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
    return not any(parsed_url.path.startswith(path) for path in disallowed_paths)

def scrape_site_links(start_url, proxy):
    visited_links = set()
    not_visited_links = set()
    to_visit = [start_url]
    base_domain = get_domain(start_url)
    disallowed_paths = parse_robots(get_robots_file(start_url, proxy))
    last_found_time = time.time()

    def visit_url(url):
        if url not in visited_links and is_allowed(url, disallowed_paths, base_domain):
            visited_links.add(url)
            try:
                logging.info(f"Visiting {url}")
                response = requests.get(url, proxies=proxy, timeout=10)
                soup = BeautifulSoup(response.text, 'html.parser')
                new_links = {urljoin(url, link['href']) for link in soup.find_all('a', href=True)}
                # Filter new links to include only those containing '/sg/' or '/en/'
                new_links = {link for link in new_links if '/sg/' in link or '/en/' in link}
                return new_links
            except Exception as e:
                logging.error(f" !!! COULD NOT VISIT: {url}")
                not_visited_links.add(url)
                return set()
        return set()

    while to_visit:
        if time.time() - last_found_time > 15:
            logging.info("FINISHED scraping the links")
            break

        current_urls = to_visit[:10]  # Process up to 10 URLs at a time
        to_visit = to_visit[10:]

        with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
            future_to_url = {executor.submit(visit_url, url): url for url in current_urls}
            for future in concurrent.futures.as_completed(future_to_url):
                url = future_to_url[future]
                try:
                    new_links = future.result()
                    to_visit.extend(new_links - visited_links)  # Add new links to visit
                except Exception as e:
                    logging.error(f"Exception in thread for {url}: {e}")

        last_found_time = time.time()

    return visited_links

def generate_answer_local(question, context):
    logging.info("LLM is generating answer ...")

    # Limit context length to improve speed
    context_text = " ".join(doc.page_content for doc in context[:2])

    prompt = f"""Use the following pieces of context to answer the question at the end. 
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    Answer only factual information based on the context.
    Context: {context_text}.\n
    Question: {question}
    Helpful Answer:"""

    response = ollama.chat(model='qwen:1.8b', messages=[
        {
            'role': 'system',
            'content': 'You are a question answering AI Bot that uses context from the user prompt to answer the question.'
        },
        {
            'role': 'user',
            'content': prompt
        }
    ])
    
    output = response['message']['content']
    logging.info(f"LLM output:\n{output}")
    return output

def generate_answer_pplx(question, context):
    context_text = " ".join(doc.page_content for doc in context[:2])

    prompt = f"""Use the following pieces of context to answer the question at the end. 
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    Answer only factual information based on the context.
    Context: {context_text}.\n
    Question: {question}
    Helpful Answer:"""

    pplx_key = ""
    url = "https://api.perplexity.ai/chat/completions"
    payload = {
        "model": "pplx-7b-chat",
        "temperature": 0.2,
        "messages": [
            {
                "role": 'system',
                "content": 'You are a question answering AI Bot that uses context from the user prompt to answer the question.'
            },
            {
                'role': 'user',
                'content': prompt
            }
        ]
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": "Bearer " + pplx_key
    }
    response = requests.post(url, json=payload, headers=headers)
    
    json_data = response.text
    parsed_json = json.loads(json_data)
    answer = parsed_json["choices"][0]["message"]["content"]
    
    logging.info(f"Answer:\n{answer}")
    return answer

def analyze_website(start_url):
    try:
        with open('db.json', 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        data = []

    for entry in data:
        if start_url in entry['start_url']:
            logging.info('Website is already scraped today!')
            return entry['data']['text']

    logging.info("Scraper activated!")
    
    proxy = get_proxy()
    start_time = time.time()
    all_links = scrape_site_links(start_url, proxy)
    all_scraped_texts = scrape_webpages(all_links, proxy)
    end_time = time.time()
    logging.info(f"Scraping completed in {end_time - start_time:.2f} seconds.")
    save_to_db(all_scraped_texts, start_url)
    
    return all_scraped_texts

def main():
    logging.info("Chat with Website")

    start_url = input("URL: ")

    if start_url:
        website_text = analyze_website(start_url)
        logging.info("Text prepared")

        while True:
            question = input("question: ")

            if question:
                start_time = time.time()
                context = get_context(question, website_text)
                result = generate_answer_local(question, context)
                # result = generate_answer_pplx(question, context)
                end_time = time.time()
                logging.info(f"Answering completed in {end_time - start_time:.2f} seconds.")
                logging.info(f"Result:\n{result}")

main()