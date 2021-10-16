from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_psq import PsqMixin, Rule

from Gallery.permissions import IsOwner, ReadOnly
from Gallery.serializers import CommentAdminSerializer, CommentSerializer
from Gallery.models import Comment

from Users.permissions import IsColaborator, IsAdmin, IsCurator, IsAnonymous

class CommentAPI(PsqMixin, viewsets.ModelViewSet):
    """
    List comments according to user permissions
    """
    #authentication_classes =  [GuestOrUserAuth] # Checks that the user is a guest for POST new comments
    permission_classes = [ ReadOnly | IsAdmin ] # Allows authenticated users and read only

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
        ],
        'create': [
            Rule([IsColaborator], CommentSerializer),
            Rule([IsCurator], CommentAdminSerializer),
            Rule([IsAdmin], CommentAdminSerializer),
        ],
        'update': [
            Rule([IsCurator], CommentAdminSerializer),
            Rule([IsAdmin], CommentAdminSerializer),
        ],
        'retrieve': [
            Rule([IsAnonymous], CommentSerializer),
            Rule([IsColaborator], CommentSerializer),
            Rule([IsCurator], CommentAdminSerializer),
            Rule([IsAdmin], CommentAdminSerializer),
        ],
        'remove': [
            Rule([IsColaborator & IsOwner], CommentSerializer),
            Rule([IsCurator], CommentAdminSerializer),
            Rule([IsAdmin], CommentAdminSerializer),
        ]
    }

    def create(self, request, *args, **kwargs):
        request.data['author'] = request.user.id
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        request.data['author'] = request.user.id
        return super().update(request, *args, **kwargs)

