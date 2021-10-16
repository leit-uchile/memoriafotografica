from rest_framework import mixins, viewsets, filters, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from drf_psq import PsqMixin, Rule, psq

from Gallery.permissions import ReadOnly
from Users.permissions import IsAdmin, IsCurator
from Users.serializers import ReCaptchaSerializer
from WebAdmin.serializers import NewsSerializer, LandingCarousselSerializer, ContactRequestSerializer
from WebAdmin.models import News, LandingCaroussel, ContactRequest

class NewsAPI(viewsets.ReadOnlyModelViewSet):
    """
    List and retrieve News
    """
    permission_classes = [ReadOnly]

    serializer_class = NewsSerializer
    queryset = News.objects.all()

    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['title','subtitle','created_at','updated_at']
    ordering_fields = ['updated_at','created_at']
    ordering = ['created_at']

class LandingCarousselAPI(viewsets.ReadOnlyModelViewSet):
    permission_classes = [ReadOnly]

    serializer_class = LandingCarousselSerializer
    queryset = LandingCaroussel.objects.all()

class ContactRequestAPI(viewsets.ModelViewSet):
    """
    Get a list of ALL messages.
    Permits search queries using the search and limit parameter
    """
    permission_classes = [IsCurator | IsAdmin]

    serializer_class = ContactRequestSerializer
    queryset = ContactRequest.objects.all()

    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['email','resolved','created_at','updated_at','email_sent']
    ordering_fields = ['updated_at','created_at']
    ordering = ['created_at']

    def post(self, request, *args, **kwargs):
        formData = request.data
        if "recaptchaToken" in formData.keys():
            tokenRecaptcha = {"recaptcha": formData.pop("recaptchaToken")}
        else:
            tokenRecaptcha = {"recaptcha": ""}
        recaptchaSer = ReCaptchaSerializer(data=tokenRecaptcha)
        if recaptchaSer.is_valid():
            return super().post(request, *args, **kwargs)
        else:
            return Response(recaptchaSer.errors,
                        status=status.HTTP_400_BAD_REQUEST)

