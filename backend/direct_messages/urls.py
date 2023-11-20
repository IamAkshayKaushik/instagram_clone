from django.urls import path
from .views import MessageListView

app_name = "direct_messages"

urlpatterns = [
    path("", MessageListView.as_view(), name="message-list"),
]
