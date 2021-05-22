import json

from rest_framework import serializers
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from Search_indexes.documents.photos import PhotoDocument

class PhotoDocumentSerializer(DocumentSerializer):
    """Serializer for the Photo document."""

    class Meta:
        """Meta options."""

        # Specify the correspondent document class
        document = PhotoDocument

        # List the serializer fields. Note, that the order of the fields
        # is preserved in the ViewSet.
        fields = (
            'id',
            'title',
            'description',
            'permission',
            'thumbnail',
            'upload_date',
            'created_at',
            'metadata',
            'category',
        )