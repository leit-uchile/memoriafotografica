from .api import UserViewSet, RegistrationAPI, LoginAPI, UserAPI
from django.urls import re_path, include

from rest_framework import routers

router = routers.DefaultRouter()
router.register('User', UserViewSet, 'User')


urlpatterns = [
    re_path("^", include(router.urls)),
    re_path("^auth/register/$", RegistrationAPI.as_view()),
    re_path("^auth/login/$", LoginAPI.as_view()),
    re_path("^auth/user/$", UserAPI.as_view()),
]