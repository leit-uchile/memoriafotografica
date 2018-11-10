from .api import *
from django.urls import re_path, include


urlpatterns = [

    re_path("^gallery/upload-photo/$", PhotoUploadAPI.as_view()),
    re_path('^gallery/upload-comment/$', CommentUploadAPI.as_view()),

    re_path('^photos/$', PhotoListAPI.as_view()),
    re_path('^photos/(?P<pk>[0-9]+)/$', PhotoDetailAPI.as_view()),
    re_path('^photos/(?P<pk>[0-9]+)/comments/$', PhotoCommentListAPI.as_view()),
    re_path('^comments/$', CommentListAPI.as_view()),
    re_path('^comments/(?P<pk>[0-9]+)/$', CommentDetailAPI.as_view()),
    re_path('^categories/$', CategoryListAPI.as_view()),
    re_path('^categories/(?P<pk>[0-9]+)/$', CategoryDetailAPI.as_view())

    ]
