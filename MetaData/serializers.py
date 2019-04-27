# Import models here
from .models import *

from rest_framework import serializers

# Create serializers here :)
from rest_framework import serializers
from .models import *
from Gallery.models import Photo




class IPTCKeywordSerializer(serializers.Serializer):
    class Meta:
        model = IPTCKeyword
        fields = '__all__'
    def create(self, validated_data):

        return IPTCKeyword.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.name = validated_data.get('name', instance.name)
        instance.definition = validated_data.get('definition', instance.definition)
        instance.help_text = validated_data.get('help_text', instance.help_text)
        instance.save()
        return instance


class MetadataSerializer(serializers.Serializer):
   class Meta:
       model = Metadata
       fields = '__all__'

    def create(self, validated_data):
        return MetadataSerializer.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.value = validated_data.get('value', instance.value)
        instance.metadata = validated_data.get('metadata', instance.metadata)
        instance.save()
        return instance


