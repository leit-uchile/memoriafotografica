from rest_framework import viewsets, permissions, generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import Photo, Album, Comment, Reporte, Category
from Users.models import User
from .serializers import *
from rest_framework.mixins import UpdateModelMixin
from rest_framework.exceptions import NotFound
from MetaData.models import MetadataTitle, MetadataDescription
from Users.permissions import *
from .permissions import *

from django.http import Http404, QueryDict
from rest_framework.permissions import IsAuthenticated

#Metadata¿?
def add_title_description(request, p_id):
    if request.method == 'POST':
        t = request.POST.get('title')
        d = request.POST.get('description')
        title = MetadataTitle.objects.create(title=t, description=t.lower(), photo=Photo.objects.get(pk=p_id))
        description = MetadataDescription.objects.create(description=d, photo=Photo.objects.get(pk=p_id))

#
# class PhotoUploadAPI(generics.GenericAPIView):
#     permission_classes = [IsOwnerOrReadOnly, ]
#     parser_classes = (MultiPartParser, FormParser)
#     serializer_class = CreatePhotoSerializer
#
#     def post(self, request, *args, **kwargs):
#         print(request.user.id)
#         photo_serializer = self.get_serializer(data=request.data)
#         if photo_serializer.is_valid():
#             photo_serializer.save()
#             # add_title_description(request, photo_serializer.data['id'])
#             return Response(photo_serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(photo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
# class CommentUploadAPI(generics.GenericAPIView):
#     permissions_classes = [IsOwnerOrReadOnly]
#     parser_classes = (MultiPartParser, FormParser)
#
#     def post(self, request, *args, **kwargs):
#         comment_serializer = CommentSerializer(data = request.data)
#         if comment_serializer.is_valid():
#             c = comment_serializer.save()
#             try:
#                 pid = request.POST.get('photo')
#                 p = Photo.objects.get(id = pid)
#                 print(p)
#                 p.comments.add(c)
#             except:
#                 pass
#             return Response(comment_serializer.data,  status = status.HTTP_201_CREATED)
#         else:
#             return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class PhotoListAPI(generics.GenericAPIView):

    """
    get:
    Get a list of ALL pictures.

    post:
    Create a new picture.
    """
    serializer_class = PhotoSerializer

    def get(self, request, *args, **kwargs):
        photo = Photo.objects.all()
        serializer = PhotoSerializer(photo, many = True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        permission_class = [IsAuthenticated, IsColaborator]
        serializer = CreatePhotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PhotoDetailAPI(generics.GenericAPIView, UpdateModelMixin):
    """
    get:
    Get details of a *picture*.

    put:
    Modify (partially) the attributes of a picture.

    delete:
    Delete a picture.
    """

    serializer_class = PhotoSerializer
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
        permission_classes = [FilterContent,]
        photo = self.get_object(pk)
        serializer = PhotoSerializer(photo, data = request.data, partial=True)
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
    serializer_class = CommentSerializer
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
    serializer_class = CommentSerializer
    def get_object(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        comment = self.get_object(pk)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        comment = self.get_object(pk)
        serializer = CommentSerializer(comment, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        c = self.get_object(pk)
        c.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PhotoCommentListAPI(generics.GenericAPIView):
    """
    List all comments from a photo, or create a new comment.
    """
    serializer_class = CommentSerializer
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
        photo = self.get_object(pk)
        serializer = CreateCommentSerializer(data = request.data)
        if serializer.is_valid():
            s = serializer.save()
            print(s)
            photo.comments.add(s)
            photo.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryListAPI(generics.GenericAPIView):
    """
    List all categories, or create a new category.
    """
    serializer_class = CategorySerializer
    def get(self, request, *args, **kwargs):
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        permission_classes = [IsCurator | IsAdmin,]
        usuario = request.user.user_type
        print(usuario)
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetailAPI(generics.GenericAPIView):
    """
    Retrieve, update or delete a comment instance.
    """

    serializer_class = CategorySerializer
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
        serializer = CategorySerializer(category, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        category = self.get_object(pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ReportListAPI(generics.GenericAPIView):

    serializer_class = ReportSerializer
    def get(self, request, *args, **kwargs):
        permission_classes=[IsCurator | IsAdmin, ]
        report = Reporte.objects.all()
        serializer = ReportSerializer(report, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ReportSerializer(data=request.data)
        if serializer.is_valid():
            t = request.data['type']
            t_class = {'1': 'Usuario', '2': 'Foto', '3':'Comentario'} #ERROR HANDLING
            try:
                id=request.data['id']
                if (t=='1'):
                    m = User.objects.get(pk=id)
                elif (t == '2'):
                    m = Photo.objects.get(pk=id)
                elif (t == '3'):
                    m = Comment.objects.get(pk=id)
            except:
                raise NotFound(detail="ID de "+t_class[t]+" inválido o no existente.")
            r = serializer.save()
            m.report.add(r)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReportDetailAPI(generics.GenericAPIView):

    serializer_class = ReportSerializer
    def get_object(self, pk):
        try:
            return Reporte.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        permission_classes=[IsCurator | IsAdmin,]
        user = self.get_object(pk)
        serializer = ReportSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        permission_classes=[IsCurator | IsAdmin,]
        user = self.get_object(pk)
        serializer = ReportSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        permission_classes=[IsCurator | IsAdmin,]
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AlbumListAPI(generics.GenericAPIView):
    """
    List all categories, or create a new category.
    """

    serializer_class = AlbumSerializer

    def get(self, request, *args, **kwargs):
        category = Album.objects.all()
        serializer = AlbumSerializer(category, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = AlbumSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AlbumDetailAPI(generics.GenericAPIView):
    """
    Retrieve, update or delete a comment instance.
    """

    serializer_class = AlbumSerializer
    def get_object(self, pk):
        try:
            return Album.objects.get(pk=pk)
        except Album.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        album = self.get_object(pk)
        serializer = AlbumSerializer(album)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        album = self.get_object(pk)
        serializer = AlbumSerializer(album, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        album = self.get_object(pk)
        album.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
