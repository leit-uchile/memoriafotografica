from django.urls import include, re_path

from . import views
from .api import *

urlpatterns = [
    re_path('^requests/photos/$', PhotoRequestAPI.as_view()),
    re_path('^requests/photos/all/$', PhotoRequestListAPI.as_view()),
    re_path('^requests/photos/(?P<pk>[0-9]+)/$', PhotoRequestDetailAPI.as_view()),
    re_path('^news/$', NewsListAPI.as_view()),
    re_path('^news/(?P<pk>[0-9]+)/$', NewsDetailAPI.as_view()),
    re_path('^caroussel/$', LandingCarousselAPI.as_view()),
    re_path('^requests/contact/(?P<pk>[0-9]+)/$', ContactRequestDetailAPI.as_view()),
    re_path('^requests/contact/all/$', ContactRequestListAPI.as_view()),
    re_path('^actions/censure/', CensureAPI.as_view()),
    re_path('^actions/reportEditContent/', ReportEditAPI.as_view()),
]
