from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from knox.models import AuthToken
from django.conf import settings
from .serializers import (CreateUserSerializer,UserSerializer, LoginUserSerializer)

User = settings.AUTH_USER_MODEL

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

    def get(self, request, *args, **kwargs):
        pass

    def post(self, request, *args, **kwargs):
        pass




class UserDetailAPI(generics.GenericAPIView):

    def get_object(self, pk):
        pass

    def get(self, request, pk, *args, **kwargs):
        pass

    def put(self, request, pk, *args, **kwargs):
        pass

    def delete(self, request, pk, *args, **kwargs):
        pass




class ReportListAPI(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        pass

    def post(self, request, *args, **kwargs):
        pass



class ReportDetailAPI(generics.GenericAPIView):

    def get_object(self, pk):
        pass

    def get(self, request, pk, *args, **kwargs):
        pass

    def put(self, request, pk, *args, **kwargs):
        pass

    def delete(self, request, pk, *args, **kwargs):
        pass
