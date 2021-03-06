from rest_framework import viewsets, permissions, generics, pagination
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import Photo, Album, Comment, Reporte, Category
from Users.models import User
from .serializers import *
from rest_framework.mixins import UpdateModelMixin
from rest_framework.exceptions import NotFound
from MetaData.models import *
from Users.permissions import *
from .permissions import *
from django.http import Http404, QueryDict, JsonResponse
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_condition import ConditionalPermission, C, And, Or, Not
from rest_framework.documentation import include_docs_urls
from datetime import date


def get_user(photoPair):
    try:
        u = photoPair[0].user_set.first()
        u_dict = {}
        u_dict['first_name'] = u.first_name
        u_dict['last_name'] = u.last_name
        u_dict['id'] = u.pk
        photoPair[1]['usuario'] = u_dict
    except AttributeError as e:
        print("error buscando usuario para la foto con id",
              str(photoPair[0].id))
        print(e)
        print("------------")
        pass
    return photoPair[1]


def check_approval(metadata_id):
    m = Metadata.objects.get(pk=metadata_id)
    return m.approved


def make_tag(metadata_id):
    m = Metadata.objects.get(pk=metadata_id)
    return m.metadata.name + " : " + m.value


def filter_photos(photolist, request):
    try:
        if "created_at" in request.query_params:
            photolist = photolist.filter(created_at__gte=date.fromisoformat(
                request.query_params["created_at"]))
        if "created_at_until" in request.query_params:
            photolist = photolist.filter(created_at__lte=date.fromisoformat(
                request.query_params["created_at_until"]))
        if "category" in request.query_params:
            q = list(
                filter(('').__ne__, request.query_params["category"].split(',')))
            photolist = photolist.filter(category__id__in=q).distinct()
            photolist = photolist.order_by("-created_at")
        if "ncategory" in request.query_params:
            q = list(
                filter(('').__ne__, request.query_params["ncategory"].split(',')))
            photolist = photolist.exclude(category__id__in=q)
        if "metadata" in request.query_params:
            meta_query = list(
                filter(('').__ne__, request.query_params["metadata"].split(',')))
            photolist = photolist.filter(metadata__id__in=meta_query)
        if "title" in request.query_params:
            photolist = photolist.filter(
                title__icontains=request.query_params["title"])
        if "censured" in request.query_params:
            censure = True
            if request.query_params["censured"] == "false":
                censure = False
            photolist = photolist.filter(censure=censure)
        if "approved" in request.query_params:
            approved = True
            if request.query_params["approved"] == "false":
                approved = False
            photolist = photolist.filter(approved=approved)
        if "resolved" in request.query_params:
            resolved = True
            if request.query_params["resolved"] == "false":
                resolved = False
            photolist = photolist.filter(resolved=resolved)
        if "type" in request.query_params:
            photolist = photolist.filter(type=request.query_params["type"])
        if "desc" in request.query_params:
            photolist = photolist.filter(
                description__icontains=request.query_params["desc"])
        if "taken" in request.query_params:
            photolist = photolist.filter(
                upload_date__gte=date.fromisoformat(request.query_params["taken"]))
        if "user" in request.query_params:
            photolist = photolist.filter(user=request.query_params["user"])
        if "album" in request.query_params:
            photolist = photolist.filter(album=request.query_params["album"])
    except Exception as e:
        print("Error filtering photos", e)
        pass
    return photolist


def sort_by_field(element_list, request):
    sort_type = {"asc": "", "desc": "-"}
    try:
        if request.query_params["sort"]:
            splitted_param = request.query_params["sort"].split("-")
            query = sort_type[splitted_param[1]]+splitted_param[0]
            element_list = element_list.order_by(query)
    except KeyError:
        # Default to sorting by asc creation
        element_list = element_list.order_by("created_at")
    return element_list


