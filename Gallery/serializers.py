# Import models here
from .models import *

from rest_framework import serializers
# Create serializers here :)
class PhotoSerializer(serializers.Serializer):
    name = serializers.CharField()
    description = serializers.TextField()
    image = serializers.ImageField()
    uploadDate =serializers.DateTimeField()
    tags =serializers.ManyRelatedField()

    def create(self, validated_data):
        return Photo (validated_data)

class AlbumSerializer (serializers.Serializer):
    name = serializers.CharField()
    pictures = serializers.ManyRelatedField()
    def create(self, validated_data):
        return Album(validated_data)


