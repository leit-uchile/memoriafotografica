from django.db import models
from datetime import datetime
# Create your models here.


class IPTCKeyword(models.Model):
    name = models.TextField()
    definition = models.TextField()
    help_text = models.TextField()
    created_at = models.DateTimeField(default=datetime.now)
    updated_at = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return "IPTC Metadata Keyword: "+self.name


DEFAULT_IPTC_ID = 1


class Metadata(models.Model):
    value = models.TextField(unique=True)
    metadata = models.ForeignKey(
        IPTCKeyword, on_delete=models.CASCADE, default=DEFAULT_IPTC_ID)
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=datetime.now)
    updated_at = models.DateTimeField(default=datetime.now)


    def __str__(self):
        return "Metadata ["+self.metadata.name+":"+self.value+"]"

    def as_dict(self):
        return {"id": self.id, "value": self.value, "approved": self.approved}
