from django.db import models
from datetime import datetime
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
    created_at = models.DateTimeField(default=datetime.now)
    updated_at = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return "IPTC Metadata Keyword: "+self.name

DEFAULT_IPTC_ID = 1
class Metadata(models.Model):
    value = models.TextField()
    metadata = models.ForeignKey(IPTCKeyword, on_delete=models.CASCADE, default = DEFAULT_IPTC_ID)
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=datetime.now)
    updated_at = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return "Metadata ["+self.metadata.name+":"+self.value+"]"
