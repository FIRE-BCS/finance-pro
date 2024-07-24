import concurrent.futures
import threading
import time
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(threadName)s - %(levelname)s - %(message)s')

def thread_function(name):
    logging.info(f"Thread {name} starting")
    time.sleep(2)
    logging.info(f"Thread {name} finished")

def main():
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        # Submit tasks to the executor
        futures = [executor.submit(thread_function, i) for i in range(5)]
        
        # Wait for all tasks to complete
        for future in concurrent.futures.as_completed(futures):
            try:
                future.result()  # This will re-raise any exceptions raised in the threads
            except Exception as e:
                logging.error(f"Thread raised an exception: {e}")

if __name__ == "__main__":
    main()
