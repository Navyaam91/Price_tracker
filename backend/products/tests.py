from django.test import TestCase
from django.contrib.auth.models import User
from products.models import Product
from products.utils.notifications import send_price_drop_email
from unittest.mock import patch

class NotificationTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='password123')
        self.product = Product.objects.create(
            user=self.user,
            title='Test Product',
            url='http://example.com',
            current_price=100.00,
            target_price=150.00
        )

    @patch('products.utils.notifications.send_mail')
    def test_send_price_drop_email(self, mock_send_mail):
        send_price_drop_email(self.product)
        
        mock_send_mail.assert_called_once()
        args, kwargs = mock_send_mail.call_args
        self.assertEqual(args[0], f"Price Drop Alert: {self.product.title}")
        self.assertIn(self.user.email, args[3])
