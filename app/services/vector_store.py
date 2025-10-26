# app/services/vector_store.py

import os
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

# --- Configuration ---
FAISS_INDEX_PATH = os.path.join("data", "faiss_index_with_category")
EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"

class VectorStoreSingleton:
    _instance = None
    
    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            print("Initializing Vector Store Singleton...")
            if not os.path.exists(FAISS_INDEX_PATH):
                raise FileNotFoundError(
                    f"FAISS index not found at '{FAISS_INDEX_PATH}'. "
                    "Please run 'scripts/create_vector_store.py' first."
                )
            
            print(f"Loading embedding model: '{EMBEDDING_MODEL_NAME}'...")
            embedding_model = HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL_NAME)
            
            print(f"Loading FAISS index from '{FAISS_INDEX_PATH}'...")
            cls._instance = FAISS.load_local(
                FAISS_INDEX_PATH, 
                embedding_model, 
                allow_dangerous_deserialization=True
            )
            print("✅ Vector Store Singleton initialized.")
        return cls._instance

# This will be imported by main.py to get the vector store
vector_store = VectorStoreSingleton.get_instance()