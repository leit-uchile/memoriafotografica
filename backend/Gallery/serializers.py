# Import models here

from django.utils import timezone
from rest_framework import fields, serializers
from rest_framework.exceptions import NotFound
from rest_framework.fields import CurrentUserDefault
from WebAdmin.views import sendEmail
from .models import *
from Users.models import User
from Users.serializers import NestedUserSerializer
from MetaData.serializers import MetadataSerializer
from WebAdmin.serializers import ReportSerializer


class CreatePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('image', 'description', 'author', 
                  'upload_date', 'title',
                  #'permission',
                  #'thumbnail',
                  'aspect_h', 'aspect_w')

    def create(self, validated_data):
        photo = Photo.objects.create(**validated_data)
        return photo


class PhotoSerializer(serializers.ModelSerializer):
    # Para usuario colaborador
    class Meta:
        exclude = ('censure', 'report')
        model = Photo

    def update(self, instance, validated_data):
        #instance.permission = validated_data.get(
        #    'permission', instance.permission)
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.updated_at = timezone.now()
        instance.upload_date = validated_data.get(
            'upload_date', instance.upload_date)
        try:
            instance.metadata.set(validated_data['metadata'])
        except KeyError:
            pass
        instance.save()
        return instance


class PhotoDetailSerializer(PhotoSerializer):
    author = NestedUserSerializer(many=False)
    metadata = MetadataSerializer(many=True)

    class Meta(PhotoSerializer.Meta):
        depth = 2


class PhotoAdminSerializer(serializers.ModelSerializer):

    class Meta:
        fields = "__all__"
        model = Photo

    def update(self, instance, validated_data):
        instance.approved = validated_data.get('approved', instance.approved)
        instance.censure = validated_data.get('censure', instance.censure)
        #instance.permission = validated_data.get(
        #    'permission', instance.permission)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.upload_date = validated_data.get(
            'upload_date', instance.upload_date)
        try:
            instance.metadata.set(validated_data['metadata'])
        except KeyError:
            pass
        instance.title = validated_data.get('title', instance.title)
        instance.updated_at = timezone.now()
        instance.save()
        return instance


class PhotoDetailAdminSerializer(PhotoAdminSerializer):
    author = NestedUserSerializer(many=False)
    metadata = MetadataSerializer(many=True)
    report = ReportSerializer(many=True)
    
    class Meta(PhotoAdminSerializer.Meta):
        depth = 2

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Album

    def create(self, validated_data):
        a = Album(name=validated_data['name'])
        a.description = validated_data.get('description', a.description)
        my_user = validated_data['author']
        a.author = my_user
        if my_user.user_type != 1:
            a.collection = validated_data.get('collection', False)
            try:
                a.pictures.add(*validated_data['pictures'])
                # Save thumbnail
                a.thumbnail = validated_data['pictures'][0].thumbnail.url
                a.aspect_h = validated_data['pictures'][0].aspect_h
                a.aspect_w = validated_data['pictures'][0].aspect_w
            except KeyError:
                pass
            except ValueError:
                pass
        else:
            try:
                valid_pics = list(
                    filter(lambda x: x.author == my_user, validated_data['pictures']))
                a.pictures.add(*valid_pics)
                # Save thumbnail
                a.thumbnail = valid_pics[0].thumbnail.url
                a.aspect_h = valid_pics[0].aspect_h
                a.aspect_w = valid_pics[0].aspect_w
            except KeyError:
                pass
        a.save()
        return a

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get(
            'description', instance.description)
        my_user = validated_data['author']
        if my_user.user_type != 1:
            try:
                instance.collection = validated_data['collection']
            except KeyError:
                pass
        try:
            if instance.collection:
                instance.pictures.set(validated_data['pictures'])
                # Save thumbnail
                instance.thumbnail = validated_data['pictures'][0].thumbnail.url
                instance.aspect_h = validated_data['pictures'][0].aspect_h
                instance.aspect_w = validated_data['pictures'][0].aspect_w
            else:
                valid_pics = list(
                    filter(lambda x: x.author == my_user, validated_data['pictures']))
                instance.pictures.set(valid_pics)
                # Save thumbnail
                instance.thumbnail = valid_pics[0].thumbnail.url
                instance.aspect_h = valid_pics[0].aspect_h
                instance.aspect_w = valid_pics[0].aspect_w
        except KeyError:
            pass

        instance.updated_at = timezone.now()
        instance.save()
        return instance


class AlbumPhotoSerializer(AlbumSerializer):
    """
    Include photo information when serializing
    """
    pictures = PhotoSerializer(many=True)
    author = NestedUserSerializer(many=False)
    
    class Meta(AlbumSerializer.Meta):
        depth = 2

"""
class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id','content',)

        def create(self, validated_data):
            comment = Comment.objects.create(**validated_data)
            return comment
"""

class CommentAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'author', 'content', 'censure',
                  'report', 'created_at', 'updated_at')
        read_only_fields = ('id',)

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.censure = validated_data.get('censure', instance.censure)
        instance.updated_at = timezone.now()
        instance.save()
        return instance


class CommentSerializer(serializers.ModelSerializer):
    author = NestedUserSerializer(many=False)
    picture = PhotoSerializer(many=False)
    class Meta:
        model = Comment
        fields = ('id', 'content', 'created_at', 'updated_at','author','picture',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)
    """
    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.censure = validated_data.get('censure', instance.censure)
        instance.save()
        return instance
    Comento esto porque el colab no debiese editar nada
    """

class CategorySerializer(serializers.ModelSerializer):
    pictures = PhotoSerializer(many=True)
    class Meta:
        model = Category
        fields = "__all__"

class CreateCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("title", "pictures")

    def create(self, validated_data):
        instance = Category.objects.create(title=validated_data['title'])
        instance.pictures.set(validated_data['pictures'])
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.pictures.set(validated_data['pictures'])
        instance.updated_at = timezone.now()
        instance.save()
        return instance

class PhotoRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoRequest
        fields ='__all__'

    def create(self, validated_data):
        instance = PhotoRequest.objects.create(reason=validated_data['reason'])
        instance.photos.set(validated_data['photos'])
        instance.save()
        return instance
        
    def update(self, instance, validated_data):
        instance.approved = validated_data['approved']
        if validated_data['approved']:
            sendEmail(emailto=instance.email, case="photo_request_success",
                              subject='Hemos resuelto su solicitud', attached=validated_data['attached'])
        else:
            sendEmail(emailto=instance.email, case="photo_request_failure",
                              subject='Hemos resuelto su solicitud', attached=[])
        instance.resolved = True
        instance.updated_at = timezone.now()
        instance.save()
        return instance

class PhotoRequestDetailSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many = True)

    class Meta:
        model = PhotoRequest
        fields ='__all__'
