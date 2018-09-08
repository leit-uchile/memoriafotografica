from .api import *
from django.urls import re_path, include





urlpatterns = [
    re_path("^gallery/upload/$", PhotoUploadAPI.as_view()),
    ]
