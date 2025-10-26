# app/main.py

import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from dotenv import load_dotenv

from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_ollama.llms import Ollama

# Import the pre-loaded vector_store instance from our service
from .services.vector_store import vector_store

# Load environment variables from .env file
load_dotenv()

# --- API Data Models ---
class AskRequest(BaseModel):
    question: str = Field(..., min_length=1, description="The question to ask the RAG agent.")
    category: str = Field("All", description="Optional: The category to filter the search by.")

class AskResponse(BaseModel):
    answer: str
    sources: list[dict]

# --- FastAPI Application ---
app = FastAPI(
    title="RAG News Agent API",
    description="An API for asking questions to a RAG agent knowledgeable about news articles.",
    version="1.0.0"
)

# --- RAG Chain Initialization ---
# This part runs once when the server starts up
try:
    # Initialize the LLM from Ollama
    llm = Ollama(model=os.getenv("OLLAMA_MODEL", "llama2"), temperature=0.1)

    # Define the strict prompt template
    prompt_template = """
    ### Instruction:
    You are a factual news assistant. Your ONLY task is to answer the user's question based strictly on the provided 'Context'.
    If the 'Context' does not contain the information, respond with: "I cannot answer that question based on the provided articles."
    Your answer MUST be derived exclusively from the 'Context'. Do not use any prior knowledge.

    ### Context:
    {context}

    ### Question:
    {question}

    ### Answer:
    """
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])

    # Create the base RetrievalQA chain
    rag_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vector_store.as_retriever(),  # Base retriever
        chain_type_kwargs={"prompt": prompt},
        return_source_documents=True
    )
    print('[INFO] RAG Chain initialized successfully.')
except Exception as e:
    print(f"[ERROR] Error during RAG Chain initialization: {e}")
    rag_chain = None

# --- API Endpoints ---
@app.get("/", tags=["Health Check"])
def read_root():
    return {"status": "ok", "message": "RAG News Agent API is running."}

@app.post("/ask", response_model=AskResponse, tags=["RAG Agent"])
async def ask(request: AskRequest):
    """
    Receives a question and an optional category, returns a factual answer based on the knowledge base.
    """
    if not rag_chain:
        raise HTTPException(status_code=500, detail="RAG chain is not initialized. Check server logs.")

    print(f"Received query: '{request.question}' | Category: '{request.category}'")

    try:
        # --- Metadata Filtering Logic ---
        search_kwargs = {"k": 3}
        if request.category != "All":
            search_kwargs["filter"] = {"category": request.category}

        # Dynamically update the retriever for this query
        rag_chain.retriever = vector_store.as_retriever(search_kwargs=search_kwargs)

        # Invoke the chain
        result = rag_chain.invoke(request.question)

        # Prepare the sources for the response
        sources = [
            {
                "title": doc.metadata.get("title", "N/A"),
                "link": doc.metadata.get("link", "N/A")
            }
            for doc in result.get("source_documents", [])
        ]

        return {"answer": result["result"], "sources": sources}

    except Exception as e:
        print(f"[ERROR] Error during query invocation: {e}")
        raise HTTPException(status_code=500, detail=str(e))

