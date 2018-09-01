# Import models here
from .models import *
from datetime import datetime
#from MetaData.models import Metadata
#from MetaData.serializers import MetadataSerializer
from rest_framework import serializers

from rest_framework import serializers
# Create serializers here :)
class PhotoSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    #name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    #description = serializers.CharField()
    image = serializers.ImageField()
    uploadDate =serializers.DateTimeField('date published', default=datetime.now)
    #tags = serializers.SlugRelatedField(slug_field='name', many=True, read_only=True)


    def create(self, validated_data):

        return Photo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.uploadDate = validated_data.get('date', instance.uploadDate)
        instance.tags = validated_data.get('tags', instance.tags)
        instance.save()
        return instance

class AlbumSerializer (serializers.Serializer):
    name = serializers.CharField(max_length=40)
    pictures = PhotoSerializer(many=True)



    def create(self, validated_data):

        return Album.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.name = validated_data.get('name', instance.name)
        instance.pictures = validated_data.get('pictures', instance.pictures)

        instance.save()
        return instance
