# Import models here
from datetime import datetime

from django.conf import settings
from rest_framework import serializers

from Gallery.serializers import PhotoSerializer

from .models import ContactRequest, LandingCaroussel, News, PhotoRequest

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