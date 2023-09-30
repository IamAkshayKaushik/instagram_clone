from django.urls import path, include
from .views import CallingView, CallListView
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path("", CallingView.as_view()),
    path('calls/', CallListView.as_view(), name='call-list'),
]
