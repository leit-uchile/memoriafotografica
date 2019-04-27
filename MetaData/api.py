from .models import *
from .serializers import *

from rest_framework import viewsets, permissions, generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from Users.models import User
from Gallery.models import *

from rest_framework.mixins import UpdateModelMixin
from rest_framework.exceptions import NotFound

from MetaData.models import *
from Users.permissions import *
from .permissions import *

from django.http import Http404, QueryDict

from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import BasePermission
from rest_framework.documentation import include_docs_urls



class IPTCKeywordListAPI(generics.GenericAPIView):
    """
    get:


    post:


    """


    def get(self, request, *args, **kwargs):
        return None

    def post(self, request, *args, **kwargs):
        return None



class IPTCKeywordDetailAPI(generics.GenericAPIView):
    """
    get:

    put:

    delete:

    """
    def get_object(self, pk):
        return None

    def get(self, request, pk, *args, **kwargs):
        return None

    def put(self, request, pk, *args, **kwargs):
        return None

    def delete(self, request, pk, *args, **kwargs):
        return None


class MetadataListAPI(generics.GenericAPIView):
    """
    get:


    post:


    """


    def get(self, request, *args, **kwargs):
        return None

    def post(self, request, *args, **kwargs):
        return None



class MetadataDetailAPI(generics.GenericAPIView):
    """
    get:

    put:

    delete:

    """
    def get_object(self, pk):
        return None

    def get(self, request, pk, *args, **kwargs):
        return None

    def put(self, request, pk, *args, **kwargs):
        return None

    def delete(self, request, pk, *args, **kwargs):
        return None
