from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from drf_psq import PsqMixin, Rule, psq

from Gallery.permissions import IsOwner, ReadOnly
from Gallery.permissions import ReadOnly
from Gallery.serializers import PhotoRequestSerializer, PhotoRequestDetailSerializer
from Gallery.models import PhotoRequest

from Users.serializers import ReCaptchaSerializer
from Users.permissions import IsColaborator, IsAdmin, IsCurator, IsAnonymous
from rest_framework.permissions import IsAuthenticated


class PhotoRequestAPI(PsqMixin, viewsets.ModelViewSet):
    permission_classes = [ IsAdmin ]

    serializer_class = PhotoRequestSerializer
    queryset = PhotoRequest.objects.all()

    filter_backends = [filters.SearchFilter,
                       DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['reason', 'photos', 'first_name', 'last_name',
                        'identity_document', 'phone_number', 'email', 'institution', 'created_at']
    ordering_fields = ['updated_at', 'created_at']
    ordering = ['created_at']

    psq_rules = {
        ('list', 'update'): [
            Rule([IsCurator], PhotoRequestSerializer),
            Rule([IsAdmin], PhotoRequestSerializer),
        ],
        'retrieve': [
            Rule([IsCurator], PhotoRequestDetailSerializer),
            Rule([IsAdmin], PhotoRequestDetailSerializer),
        ],
        'create': [
            Rule([IsAnonymous], PhotoRequestSerializer),
            Rule([IsColaborator], PhotoRequestSerializer),
            Rule([IsCurator], PhotoRequestSerializer),
            Rule([IsAdmin], PhotoRequestSerializer),
        ],
        'remove': [
            Rule([IsAdmin], PhotoRequestSerializer),
        ],
    }
    """
    def create(self, request, *args, **kwargs):
        formData = request.data
        if "recaptchaToken" in formData.keys():
            tokenRecaptcha = {"recaptcha": formData.pop("recaptchaToken")}
        else:
            tokenRecaptcha = {"recaptcha": ""}
        recaptchaSer = ReCaptchaSerializer(data=tokenRecaptcha)
        if recaptchaSer.is_valid():
            return super().create(request, *args, **kwargs)
        else:
            return Response(recaptchaSer.errors, status=status.HTTP_400_BAD_REQUEST)
    """