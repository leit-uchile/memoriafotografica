# Import models here
from .models import *
from datetime import datetime
#from MetaData.models import Metadata
#from MetaData.serializers import MetadataSerializer
from rest_framework import fields, serializers
from rest_framework.exceptions import NotFound
# Create serializers here

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte
        fields = '__all__'

    def create(self, validated_data):
        reporte = Reporte.objects.create(**validated_data)
        return reporte


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

    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.censure = validated_data.get('censure', instance.censure)
        instance.save()
        return instance

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('title', )

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance

class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('content',)

        def create(self, validated_data):
            comment = Comment.objects.create(**validated_data)
            return comment

class CreatePhotoSerializer(serializers.ModelSerializer):
        class Meta:
            model = Photo
            fields = ('id', 'image', 'uploadDate', 'title', 'permission')

        def create(self, validated_data):
            photo = Photo.objects.create(**validated_data)
            return photo

class PhotoSerializer(serializers.ModelSerializer):
    #Para usuario colaborador
    class Meta:
        fields = ('image', 'title', 'uploadDate', 'category', 'permission', 'comments')
        model = Photo

    def update(self, instance, validated_data):
        #instance.tags = validated_data.get('tags', instance.tags)
        instance.permission = validated_data.get('permission', instance.permission)
        if validated_data.get('category'):
            instance.category.add(*validated_data.get('category'))
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance

class PhotoAdminSerializer(serializers.ModelSerializer):

    class Meta:
        fields = "__all__"
        model = Photo
    def update(self, instance, validated_data):
        #instance.tags = validated_data.get('tags', instance.tags)
        instance.approved = validated_data.get('approved', instance.approved)
        instance.censure = validated_data.get('censure', instance.censure)
        instance.permission = validated_data.get('permission', instance.permission)
        if validated_data.get('category'):
            instance.category.add(*validated_data.get('category'))
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Album

    def create(self, validated_data):
        a = Album(name=validated_data['name'])
        a.save()
        a.pictures.add(*validated_data['pictures'])
        a.save()
        return a

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.pictures.add(*validated_data.get('pictures'))
        instance.save()
        return instance
