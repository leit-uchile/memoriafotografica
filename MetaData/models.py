from django.db import models
#from Gallery.models import Photo
# Create your models here.
"""
class MetadataTitle(models.Model):
    title = models.CharField(max_length=40)
    description = models.TextField()
    photo = models.OneToOneField(Photo, on_delete=models.CASCADE)

class MetadataDescription(models.Model):
    description = models.TextField()
    photo = models.OneToOneField(Photo, on_delete=models.CASCADE)
"""

class IPTCKeyword(models.Model):
    name = models.TextField()
    definition = models.TextField()
    help_text = models.TextField()
  

class Metadata(models.Model):
    value = models.TextField()
    metadata = models.ManyToManyField(IPTCKeyword)
    approved = models.BooleanField(default=False)