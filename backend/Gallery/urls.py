from django.urls import path, re_path
#from rest_framework.documentation import include_docs_urls
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    #path(r'^docs/', include_docs_urls(title='api'))
    ]
