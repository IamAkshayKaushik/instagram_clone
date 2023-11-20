"""
URL configuration for my_instagram project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("__debug__/", include("debug_toolbar.urls")),
    path('api/accounts/', include('accounts.urls')),
    path('api/posts/', include('posts.urls')),
    path('api/direct-messages/', include('direct_messages.urls')),
    path('api/follow/', include('follow.urls')),
    path('api/calling/', include('calling.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
