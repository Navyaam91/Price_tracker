import time
from django.core.management.base import BaseCommand
from products.models import Product, PriceHistory
from products.scraper import scrape_price
from products.utils import check_and_notify_price_drop
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Runs the web scraper to update product prices and check for target price matches'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting the web scraper job...'))
        
        products = Product.objects.all()
        if not products.exists():
            self.stdout.write(self.style.WARNING('No products found in the database.'))
            return

        for product in products:
            self.stdout.write(f"Scraping price for {product.title}...")
            
            new_price = scrape_price(product.url)
            
            if new_price is not None:
                self.stdout.write(self.style.SUCCESS(f"Found price: {new_price}"))
                
                if product.current_price != new_price:
                    product.current_price = new_price
                    product.save()
                    
                    PriceHistory.objects.create(
                        product=product,
                        price=new_price
                    )
                    
                    self.stdout.write(self.style.SUCCESS(f"Updated price for {product.title} to {new_price}"))
                    
                    check_and_notify_price_drop(product, new_price)
                else:
                    self.stdout.write(f"Price unchanged for {product.title}: {new_price}")
            else:
                self.stdout.write(self.style.ERROR(f"Failed to scrape price for {product.title}"))

            time.sleep(2)

        self.stdout.write(self.style.SUCCESS('Web scraper job completed.'))
