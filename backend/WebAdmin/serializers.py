# Import models here
from .models import News, LandingCaroussel, PhotoRequest, ContactRequest

from rest_framework import serializers
from Gallery.serializers import PhotoSerializer
from django.conf import settings
from datetime import datetime
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
        fields = ('reason','photos','first_name','last_name',
            'identity_document','profession','address','comuna',
            'phone_number','email','institution','resolved','email_sent','created_at','updated_at')

class PhotoRequestNewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PhotoRequest
        fields = ('reason','photos','first_name','last_name',
            'identity_document','profession','address','comuna',
            'phone_number','email','institution','resolved','email_sent','created_at','updated_at')


class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = '__all__'