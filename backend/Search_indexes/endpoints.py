from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from Search_indexes.viewsets.photos import PhotoDocumentViewSet

__all__ = ('urlpatterns',)

router = DefaultRouter()

# **********************************************************
# *********************** Addresses ************************
# **********************************************************
router.register(
    r'photo',
    PhotoDocumentViewSet,
    basename='photodocument'
)

urlpatterns = [
    url(r'^', include(router.urls)),
]