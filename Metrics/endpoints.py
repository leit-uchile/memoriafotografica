from .api import *
from django.urls import re_path, include


urlpatterns = [
    #re_path('^photos/$', PhotoListAPI.as_view()),
    re_path('^general/$', GeneralKPIs.as_view()),
]
