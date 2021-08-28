# Import models here

from django.utils import timezone
from rest_framework import fields, serializers
from rest_framework.exceptions import NotFound
from rest_framework.fields import CurrentUserDefault

from .models import *
from Users.serializers import NestedUserSerializer
from MetaData.serializers import MetadataSerializer
from WebAdmin.serializers import ReportSerializer


class CreatePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('id', 'image', 'description', 'author', 
                  'upload_date', 'title', 'permission',
                  'thumbnail', 'aspect_h', 'aspect_w')

    def create(self, validated_data):
        photo = Photo.objects.create(**validated_data)
        return photo


class PhotoSerializer(serializers.ModelSerializer):
    # Para usuario colaborador
    class Meta:
        exclude = ('censure', 'report')
        model = Photo

    def update(self, instance, validated_data):
        instance.permission = validated_data.get(
            'permission', instance.permission)
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
    report = ReportSerializer(many=True)

    class Meta(PhotoSerializer.Meta):
        depth = 2


class PhotoAdminSerializer(serializers.ModelSerializer):

    class Meta:
        fields = "__all__"
        model = Photo

    def update(self, instance, validated_data):
        instance.approved = validated_data.get('approved', instance.approved)
        instance.censure = validated_data.get('censure', instance.censure)
        instance.permission = validated_data.get(
            'permission', instance.permission)
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
        # Create incomplete album
        a = Album(name=validated_data['name'])
        a.description = validated_data.get('description', a.description)
        a.save()
        # Get user from request data
        my_user = self.context['request'].user
        # If user is admin or collab, set collection flag:
        if my_user.user_type != 1:
            try:
                c = validated_data['collection']
                a.collection = c
                a.save()
            except KeyError:
                pass

        # TODO: Handle error if no photos are passed to the album,
        #       a.thumbnail call will throw an error!!!!!
        try:
            # TODO: Error handler if no pictures in request
            validated_data['pictures']
        except:
            a.save()
            return a

        if a.collection:
            a.pictures.add(*validated_data['pictures'])
            # Save thumbnail
            a.thumbnail = validated_data['pictures'][0].thumbnail.url
            a.aspect_h = validated_data['pictures'][0].aspect_h
            a.aspect_w = validated_data['pictures'][0].aspect_w
        else:
            valid_pics = list(
                filter(lambda x: x in my_user.photos.all(), validated_data['pictures']))
            a.pictures.add(*valid_pics)
            # Save thumbnail
            a.thumbnail = valid_pics[0].thumbnail.url
            a.aspect_h = valid_pics[0].aspect_h
            a.aspect_w = valid_pics[0].aspect_w
        a.save()
        return a

    def update(self, instance, validated_data):

        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get(
            'description', instance.description)
        my_user = self.context['request'].user
        if my_user.user_type != 1:
            try:
                c = validated_data['collection']
                instance.collection = c
                instance.save()
            except KeyError:
                pass

        try:
            validated_data['pictures']
            if instance.collection:
                instance.pictures.set(validated_data['pictures'])
                # Save thumbnail
                instance.thumbnail = validated_data['pictures'][0].thumbnail.url
            else:
                valid_pics = list(
                    filter(lambda x: x in my_user.photos.all(), validated_data['pictures']))
                instance.pictures.set(valid_pics)
                instance.thumbnail = valid_pics[0].thumbnail.url
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
    report = ReportSerializer(many=True)
    class Meta:
        model = Comment
        fields = ('id', 'content', 'created_at', 'updated_at','author')
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

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.updated_at = timezone.now()
        instance.save()
        return instance