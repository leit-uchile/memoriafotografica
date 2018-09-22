from django.db import models

# Create your models here.
import django.contrib.auth.models as django_md
from Gallery.models import Album, Photo

class User(models.Model):

    USER_TYPE_CHOICES = (
      (1, 'normal'),
      (2, 'curator')
    )

    user = models.OneToOneField(django_md.User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='user/avatar', blank=True)
    albums = models.ManyToManyField(Album, blank =True)
    photos = models.ManyToManyField(Photo, blank = True)
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)
    
