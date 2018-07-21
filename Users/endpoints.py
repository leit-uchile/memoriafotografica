from .api import RegistrationAPI, LoginAPI, UserAPI
from django.urls import path, re_path, include

urlpatterns = [
  #  path("^", include(router.urls)),
    re_path("^auth/register/$", RegistrationAPI.as_view()),
    re_path("^auth/login/$", LoginAPI.as_view()),
    re_path("^auth/user/$", UserAPI.as_view()),
]