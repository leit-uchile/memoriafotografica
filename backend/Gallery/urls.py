from django.urls import include, re_path
from rest_framework import routers

from Gallery.api.photo import PhotoAPI
from Gallery.api.comment import CommentAPI
from Gallery.api.category import CategoryAPI
from Gallery.api.album import AlbumAPI

router = routers.SimpleRouter()
router.register(r'photos', PhotoAPI, basename='photos')
router.register(r'comments', CommentAPI, basename='comment')
router.register(r'categories', CategoryAPI, basename='category')
router.register(r'albums', AlbumAPI, basename='album')

urlpatterns = [
    re_path('', include(router.urls)),
]
