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
    IdsFilterBackend,
    SearchFilterBackend,
    DefaultOrderingFilterBackend
)

from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl_drf.pagination import LimitOffsetPagination

from Search_indexes.documents.metadata import MetadataDocument
from Search_indexes.serializers.metadata import MetadataDocumentSerializer

class MetadataDocumentViewSet(DocumentViewSet):
    """The MetadataDocument view."""

    document = MetadataDocument
    serializer_class = MetadataDocumentSerializer
    pagination_class = LimitOffsetPagination
    lookup_field = 'id'
    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        SearchFilterBackend,
        IdsFilterBackend,
    ]
    # Define search fields
    search_fields = (
        'value',
    )

    # Define filtering fields
    filter_fields = {
        'id': {
            'field': 'id',
            'lookups': [
                LOOKUP_FILTER_RANGE,
                LOOKUP_QUERY_IN,
            ],
        },
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
        'created_at': 'created_at.raw',
        'updated_at': 'updated_at.raw',
    }

    # Define ordering fields
    ordering_fields = {
        'id': None,
        'updated_at': 'updated_at',
        'created_at': 'created_at',
    }
    # Specify default ordering
    ordering = ('created_at')