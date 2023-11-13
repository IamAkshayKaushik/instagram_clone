from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserRegistrationView, UserProfileView, UserLoginView, MyTokenObtainPairView, UserLogoutView

app_name = 'accounts'

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('login/', MyTokenObtainPairView.as_view(), name='user-login'),
    path("logout/", UserLogoutView.as_view(), name="user-logout"),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]
