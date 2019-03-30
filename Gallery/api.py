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
from rest_framework.permissions import BasePermission
from rest_condition import ConditionalPermission, C, And, Or, Not
from rest_framework.documentation import include_docs_urls



#Metadata¿?
def add_title_description(request, p_id):
    if request.method == 'POST':
        t = request.POST.get('title')
        d = request.POST.get('description')
        title = MetadataTitle.objects.create(title=t, description=t.lower(), photo=Photo.objects.get(pk=p_id))
        description = MetadataDescription.objects.create(description=d, photo=Photo.objects.get(pk=p_id))



class PhotoListAPI(generics.GenericAPIView):

    """
    get:
    Get a list of ALL pictures.

    post:
    Create a new picture.
    """

    #post_permission = And(IsPostRequest, IsAuthenticated)

    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):

        photo = Photo.objects.all()

        if request.user.user_type == 1:
            serializer_class = PhotoSerializer
            serializer = PhotoSerializer(photo, many = True)
        else:
            serializer_class = PhotoAdminSerializer
            serializer = PhotoAdminSerializer(photo, many = True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):

        serializer = CreatePhotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            p = Photo.objects.get(pk=serializer.data['id'])
            request.user.photos.add(p)
            request.user.save()
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
    #permission_classes = [Or(IsGetRequest,
    #                         And(IsOwner, Or(IsDeleteRequest, And(IsPutRequest, FilterContent)))),]
    permission_classes = [IsAuthenticated,]

    def get_object(self, pk):
        try:
            return Photo.objects.get(pk=pk)
        except Photo.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        photo = self.get_object(pk)
        if request.user.user_type == 1:
            serializer_class = PhotoSerializer
            serializer = PhotoSerializer(photo)
        else:
            serializer_class = PhotoAdminSerializer
            serializer = PhotoAdminSerializer(photo)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        photo = self.get_object(pk)
        if request.user.user_type == 1 and photo in request.user.photos:
            serializer_class = PhotoSerializer
            serializer = PhotoSerializer(photo, data = request.data, partial=True)
        else:
            serializer_class = PhotoAdminSerializer
            serializer = PhotoAdminSerializer(photo, data = request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        photo = self.get_object(pk)
        if request.user.user_type == 3 or photo in request.user.photos:
            photo.delete()
            return Response(status = status.HTTP_204_NO_CONTENT)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)


class CommentListAPI(generics.GenericAPIView):
    """
    get:
    Get a list of ALL comments.
    """
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        comments = Comment.objects.all();
        if request.user.user_type == 1:
            serializer_class = CommentSerializer
            serializer = CommentSerializer(comments, many = True)
        else:
            serializer_class = CommentAdminSerializer
            serializer = CommentAdminSerializer(comments, many = True)
        return Response(serializer.data)

    # Aqui no hay POST porque la idea es crear
    # comentarios dentro de una foto.


class CommentDetailAPI(generics.GenericAPIView):
    """
    Retrieve, update or delete a comment instance.
    """

    #permission_classes = [Or(And(IsOwner, Or(IsPutRequest, IsDeleteRequest)),
    #                         IsGetRequest),]
    permission_classes = [IsAuthenticated,]
    def get_object(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        comment = self.get_object(pk)
        if request.user.user_type == 1:
            serializer_class = CommentSerializer
            serializer = CommentSerializer(comment)
        else:
            serializer_class = CommentAdminSerializer
            serializer = CommentAdminSerializer(comment)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        comment = self.get_object(pk)
        #serializer = CommentSerializer(comment, request.data)
        if request.user.user_type == 1:
            serializer_class = CommentSerializer
            serializer = CommentSerializer(comment, data = request.data, partial = True)
        else:
            serializer_class = CommentAdminSerializer
            serializer = CommentAdminSerializer(comment, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            c = self.get_object(pk)
            c.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status= status.HTTP_401_UNAUTHORIZED)

class PhotoCommentListAPI(generics.GenericAPIView):
    """
    List all comments from a photo, or create a new comment.
    """
    permission_classes = [IsAuthenticated,]
    def get_object(self, pk):
        try:
            return Photo.objects.get(pk=pk)
        except Photo.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        p = self.get_object(pk)
        comments = p.comments.all()
        if request.user.user_type == 1:
            serializer_class = CommentSerializer
            serializer = CommentSerializer(comments, many = True)
        else:
            serializer_class = CommentAdminSerializer
            serializer = CommentAdminSerializer(comments, many = True)
        return Response(serializer.data)


    def post(self, request, pk, *args, **kwargs):
        photo = self.get_object(pk)
        serializer = CreateCommentSerializer(data = request.data)
        if serializer.is_valid():
            s = serializer.save()
            photo.comments.add(s)
            photo.save()
            request.user.comments.add(s)
            request.user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryListAPI(generics.GenericAPIView):
    """
    List all categories, or create a new category.
    """
    serializer_class = CategorySerializer
    #permission_classes = [Or(And(IsPostRequest,Or(IsCurator, IsAdmin)),
    #                        IsGetRequest), ]
    permissions_classes = [IsAuthenticated,]
    def get(self, request, *args, **kwargs):
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        usuario = request.user.user_type
        serializer = CategorySerializer(data=request.data)
        if request.user.user_type == 3:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

class CategoryDetailAPI(generics.GenericAPIView):
    """
    Retrieve, update or delete a comment instance.
    """

    serializer_class = CategorySerializer
    #permission_classes = [Or(IsGetRequest,
    #                         And(IsOwner, Or(IsPutRequest, IsDeleteRequest))),]
    permission_classes = [IsAuthenticated,]
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
        if request.user.user_type == 3:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)
    def delete(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            category = self.get_object(pk)
            category.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

class ReportListAPI(generics.GenericAPIView):
    """
    List all reports, or create a new report.
    """

    serializer_class = ReportSerializer
    #permission_classes = [Or(And(IsGetRequest,Or (IsCurator, IsAdmin)),
    #                      IsGetRequest),]
    permission_classes = [IsAuthenticated,]
    def get(self, request, *args, **kwargs):
        if request.user.user_type == 3:
            report = Reporte.objects.all()
            serializer = ReportSerializer(report, many=True)
            return Response(serializer.data)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

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
    """
    Retrieve, update or delete a report instance.
    """

    #permission_classes=[Or(And(IsGetRequest, Or(IsCurator, IsAdmin)),
    #                        And(IsPutRequest, Or(IsCurator, IsAdmin)),
    #                        And(IsDeleteRequest, Or(IsCurator, IsAdmin))),]
    serializer_class = ReportSerializer
    def get_object(self, pk):
        try:
            return Reporte.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            user = self.get_object(pk)
            serializer = ReportSerializer(user)
            return Response(serializer.data)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)
    def put(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            user = self.get_object(pk)
            serializer = ReportSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)
    def delete(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            user = self.get_object(pk)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

class AlbumListAPI(generics.GenericAPIView):
    """
    List all albums, or create a new album.
    """
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticated,]
    def get(self, request, *args, **kwargs):
        category = Album.objects.all()
        serializer = AlbumSerializer(category, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = AlbumSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            s = serializer.save()
            request.user.albums.add(s)
            request.user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AlbumDetailAPI(generics.GenericAPIView):
    """
    Retrieve, update or delete an album instance.
    """
    #permission_classes = [Or(IsGetRequest,
    #                         And(IsOwner, Or(IsPutRequest, IsDeleteRequest))),]
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticated,]
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
        if request.user.user_type == 3:
            album = self.get_object(pk)
            album.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)
