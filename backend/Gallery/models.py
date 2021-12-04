import os
from django.utils import timezone
from math import floor
from uuid import uuid4

from django.core.files.base import ContentFile
from django.db import models
from django.utils.translation import ugettext_lazy as _
from sorl.thumbnail import get_thumbnail

from MemoriaFotografica.settings import BASE_DIR


def gen_uuid(instance, filename):
    ext = filename.split('.')[-1]
    filename = '{}.{}'.format(uuid4().hex, ext)
    return os.path.join(filename)


class Photo(models.Model):
    image = models.ImageField(upload_to=gen_uuid)
    thumbnail = models.ImageField(blank=True)
    title = models.CharField(max_length=30, blank=True)
    upload_date = models.DateTimeField(
        'date published', default=timezone.now, blank=True)
    description = models.CharField(max_length=255, blank=True)
    author = models.ForeignKey(to='Users.User', on_delete=models.CASCADE)
    approved = models.BooleanField(default=False)
    censure = models.BooleanField(default=False)
    metadata = models.ManyToManyField(to='MetaData.Metadata', blank=True)
    report = models.ManyToManyField(to='WebAdmin.Report', blank=True)
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
    author = models.ForeignKey(to='Users.User', on_delete=models.CASCADE)

    thumbnail = models.CharField(max_length=60, blank=True)
    aspect_h = models.IntegerField(blank=True, default=1)
    aspect_w = models.IntegerField(blank=True, default=1)

    def __str__(self):
        return "Album " + self.name


class Comment(models.Model):
    author = models.ForeignKey(to='Users.User', on_delete=models.CASCADE)
    picture = models.ForeignKey(Photo, on_delete=models.CASCADE)
    content = models.TextField()
    censure = models.BooleanField(default=False)
    report = models.ManyToManyField(to="WebAdmin.Report", blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return 'Comentario: "'+self.content[:50]+'..."'


class Category(models.Model):
    title = models.CharField(max_length=30)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    pictures = models.ManyToManyField(Photo, blank=True)

    def __str__(self):
        return self.title

    def as_dict(self):
        return {"id": self.id, "title": self.title}


class PhotoRequest(models.Model):
    reason = models.TextField()
    photos = models.ManyToManyField(Photo, blank=False)
    # DATOS:
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    identity_document = models.CharField(max_length=30)
    profession = models.CharField(max_length=40)
    address = models.CharField(max_length=50)
    district = models.CharField(max_length=40)
    phone_number = models.CharField(max_length=12)
    email = models.EmailField(unique=False)
    institution = models.CharField(max_length=40)

    resolved = models.BooleanField(default=False)
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "Peticion por "+self.first_name+" " + self.last_name
