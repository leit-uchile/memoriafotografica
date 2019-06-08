from django.urls import path, re_path
#from rest_framework.documentation import include_docs_urls
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('photo/', views.photo_list, name='photo_list'),
    re_path(r'^photo/(?P<pk>[0-9]+)/$', views.photo_detail),
    path('album/', views.album_list, name='album_list'),
    re_path(r'^album/(?P<pk>[0-9]+)/$', views.album_detail),
    #path(r'^docs/', include_docs_urls(title='api'))
    ]
