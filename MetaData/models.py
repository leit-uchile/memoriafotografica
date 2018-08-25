from django.db import models
from Gallery.models import Photo
# Create your models here.
class MetadataTitle(models.Model):
    name = models.CharField(max_length=40)
    description = models.TextField()
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE)

class MetadataDescription(models.Model):
    description = models.TextField()
class MetadataKeyword(models.Model):
    keywords = models.TextField()