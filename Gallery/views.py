from django.shortcuts import render
from django.http import HttpResponse
from .models import Photo,Album
from django.core import serializers
# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the gallery index.")
def pics(request):
    lista = serializers.serialize('json',Photo.objects.all)
    return HttpResponse(lista, content_type= 'aplication/json')
def album(request):
    fotos = serializers.serialize('json', Album.objects.all())
    return HttpResponse(fotos,'application/json')
