# Import models here
from datetime import datetime
from uuid import uuid4

from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
# Create serializers here :)
from rest_framework import serializers
from rest_framework_recaptcha.fields import ReCaptchaField

from Gallery.serializers import (AlbumSerializer, CommentSerializer,
                                 PhotoSerializer)

from .models import *
from .models import Notification, User


def gen_uuid(filename):
    ext = filename.split('.')[-1]
    filename = '{}.{}'.format(uuid4().hex, ext)
    return filename

class ReCaptchaSerializer(serializers.Serializer):
    recaptcha = ReCaptchaField()

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id', 'type', 'content', 'message', 'created_at', 'read')
    
    def create(self, validated_data):
        notification = Notification.objects.create(**validated_data)
        return notification
        
    def update(self, instance, validated_data):
        instance.read = validated_data.get('read', instance.read)
        instance.updated_at = datetime.now()
        instance.save()
        return instance

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
            if attr == 'avatar':
                validated_data.get('avatar').name = gen_uuid(validated_data.get('avatar').name )
                setattr(instance,attr,value)
            elif attr == 'report':
                continue
            else:
                setattr(instance, attr, value)
        instance.updated_at = datetime.now()
        instance.save()
        return instance


class UserPhotoSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many = True)
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

class UserNotificationSerializer(serializers.ModelSerializer):
    notifications = NotificationSerializer(many=True)

    class Meta:
        model = User
        fields = ('notifications', )


class LoginUserSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user

        raise serializers.ValidationError(
            "Unable to log in with provided credentials.")
