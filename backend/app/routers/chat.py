from fastapi import APIRouter
from pydantic import BaseModel
from app.services.rag_chain import get_answer

router = APIRouter()

class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
async def chat(request: ChatRequest):
    answer = get_answer(request.question)
    return {"answer": answer}

