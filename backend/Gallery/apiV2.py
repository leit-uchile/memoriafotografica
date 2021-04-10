from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Photo
from .serializers import PhotoSerializerV2


class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotoSerializerV2

    def get_queryset(self):
        # get request user 
        user = self.request.user
        # retrieve permissions if user is curator
        if user.is_curator:
            return Photo.objects.all()
        # if collaborator can only PUT/PATCH/DELETE its photos
        else:
            if self.request.method in ['GET', 'POST']:
                return Photo.objects.all()
            return user.photos.all()
            

