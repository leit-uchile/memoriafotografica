from .api import *
from django.urls import re_path, include

from rest_framework import routers

router = routers.DefaultRouter()
# router.register('User', UserViewSet, 'User')


urlpatterns = [
    re_path("^", include(router.urls)),
    re_path('^api/auth/', include('knox.urls')),
    re_path("^auth/register/$", RegistrationAPI.as_view()),
    re_path("^auth/login/$", LoginAPI.as_view()),
    re_path("^auth/user/$", UserTokenAPI.as_view()),
    re_path("^users/$", UserListAPI.as_view()),
    re_path("^users/(?P<pk>[0-9]+)/$", UserDetailAPI.as_view())
]
