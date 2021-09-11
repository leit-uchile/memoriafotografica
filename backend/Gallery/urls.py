from django.urls import include, re_path
from rest_framework import routers

from Gallery.api.photo import PhotoListAPI
from Gallery.api.comment import CommentListAPI

router = routers.SimpleRouter()
router.register(r'photos', PhotoListAPI, basename='photo_list')
router.register(r'comments', CommentListAPI, basename='comment_list')

urlpatterns = [
    re_path('', include(router.urls)),
]
