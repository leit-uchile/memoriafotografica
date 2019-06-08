from .api import *
from django.urls import re_path, include


urlpatterns = [
    re_path('^iptc-keyword/$', IPTCKeywordListAPI.as_view()),
    re_path('^iptc-keyword/(?P<pk>[0-9]+)/$', IPTCKeywordDetailAPI.as_view()),
    re_path('^iptc-keyword/(?P<pk>[0-9]+)/metadata/$', IPTCKeywordMetadataListAPI.as_view()),
    re_path('^metadata/$', MetadataListAPI.as_view()),
    re_path('^metadata/(?P<pk>[0-9]+)/$', MetadataDetailAPI.as_view()),
    re_path('^metadata/(?P<pk>[0-9]+)/photos/$', MetadataPhotoListAPI.as_view())
]
