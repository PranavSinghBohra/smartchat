from langchain_openai import ChatOpenAI
# from langchain_classic.chains.retrieval_qa.base import RetrievalQA
from langchain_classic.chains import ConversationalRetrievalChain
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_core.prompts import PromptTemplate
from app.core.config import OPENAI_API_KEY

llm = ChatOpenAI(api_key=OPENAI_API_KEY, model="gpt-4o-mini")

embeddings = OpenAIEmbeddings(api_key=OPENAI_API_KEY, model="text-embedding-3-small")

vectorstore = Chroma(
    collection_name="website_chunks",
    embedding_function=embeddings,
    persist_directory="./chroma_db"
)

retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

prompt_template = """Use only the following context to answer the question.
If the answer is not in the context, say "I don't know based on the scraped content."

Context:
{context}

Question: {question}

Answer:"""

prompt = PromptTemplate(
    template=prompt_template,
    input_variables=["context", "question"]
)

qa_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        combine_docs_chain_kwargs={"prompt": prompt}
    )

chat_history = []

def get_answer(question: str) -> str:
    result = qa_chain.invoke({"question": question, "chat_history": chat_history})
    chat_history.append((question, result["answer"]))
    return result["answer"]

def reset_chat_history():
    chat_history.clear()