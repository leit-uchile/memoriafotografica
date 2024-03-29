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
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
#DOCUMENTACION API
from rest_framework.documentation import include_docs_urls

from Gallery import endpoints as gallery_endpoints
from MetaData import endpoints as metadata_endpoints
from Metrics import endpoints as metrics_endpoints
from Users import endpoints as user_endpoints
from WebAdmin import endpoints as webadmin_endpoints

#schema_view = get_swagger_view(title='API Memoria Fotográfica')

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/', include(user_endpoints)),
    re_path(r'^api/', include(gallery_endpoints)),
    re_path(r'^api/', include(metadata_endpoints)),
    re_path(r'^api/metrics/', include(metrics_endpoints)),
    re_path(r'^api/', include(webadmin_endpoints)),
    re_path(r'^api/auth/', include('knox.urls')),
    #re_path(r'^', TemplateView.as_view(template_name="index.html")),
    url(r'^docs/', include_docs_urls(title="API Memfoto", public=False))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
