from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    #path('user/', views.user_list, name='user_list'),
    #re_path(r'^user/(?P<pk>[0-9]+)/$', views.user_detail),
]
