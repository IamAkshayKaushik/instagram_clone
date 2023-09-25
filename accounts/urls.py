from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserRegistrationView, UserProfileView, UserLoginView

app_name = 'accounts'

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]
