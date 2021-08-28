from django.contrib import admin

# Register your models here.
from .models import News, LandingCaroussel, PhotoRequest, ContactRequest, Report

class PhotoRequestAdmin(admin.ModelAdmin):
    raw_id_fields = ('photos',)
    list_display = ('first_name','email','resolved','approved','created_at',)

class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ('resolved','created_at',)

admin.site.register(News)
admin.site.register(LandingCaroussel)
admin.site.register(PhotoRequest, PhotoRequestAdmin)
admin.site.register(ContactRequest, ContactRequestAdmin)
admin.site.register(Report)