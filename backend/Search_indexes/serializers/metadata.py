import json

from rest_framework import serializers
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from Search_indexes.documents.metadata import MetadataDocument

class MetadataDocumentSerializer(DocumentSerializer):
    """Serializer for the Metadata document."""

    class Meta:
        """Meta options."""

        # Specify the correspondent document class
        document = MetadataDocument

        # List the serializer fields. Note, that the order of the fields
        # is preserved in the ViewSet.
        fields = (
            'value',
            'metadata',
            'created_at',
            'updated_at',
        )