from .api import *
from django.urls import re_path, include

urlpatterns = [
    re_path('^requests/photos/(?P<pk>[0-9]+)/$', PhotoRequestAPI.as_view()),
    re_path('^news/$', NewsListAPI.as_view()),
    re_path('^news/(?P<pk>[0-9]+)/$', NewsDetailAPI.as_view()),
    re_path('^caroussel/$', LandingCarousselAPI.as_view())
]
