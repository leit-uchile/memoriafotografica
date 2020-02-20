from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from .models import *
from .serializers import *
from django.http import Http404

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class NewsListAPI(generics.GenericAPIView):

    permission_classes =  [ReadOnly,]
    def get(self, request, *args, **kwargs):
        news = News.objects.all()
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)

class NewsDetailAPI(generics.GenericAPIView):
    permission_classes = [IsAuthenticated,]

    def get_object(self,pk):
        try:
            return News.objects.get(pk=pk)
        except News.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        if request.user.user_type >= 2:
            news = self.get_object(pk)
            serializer = NewsSerializer(news, data=request.data)
            return Response(serializer.data)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

    def put(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            news = self.get_object(pk)
            serializer = NewsSerializer(news, data=request.data)
            if serializer.is_valid():
              return Response(serializer.data)
            else:
              return Response(status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)
    
    def delete(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            news = self.get_object(pk)
            news.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)


class LandingCarousselAPI(generics.GenericAPIView):

    permission_classes =  [ReadOnly,]
    def get(self, request, *args, **kwargs):
        news = LandingCaroussel.objects.all()
        serializer = LandingCarousselSerializer(news, many=False)
        return Response(serializer.data)



class PhotoRequestAPI(generics.GenericAPIView):
    permission_classes = [IsAuthenticated,]

    def get_object(self,pk):
        try:
            return PhotoRequest.objects.get(pk=pk)
        except News.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        if request.user.user_type >= 2:
            photo_request = self.get_object(pk)
            serializer = PhotoRequestSerializer(photo_request, data=request.data)
            return Response(serializer.data)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

    def put(self, request, pk, *args, **kwargs):
        if request.user.user_type >= 2:
            photo_request = self.get_object(pk)
            serializer = PhotoRequestSerializer(photo_request, data=request.data)
            if serializer.is_valid():
              return Response(serializer.data)
            else:
              return Response(status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)
    
    def delete(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            photo_request = self.get_object(pk)
            photo_request.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)