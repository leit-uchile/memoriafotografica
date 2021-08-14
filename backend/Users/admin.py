from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(User)
admin.site.register(RegisterLink)
admin.site.register(Notification)