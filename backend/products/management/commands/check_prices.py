from django.core.management.base import BaseCommand
from products.models import Product
from products.utils.scraper import get_amazon_price
from products.utils.notifications import send_price_drop_email

class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        products = Product.objects.all()

        for product in products:

            price = get_amazon_price(product.url)

            if price:
                product.current_price = price
                product.save()

                if price <= product.target_price:
                    print(f"Price dropped for {product.title}")
                    send_price_drop_email(product)
                else:
                    print("No change")