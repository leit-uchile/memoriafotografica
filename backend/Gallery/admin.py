from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Album)
admin.site.register(Photo)
admin.site.register(Comment)
admin.site.register(Category)
admin.site.register(Reporte)
