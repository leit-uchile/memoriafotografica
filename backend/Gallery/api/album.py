from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_psq import PsqMixin, Rule, psq

from Gallery.permissions import IsOwner, ReadOnly
from Gallery.permissions import ReadOnly
from Gallery.serializers import AlbumSerializer, AlbumPhotoSerializer
from Gallery.models import Album

from Users.permissions import IsColaborator, IsAdmin, IsCurator, IsAnonymous
from rest_framework.permissions import IsAuthenticated

class AlbumAPI(PsqMixin, viewsets.ModelViewSet):
    """
    List albums according to user permissions
    """
    permission_classes = [ ReadOnly | IsAuthenticated ] # Allows authenticated users and read only
    
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()
    
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['name', 'description', 'author', 'updated_at', 'created_at', 'pictures', 'collection', 'aspect_h', 'aspect_w']
    ordering_fields = ['updated_at', 'created_at']
    ordering = ['created_at']

    psq_rules = {
        'list': [
            Rule([IsAnonymous], AlbumSerializer),
            Rule([IsColaborator], AlbumSerializer),
            Rule([IsCurator], AlbumSerializer),
            Rule([IsAdmin], AlbumSerializer),
        ],
        'retrieve': [
            Rule([IsAnonymous], AlbumPhotoSerializer),
            Rule([IsColaborator], AlbumPhotoSerializer),
            Rule([IsCurator], AlbumPhotoSerializer),
            Rule([IsAdmin], AlbumPhotoSerializer),
        ],
        ('create', 'update'): [
            Rule([IsColaborator], AlbumSerializer),
            Rule([IsCurator], AlbumSerializer),
            Rule([IsAdmin], AlbumSerializer),
        ],
        'remove': [
            Rule([IsColaborator & IsOwner], AlbumSerializer),
            Rule([IsCurator], AlbumSerializer),
            Rule([IsAdmin], AlbumSerializer),
        ],
    }

    def create(self, request, *args, **kwargs):
        request.data['author'] = request.user.id
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        request.data['author'] = request.user.id
        return super().update(request, *args, **kwargs)