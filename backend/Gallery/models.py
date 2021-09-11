import os
from django.utils import timezone
from math import floor
from uuid import uuid4

from django.core.files.base import ContentFile
from django.db import models
from django.utils.translation import ugettext_lazy as _
from multiselectfield import MultiSelectField
from sorl.thumbnail import get_thumbnail

from MemoriaFotografica.settings import BASE_DIR
from MetaData.models import Metadata, License

"""
Follow issue on
https://github.com/goinnn/django-multiselectfield/issues/74#issuecomment-423914610
"""


class PatchedMultiSelectField(MultiSelectField):
    def value_to_string(self, obj):
        value = self.value_from_object(obj)
        return self.get_prep_value(value)


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
    resolved = models.BooleanField(default=False)
    resolution_details = models.TextField(default="")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
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
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return 'Comentario: "'+self.content[:50]+'..."'


class Category(models.Model):
    title = models.CharField(max_length= 30)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.title

    def as_dict(self):
        return {"id": self.id, "title": self.title}


def gen_uuid(instance, filename):
    ext = filename.split('.')[-1]
    filename = '{}.{}'.format(uuid4().hex, ext)
    return os.path.join(filename)


class Photo(models.Model):
    image = models.ImageField(upload_to=gen_uuid)
    thumbnail = models.ImageField(blank=True)
    title = models.CharField(max_length = 30, blank=True)
    upload_date = models.DateTimeField(
        'date published', default=timezone.now, blank=True)
    description = models.CharField(max_length=255, blank=True)
    approved = models.BooleanField(default=False)
    censure = models.BooleanField(default=False)
    permission = models.ForeignKey(
        License,null= True, blank=True, related_name='photo', on_delete=models.SET_NULL
    )
    category = models.ManyToManyField(Category, blank=True)
    comments = models.ManyToManyField(Comment, blank=True)
    metadata = models.ManyToManyField(Metadata, blank=True)
    report = models.ManyToManyField(Reporte, blank=True)
    aspect_h = models.IntegerField(blank=True, default=1)
    aspect_w = models.IntegerField(blank=True, default=1)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    def save(self, *args, **kwargs):
        if not self.id:
            # Have to save the image (and imagefield) first
            super(Photo, self).save(*args, **kwargs)
            # obj is being created for the first time - resize

            # Compute the new pixels acording to the aspect ratio
            tmp_h = self.aspect_h
            tmp_w = self.aspect_w
            if self.aspect_h == None:
                tmp_h = 1
            if self.aspect_w == None:
                tmp_w = 1
            gcd = 480/tmp_h
            dimH = 480
            dimW = floor(gcd*tmp_w)

            try:
                resized = get_thumbnail(self.image, "{}x{}".format(
                    dimW, dimH), crop='center', quality=99)
                # Manually reassign the resized image to the image field
                archivo = self.image.url.split('/')[-1]
                nombre = archivo.split('.')
                nuevoNombre = nombre[0]+"_thumbnail."+nombre[1]
                self.thumbnail.save(
                    nuevoNombre, ContentFile(resized.read()), True)
            except Exception as e:
                # TODO: verify this border case
                print(e)
                print("Using full file instead")
                self.thumbnail = self.image
        else:
            super(Photo, self).save(*args, **kwargs)

    #thumbnail = get_thumbnail(image, '100x100', crop='center', quality=99)
    def __str__(self):
        try:
            if self.title == "":
                return "Photo id: " + str(self.id) + " uploaded at " + str(self.created_at)
            return "Photo: "+self.title
        except:
            return "Photo id: " + str(self.id) + " uploaded at " + str(self.created_at)


class Album(models.Model):

    name = models.CharField(max_length=40)
    pictures = models.ManyToManyField(Photo, blank=True)
    description = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    collection = models.BooleanField(default=False)

    thumbnail = models.CharField(max_length=60, blank=True)
    aspect_h = models.IntegerField(blank=True, default=1)
    aspect_w = models.IntegerField(blank=True, default=1)

    def __str__(self):
        return "Album " + self.name


class TagSuggestion(models.Model):
    photo = models.ForeignKey(
        Photo, blank=False, null=False, on_delete=models.CASCADE, related_name='tagsuggestion_photo')

    metadata = models.ForeignKey(
        Metadata, blank=False, null=False, on_delete=models.CASCADE, related_name='tagsuggestion_metadata')

    resolved = models.BooleanField(default=False)
    resolution = models.BooleanField(default=False)

    def __str__(self):
        return "TagSuggestion [Photo id: " + str(self.photo.id) + " - Value: " + self.metadata.value + "]"
