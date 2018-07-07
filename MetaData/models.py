from django.db import models

# Create your models here.
class Metadata(models.Model):
    name = models.CharField(max_length=40)


    Agregado modelo Photo, Album
