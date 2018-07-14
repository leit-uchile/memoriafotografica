# Import models here
from .models import *

from rest_framework import serializers

# Create serializers here :)
from rest_framework import serializers
from .models import Metadata


class MetadataSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=False, allow_blank=True, max_length=100)


    def create(self, validated_data):
        """
        Create and return a new `Metadata` instance, given the validated data.
        """
        return Metadata.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Metadata` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.title)
        instance.save()
        return instance