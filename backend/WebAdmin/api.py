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
    serializer_class =  NewsSerializer
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
              serializer.save()
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
        caroussel = LandingCaroussel.objects.all()
        serializer = LandingCarousselSerializer(caroussel, many=True)
        return Response(serializer.data)



class PhotoRequestDetailAPI(generics.GenericAPIView):
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
              serializer.save()
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

class PhotoRequestAPI(generics.GenericAPIView):

    serializer_class = PhotoRequestNewSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PhotoRequestListAPI(generics.GenericAPIView):
    """
    Give curators the list of requests
    """

    serializer_class = PhotoRequestSerializer
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        if request.user.user_type > 1:
            photorequests = PhotoRequest.objects.all()
            serializer = self.serializer_class(photorequests, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class ContactRequestListAPI(generics.GenericAPIView):
    
    serializer_class = ContactRequestSerializer
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        if request.user.user_type > 1:
            contactrequests = ContactRequest.objects.all()
            serializer = self.serializer_class(contactrequests, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ContactRequestDetailAPI(generics.GenericAPIView):
    
    permission_classes = (IsAuthenticated,)

    def get_object(self, pk):
        try:
            return ContactRequest.objects.get(pk=pk)
        except ContactRequest.DoesNotExist:
            raise Http404
    
    def get(self,request,pk, *args, **kwargs):
        contactrequest = self.get_object(pk)
        serializer = ContactRequestSerializer(contactrequest)
        return Response(serializer.data)
    
    def put(self,request,pk, *args, **kwargs):
        if request.user.user_type > 1:
            contactrequest = self.get_object(pk)
            serializer = ContactRequestSerializer(contactrequest, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(status = status.HTTP_400_BAD_REQUEST)
        return Response(status = status.HTTP_401_UNAUTHORIZED)

    def delete(self,request,pk, *args, **kwargs):    
        if request.user.user_type > 1:
            contactrequest = self.get_object(pk)
            contactrequest.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status = status.HTTP_401_UNAUTHORIZED)