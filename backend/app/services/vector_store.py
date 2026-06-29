import chromadb
from chromadb.utils.embedding_functions import OpenAIEmbeddingFunction
from app.core.config import OPENAI_API_KEY

client = chromadb.PersistentClient(path="./chroma_db")

embedding_function = OpenAIEmbeddingFunction(
    api_key=OPENAI_API_KEY,
    model_name="text-embedding-3-small"
)

collection = client.get_or_create_collection(
    name="website_chunks",
    embedding_function=embedding_function
)

def store_chunks(chunks: list[str]):
    collection.upsert(
        documents=chunks,
        ids=[str(i) for i in range(len(chunks))]
    )