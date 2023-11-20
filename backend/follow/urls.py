from django.urls import path
from .views import FollowListView, FollowDetailView

urlpatterns = [
    path('follow/', FollowListView.as_view(), name='follow-list'),
    path('follow/<int:pk>/', FollowDetailView.as_view(), name='follow-detail'),
]
