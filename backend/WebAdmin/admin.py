from django.contrib import admin

# Register your models here.
from .models import News, LandingCaroussel, ContactRequest, Report


class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ('resolved','created_at',)

admin.site.register(News)
admin.site.register(LandingCaroussel)
admin.site.register(ContactRequest, ContactRequestAdmin)
admin.site.register(Report)