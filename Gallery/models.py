from django.db import models
from datetime import datetime
from django.utils.text import slugify
# Create your models here.




class Photo(models.Model):
    PERMISSION_CHOICES = (
        ('a', 'Hola'),
        ('b', 'Hello'),
        ('c', 'Bonjour'),
        ('d', 'Boas'),
    )
)
    image = models.ImageField()
    uploadDate = models.DateTimeField('date published', default=datetime.now, blank=True)
    title = models.CharField(_('Título'), max_length = 30)
    thumbnail = models.ImageField(blank=True, null=True)
    approved = models.BooleanField(default=False)
    #keywords = models.ManyToManyField(MetadataKeyword)
    censure = models.BooleanField(default = False)
    permission = models.CharField(max_length=6, choices=PERMISSION_CHOICES)  #¿Elige varios?


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

class Comment(models.Model):
    contenido = models.ManyToManyField(Photo)
    censure = models.BooleanField()
    def __str__(self):
        return "Comentario"