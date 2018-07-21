# Import models here
from .models import *
from django.contrib.auth import authenticate
# Create serializers here :)
from rest_framework import serializers
from .models import User
from django.contrib.auth.models import User as django_user

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user = models.OneToOneField(django_md.User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='user/avatar', blank=True)
    albums = models.ManyToManyField(Album, blank=True)
    photos = models.ManyToManyField(Photo, blank=True)

    def create(self, validated_data):

        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.user = validated_data.get('user', instance.user)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.albums = validated_data.get('albums', instance.albums)
        instance.photos = validated_data.get('photos', instance.photos)
        instance.save()
        return instance


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = django_user
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password':{'write_only': True}}

    def create(self, validated_data):
        d_user = django_user.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        user = User.objects.create(user = d_user)
        return d_user




class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")