def get_user_from_userset(element):
    ROL_TYPE_CHOICES = (
        (1, 'Alumno'),
        (2, 'Ex-Alumno'),
        (3, 'Académico'),
        (4, 'Ex-Académico'),
        (5, 'Funcionario'),
        (6, 'Externo')
    )
    u = element.user_set.first()
    u_dict = {}
    u_dict['id'] = u.pk
    u_dict['first_name'] = u.first_name
    u_dict['last_name'] = u.last_name
    u_dict['generation'] = u.generation
    u_dict['avatar'] = u.avatar.url if u.avatar else None
    u_dict['rol_type'] = ROL_TYPE_CHOICES[u.rol_type-1][1]
    return u_dict


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class PhotoListAPI(generics.GenericAPIView):
    """
    get:
    Get a list of ALL pictures.

    post:
    Create a new picture.
    """
    permission_classes = [IsAuthenticated | ReadOnly, ]

    # General purpose list query
    # We can return also the page number of a specific photo based on the query
    def get(self, request, *args, **kwargs):
        photo = ""
        if request.user.is_anonymous or request.user.user_type == 1:
            photo = filter_photos(Photo.objects.filter(
                censure=False, approved=True), request)
            photo = sort_by_field(photo, request)
            serializer_class = PhotoSerializer
            serializer = PhotoSerializer(photo, many=True)
            serialized_data = serializer.data
        else:
            photo = filter_photos(Photo.objects.all(), request)
            photo = sort_by_field(photo, request)
            serializer_class = PhotoAdminSerializer
            serializer = PhotoAdminSerializer(photo, many=True)
            serialized_data = serializer.data

        # This does the magic fot PhotoDetails suggestions
        # If we just need the page number
        if "get_page" in request.query_params:
            photo_id = int(request.query_params["get_page"])
            size = int(request.query_params["page_size"])
            results = len(serialized_data)
            # Get the positions
            position = -1  # On the entire array
            prev_p = -1
            next_p = -1
            for i in range(results):
                if serialized_data[i]['id'] == photo_id:
                    if i != 0:
                        prev_p = serialized_data[i-1]["id"]
                    position = i
                    if i != results - 1:
                        next_p = serialized_data[i+1]["id"]
                    break
            page = (position)//size
            return JsonResponse({"position": position, "page": page, "nextId": next_p, "prevId": prev_p, "total": results})

        for aPhoto in serialized_data:
            if request.user.is_anonymous or request.user.user_type == 1:
                aPhoto['metadata'] = list(
                    filter(lambda x: check_approval(x), aPhoto['metadata']))
            ##aPhoto['metadata'] = list(map(lambda x: make_tag(x), aPhoto['metadata']))
        photos_to_map = list(map(get_user, zip(photo, serialized_data)))
        return self.get_paginated_response(self.paginate_queryset(serialized_data))

    def post(self, request, *args, **kwargs):
        serializer = CreatePhotoSerializer(data=request.data)
        # dummy variables if no metadata is included
        p_metadata = None
        recovered_metadata = []
        try:
            # recover metadata from string. String format ex.: "1,2,3,4,5"
            p_metadata = request.data['metadata'].split(',')
        except KeyError:
            pass
        # if metadata, get metadata objects
        if p_metadata:
            recovered_metadata = Metadata.objects.filter(pk__in=p_metadata)

        if serializer.is_valid():
            serializer.save()
            p = Photo.objects.get(pk=serializer.data['id'])
            request.user.photos.add(p)
            request.user.save()
            serialized_data = serializer.data
            if p_metadata:
                # add metadata to photo if any metadata is found:
                recovered_metadata = Metadata.objects.filter(pk__in=p_metadata)
                p.metadata.add(*recovered_metadata)
                # save photo to persist modifications.
                p.save()
                # modify output serializer to display hand-added data.
                serialized_data['metadata'] = list(
                    map(lambda x: x.pk, recovered_metadata))
            # return modified serializer
            return Response(serialized_data, status=status.HTTP_201_CREATED)
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
    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get_object(self, pk, admin):
        try:
            p = Photo.objects.get(pk=pk)
            if not admin:
                if p.censure or not p.approved:
                    raise Photo.DoesNotExist
            return p
        except Photo.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):

        if request.user.is_anonymous or request.user.user_type == 1:
            photo = self.get_object(pk, False)
            serializer_class = PhotoDetailSerializer
            serializer = PhotoDetailSerializer(photo)
            serialized_data = serializer.data
        else:
            photo = self.get_object(pk, True)
            serializer_class = PhotoDetailAdminSerializer
            serializer = PhotoDetailAdminSerializer(photo)
            serialized_data = serializer.data
        serialized_data['metadata'] = list(
            filter(lambda x: x['approved'], serialized_data['metadata']))
        #serialized_data['metadata'] = list(map(lambda x: x['metadata']['name'] + " : " + x['value'], serialized_data['metadata']))
        try:
            u_dict = get_user_from_userset(photo)
            serialized_data['user'] = u_dict
        except:
            pass

        return Response(serialized_data)

    def put(self, request, pk, *args, **kwargs):
        if request.user.user_type == 1:
            photo = self.get_object(pk, False)
            if photo in request.user.photos.all():
                serializer_class = PhotoSerializer
                serializer = PhotoSerializer(
                    photo, data=request.data, partial=True)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        elif request.user.user_type != 1:
            photo = self.get_object(pk, True)
            serializer_class = PhotoAdminSerializer
            serializer = PhotoAdminSerializer(
                photo, data=request.data, partial=True)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        if request.user.user_type != 1:
            adm = True
        else:
            adm = False
        photo = self.get_object(pk, adm)
        if request.user.user_type != 1 or photo in request.user.photos.all():
            photo.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class PhotoCategoryActions(generics.GenericAPIView):
    """
    Add or remove a category from the selected photos
    """
    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get_object(self, pk):
        return Category.objects.get(pk=pk)

    def post(self, request, pk, *args, **wargs):
        if request.user.is_anonymous or request.user.user_type == 1:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        cat = self.get_object(pk)
        photos = Photo.objects.filter(pk__in=request.data["ids"])
        action = request.data["action"]
        if action == "add":
            for p in photos:
                p.category.add(cat)
                p.save()
        elif action == "remove":
            for p in photos:
                p.category.remove(cat)
                p.save()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_200_OK)


