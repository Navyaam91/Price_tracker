import requests
from bs4 import BeautifulSoup

def get_amazon_price(url):
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, headers=headers)

    soup = BeautifulSoup(response.content, "html.parser")

    price = soup.find("span", {"class": "a-price-whole"})

    if price:
        return float(price.text.replace(",", "").strip())

    return None