from django.urls import re_path
from .consumer import CallingConsumer, ChatConsumer


websocket_urlpatterns = [
    re_path(r'^ws/calls/', CallingConsumer.as_asgi(), name='calling'),
    re_path(r'^ws/chat/', ChatConsumer.as_asgi(), name="chatting")
]
