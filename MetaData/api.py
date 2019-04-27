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
#from .permissions import *

from django.http import Http404, QueryDict

from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import BasePermission
from rest_framework.documentation import include_docs_urls



class IPTCKeywordListAPI(generics.GenericAPIView):
    """
    get:
    Get a list of ALL IPTCKeyword.

    post:
    Create a new IPTCKeyword.

    """
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        keyword = IPTCKeyword.objects.all()
        #serializer_class = IPTCKeywordSerializer
        serializer = IPTCKeywordSerializer(keyword, many = True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        user = request.user.user_type
        serializer = IPTCKeywordSerializer(data=request.data)
        if user !=1:
            if serializer.is_valid():
                print("saving ser.")
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)



class IPTCKeywordDetailAPI(generics.GenericAPIView):
    """
    get:
    Get details of a IPTCKeyword

    put:
    Modify (partially) the attributes of a IPTCKeyword

    delete:
    Delete a IPTCKeyword
    """
    permission_classes = [IsAuthenticated,]

    def get_object(self, pk):
        try:
            return IPTCKeyword.objects.get(pk=pk)
        except IPTCKeyword.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        keyword = self.get_object(pk)
        #serializer_class = IPTCKeywordSerializer
        serializer = IPTCKeywordSerializer(keyword)
        return Response(serializer.data)        

    def put(self, request, pk, *args, **kwargs):
        keyword = self.get_object(pk)
        serializer = IPTCKeywordSerializer(keyword, data = request.data, partial = True)
        if request.user.user_type != 1:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, *args, **kwargs):
        if request.user.user_type !=1:
            keyword = self.get_object(pk)
            keyword.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)


class MetadataListAPI(generics.GenericAPIView):
    """
    get:
    Get a list of ALL metadata.

    post:
    Create a new metadata.

    """
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        metadata_admin = Metadata.objects.all()
        if request.user.user_type != 1:
            serializer_class = MetadataAdminSerializer
            serializer = MetadataAdminSerializer(metadata_admin, many=True)
        else:
            metadata = Metadata.objects.filter(approved=True)
            serializer_class = MetadataSerializer
            serializer = MetadataSerializer(metadata, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = MetadataAdminSerializer
        if request.user.user_type !=1:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status = status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)
  

class MetadataDetailAPI(generics.GenericAPIView):
    """
    get:
    Get details of Metadata
    
    put:
    Modify (partially) the attributes of a metadata.

    delete:
    Delete a metadata

    """
    permission_classes = [IsAuthenticated,]
    def get_object(self, pk):
        try:
            metadata = Metadata.objects.get(pk=pk)
            if not admin:
                if metadata.approved:
                    raise Metadata.DoesNotExist
            return metadata
        except Photo.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        if request.user.user_type != 1:
            metadata = self.get_object(pk, True)
            serializer_class = MetadataAdminSerializer
            serializer = MetadataAdminSerializer(metadata)
        else:
            metadata = self.get_object(pk, False)
            serializer_class = MetadataSerializer
            serializer = MetadataSerializer
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        if request.user.user_type == 1:
            metadata = self.get_object(pk, False)
            if metadata in request.user.metadata.all():
                serializer_class = MetadataSerializer
                serializer = MetadataSerializer(metadata, data=request.data, partial = True)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        elif request.user.user_type != 1:
            metadata = self.get_object(pk,True)
            serializer_class = MetadataAdminSerializer
            serializer = MetadataAdminSerializer(metadata, data = request.data, partial=True)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        if request.user.user_type != 1:
            adm = True
        else:
            adm = False
            metadata = self.get_object(pk, adm)
        if request.user.user_type != 1 or metadata in request.user.metadata.all():
            metadata.delete()
            return Response(status = status.HTTP_204_NO_CONTENT)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

