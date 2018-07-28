from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from .models import Metadata
from .serializers import MetadataSerializer

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the meta data index.")
def metadata_list(request):
    """
    List all code metadata, or create a new metadata.
    """
    if request.method == 'GET':
        metadata = Metadata.objects.all()
        serializer = MetadataSerializer(metadata, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MetadataSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def metadata_detail(request, pk):
    """
    Retrieve, update or delete a code metadata.
    """
    try:
        metadata = Metadata.objects.get(pk=pk)
    except Metadata.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = MetadataSerializer(metadata)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = MetadataSerializer(metadata, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        metadata.delete()
        return HttpResponse(status=204)