from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from knox.models import AuthToken

from .models import User
from .serializers import CreateUserSerializer, DjangoUserSerializer, UserSerializer
from .serializers import (CreateUserSerializer,
                          DjangoUserSerializer, UserSerializer, LoginUserSerializer)


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(pk=user.id)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        our_user = User.objects.get(user__id = user.id)
        return Response({
            "user": UserSerializer(our_user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        our_user = User.objects.get(user__id = user.id)
        return Response({
            "user": UserSerializer(our_user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = DjangoUserSerializer

    def get_object(self):
        return self.request.user

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = DjangoUserSerializer

    def get_queryset(self):
        return self.request.user.notes.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
