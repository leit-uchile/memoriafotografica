# Import models here
from .models import *
from django.contrib.auth import authenticate
# Create serializers here :)
from rest_framework import serializers
from .models import User
from django.conf import settings
from Gallery.serializers import AlbumSerializer, PhotoSerializer


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'birth_date', 'rol_type','avatar')
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        print("validated data")
        extra_data = validated_data.copy()
        extra_data.pop("email")
        extra_data.pop("password")
        user = User.objects.create_user(validated_data['email'],
                                        validated_data['password'], **extra_data)
        return user

class UserSerializer(serializers.ModelSerializer):
    #id = serializers.IntegerField(read_only=True)
    # avatar = serializers.ImageField(max_length=None, allow_empty_file=True)
    # albums = AlbumSerializer(many = True)
    # photos = PhotoSerializer(many = True)
    # user_type = serializers.IntegerField()

    class Meta:
        model = User
        exclude=('password',)



class LoginUserSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user

        raise serializers.ValidationError("Unable to log in with provided credentials.")
