from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_psq import PsqMixin, Rule, psq

from Gallery.permissions import ReadOnly
from Gallery.serializers import AlbumSerializer
from Gallery.models import Album

from Users.permissions import IsColaborator, IsAdmin, IsCurator, IsAnonymous

class AlbumAPI(PsqMixin, viewsets.ModelViewSet):
    """
    List albums according to user permissions
    """
    authentication_classes = [GuestOrUserAuth]
    permission_classes = [ ReadOnly | IsAdmin ] # Allows authenticated users and read only
    
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
            Rule([IsCurator], AlbumSerializer, lambda self: Album.objects.all()),
            Rule([IsAdmin], AlbumSerializer, lambda self: Photo.objects.all()),
        ],
        ('create', 'update'): [
            Rule([IsColaborator], AlbumSerializer),
            Rule([IsCurator], AlbumSerializer),
            Rule([IsAdmin], AlbumSerializer),
        ],
        # 'remove': [
        #     Rule([IsColaborator], AlbumSerializer),
        #     Rule([IsCurator], AlbumSerializer),
        #     Rule([IsAdmin], AlbumSerializer),
        # ],
        'retrieve': [
            Rule([IsAnonymous], AlbumSerializer),
            Rule([IsColaborator], AlbumSerializer),
            Rule([IsCurator], AlbumSerializer),
            Rule([IsAdmin], AlbumSerializer),
        ],
    }