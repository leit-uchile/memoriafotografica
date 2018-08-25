from django.contrib import admin

# Register your models here.
from .models import MetadataTitle, MetadataKeyword, MetadataDescription

admin.site.register(MetadataTitle)
admin.site.register(MetadataKeyword)
admin.site.register(MetadataDescription)
