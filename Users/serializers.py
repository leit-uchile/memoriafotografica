# Import models here
from .models import *
from django.contrib.auth import authenticate
# Create serializers here :)
from rest_framework import serializers
from .models import User
from django.contrib.auth.models import User as django_user
from Gallery.serializers import AlbumSerializer, PhotoSerializer

class DjangoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = django_user
        fields = ('id', 'username')

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user = DjangoUserSerializer()
    avatar = serializers.ImageField(max_length=None, allow_empty_file=True)
    albums = AlbumSerializer(many = True)
    photos = PhotoSerializer(many = True)
    user_type = serializers.IntegerField()

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
