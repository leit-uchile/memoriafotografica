# Import models here
from .models import *

from rest_framework import serializers

# Create serializers here :)
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user = models.OneToOneField(django_md.User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='user/avatar', blank=True)
    albums = models.ManyToManyField(Album, blank=True)
    photos = models.ManyToManyField(Photo, blank=True)

    def create(self, validated_data):
        """
        Create and return a new `Metadata` instance, given the validated data.
        """
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Metadata` instance, given the validated data.
        """
        instance.user = validated_data.get('user', instance.user)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.albums = validated_data.get('albums', instance.albums)
        instance.photos = validated_data.get('photos', instance.photos)


        instance.save()
        return instance