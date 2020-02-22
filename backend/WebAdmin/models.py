from __future__ import unicode_literals
from django.db import models
from datetime import datetime
from Gallery.models import Photo
from uuid import uuid4
import os

# From Gallery App
def gen_uuid(instance, filename):
  ext = filename.split('.')[-1]
  filename = '{}.{}'.format(uuid4().hex, ext)
  return os.path.join("webadmin/",filename)

class News(models.Model):
  title = models.TextField()
  subtitle = models.TextField()
  content = models.TextField()
  image = models.ImageField(upload_to=gen_uuid, blank=True)
  created_at = models.DateTimeField(default=datetime.now)
  updated_at = models.DateTimeField(default=datetime.now)

  def __str__(self):
    has_image = " sin imagen "
    if self.image != None:
      has_image = " con imagen "
    return "Noticia: "+self.title+has_image+"subida el "+str(self.created_at)

class LandingCaroussel(models.Model):
  news = models.ManyToManyField(News, blank= True)

class PhotoRequest(models.Model):
  reason = models.TextField()
  photos = models.ManyToManyField(Photo)  
  # DATOS:
  first_name = models.CharField(max_length=30)
  last_name = models.CharField(max_length=30)
  identity_document = models.CharField(max_length=30)
  profession = models.CharField(max_length=40)
  address = models.CharField(max_length=50)
  # TODO: fix Spanglish here
  comuna = models.CharField(max_length=40)
  phone_number = models.IntegerField()
  email = models.EmailField(unique=False)
  institution = models.CharField(max_length=40)

  resolved = models.BooleanField(default=False)
  email_sent = models.BooleanField(default=False)
  created_at = models.DateTimeField(default=datetime.now)
  updated_at = models.DateTimeField(default=datetime.now)

  def __str__(self):
    return "Peticion por "+self.first_name+"por"+str(self.photos.all().count())

class ContactRequest(models.Model):
  first_name = models.CharField(max_length=30)
  last_name = models.CharField(max_length=30)
  phone_number = models.IntegerField()
  email = models.EmailField(unique=False)
  message = models.TextField();

  resolved = models.BooleanField(default=False)
  email_sent = models.BooleanField(default=False)
  created_at = models.DateTimeField(default=datetime.now)
  
  def __str__(self):
    return "Mensaje de "+self.first_name+" sobre: "+self.message[:10]+"..."