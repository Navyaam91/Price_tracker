from django.urls import path
from .views import EmailTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('token/', EmailTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
]