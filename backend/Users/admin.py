from django.contrib import admin

# Register your models here.
from .models import *

class UserAdmin(admin.ModelAdmin):
    raw_id_fields = ('report','tag_suggestions')
    search_fields = ('email','first_name','last_name')
    list_display = ('email','first_name','last_name','is_staff','rol_type')
    ordering = ['-updated_at']

admin.site.register(User, UserAdmin)
admin.site.register(RegisterLink)
admin.site.register(Notification)