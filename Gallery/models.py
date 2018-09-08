from django.db import models
from datetime import datetime
from PIL import Image
from django.utils.text import slugify
# Create your models here.

class Photo(models.Model):

    image = models.ImageField()
    uploadDate = models.DateTimeField('date published', default=datetime.now, blank=True)
    thumbnail = models.ImageField(blank=True, null=True)
    #keywords = models.ManyToManyField(MetadataKeyword)

    def __str__(self):
        try:
            t = self.metadatatitle.title
            return "Photo: "+t
        except:
            return "Photo without title (" + str(self.id) + ")"

class Album(models.Model):

    name = models.CharField(max_length=40)
    pictures = models.ManyToManyField(Photo)

    def __str__(self):
        return "Album " + self.name
