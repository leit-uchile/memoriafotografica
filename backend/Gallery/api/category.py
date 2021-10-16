from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_psq import PsqMixin, Rule, psq

from Gallery.permissions import ReadOnly
from Gallery.serializers import CategorySerializer, CreateCategorySerializer
from Gallery.models import Category

from Users.permissions import IsColaborator, IsAdmin, IsCurator, IsAnonymous

class CategoryAPI(PsqMixin, viewsets.ModelViewSet):
    """
    List categories according to user permissions
    """
    permission_classes = [ ReadOnly | IsCurator | IsAdmin ]

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
        ('create', 'update'): [
            Rule([IsCurator], CreateCategorySerializer),
            Rule([IsAdmin], CreateCategorySerializer),
        ],
        'remove': [
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
