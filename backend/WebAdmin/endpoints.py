from .api import *
from django.urls import re_path, include
from . import views

urlpatterns = [
    re_path('^requests/photos/$', PhotoRequestAPI.as_view()),
    re_path('^requests/photos/all/$', PhotoRequestListAPI.as_view()),
    re_path('^requests/photos/(?P<pk>[0-9]+)/$', PhotoRequestDetailAPI.as_view()),
    re_path('^news/$', NewsListAPI.as_view()),
    re_path('^news/(?P<pk>[0-9]+)/$', NewsDetailAPI.as_view()),
    re_path('^caroussel/$', LandingCarousselAPI.as_view()),
    # TODO: add endpoint and api for ContactRequest
    re_path(r'^email/(?P<emailto>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})-(?P<hash>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/', views.sendEmail , name = 'sendEmail')
]
