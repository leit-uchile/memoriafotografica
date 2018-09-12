# Import models here
from .models import *

from rest_framework import serializers

# Create serializers here :)
from rest_framework import serializers
from .models import *
from Gallery.models import Photo

class MetadataSerializerTitle(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    description = serializers.CharField(required = False, allow_blank= True)

    def create(self, validated_data):

        return MetadataTitle.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.title)
        instance.save()
        return instance


class MetadataSerializerDescription(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    description = serializers.CharField(required = False, allow_blank= True)


    def create(self, validated_data):

        return MetadataDescription.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.description = validated_data.get('description', instance.title)
        instance.save()
        return instance

class MetadataSerializerKeyword(serializers.Serializer):
      id = serializers.IntegerField(read_only=True)
      keyword = serializers.CharField()
      def create(self, validated_data):
          return MetadataKeyword.objects.create(**validated_data)

      def update(self, instance, validated_data):
          instance.keyword = validated_data.get('keyword', instance.title)

          instance.save()
          return instance

