# Import models here
from django.utils import timezone

from django.conf import settings
from rest_framework import serializers

from Gallery.serializers import PhotoSerializer

from .models import *

# Create serializers here :)


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields='__all__'

class LandingCarousselSerializer(serializers.ModelSerializer):
    news = NewsSerializer(many = True)

    class Meta:
        model = LandingCaroussel
        fields=('news',)

class PhotoRequestSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many = True)

    class Meta:
        model = PhotoRequest
        fields ='__all__'

class PhotoRequestNewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PhotoRequest
        fields = ('reason','photos','first_name','last_name',
            'identity_document','profession','address','district',
            'phone_number','email','institution','resolved','approved','created_at','updated_at')


class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.resolved = validated_data.get('resolved', instance.resolved)
        instance.email_sent = validated_data.get('email_sent', instance.email_sent)
        instance.reply = validated_data.get('reply', instance.reply)
        instance.save()
        return instance

class ReportSerializer(serializers.ModelSerializer):

    content_id = serializers.SerializerMethodField()

    def get_content_id(self, obj):
        """
        Recover the id of it's reported element
        """
        if len(obj.photo_set.all()) != 0:
            photo = obj.photo_set.all()[0]
            return {"id": photo.id, "thumbnail": photo.thumbnail.url}
        elif len(obj.comment_set.all()) != 0:
            comment = obj.comment_set.all()[0]
            return {"id": comment.id, "content": comment.content}
        elif len(obj.user_set.all()) != 0:
            user = obj.user_set.all()[0]
            return {"id": user.id, "first_name": user.first_name, "last_name": user.last_name}
        else:
            return -1

    class Meta:
        model = Report
        fields = '__all__'

    def create(self, validated_data):
        report = Report.objects.create(**validated_data)
        return report

    def update(self, instance, validated_data):
        instance.resolved = validated_data.get('resolved', instance.resolved)
        instance.resolution_details = validated_data.get(
            'resolution_details', instance.resolution_details)
        instance.updated_at = timezone.now()
        instance.save()
        return instance