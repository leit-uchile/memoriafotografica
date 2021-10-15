from django.urls import include, re_path
from rest_framework import routers

from Gallery.api.photo import PhotoAPI
from Gallery.api.comment import CommentAPI

router = routers.SimpleRouter()
router.register(r'photos', PhotoAPI, basename='photos')
router.register(r'comments', CommentAPI, basename='comment')

urlpatterns = [
    re_path('', include(router.urls)),
]
