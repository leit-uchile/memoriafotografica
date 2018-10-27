from rest_framework import viewsets, permissions, generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import Photo, Album
from .serializers import CreatePhotoSerializer, PhotoSerializer, AlbumSerializer, CommentSerializer
from MetaData.models import MetadataTitle, MetadataDescription
from .permissions import *

#Metadata¿?
def add_title_description(request, p_id):
    if request.method == 'POST':
        t = request.POST.get('title')
        d = request.POST.get('description')
        title = MetadataTitle.objects.create(title=t, description=t.lower(), photo=Photo.objects.get(pk=p_id))
        description = MetadataDescription.objects.create(description=d, photo=Photo.objects.get(pk=p_id))


class PhotoUploadAPI(generics.GenericAPIView):
    permission_classes = [IsOwnerOrReadOnly, ]
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = CreatePhotoSerializer

    def post(self, request, *args, **kwargs):
        print(request.user.id)
        photo_serializer = self.get_serializer(data=request.data)
        if photo_serializer.is_valid():
            photo_serializer.save()
            # add_title_description(request, photo_serializer.data['id'])
            return Response(photo_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(photo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentUploadAPI(generics.GenericAPIView):
    permissions_classes = [IsOwnerOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        comment_serializer = CommentSerializer(data = request.data)
        if comment_serializer.is_valid():
            c = comment_serializer.save()
            try:
                pid = request.POST.get('photo')
                p = Photo.objects.get(id = pid)
                print(p)
                p.comments.add(c)
            except:
                pass
            return Response(comment_serializer.data,  status = status.HTTP_201_CREATED)
        else:
            return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
