from django.urls import include, re_path

#from Gallery.api.comment import CommentListAPI
from Gallery.api.photo import PhotoListAPI
#from .api import *

urlpatterns = [
    re_path('^photos/$', PhotoListAPI.as_view()),
    #re_path('^comments/$', CommentListAPI.as_view()),
    #re_path('^photos/$', PhotoListAPI.as_view()),
    #re_path('^photos/(?P<pk>[0-9]+)/$', PhotoDetailAPI.as_view()),
    #re_path('^photos/(?P<pk>[0-9]+)/comments/$', PhotoCommentListAPI.as_view()),
    #re_path('^photos/category/(?P<pk>[0-9]+)/$', PhotoCategoryActions.as_view()),
    #re_path('^comments/$', CommentListAPI.as_view()),
    #re_path('^comments/(?P<pk>[0-9]+)/$', CommentDetailAPI.as_view()),
    #re_path('^categories/$', CategoryListAPI.as_view()),
    #re_path('^categories/(?P<pk>[0-9]+)/$', CategoryDetailAPI.as_view()),
    ## Mostrar fotos de una categoria
    #re_path('^categories/(?P<pk>[0-9]+)/photos/$', CategoryPhotoListAPI.as_view()),
    #re_path('^albums/$', AlbumListAPI.as_view()),
    #re_path('^albums/(?P<pk>[0-9]+)/$', AlbumDetailAPI.as_view()),
    #re_path("^reports/$", ReportListAPI.as_view()),
    #re_path("^reports/(?P<pk>[0-9]+)/$", ReportDetailAPI.as_view()),
    #re_path("^tagsuggestion/$", TagSuggestionAPI.as_view()),
    #re_path("^tagsuggestion/approve/(?P<pk>[0-9]+)/$", TagSuggestionApproveAPI.as_view())
]#
