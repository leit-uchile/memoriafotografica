from rest_framework import viewsets, permissions, generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import Photo, Album, Comment, Reporte, Category
from .serializers import CreatePhotoSerializer, PhotoSerializer, AlbumSerializer, CommentSerializer, ReportSerializer, CategorySerializer
from MetaData.models import MetadataTitle, MetadataDescription
from .permissions import *
from django.http import Http404
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




class PhotoListAPI(generics.GenericAPIView):
    """
    List all photos, or create a new photo.
    """
    def get(self, request, *args, **kwargs):
        photo = Photo.objects.all()
        serializer = PhotoSerializer(photo, many = True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = CreatePhotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PhotoDetailAPI(generics.GenericAPIView):
    """
    Retrieve, update or delete a photo instance.
    """
    def get_object(self, pk):
        try:
            return Photo.objects.get(pk=pk)
        except Photo.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        photo = self.get_object(pk)
        serializer = PhotoSerializer(photo)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        photo = self.get_object(pk)
        serializer = PhotoSerializer(photo, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, *args, **kwargs):
        photo = self.get_object(pk)
        photo.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)



class CommentListAPI(generics.GenericAPIView):
    """
    List all comments, or create a new comment.
    """
    def get(self, request, *args, **kwargs):
        comments = Comment.objects.all();
        serializer = CommentSerializer(comments, many = True)
        return Response(serializer.data)

    # Aqui no hay POST porque la idea es crear
    # comentarios dentro de una foto.


class CommentDetailAPI(generics.GenericAPIView):
    """
    Retrieve, update or delete a comment instance.
    """
    def get_object(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        pass

    def put(self, request, pk, *args, **kwargs):
        pass

    def delete(self, request, pk, *args, **kwargs):
        pass

class PhotoCommentListAPI(generics.GenericAPIView):
    """
    List all comments from a photo, or create a new comment.
    """
    def get_object(self, pk):
        try:
            return Photo.objects.get(pk=pk)
        except Photo.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        p = self.get_object(pk)
        comments = p.comments.all()
        serializer = CommentSerializer(comments, many = True)
        return Response(serializer.data)


    def post(self, request, pk, *args, **kwargs):
        pass


class CategoryListAPI(generics.GenericAPIView):
    """
    List all categories, or create a new category.
    """
    def get(self, request, *args, **kwargs):
        category = Category.objects.all()
        serializer = CategorySerializer(category)
        return Reponse(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetailAPI(generics.GenericAPIView):
    """
    Retrieve, update or delete a comment instance.
    """

    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        category = self.get_object(pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        category = self.get_object(pk)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        category = self.get_object(pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ReportListAPI(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        report = Reporte.object.all()
        serializer = ReportSerializer(report)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReportDetailAPI(generics.GenericAPIView):

    def get_object(self, pk):
        try:
            return Reporte.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        user = self.get_object(pk)
        serializer = ReportSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        user = self.get_object(pk)
        serializer = ReportSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)