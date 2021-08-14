# Import models here
from django.utils import timezone
from rest_framework import fields, serializers
from rest_framework.exceptions import NotFound

from .models import *


class ReportSerializer(serializers.ModelSerializer):

    content_id = serializers.SerializerMethodField()

    def get_content_id(self, obj):
        """
        Recover the id of it's reported element
        """
        if len(obj.photo_set.all()) != 0:
            photo = obj.photo_set.all()[0]
            return {"id": photo.id, "thumbnail": photo.thumbnail.url}
        elif len(obj.comment_set.all()) != 0:
            comment = obj.comment_set.all()[0]
            return {"id": comment.id, "content": comment.content}
        elif len(obj.user_set.all()) != 0:
            user = obj.user_set.all()[0]
            return {"id": user.id, "first_name": user.first_name, "last_name": user.last_name}
        else:
            return -1

    class Meta:
        model = Reporte
        fields = '__all__'

    def create(self, validated_data):
        reporte = Reporte.objects.create(**validated_data)
        return reporte

    def update(self, instance, validated_data):
        print(instance)
        instance.resolved = validated_data.get('resolved', instance.resolved)
        instance.resolution_details = validated_data.get(
            'resolution_details', instance.resolution_details)
        instance.updated_at = timezone.now()
        instance.save()
        return instance


class CommentAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'content', 'censure',
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
    class Meta:
        model = Comment
        fields = ('id', 'content', 'created_at', 'updated_at')
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


"""
class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id','content',)

        def create(self, validated_data):
            comment = Comment.objects.create(**validated_data)
            return comment
"""


class CreatePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('id', 'image', 'description',
                  'upload_date', 'title', 'permission',
                  'thumbnail', 'aspect_h', 'aspect_w')

    def create(self, validated_data):
        photo = Photo.objects.create(**validated_data)
        return photo


class PhotoSerializer(serializers.ModelSerializer):
    # Para usuario colaborador
    class Meta:
        exclude = ('censure', 'report', 'comments')
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
        try:
            instance.category.set(validated_data['category'])
        except KeyError:
            pass
        instance.title = validated_data.get('title', instance.title)
        instance.updated_at = timezone.now()
        instance.save()
        return instance


class PhotoDetailAdminSerializer(PhotoAdminSerializer):
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
    class Meta(AlbumSerializer.Meta):
        depth = 2


class TagSuggestionCreateSerializer(serializers.ModelSerializer):

    photo = serializers.PrimaryKeyRelatedField(
        queryset=Photo.objects.all(), many=False)

    metadata = serializers.PrimaryKeyRelatedField(
        queryset=Metadata.objects.all(), many=False)

    class Meta:
        model = TagSuggestion
        fields = ['photo', 'metadata']

    def create(self, validated_data):
        tag_suggest, created = TagSuggestion.objects.get_or_create(
            **validated_data)

        my_user = self.context['request'].user
        
        if not created:
            if not tag_suggest in my_user.tags_suggestions.all():
                tag_suggest.user_set.add(my_user)
                tag_suggest.save()
        else:
            tag_suggest.user_set.add(my_user)
            tag_suggest.save()
        
        return tag_suggest

    def update(self, instance, validated_data):
        return instance


class TagSuggestionMetaSerializer(serializers.ModelSerializer):
    
    votes = serializers.SerializerMethodField()
    
    class Meta:
        model = TagSuggestion
        depth = 1
        fields = ['id', 'metadata', 'votes']

    def get_votes(self, obj):
        return obj.user_set.count()
        

class PhotoTagSuggestionSerializer(serializers.ModelSerializer):
    tagsuggestion_photo = TagSuggestionMetaSerializer(many=True)

    class Meta:
        model = Photo
        fields = ['id', 'thumbnail', 'tagsuggestion_photo']

class LicenseSerializer(serializers.ModelSerializer):
    # Para usuario colaborador
    class Meta:
        model = License
        fields = '__all__'
