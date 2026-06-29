from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.services.vector_store import store_chunks

def embed_and_store(text: str):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    chunks = splitter.split_text(text)
    store_chunks(chunks)