class CommentListAPI(generics.GenericAPIView):
    """
    get:
    Get a list of ALL comments.
    """
    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get(self, request, *args, **kwargs):
        if request.user.is_anonymous or request.user.user_type == 1:
            comments = Comment.objects.filter(censure=False)
            serializer_class = CommentSerializer
            serializer = CommentSerializer(comments, many=True)
        else:
            comments = Comment.objects.all()
            serializer_class = CommentAdminSerializer
            serializer = CommentAdminSerializer(comments, many=True)

        serialized_data = serializer.data
        return self.get_paginated_response(self.paginate_queryset(serialized_data))


class CommentDetailAPI(generics.GenericAPIView):
    """
    get:
    Get details of a *comment*.

    put:
    Modify (partially) the attributes of a comment.

    delete:
    Delete a comment.
    """
    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get_object(self, pk, admin):
        comment = Comment.objects.get(pk=pk)
        try:
            if not admin:
                if comment.censure:
                    raise Comment.DoesNotExist
            return comment
        except Comment.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        if request.user.is_anonymous or request.user.user_type == 1:
            comment = self.get_object(pk, False)
            serializer_class = CommentSerializer
            serializer = CommentSerializer(comment)

            serialized_data = serializer.data
            u_dict = get_user_from_userset(
                comment.get(pk=serialized_data['id']))
            serialized_data['usuario'] = u_dict
        else:
            comment = self.get_object(pk, True)
            serializer_class = CommentAdminSerializer
            serializer = CommentAdminSerializer(comment)

            serialized_data = serializer.data
            u_dict = get_user_from_userset(
                comment.get(pk=serialized_data['id']))
            serialized_data['usuario'] = u_dict

        return Response(serialized_data)

    def put(self, request, pk, *args, **kwargs):
        comment = self.get_object(pk, True)
        if request.user.user_type == 1 and comment in request.user.comments.all():
            comment = self.get_object(pk, False)
            serializer_class = CommentSerializer
            serializer = CommentSerializer(
                comment, data=request.data, partial=True)
        elif request.user.user_type != 1:
            comment = self.get_object(pk, True)
            serializer_class = CommentAdminSerializer
            serializer = CommentAdminSerializer(
                comment, data=request.data, partial=True)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        comment = self.get_object(pk, True)
        if comment in request.user.comments.all():
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif request.user.user_type == 3:
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class PhotoCommentListAPI(generics.GenericAPIView):
    """
    List all comments from a photo, or create a new comment.
    """
    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get_object(self, pk, admin):
        try:
            p = Photo.objects.get(pk=pk)
            if not admin:
                if p.censure or not p.approved:
                    raise Photo.DoesNotExist
            return p
        except Photo.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        if request.user.is_anonymous or request.user.user_type == 1:
            p = self.get_object(pk, False)
            comments = p.comments.filter(censure=False)
            comments = comments.order_by("created_at")
            serialized_class = CommentSerializer
            serializer = CommentSerializer(comments, many=True)
            serialized_data = serializer.data
            for c in serialized_data:
                try:
                    u_dict = get_user_from_userset(comments.get(pk=c['id']))
                    c['usuario'] = u_dict
                except Exception as e:
                    print(e)
        else:
            p = self.get_object(pk, True)
            comments = p.comments.all()
            comments = comments.order_by("created_at")
            #serializer_class = CommentAdminSerializer
            serializer = CommentAdminSerializer(comments, many=True)
            serialized_data = serializer.data
            for c in serialized_data:
                try:
                    u_dict = get_user_from_userset(comments.get(pk=c['id']))
                    c['usuario'] = u_dict
                except Exception as e:
                    print(e)

        return self.get_paginated_response(self.paginate_queryset(serialized_data))

    def post(self, request, pk, *args, **kwargs):
        photo = self.get_object(pk, False)
        serializer = CommentSerializer(data=request.data)
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
    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get(self, request, *args, **kwargs):
        category = Category.objects.all()
        category = sort_by_field(category, request)
        serializer = CategorySerializer(category, many=True)
        photos = Photo.objects.all()
        serialized_data = serializer.data
        for c in serialized_data:
            c['count'] = 0
        for photo in photos:
            for photocat in photo.category.all():
                for c in serialized_data:
                    if(c['id'] == photocat.id):
                        c['count'] += 1
        return self.get_paginated_response(self.paginate_queryset(serialized_data))

    # TODO: test it out!
    def post(self, request, *args, **kwargs):
        usuario = request.user.user_type
        serializer = CategorySerializer(data=request.data)
        if request.user.user_type != 1:
            if serializer.is_valid():
                serializer.save()
                p_pictures = request.data['pictures']
                photos = Photo.objects.filter(pk__in=p_pictures)
                for photo in photos:
                    photo.category.add(serializer.data['id'])
                    photo.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class CategoryDetailAPI(generics.GenericAPIView):
    """
    Retrieve, update or delete a category.
    """
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated | ReadOnly, ]

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
        serializer = CategorySerializer(
            category, data=request.data, partial=True)
        if request.user.user_type == 3:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            category = self.get_object(pk)
            category.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class ReportListAPI(generics.GenericAPIView):
    """
    List all reports, or create a new report.
    Permits search queries using the search and limit parameter
    Permits pagination if page_size and page are on the query parameters
    """
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get(self, request, *args, **kwargs):
        # TODO: I changed it from == 3 to > 1 ... is it correct?
        if request.user:
            if request.user.user_type > 1:
                report = Reporte.objects.all()
                report = filter_photos(report, request)
                report = sort_by_field(report, request)
                serializer = ReportSerializer(report, many=True)
                if "page" in request.query_params and "page_size" in request.query_params:
                    return self.get_paginated_response(self.paginate_queryset(serializer.data))
                return Response(serializer.data)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, *args, **kwargs):
        serializer = ReportSerializer(data=request.data)
        if serializer.is_valid():
            t = request.data['type']
            t_class = {'1': 'Usuario', '2': 'Foto',
                       '3': 'Comentario'}  # ERROR HANDLING
            try:
                id = request.data['id']
                if (t == '1'):
                    m = User.objects.get(pk=id)
                elif (t == '2'):
                    m = Photo.objects.get(pk=id)
                elif (t == '3'):
                    m = Comment.objects.get(pk=id)
                r = serializer.save()
                m.report.add(r)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                print(e)
                raise NotFound(
                    detail="ID de "+t_class[t]+" inválido o no existente. Campo 'id' es requerido. ")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReportDetailAPI(generics.GenericAPIView):
    """
    Retrieve, update or delete a report instance.
    """
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get_object(self, pk):
        try:
            return Reporte.objects.get(pk=pk)
        except Reporte.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            report = self.get_object(pk)
            serializer = ReportSerializer(report)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            report = self.get_object(pk)
            serializer = ReportSerializer(report, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            user = self.get_object(pk)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class AlbumListAPI(generics.GenericAPIView):
    """
    List all albums, or create a new album.
    """
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get(self, request, *args, **kwargs):

        album = Album.objects.all()
        if "user" in request.query_params:
            album = album.filter(user=request.query_params["user"])
        if "collections" in request.query_params:
            album = album.filter(collection=True)
        if "name" in request.query_params:
            album = album.filter(name__icontains=request.query_params["name"])
        album = sort_by_field(album, request)
        serializer = AlbumSerializer(album, many=True)
        serialized_data = serializer.data
        return self.get_paginated_response(self.paginate_queryset(serialized_data))

    def post(self, request, *args, **kwargs):
        serializer = AlbumSerializer(
            data=request.data, context={'request': request})
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
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get_object(self, pk):
        try:
            return Album.objects.get(pk=pk)
        except Album.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        album = self.get_object(pk)
        try:
            if request.query_params["detailed"] == "y":
                serializer = AlbumPhotoSerializer(album)
                return Response(serializer.data)
        except KeyError:
            serializer = AlbumSerializer(album)
            return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        album = self.get_object(pk)
        serializer = AlbumSerializer(album, data=request.data, context={
                                     'request': request}, partial=True)
        if album in request.user.albums.all():
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, *args, **kwargs):
        album = self.get_object(pk)
        if request.user.user_type == 3 or album in request.user.albums.all():
            album.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class CategoryPhotoListAPI(generics.GenericAPIView):
    """
    List all photos from a category, or update a new category.
    """
    permission_classes = (IsAuthenticated | ReadOnly,)

    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        category = self.get_object(pk)

        if request.user.is_anonymous or request.user.user_type == 1:
            pictures = category.photo_set.filter(censure=False, approved=True)
            serializer = PhotoSerializer(pictures, many=True)
        else:
            pictures = category.photo_set.all()
            serializer = PhotoAdminSerializer(pictures, many=True)

        serialized_data = serializer.data
        return self.get_paginated_response(self.paginate_queryset(serialized_data))

    def put(self, request, pk, *args, **kwargs):
        category = self.get_object(pk)
        try:
            pictures = Photo.objects.filter(pk__in=request.data['photos'])
            if request.user.user_type == 1:
                serializer = PhotoSerializer(pictures, many=True)
            else:
                serializer = PhotoAdminSerializer(pictures, many=True)
            category.photo_set.set(pictures)
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)


class TagSuggestionAPI(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = TagSuggestion.objects.all()

    def get(self, request, *args, **kwargs):

        tag_suggestion = Photo.objects.exclude(
            tagsuggestion_photo__isnull=True)
        serializer = PhotoTagSuggestionSerializer(tag_suggestion, many=True)
        serialized_data = serializer.data
        return self.get_paginated_response(self.paginate_queryset(serialized_data))

    def post(self, request, *args, **kwargs):
        serializer = TagSuggestionCreateSerializer(
            data=request.data, context={'request': request}, many=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TagSuggestionApproveAPI(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request, pk, *args, **kwargs):

        try:
            tag_suggestion = TagSuggestion.objects.get(pk=pk)
        except Exception:
            return Response({"id": pk}, status=status.HTTP_404_NOT_FOUND)
        
        tag = tag_suggestion.metadata
        photo = tag_suggestion.photo
        approve = int(request.data['approve'])

        if approve:
            photo.metadata.add(tag)
            photo.save()

        tag_suggestion.delete()
        
        return Response({"id": pk}, status=status.HTTP_202_ACCEPTED)
