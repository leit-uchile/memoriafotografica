from django_elasticsearch_dsl_drf.constants import (
    LOOKUP_FILTER_TERMS,
    LOOKUP_FILTER_RANGE,
    LOOKUP_FILTER_PREFIX,
    LOOKUP_FILTER_WILDCARD,
    LOOKUP_QUERY_IN,
    LOOKUP_QUERY_EXCLUDE,
)

from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    OrderingFilterBackend,
    SearchFilterBackend,
    DefaultOrderingFilterBackend
)

from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet

# Example app models
from Search_indexes.documents.photos import PhotoDocument
from Gallery.serializers import PhotoSerializer

class PhotoDocumentViewSet(DocumentViewSet):
    """The PhotoDocument view."""

    document = PhotoDocument
    serializer_class = PhotoSerializer
    lookup_field = 'id'
    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        SearchFilterBackend,
    ]
    # Define search fields
    search_fields = (
        'title',
        'description',
    )

    # Define filtering fields
    filter_fields = {
        'id': {
            'field': '_id',
            'lookups': [
                LOOKUP_FILTER_RANGE,
                LOOKUP_QUERY_IN,
            ],
        },
        'approved': 'approved.raw',
        'censure': 'censure.raw',
        'permission': 'permission.raw',
        'metadata': {
            'field': 'metadata',
            'lookups': [
                LOOKUP_FILTER_TERMS,
                LOOKUP_FILTER_PREFIX,
                LOOKUP_FILTER_WILDCARD,
                LOOKUP_QUERY_IN,
                LOOKUP_QUERY_EXCLUDE,
            ],
        },
        'metadata.raw': {
            'field': 'metadata.raw',
            'lookups': [
                LOOKUP_FILTER_TERMS,
                LOOKUP_FILTER_PREFIX,
                LOOKUP_FILTER_WILDCARD,
                LOOKUP_QUERY_IN,
                LOOKUP_QUERY_EXCLUDE,
            ],
        },
    }

    # Define ordering fields
    ordering_fields = {
        'id': None,
        'upload_date': 'upload_date',
        'created_at': 'created_at',
    }
    # Specify default ordering
    ordering = ('upload_date')