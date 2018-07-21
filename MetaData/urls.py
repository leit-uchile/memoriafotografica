from django.urls import path, re_path
from . import views

from django.conf.urls import url
urlpatterns = [
    path('', views.index, name='index'),
    path('metadata/', views.metadata_list, name='metadata_list'),
    re_path(r'^metadata/(?P<pk>[0-9]+)/$', views.metadata_detail),
]


