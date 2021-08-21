from django.contrib import admin

# Register your models here.
from .models import IPTCKeyword, Metadata, TagSuggestion

class IPTCKeywordAdmin(admin.ModelAdmin):
    search_fields = ('name')
    ordering = ['-updated_at']

class MetadataAdmin(admin.ModelAdmin):
    search_fields = ('value')
    ordering = ['-updated_at']

class TagSuggestionAdmin(admin.ModelAdmin):
    raw_id_fields = ('photos',)
    ordering = ['-updated_at']

admin.site.register(IPTCKeyword, IPTCKeywordAdmin)
admin.site.register(Metadata, MetadataAdmin)
admin.site.register(TagSuggestion, TagSuggestionAdmin)
