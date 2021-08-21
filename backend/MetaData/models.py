from django.db import models
from django.utils import timezone


class IPTCKeyword(models.Model):
    name = models.TextField()
    definition = models.TextField()
    help_text = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "IPTC Metadata Keyword: "+self.name


DEFAULT_IPTC_ID = 1


class Metadata(models.Model):
    value = models.TextField(unique=True)
    iptc = models.ForeignKey(
        IPTCKeyword, on_delete=models.CASCADE, default=DEFAULT_IPTC_ID)
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)


    def __str__(self):
        return "Metadata ["+self.iptc.name+":"+self.value+"]"

    def as_dict(self):
        return {"id": self.id, "value": self.value, "approved": self.approved}


class TagSuggestion(models.Model):
    photo = models.ForeignKey(to='Gallery.Photo',
        blank=False, null=False, on_delete=models.CASCADE, related_name='tagsuggestion_photo')

    metadata = models.ForeignKey(
        Metadata, blank=False, null=False, on_delete=models.CASCADE, related_name='tagsuggestion_metadata')

    resolved = models.BooleanField(default=False)
    resolution = models.BooleanField(default=False)

    def __str__(self):
        return "TagSuggestion [Photo id: " + str(self.photo.id) + " - Value: " + self.metadata.value + "]"
