# Import models here
from .models import *
from datetime import datetime
from rest_framework import fields, serializers
from rest_framework.exceptions import NotFound
from rest_framework.fields import CurrentUserDefault


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte
        fields = '__all__'

    def create(self, validated_data):
        reporte = Reporte.objects.create(**validated_data)
        return reporte

    def update(self, instance, validated_data):
        instance.resolved = validated_data.get('resolved', instance.resolved)
        instance.updated_at = datetime.now


class CommentAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'content', 'censure', 'report')
        read_only_fields = ('id',)

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.censure = validated_data.get('censure', instance.censure)
        instance.save()
        return instance

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'content')
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
    #Para usuario colaborador
    class Meta:
        exclude = ('censure', 'approved','report','comments')
        model = Photo
    def update(self, instance, validated_data):
        instance.permission = validated_data.get('permission', instance.permission)
        instance.title = validated_data.get('title', instance.title)
        instance.updated_at = datetime.now
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
        instance.permission = validated_data.get('permission', instance.permission)
        instance.description = validated_data.get('description', instance.description)
        try:
            instance.metadata.set(validated_data['metadata'])
        except KeyError:
            pass
        try:
            instance.category.set(validated_data['category'])
        except KeyError:
            pass
        instance.title = validated_data.get('title', instance.title)
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
        a = Album(name=validated_data['name'])
        a.save()
        my_user = self.context['request'].user
        valid_pics = list(filter(lambda x: x in my_user.photos.all() ,validated_data['pictures']))
        a.pictures.add(*valid_pics)
        a.save()
        return a

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        try:
            validated_data['pictures']
            my_user = self.context['request'].user
            valid_pics = list(filter(lambda x: x in my_user.photos.all() ,validated_data['pictures']))
            instance.pictures.set(valid_pics)
        except KeyError:
            pass
        instance.save()
        return instance
