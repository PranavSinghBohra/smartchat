import requests
from bs4 import BeautifulSoup

def scrape_website(url: str) -> str:
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }

    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    
    for tag in soup(["script", "style", "sup", "table"]):
        tag.decompose()

    content = soup.find(id="mw-content-text")
    if content:
        paragraphs = content.find_all("p")
    else:
        paragraphs = soup.find_all("p")
    
    text = "\n".join(p.get_text() for p in paragraphs if p.get_text().strip())
    return text.strip()