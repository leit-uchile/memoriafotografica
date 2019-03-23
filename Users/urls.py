from django.urls import path, re_path
from . import views
#from rest_framework.documentation import include_docs_urls


urlpatterns = [
    path('', views.index, name='index'),
    #path(r'^docs/', include_docs_urls(title='api')),
    #path('user/', views.user_list, name='user_list'),
    #re_path(r'^user/(?P<pk>[0-9]+)/$', views.user_detail),
]
