from .models import *
from .serializers import *

from rest_framework import viewsets, permissions, generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from Users.models import User
from Gallery.models import *
from Gallery.serializers import *
from rest_framework.mixins import UpdateModelMixin
from rest_framework.exceptions import NotFound

from MetaData.models import *
from Users.permissions import *
#from .permissions import *

from django.http import Http404, QueryDict

from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework.documentation import include_docs_urls

def sort_by_field(element_list, request):
    sort_type = {"asc":"", "desc":"-"}
    try:
        if request.query_params["sort"]:
            splitted_param = request.query_params["sort"].split("-")
            query = sort_type[splitted_param[1]]+splitted_param[0]
            element_list = element_list.order_by(query)
    except KeyError:
        # Default to sorting by asc creation
        element_list = element_list.order_by("created_at")
    return element_list

def search_meta(elements, request):
    try:
        if "iptc" in request.query_params and  request.query_params["iptc"] != "0":
            elements = elements.filter(metadata__pk=int(request.query_params["iptc"]))
        if "search" in request.query_params:
            elements = elements.filter(value__icontains=request.query_params["search"])
        if "limit" in request.query_params:
            elements = elements[0:int(request.query_params["limit"])]
    except KeyError:
        pass
    return elements

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class IPTCKeywordListAPI(generics.GenericAPIView):
    """
    get:
    Get a list of ALL IPTCKeyword.

    post:
    Create a new IPTCKeyword.

    """
    permission_classes = [IsAuthenticated|ReadOnly,]

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
                #print("saving ser.")
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
    permission_classes = [IsAuthenticated|ReadOnly,]

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

class IPTCKeywordMetadataListAPI(generics.GenericAPIView):
    """
    List all metadata from a IPTCKeyword.
    """
    permission_classes = [IsAuthenticated|ReadOnly,]
    def get_object(self,pk):
        try:
            return IPTCKeyword.objects.get(pk=pk)
        except IPTCKeyword.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args,**kwargs):
        iptc = self.get_object(pk)
        if request.user.user_type == 1:
            metadata = iptc.metadata_set.filter(approved = True)
            serializer = MetadataSerializer(metadata, many=True)
        else:
            metadata = iptc.metadata_set.all()
            serializer = MetadataAdminSerializer(metadata, many=True)
        return Response(serializer.data)


class MetadataListAPI(generics.GenericAPIView):
    """
    get:
    Get a list of ALL metadata.
    Permits search queries using the search and limit parameter
    Permits pagination if page_size and page are on the query parameters

    post:
    Create a new metadata.

    """
    permission_classes = [IsAuthenticated|ReadOnly,]

    def get(self, request, *args, **kwargs):
        try:
            if request.user.user_type != 1:
                metadata_admin = Metadata.objects.all()
                metadata_admin = search_meta(metadata_admin, request)
                metadata_admin = sort_by_field(metadata_admin,request)
                serializer_class = MetadataAdminSerializer
                serializer = MetadataAdminSerializer(metadata_admin, many=True)
            else:
                metadata = Metadata.objects.filter(approved=True)
                metadata = search_meta(metadata, request)
                metadata = sort_by_field(metadata,request)
                serializer_class = MetadataSerializer
                serializer = MetadataSerializer(metadata, many=True)
        except Exception:
            # No user logged in
            ids = request.query_params.get('ids', None)
            if ids != None:
                ids = ids.split(',')
                metadata = Metadata.objects.filter(pk__in=ids, approved=True)
                metadata = search_meta(metadata, request)
            else:
                metadata = Metadata.objects.filter(approved=True)
                metadata = search_meta(metadata, request)
            serializer_class = MetadataSerializer
            serializer = MetadataSerializer(metadata, many=True)
        
        if "page" in request.query_params and "page_size" in request.query_params:
            return self.get_paginated_response(self.paginate_queryset(serializer.data))
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        The endpoint accepts a list of metadata
        """
        if request.user.user_type != 1:
            serializer = MetadataAdminSerializer(data=request.data, partial=True, many=True)
        elif request.user.user_type == 1:
            serializer = MetadataSerializer(data = request.data, many=True)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MetadataDetailAPI(generics.GenericAPIView):
    """
    get:
    Get details of Metadata

    put:
    Modify (partially) the attributes of a metadata.

    delete:
    Delete a metadata

    """
    permission_classes = [IsAuthenticated|ReadOnly,]
    def get_object(self, pk, admin):
        try:
            metadata = Metadata.objects.get(pk=pk)
            if not admin:
                if not metadata.approved:
                    raise Metadata.DoesNotExist
            return metadata
        except Metadata.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        if request.user.user_type != 1:
            metadata = self.get_object(pk, True)
            serializer_class = MetadataAdminSerializer
            serializer = MetadataAdminSerializer(metadata)
        else:
            metadata = self.get_object(pk, False)
            serializer_class = MetadataSerializer
            serializer = MetadataSerializer(metadata)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        if request.user.user_type != 1:
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
        if request.user.user_type != 1:
            metadata.delete()
            return Response(status = status.HTTP_204_NO_CONTENT)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

class MetadataPhotoListAPI(generics.GenericAPIView):
    """
    List all photos from a metadata.
    """
    permission_classes = [IsAuthenticated|ReadOnly,]
    def get_object(self, pk, admin):
        try:
            metadata = Metadata.objects.get(pk=pk)
            if not admin:
                if not metadata.approved:
                    raise Metadata.DoesNotExist
            return metadata
        except Metadata.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        if request.user.user_type == 1:
            md = self.get_object(pk, False)
            pictures = md.photo_set.filter(censure =False, approved = True)
            serializer = PhotoSerializer(pictures, many=True)
        else:
            md = self.get_object(pk, True)
            pictures = md.photo_set.all()
            serializer = PhotoAdminSerializer(pictures, many=True)
        return Response(serializer.data)

class MetadataBatchAPI(generics.GenericAPIView):
    """
    get:
    Get a batch of a given size of metadata. i.e. 10 metadata
    """
    permission_classes = [IsAuthenticated|ReadOnly,]

    def get(self, request, *args, **kwargs):
        try:
            if request.user.user_type > 1:
                metadata_admin = Metadata.objects.filter(approved=False)
                serializer_class = MetadataAdminSerializer
                serializer = MetadataAdminSerializer(metadata_admin, many=True)
                return self.get_paginated_response(self.paginate_queryset(serializer.data))
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        except Exception:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MetadataMergeAPI(generics.GenericAPIView):
    """
    post:
    Get a batch of a given size of metadata. i.e. 10 metadata
    """
    permission_classes = [IsAuthenticated|ReadOnly,]

    def post(self, request, *args, **kwargs):
        try:
            if request.user.user_type > 1:
                metadata_admin = Metadata.objects.filter(pk__in=request.data["ids"])
                # Get recipient
                recipient = metadata_admin[0]
                # For each get the photo pk set
                photo_pks = set()
                for metadata in metadata_admin:
                    photos = metadata.photo_set.all()
                    for photo in photos:
                        photo_pks.add(photo.pk)
                    
                # Update photos adding the recipient
                for pk in photo_pks:
                    photo = Photo.objects.get(pk=pk)
                    photo.metadata.add(recipient)
                    photo.save()
                
                # Delete other metadata
                for m in metadata_admin:
                    if m.pk != recipient.pk:
                        m.delete()

                serializer_class = MetadataAdminSerializer
                serializer = MetadataAdminSerializer(recipient)
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
