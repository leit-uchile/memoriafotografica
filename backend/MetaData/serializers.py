# Import models here
from .models import *
from rest_framework import serializers
from rest_framework import serializers
from .models import *
from Gallery.models import Photo
from django.db import IntegrityError

class IPTCKeywordSerializer(serializers.ModelSerializer):
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


class MetadataAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metadata
        fields = '__all__'

    def create(self, validated_data):

        try:
            # Default admin serializer to approved
            m = Metadata.objects.create(value=validated_data["value"], approved=True, metadata=validated_data["metadata"] )
            #m.metadata.set(validated_data["metadata"])
            return m
        
        except IntegrityError:
            m = Metadata.objects.get(value=validated_data["value"])
            return m

    def update(self, instance, validated_data):
        instance.value = validated_data.get('value', instance.value)
        try:
            instance.metadata = validated_data['metadata']
        except Exception as e:
            print(e)
        instance.approved = validated_data.get('approved', instance.approved)
        instance.updated_at = datetime.now()
        instance.save()
        return instance

class MetadataSerializer(serializers.ModelSerializer):
    class Meta:
        exclude = ('approved',)
        model = Metadata
    def create(self, validated_data):
        m = Metadata.objects.create(metadata=validated_data["metadata"], value=validated_data["value"])
        #m.value = validated_data["value"]
        #m.save()
        #m.metadata.set(validated_data["metadata"])
        return m

    def update(self, instance, validated_data):
        instance.value = validated_data.get('value', instance.value)
        try:
           instance.metadata.set(validated_data.get('metadata', instance.metadata))
           instance.updated_at = datetime.now()
        except KeyError:
            pass
        #instance.approved = validated_data.get('approved', instance.approved)
        instance.save()
        return instance
