from django.contrib import admin

# Register your models here.
from .models import Album, Photo, Comment, Category

class PhotoAdmin(admin.ModelAdmin):
    raw_id_fields = ('metadata','report')
    search_fields = ('upload_date','title','updated_at')
    list_display = ('email','first_name','last_name','approved','censure')
    ordering = ['-upload_date']

class AlbumAdmin(admin.ModelAdmin):
    raw_id_fields = ('pictures',)
    search_fields = ('name',)
    list_display = ('name','pictures','created_at','updated_at','collection')
    ordering = ['-created_at']

class CommentAdmin(admin.ModelAdmin):
    pass

class CategoryAdmin(admin.ModelAdmin):
    raw_id_fields = ('pictures')
    search_fields = ('name',)
    ordering = ['-created_at']

admin.site.register(Album, AlbumAdmin)
admin.site.register(Photo, PhotoAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Category, CategoryAdmin)
