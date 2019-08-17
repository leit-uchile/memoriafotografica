from django.db import models
from datetime import datetime
from django.utils.text import slugify
from django.utils.translation import ugettext_lazy as _
from multiselectfield import MultiSelectField
from MemoriaFotografica.settings import BASE_DIR
from MetaData.models import Metadata
import os
from uuid import uuid4
from sorl.thumbnail import get_thumbnail
from django.core.files.base import ContentFile
# Create your models here.
PERMISSION_CHOICES = (
    ('CC BY', 'Atribución'),
    ('CC BY-SA', 'Atribución-CompartirIgual'),
    ('CC BY-ND', 'Atribución sin Derivadas'),
    ('CC BY-NC', 'Atribución No Comercial'),
    ('CC BY-NC-SA', 'Atribución NoComercial-CompartirIgual'),
    ('CC BY-NC-ND', 'Atribución NoComercial-SinDerivadas'),
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
    thumbnail = models.ImageField(blank=True)
    title = models.CharField(_('Título'), max_length = 30)
    uploadDate = models.DateTimeField('date published', default=datetime.now, blank=True)
    description = models.CharField(max_length=255, blank=True)
    approved = models.BooleanField(default=True)
    censure = models.BooleanField(default = False)
    permission = MultiSelectField(choices=PERMISSION_CHOICES, max_choices=3)
    category = models.ManyToManyField(Category, blank = True)
    comments = models.ManyToManyField(Comment, blank = True)
    metadata = models.ManyToManyField(Metadata, blank = True)
    report = models.ManyToManyField(Reporte, blank = True)
    def save(self, *args, **kwargs):
        if not self.id:
            #Have to save the image (and imagefield) first
            super(Photo, self).save(*args, **kwargs)
            #obj is being created for the first time - resize
            resized = get_thumbnail(self.image, "640x480", crop='center', quality=99)
            #Manually reassign the resized image to the image field
            archivo=self.image.url.split('/')[-1]
            nombre = archivo.split('.')
            nuevoNombre = nombre[0]+"_thumbnail."+nombre[1]
            print(self.image.url)
            self.thumbnail.save(nuevoNombre, ContentFile(resized.read()), True)
        else:
            super(Photo, self).save(*args, **kwargs)
    
    #thumbnail = get_thumbnail(image, '100x100', crop='center', quality=99)
    def __str__(self):
        try:
            t = self.title
            return "Photo: "+t
        except:
            return "Photo without title (" + str(self.id) + ")"

class Album(models.Model):

    name = models.CharField(max_length=40)
    pictures = models.ManyToManyField(Photo, blank = True)
    description = models.CharField(max_length=255, blank=True)
    def __str__(self):
        return "Album " + self.name
