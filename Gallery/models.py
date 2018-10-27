from django.db import models
from datetime import datetime
from django.utils.text import slugify
from django.utils.translation import ugettext_lazy as _
from multiselectfield import MultiSelectField
# Create your models here.
PERMISSION_CHOICES = (
    ('a', 'Hola'),
    ('b', 'Hello'),
    ('c', 'Bonjour'),
    ('d', 'Boas'),
)

class Comment(models.Model):
    content = models.TextField()
    censure = models.BooleanField(default = False)
    def __str__(self):
        return "Comentario"

class Photo(models.Model):
    image = models.ImageField()
    uploadDate = models.DateTimeField('date published', default=datetime.now, blank=True)
    title = models.CharField(_('Título'), max_length = 30)
    thumbnail = models.ImageField(blank=True, null=True)
    approved = models.BooleanField(default=False)
    #keywords = models.ManyToManyField(MetadataKeyword)
    censure = models.BooleanField(default = False)
    permission = MultiSelectField(choices=PERMISSION_CHOICES, max_choices=3,
                                            max_length=3)
    comments = models.ManyToManyField(Comment)


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
