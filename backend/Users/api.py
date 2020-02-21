from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework import status
from knox.models import AuthToken
from django.conf import settings
from .serializers import (CreateUserSerializer,UserSerializer, LoginUserSerializer, UserAlbumSerializer, UserCommentSerializer, UserPhotoSerializer, ChangePasswordSerializer)
from .models import User
from .permissions import *
from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_condition import ConditionalPermission, C, And, Or, Not

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

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
            # "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "user": UserSerializer(user).data,
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
            "user": UserSerializer(user).data, # NOTE: context adds the base url and we dont need it here context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

class PasswordAPI(generics.GenericAPIView):
    """
    put:
    Change user password
    """    
    permission_classes = [permissions.IsAuthenticated, ]

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            old_password = serializer.data.get("old_password")
            if not self.object.check_password(old_password):
                return Response({"old_password": ["Wrong password."]}, 
                                status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    
    permission_classes = [IsAuthenticated,]

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
    permission_classes = [IsAuthenticated|ReadOnly,]
    serializer_class = UserSerializer
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        user = self.get_object(pk)
        if not request.user.is_authenticated :            
            if not user.public_profile:                
                return Response(status=status.HTTP_401_UNAUTHORIZED)        
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        user = self.get_object(pk)        
     
        if str(request.user.id) == pk or request.user.user_type != 1:
            serializer = UserSerializer(user, data = request.data, context={'user_type': request.user.user_type}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, *args, **kwargs):
        user = self.get_object(pk)
        user.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)


class UserPhotosAPI(generics.GenericAPIView):
    """
       get:
       Get photos of a *user*.
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