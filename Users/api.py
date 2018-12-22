from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework import status
from knox.models import AuthToken
from django.conf import settings
from .serializers import (CreateUserSerializer,UserSerializer, LoginUserSerializer)
from .models import User
from .permissions import *
class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class LoginAPI(generics.GenericAPIView):
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
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user




class UserListAPI(generics.GenericAPIView):

    serializer_class = UserSerializer
    def get(self, request, *args, **kwargs):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

    # Exclusivo del administrador:
    def post(self, request, *args, **kwargs):
        permission_classes = [IsAdmin,]
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailAPI(generics.GenericAPIView):

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
