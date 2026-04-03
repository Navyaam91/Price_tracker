from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def check_and_notify_price_drop(product, new_price):
    """
    Checks if the new price is lower than or equal to the target price.
    If so, sends an email notification.
    """
    if product.target_price and new_price <= product.target_price:
        subject = f"Price Drop Alert: {product.title}"
        message = (
            f"Good news! The price for '{product.title}' has dropped to {new_price}.\n\n"
            f"Your target price was {product.target_price}.\n\n"
            f"Check it out here: {product.url}"
        )
        recipient_list = [product.user.email]
        
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                recipient_list,
                fail_silently=False,
            )
            logger.info(f"Price drop notification sent to {product.user.email} for product {product.id}")
        except Exception as e:
            logger.error(f"Failed to send email for product {product.id}: {e}")
    else:
        logger.info(f"No notification needed for product {product.id} (Price: {new_price}, Target: {product.target_price})")
