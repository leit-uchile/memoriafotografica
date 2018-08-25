from django.db import models
from datetime import datetime
from PIL import Image
#from imagekit.models import ImageSpecField
#from imagekit.processors import ResizeToFill
from django.utils.text import slugify
# Create your models here.
from PIL import Image
from io import StringIO
from django.core.files.uploadedfile import SimpleUploadedFile
import os

class Photo(models.Model):

    image = models.ImageField()
    uploadDate = models.DateTimeField('date published', default=datetime.now, blank=True)
    thumbnail = models.ImageField(max_length=500, blank=True, null=True)
    #keywords = models.ManyToManyField(MetadataKeyword)
    # def create_thumbnail(self):
    #
    #
    #
    #     if not self.image:
    #         return
    #     # Set our max thumbnail size in a tuple (max width, max height)
    #     THUMBNAIL_SIZE = (200, 200)
    #
    #     DJANGO_TYPE = self.image.file.content_type
    #
    #     if DJANGO_TYPE == 'image/jpeg':
    #         PIL_TYPE = 'jpeg'
    #         FILE_EXTENSION = 'jpg'
    #     elif DJANGO_TYPE == 'image/png':
    #         PIL_TYPE = 'png'
    #         FILE_EXTENSION = 'png'
    #
    #     # Open original photo which we want to thumbnail using PIL's Image
    #     image = Image.open(StringIO(self.image.read()))
    #     image.thumbnail(THUMBNAIL_SIZE, Image.ANTIALIAS)
    #
    #     # Save the thumbnail
    #     temp_handle = StringIO()
    #     image.save(temp_handle, PIL_TYPE)
    #     temp_handle.seek(0)
    #
    #     # Save image to a SimpleUploadedFile which can be saved into
    #     # ImageField
    #     suf = SimpleUploadedFile(os.path.split(self.image.name)[-1],
    #                              temp_handle.read(), content_type=DJANGO_TYPE)
    #     # Save SimpleUploadedFile into image field
    #     self.thumbnail.save('%s_thumbnail.%s' % (os.path.splitext(suf.name)[0], FILE_EXTENSION), suf, save=False)
    #
    # def save(self):
    #     # create a thumbnail
    #     self.create_thumbnail()
    #
    #     super(ImageWithThumbnail, self).save()


    def __str__(self):
        try:
            t = self.metadatatitle.name
            return "Photo: "+t
        except:
            return "Photo without title (" + str(self.id) + ")"

class Album(models.Model):

    name = models.CharField(max_length=40)
    pictures = models.ManyToManyField(Photo)

    def __str__(self):
        return "Album " + self.name
