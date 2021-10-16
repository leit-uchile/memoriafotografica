"""MemoriaFotografica URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
"""
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

from rest_framework.documentation import include_docs_urls
from rest_framework import routers

from Gallery import urls as gallery_endpoints
from MetaData import endpoints as metadata_endpoints
from Metrics import endpoints as metrics_endpoints
from Users import urls as user_endpoints
from WebAdmin import urls as webadmin_endpoints

#schema_view = get_swagger_view(title='API Memoria Fotográfica')

router = routers.DefaultRouter()
router.registry.extend(gallery_endpoints.router.registry)
router.registry.extend(webadmin_endpoints.router.registry)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    re_path(r'^api/', include(user_endpoints)),
    re_path(r'^api/auth/', include('knox.urls')),
    #re_path(r'^api/', include(gallery_endpoints)),
    #re_path(r'^api/', include(metadata_endpoints)),
    #re_path(r'^api/metrics/', include(metrics_endpoints)),
    #re_path(r'^api/', include(webadmin_endpoints)),
    #re_path(r'^', TemplateView.as_view(template_name="index.html")),
    url(r'^docs/', include_docs_urls(title="API Memfoto", public=False))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
