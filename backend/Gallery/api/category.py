from rest_framework.permissions import IsAuthenticated
from rest_framework import mixins, viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_psq import PsqMixin, Rule, psq

from Gallery.auth import GuestOrUserAuth
from Gallery.permissions import IsOwner, ReadOnly
from Gallery.serializers import CategorySerializer
from Gallery.models import Category

from Users.permissions import IsColaborator, IsAdmin, IsCurator, IsAnonymous

class CategoryAPI(PsqMixin, mixins.ListModelMixin, mixins.CreateModelMixin ,viewsets.GenericViewSet):
    """
    List categories according to user permissions
    """
    authentication_classes =  [GuestOrUserAuth]
    permission_classes = [ IsAuthenticated | ReadOnly ]

    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['title','created_at','updated_at']
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['created_at']

    psq_rules = {
       'list': [
            Rule([IsAnonymous], CategorySerializer),
            Rule([IsColaborator], CategorySerializer),
            Rule([IsCurator], CategorySerializer, lambda self: Category.objects.all()),
            Rule([IsAdmin], CategorySerializer, lambda self: Category.objects.all()),
        ],
        ('create', 'update', 'remove'): [
            Rule([IsCurator], CategorySerializer),
            Rule([IsAdmin], CategorySerializer),
        ],
        'retrieve': [
            Rule([IsAnonymous], CategorySerializer),
            Rule([IsColaborator], CategorySerializer),
            Rule([IsCurator], CategorySerializer),
            Rule([IsAdmin], CategorySerializer),
        ],
    }

