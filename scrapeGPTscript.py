import requests, json, os, re, ollama, time, logging
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from fp.fp import FreeProxy
from PyPDF2 import PdfReader
from io import BytesIO
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from datetime import datetime
import time

# Proxy init
def get_proxy():
    print("Starting proxy ...")
    proxy_url = FreeProxy(country_id=['US', 'CA', 'FR', 'NZ', 'SE', 'PT', 'CZ', 'NL', 'ES', 'SK', 'UK', 'PL', 'IT', 'DE', 'AT', 'JP'], https=True, rand=True, timeout=3).get()
    proxy_obj = {
        "server": proxy_url,
        "username": "",
        "password": ""
    }
    print(f"Proxy generated: {proxy_url}")
    return proxy_obj

def save_to_db(text, url):
    timestamp = datetime.now().isoformat()
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
    print("Scraping text from webpages from each of the links ...")
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
            print(f"Failed to scrape {url}: {e}")
    all_scraped_text = '\n'.join(scraped_texts)
    print("Finished scraping the text from webpages!")
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
            print(f"Error fetching robots.txt: HTTP {response.status_code}")
            return ""  
    except Exception as e:
        print(f"Error fetching robots.txt: {e}")
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

def scrape_site_links(start_url, proxy):
    visited_links = set()
    not_visited_links = set()
    to_visit = [start_url]
    base_domain = get_domain(start_url)
    disallowed_paths = parse_robots(get_robots_file(base_domain, proxy))  # Fetch disallowed paths
    last_found_time = time.time()

    while to_visit:
        if time.time() - last_found_time > 15:
            print("FINISHED scraping the links")
            break
        current_url = to_visit.pop(0)
        if current_url not in visited_links and is_allowed(current_url, disallowed_paths, base_domain):
            visited_links.add(current_url)
            try:
                print(f"{current_url}")
                response = requests.get(current_url, proxies=proxy)
                soup = BeautifulSoup(response.text, 'html.parser')
                for link in soup.find_all('a', href=True):
                    new_url = urljoin(current_url, link['href'])
                    if new_url.startswith(base_domain) and new_url not in visited_links:
                        to_visit.append(new_url)
                        last_found_time = time.time()
            except Exception as e:
                print(f" !!! COULD NOT VISIT: {current_url}")
                not_visited_links.add(current_url)
    return visited_links

def generate_answer_local(question, context):
    print("LLM is generating answer ...")
    prompt = f"""Use the following pieces of context to answer the question at the end. 
    You are an agent for Standard Chartered Bank. 
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    Answer only factual information based on the context.
    Context: {context}.\n
    Question: {question}
    Helpful Answer:"""
    response = ollama.chat(model='qwen:1.8b', messages=[
        {'role': 'system', 'content': 'You are a question answering AI Bot for Standard Chartered Bank that uses context from the user prompt to answer the question.'},
        {'role': 'user', 'content': prompt},
    ])
    output = response['message']['content']
    print("LLM output:\n")
    return output

def analyze_website(start_url, cache):
    # First, check if the website data is already in the cache
    if start_url in cache:
        print('Website data found in cache!')
        return cache[start_url]

    # If not in cache, check if it's in the db.json file
    with open('db.json', 'r') as file:
        data = json.load(file)
        for entry in data:
            if start_url in entry['start_url']:
                print('Website data found in db.json!')
                all_scraped_texts = entry['data']['text']
                cache[start_url] = all_scraped_texts  # Update cache
                return all_scraped_texts

    # If not in cache or db.json, scrape the website
    print("Scraper activated!")
    proxy = get_proxy()
    all_links = scrape_site_links(start_url, proxy)
    all_scraped_texts = scrape_webpages(all_links, proxy)
    save_to_db(all_scraped_texts, start_url)
    cache[start_url] = all_scraped_texts  # Update cache
    return all_scraped_texts

def main():
    # Initialize an empty cache (dictionary) to store scraped texts
    cache = {}
    while True:
        start_url = input("Please provide a website URL: ")
        start_time_scraping = time.time()  # Start timer for scraping
        website_text = analyze_website(start_url, cache)
        end_time_scraping = time.time()  # End timer for scraping
        print(f"Scraping time: {end_time_scraping - start_time_scraping:.2f} seconds")

        while True:
            question = input("You can now ask questions based on the scraped website. Type your question (or type 'exit' to scrape a new website): ")
            if question.lower() == 'exit':
                break
            context = get_context(question, website_text)
            start_time_answer = time.time()  # Start timer for answering
            response = generate_answer_local(question, context)
            end_time_answer = time.time()  # End timer for answering
            print("Answer:", response)
            print(f"Answer time: {end_time_answer - start_time_answer:.2f} seconds")

if __name__ == '__main__':
    main()
