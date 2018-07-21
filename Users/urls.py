from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('user/', views.user_list, name='user_list'),
    path(r'^user/(?P<pk>[0-9]+)/$', views.user_detail),
]
