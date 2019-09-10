from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework import status
from knox.models import AuthToken
from django.conf import settings
from .serializers import (CreateUserSerializer,UserSerializer, LoginUserSerializer, UserAlbumSerializer, UserCommentSerializer, UserPhotoSerializer)
from .models import User
from .permissions import *
from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import BasePermission
from rest_condition import ConditionalPermission, C, And, Or, Not


class RegistrationAPI(generics.GenericAPIView):
    """
    post:
    Create a new registration session.
    """
    serializer_class = CreateUserSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class LoginAPI(generics.GenericAPIView):
    """
    post:
    Create a new token for a user that is already registered.
    """
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class UserTokenAPI(generics.RetrieveAPIView):
    """
    get:
    Get details of the user 
    """
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user


class UserListAPI(generics.GenericAPIView):
    """
    get:
    Return a list of all the existing users.

    post:
    Create a new user instance.
    """
   
    serializer_class = UserSerializer
    def get(self, request, *args, **kwargs):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

    # Exclusivo del administrador:
    def post(self, request, *args, **kwargs):
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailAPI(generics.GenericAPIView):
    """
       get:
       Get details of a *user*.

       put:
       Modify (partially) the attributes of an user.

       delete:
       Delete an user.
       """
    permission_classes = [IsAuthenticated,]
    serializer_class = UserSerializer
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        user = self.get_object(pk)
        user.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)

class UserPhotosAPI(generics.GenericAPIView):
    """
       get:
       Get photos of a *user*.

       TODO delete:
       Delete an photo asociated to a *user*.
       """
    permission_classes = [IsAuthenticated,]
    serializer_class = UserPhotoSerializer
    def get(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
            serializer = UserPhotoSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            raise Http404

class UserAlbumsAPI(generics.GenericAPIView):
    """
       get:
       Get albums of a *user*.

       TODO delete:
       Delete an album but not the photos asociated to a *user*.
       """
    permission_classes = [IsAuthenticated,]
    serializer_class = UserAlbumSerializer
    def get(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
            serializer = UserAlbumSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            raise Http404

class UserCommentsAPI(generics.GenericAPIView):
    """
       get:
       Get comments of a *user*.

       TODO delete:
       Delete an comment asociated to a *user*.
       """
    permission_classes = [IsAuthenticated,]
    serializer_class = UserCommentSerializer
    def get(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
            serializer = UserCommentSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            raise Http404