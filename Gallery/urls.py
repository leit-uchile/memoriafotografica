from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('lista', views.pics, name='pics'),
    path('fotos', views.album, name='album')
    ]
