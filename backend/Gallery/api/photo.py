from rest_framework.permissions import IsAuthenticated
from rest_framework import mixins, viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_psq import PsqMixin, Rule

from Gallery.auth import GuestOrUserAuth
from Gallery.permissions import ReadOnly
from Gallery.serializers import PhotoAdminSerializer, PhotoSerializer
from Gallery.models import Photo

from Users.permissions import IsColaborator, IsAdmin, IsCurator, IsAnonymous

class PhotoListAPI(PsqMixin, mixins.ListModelMixin, mixins.CreateModelMixin ,viewsets.GenericViewSet):
    """
    List photos according to user permissions

    and allow for user and guest upload with a valid Knox JWT Token
    """
    authentication_classes = [GuestOrUserAuth]
    permission_classes = [ IsAuthenticated | ReadOnly ] # Allows authenticated users and read only
    
    serializer_class = PhotoSerializer
    queryset = Photo.objects.filter(approved=True, censure=False)
    
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['title','description','author', 'upload_date', 'created_at', 'metadata','aspect_h','aspect_w']
    ordering_fields = ['upload_date', 'created_at']
    ordering = ['created_at']

    psq_rules = {
        'list': [
            Rule([IsAnonymous], PhotoSerializer),
            Rule([IsColaborator], PhotoSerializer),
            Rule([IsCurator], PhotoAdminSerializer, lambda self: Photo.objects.all()),
            Rule([IsAdmin], PhotoAdminSerializer, lambda self: Photo.objects.all()),
        ]
    }
    

class PhotoDetailAPI(mixins.RetrieveModelMixin, mixins.UpdateModelMixin ,viewsets.GenericViewSet):
    """
    Photo REST API
    """
    authentication_classes = [GuestOrUserAuth]

    serializer_class = PhotoSerializer
    queryset = Photo.objects.filter(approved=True, censure=False)

    psq_rules = {
        ('retrieve', 'update', ): [
            Rule([IsAnonymous], PhotoSerializer),
            Rule([IsColaborator], PhotoSerializer),
            Rule([IsCurator], PhotoAdminSerializer, lambda self: Photo.objects.all()),
            Rule([IsAdmin], PhotoAdminSerializer, lambda self: Photo.objects.all()),
        ]
    }
