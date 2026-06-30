from fastapi import APIRouter
from pydantic import BaseModel
from app.services.scraper import scrape_website
from app.services.embedder import embed_and_store
from app.services.rag_chain import reset_chat_history

router = APIRouter()


class ScrapeRequest(BaseModel):
    url: str


@router.post("/scrape")
async def scrape(request: ScrapeRequest):
    text = scrape_website(request.url)
    embed_and_store(text)
    reset_chat_history()

    return {"message": "Website scraped and stored successfully"}

