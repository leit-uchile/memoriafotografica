# Import models here
from .models import *
from datetime import datetime
#from MetaData.models import Metadata
#from MetaData.serializers import MetadataSerializer
from rest_framework import fields, serializers
# Create serializers here

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte
        fields = ('title',)
    def create(self, validated_data):
        title = Reporte.objects.create(validated_data['title'])
        return title


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


class CategorySerializer(serializers.Serializer):
    class Meta:
        model = Category
        fields = ('title', )

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data('title', instance.title)
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

class PhotoSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.ImageField()
    title = serializers.CharField(max_length = 30)
    uploadDate =serializers.DateTimeField('date published', default=datetime.now)
    approved = serializers.BooleanField(default=False)
    censure = serializers.BooleanField(default=False)
    permission = fields.MultipleChoiceField(choices=PERMISSION_CHOICES)
    comments = CommentSerializer(many = True)

    class Meta:
        fields = ['id', 'image', 'title',
                    'uploadDate',
                    'approved',
                    'censure',
                    'permission','comments']
        model = Photo

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.uploadDate = validated_data.get('date', instance.uploadDate)
        #instance.tags = validated_data.get('tags', instance.tags)
        instance.approved = validated_data.get('approved', instance.approved)
        instance.censure = validated_data.get('censure', instance.censure)
        instance.permission = validated_data.get('permission', instance.permission)

        instance.save()
        return instance

class AlbumSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=40)
    pictures = PhotoSerializer(many=True)

    def create(self, validated_data):
        return Album.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.pictures = validated_data.get('pictures', instance.pictures)
        instance.save()
        return instance
