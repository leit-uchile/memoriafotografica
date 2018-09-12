from rest_framework import viewsets, permissions, generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import Photo, Album
from .serializers import PhotoSerializer, AlbumSerializer
from MetaData.models import MetadataTitle, MetadataDescription


def add_title_description(request, p_id):
    if request.method == 'POST':
        t = request.POST.get('title')
        d = request.POST.get('description')
        title = MetadataTitle.objects.create(title = t, description = t.lower(), photo = Photo.objects.get(pk = p_id))
        description = MetadataDescription.objects.create(description = d,  photo = Photo.objects.get(pk = p_id))




class PhotoUploadAPI(APIView):

    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):



        photo_serializer = PhotoSerializer(data = request.data)
        if photo_serializer.is_valid():
            photo_serializer.save()
            add_title_description(request, photo_serializer.data['id'])
            return Response(photo_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(photo_serializer)
            return Response(photo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
