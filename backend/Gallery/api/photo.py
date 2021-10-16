from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_psq import PsqMixin, Rule, psq

from Gallery.auth import GuestOrUserAuth
from Gallery.permissions import IsOwner, ReadOnly
from Gallery.serializers import CreatePhotoSerializer, PhotoAdminSerializer, PhotoDetailAdminSerializer, PhotoDetailSerializer, PhotoSerializer
from Gallery.models import Photo

from Users.permissions import IsColaborator, IsAdmin, IsCurator, IsAnonymous

class PhotoAPI(PsqMixin, viewsets.ModelViewSet):
    """
    List photos according to user permissions

    and allow for user and guest upload with a valid Knox JWT Token
    """
    authentication_classes = [GuestOrUserAuth]
    permission_classes = [ ReadOnly | IsAdmin ] # Allows authenticated users and read only
    
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
        ],
        'create': [
            Rule([IsColaborator], CreatePhotoSerializer),
            Rule([IsCurator], CreatePhotoSerializer),
            Rule([IsAdmin], CreatePhotoSerializer),
        ],
        'update': [
            Rule([IsAnonymous], PhotoSerializer),
            Rule([IsColaborator], PhotoSerializer),
            Rule([IsCurator], PhotoAdminSerializer),
            Rule([IsAdmin], PhotoAdminSerializer),
        ],
        'retrieve': [
            Rule([IsAnonymous], PhotoDetailSerializer),
            Rule([IsColaborator], PhotoDetailSerializer),
            Rule([IsCurator], PhotoDetailAdminSerializer),
            Rule([IsAdmin], PhotoDetailAdminSerializer),
        ],
        'remove': [
            Rule([IsColaborator & IsOwner], PhotoDetailSerializer),
            Rule([IsCurator], PhotoDetailAdminSerializer),
            Rule([IsAdmin], PhotoDetailAdminSerializer),
        ]
    }
    
    def create(self, request, *args, **kwargs):
        request.data['author'] = request.user.id
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        request.data['author'] = request.user.id
        return super().update(request, *args, **kwargs)
