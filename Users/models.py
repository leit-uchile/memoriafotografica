from django.db import models

# Create your models here.
import django.contrib.auth.models as django_md
from Gallery.models import Album

class User(models.Model):
    user = models.OneToOneField(django_md.User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='user/avatar')
    albums = models.ManyToManyField(Album, on_delete=models.CASCADE)
