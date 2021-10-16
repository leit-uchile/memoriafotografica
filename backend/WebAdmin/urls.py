from django.urls import include, re_path
from rest_framework import routers

from WebAdmin.api.v1 import LandingCarousselAPI, NewsAPI, ContactRequestAPI

router = routers.SimpleRouter()
router.register(r'caroussel', LandingCarousselAPI, basename='caroussel')
router.register(r'news', NewsAPI, basename='news')
router.register(r'requests/contact', ContactRequestAPI, basename='contact-request')

urlpatterns = [
    re_path('', include(router.urls)),
]
