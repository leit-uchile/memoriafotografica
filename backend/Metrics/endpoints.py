from django.urls import include, re_path

from .api import *

urlpatterns = [
    #re_path('^photos/$', PhotoListAPI.as_view()),
    re_path('^general/$', GeneralKPIs.as_view()),
]
