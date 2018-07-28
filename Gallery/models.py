from django.db import models
from datetime import datetime
from MetaData.models import Metadata
# Create your models here.

class Photo(models.Model):

    name = models.CharField(max_length=40)  # type: str
    description = models.TextField()
    image = models.ImageField()
    uploadDate = models.DateTimeField('date published', default=datetime.now, blank=True)
    tags = models.ManyToManyField(Metadata)

    def __str__(self):
        return "Photo " + self.name

class Album(models.Model):

    name = models.CharField(max_length=40)
    pictures = models.ManyToManyField(Photo)

    def __str__(self):
        return "Album " + self.name