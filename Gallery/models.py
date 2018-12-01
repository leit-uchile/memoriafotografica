from django.db import models
from datetime import datetime
from django.utils.text import slugify
from django.utils.translation import ugettext_lazy as _
from multiselectfield import MultiSelectField
from MemoriaFotografica.settings import BASE_DIR

import os
from uuid import uuid4


# Create your models here.
PERMISSION_CHOICES = (
    ('CC BY', ('Atribución', 'descripción')),
    ('CC BY-SA', ('Atribución-CompartirIgual', 'd')),
    ('CC BY-ND', ('Atribución sin Derivadas', 'd')),
    ('CC BY-NC', ('Atribución No Comercial', 'd')),
    ('CC BY-NC-SA', ('Atribución NoComercial-CompartirIgual', 'd')),
    ('CC BY-NC-ND', ('Atribución NoComercial-SinDerivadas', 'd')),
)

class Reporte(models.Model):
    content = models.TextField()
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

def gen_uuid(instance, filename):
    ext = filename.split('.')[-1]
    filename = '{}.{}'.format(uuid4().hex, ext)
    return os.path.join(filename)

class Photo(models.Model):
    image = models.ImageField(upload_to=gen_uuid)
    title = models.CharField(_('Título'), max_length = 30)
    uploadDate = models.DateTimeField('date published', default=datetime.now, blank=True)
    approved = models.BooleanField(default=False)
    censure = models.BooleanField(default = False)
    permission = MultiSelectField(choices=PERMISSION_CHOICES, max_choices=3, max_length=3)
    category = models.ManyToManyField(Category, blank = True)
    comments = models.ManyToManyField(Comment, blank = True)
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
