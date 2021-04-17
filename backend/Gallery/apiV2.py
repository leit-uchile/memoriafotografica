from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Photo
from .serializers import PhotoSerializerV2
from .permissions import UserObjectPermission

class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotoSerializerV2
    permission_classes = [UserObjectPermission,]

    def get_queryset(self):
        # get request user
        user = self.request.user
        queryset = None

        # public methods
        if self.request.method in ['GET', 'POST']:
            queryset = Photo.objects.all()
        
        # if user is curator check current permissions
        # Note: if user has flag 'is_superuser' implicitly will have every permission for every object registered in the app
        # so user.has_perm() will always be true.
        if(not user.is_anonymous):
            # retrieve permissions if user is curator
            if user.is_curator and user.has_perm('Gallery.change_photo'):
                queryset = Photo.objects.all()
            if user.is_curator and user.has_perm('Gallery.delete_photo'):
                queryset = Photo.objects.all()

        # if user is collaborator can only PUT/PATCH/DELETE its photos
        if(queryset == None): queryset = user.photos.all()
        return queryset.order_by('-id')




        
            

