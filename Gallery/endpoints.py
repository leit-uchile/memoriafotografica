from .api import *
from django.urls import re_path, include


urlpatterns = [
    re_path("^gallery/upload-photo/$", PhotoUploadAPI.as_view()),
    re_path('^gallery/upload-comment/$', CommentUploadAPI.as_view())
    ]

