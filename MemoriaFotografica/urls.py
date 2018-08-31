"""MemoriaFotografica URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
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
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from Users import endpoints

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/',include('Users.urls')),
    path('gallery/',include('Gallery.urls')),
    path('metadata/',include('MetaData.urls')),
    re_path(r'^api/', include(endpoints)),
    re_path(r'^api/auth/', include('knox.urls')),
    re_path(r'^', TemplateView.as_view(template_name="index.html")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)