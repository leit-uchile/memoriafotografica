from django.urls import path
from . import views
from django.conf.urls import url
urlpatterns = [
    path('', views.index, name='index'),
    path('metadata/', views.metadata_list, name='metadata_list'),
    path(r'^metadata/(?P<pk>[0-9]+)/$', views.metadata_detail),
]


