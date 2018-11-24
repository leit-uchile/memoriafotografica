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


class CommentSerializer(serializers.ModelSerializer):
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
            fields = ('id', 'image', 'uploadDate', 'title', 'approved', 'censure', 'permission')

        def create(self, validated_data):
            photo = Photo.objects.create(**validated_data)
            return photo

class PhotoSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(read_only=True)
    # image = serializers.ImageField()
    # title = serializers.CharField(max_length = 30)
    # uploadDate =serializers.DateTimeField('date published', default=datetime.now)
    # approved = serializers.BooleanField(default=False)
    # censure = serializers.BooleanField(default=False)
    # permission = fields.MultipleChoiceField(choices=PERMISSION_CHOICES)
    # comments = CommentSerializer(many = True)

    class Meta:
        fields = '__all__'
        model = Photo

    def update(self, instance, validated_data):

        #instance.tags = validated_data.get('tags', instance.tags)
        instance.approved = validated_data.get('approved', instance.approved)
        instance.censure = validated_data.get('censure', instance.censure)
        instance.permission = validated_data.get('permission', instance.permission)
        instance.category.add(*validated_data.get('category'))
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
