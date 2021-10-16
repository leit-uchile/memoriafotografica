from django.urls import include, re_path
from rest_framework import routers

from Gallery.api.photo import PhotoAPI
from Gallery.api.comment import CommentAPI
from Gallery.api.category import CategoryAPI

router = routers.SimpleRouter()
router.register(r'photos', PhotoAPI, basename='photos')
router.register(r'comments', CommentAPI, basename='comment')
router.register(r'categories', CategoryAPI, basename='category')

urlpatterns = [
    re_path('', include(router.urls)),
]
