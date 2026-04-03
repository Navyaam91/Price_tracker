import requests
from bs4 import BeautifulSoup
import re
import logging

logger = logging.getLogger(__name__)

def scrape_price(url):
    """
    Attempts to scrape a price from a generic e-commerce URL.
    Returns the price as a float, or None if not found.
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        potential_price_elements = soup.find_all(
            lambda tag: tag.has_attr('class') and any('price' in str(c).lower() for c in tag['class']) or
                        tag.has_attr('id') and 'price' in str(tag['id']).lower()
        )
        
        for element in potential_price_elements:
            text = element.get_text(strip=True)
            text = re.sub(r'[^\d.]', '', text)
            if text:
                try:
                    if text.count('.') > 1:
                        last_dot = text.rfind('.')
                        text = text[:last_dot].replace('.', '') + text[last_dot:]
                        
                    price = float(text)
                    if price > 0:
                        return price
                except ValueError:
                    continue
                    
        return None
    
    except requests.RequestException as e:
        logger.error(f"Error scraping {url}: {e}")
        return None
    except Exception as e:
        logger.error(f"Unexpected error scraping {url}: {e}")
        return None
