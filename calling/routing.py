from django.urls import re_path
from .consumer import CallingConsumer


websocket_urlpatterns = [
    re_path(r'^ws/calls/', CallingConsumer.as_asgi(), name='calling'),
]
