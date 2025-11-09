# scripts/create_vector_store.py

import os
import pandas as pd
from dotenv import load_dotenv
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

# Load environment variables (though not strictly needed for this script)
load_dotenv()

# --- Configuration ---
CSV_DATA_PATH = os.path.join('data', 'articles_sample.csv')
FAISS_INDEX_PATH = os.path.join('data', 'faiss_index_with_category')
EMBEDDING_MODEL_NAME = 'all-MiniLM-L6-v2'

def create_vector_store():
    """
    Reads the source CSV, processes the data, creates embeddings,
    and saves a FAISS index to disk.
    """
    print('--- Starting the Indexing Process ---')

    # 1. Load Data from CSV
    try:
        df = pd.read_csv(CSV_DATA_PATH)
        print(f"[INFO] Successfully loaded {len(df)} articles from '{CSV_DATA_PATH}'.")
    except FileNotFoundError:
        print(f"[ERROR] The file '{CSV_DATA_PATH}' was not found.")
        return

    # 2. Prepare Documents
    if 'full_content' in df.columns and 'category' in df.columns:
        df_clean = df.dropna(subset=['full_content', 'category'])
        docs = [
            Document(
                page_content=row['full_content'],
                metadata={
                    'title': str(row['title']),
                    'link': str(row['link']),
                    'category': str(row['category'])
                }
            ) for index, row in df_clean.iterrows()
        ]
    else:
        print("[ERROR] 'full_content' or 'category' columns not found in the CSV.")
        return

    # 3. Split Documents into Chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    split_docs = text_splitter.split_documents(docs)
    print(f"Split {len(docs)} articles into {len(split_docs)} chunks.")

    # 4. Initialize Embedding Model
    print(f"Loading embedding model: '{EMBEDDING_MODEL_NAME}'...")
    embedding_model = HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL_NAME)

    # 5. Create and Save FAISS Vector Store
    print('Creating FAISS vector store from chunks...')
    vector_store = FAISS.from_documents(split_docs, embedding_model)

    print(f"Saving FAISS index to '{FAISS_INDEX_PATH}'...")
    vector_store.save_local(FAISS_INDEX_PATH)

    print('[INFO] --- Indexing Process Complete ---')

if __name__ == '__main__':
    # Create the data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    create_vector_store()

