from __future__ import unicode_literals

import os
from uuid import uuid4

from django.utils import timezone
from django.db import models


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
  created_at = models.DateTimeField(default=timezone.now)
  updated_at = models.DateTimeField(default=timezone.now)

  def __str__(self):
    has_image = " sin imagen "
    if self.image != None:
      has_image = " con imagen "
    return "Noticia: "+self.title+has_image+"subida el "+str(self.created_at)

class LandingCaroussel(models.Model):
  news = models.ManyToManyField(News, blank= True)

class ContactRequest(models.Model):
  first_name = models.CharField(max_length=30)
  last_name = models.CharField(max_length=30)
  phone_number = models.IntegerField()
  email = models.EmailField(unique=False)
  message = models.TextField()
  reply = models.TextField(blank=True)

  resolved = models.BooleanField(default=False)
  email_sent = models.BooleanField(default=False)
  created_at = models.DateTimeField(default=timezone.now)
  updated_at = models.DateTimeField(default=timezone.now)
  def __str__(self):
    return "Mensaje de "+self.first_name+" sobre: "+self.message[:10]+"..."

class Report(models.Model):
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