"""
ASGI config for 'djangoproject' project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os

# websockets
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.http import AsgiHandler
from channels.auth import AuthMiddlewareStack

# djangoapp/routing.py
from api import routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoproject.settings')

# application = get_asgi_application() # (original)
application = ProtocolTypeRouter({
   'http': AsgiHandler(),
   'websocket': AuthMiddlewareStack(URLRouter(routing.websocket_urlpatterns)),
})
