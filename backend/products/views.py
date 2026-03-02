from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Show only logged-in user's products
        return Product.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically assign logged-in user
        serializer.save(user=self.request.user)