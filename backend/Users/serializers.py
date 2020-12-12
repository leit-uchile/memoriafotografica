# Import models here
from .models import *
from django.contrib.auth import authenticate
# Create serializers here :)
from rest_framework import serializers
from .models import User
from django.conf import settings
from datetime import datetime
from Gallery.serializers import AlbumSerializer, PhotoSerializer, CommentSerializer
from django.contrib.auth.password_validation import validate_password
from rest_framework_recaptcha.fields import ReCaptchaField


class ReCaptchaSerializer(serializers.Serializer):
    recaptcha = ReCaptchaField()


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    Reference at https://stackoverflow.com/questions/38845051/how-to-update-user-password-in-django-rest-framework
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name',
                  'birth_date', 'rol_type', 'avatar')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print("validated data")
        extra_data = validated_data.copy()
        extra_data.pop("email")
        extra_data.pop("password")
        user = User.objects.create_user(validated_data['email'],
                                        validated_data['password'],
                                        **extra_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    #id = serializers.IntegerField(read_only=True)
    # avatar = serializers.ImageField(max_length=None, allow_empty_file=True)
    # albums = AlbumSerializer(many = True)
    # photos = PhotoSerializer(many = True)
    # user_type = serializers.IntegerField()
    class Meta:
        model = User
        exclude = ('photos', 'albums', 'comments', 'groups',
                   'user_permissions')
        extra_kwargs = {
            "password": {
                "write_only": True
            },
        }

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            elif attr == 'report':
                continue
            else:
                setattr(instance, attr, value)
        instance.updated_at = datetime.now()
        instance.save()
        return instance


class UserPhotoSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True)

    class Meta:
        model = User
        fields = ('photos', )


class UserAlbumSerializer(serializers.ModelSerializer):
    albums = AlbumSerializer(many=True)

    class Meta:
        model = User
        fields = ('albums', )


class UserCommentSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)

    class Meta:
        model = User
        fields = ('comments', )


class LoginUserSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user

        raise serializers.ValidationError(
            "Unable to log in with provided credentials.")
