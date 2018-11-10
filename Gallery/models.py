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

class Reporte(models.Model):
    contenido = models.TextField()
    REPORT_TYPE_CHOICES = (
        (1, 'usuario'),
        (2, 'foto'),
        (3, 'comentario')
    )
    type = models.PositiveSmallIntegerField(choices=REPORT_TYPE_CHOICES)



class Comment(models.Model):
    content = models.TextField()
    censure = models.BooleanField(default = False)
    report = models.ManyToManyField(Reporte, blank= True)
    def __str__(self):
        return "Comentario"

class Category(models.Model):
    title = models.CharField(max_length= 30)
    def __str__(self):
        return "categoria"

class Photo(models.Model):
    image = models.ImageField()
    title = models.CharField(_('Título'), max_length = 30)
    uploadDate = models.DateTimeField('date published', default=datetime.now, blank=True)
    approved = models.BooleanField(default=False)
    censure = models.BooleanField(default = False)
    permission = MultiSelectField(choices=PERMISSION_CHOICES, max_choices=3, max_length=3)
    category = models.ManyToManyField(Category)
    comments = models.ManyToManyField(Comment)
    #thumbnail = models.ImageField(blank=True, null=True)
    report = models.ManyToManyField(Reporte, blank = True)

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
