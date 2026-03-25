from django.core.mail import send_mail
from django.conf import settings

def send_price_drop_email(product):
    """
    Sends an email notification to the user when a price drop is detected.
    """
    subject = f"Price Drop Alert: {product.title}"
    message = (
        f"Good news! The price for '{product.title}' has dropped to ₹{product.current_price}.\n\n"
        f"Your target price was ₹{product.target_price}.\n\n"
        f"Check it out here: {product.url}\n\n"
        "Happy shopping!"
    )
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [product.user.email]

    try:
        send_mail(subject, message, from_email, recipient_list)
        print(f"Email sent to {product.user.email} for {product.title}")
    except Exception as e:
        print(f"Failed to send email to {product.user.email}: {e}")
