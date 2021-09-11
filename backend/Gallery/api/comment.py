from rest_framework.permissions import IsAuthenticated
from rest_framework import mixins, viewsets, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from drf_psq import PsqMixin, Rule

from Gallery.auth import GuestOrUserAuth
from Gallery.permissions import ReadOnly
from Gallery.serializers import CommentAdminSerializer, CommentSerializer
from Gallery.models import Comment

from Users.permissions import IsColaborator, IsAdmin, IsCurator, IsAnonymous

class CommentListAPI(PsqMixin, mixins.ListModelMixin, mixins.CreateModelMixin ,viewsets.GenericViewSet):
    """
    List comments according to user permissions
    """
    authentication_classes =  [GuestOrUserAuth] # Checks that the user is a guest for POST new comments
    permission_classes = [ IsAuthenticated | ReadOnly ] # Allows authenticated users and read only

    serializer_class = CommentSerializer
    queryset = Comment.objects.filter(censure=False)
    
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['author','picture','created_at', 'updated_at']
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['created_at']

    psq_rules = {
        'list': [
            Rule([IsAnonymous], CommentSerializer),
            Rule([IsColaborator], CommentSerializer),
            Rule([IsCurator], CommentAdminSerializer, lambda self: Comment.objects.all()),
            Rule([IsAdmin], CommentAdminSerializer, lambda self: Comment.objects.all()),
        ]
    }

