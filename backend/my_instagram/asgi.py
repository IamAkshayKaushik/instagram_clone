import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import calling.routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "my_instagram.settings")

# application = get_asgi_application()
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            calling.routing.websocket_urlpatterns
        )
    ),
})
