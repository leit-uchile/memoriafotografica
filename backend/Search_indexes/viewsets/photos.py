from Search_indexes.backends.CustomSearchBackend import CustomSearchBackend
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

from Search_indexes.documents.photos import PhotoDocument
from Search_indexes.serializers.photos import PhotoDocumentSerializer

class PhotoDocumentViewSet(DocumentViewSet):
    """The PhotoDocument view."""

    document = PhotoDocument
    serializer_class = PhotoDocumentSerializer
    pagination_class = LimitOffsetPagination
    lookup_field = 'id'
    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        SearchFilterBackend,
        IdsFilterBackend,
        CustomSearchBackend
    ]
    # Define search fields
    search_fields = (
        'title',
        'description',
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
        'approved': 'approved.raw',
        'censure': 'censure.raw',
        'category': {
            'field': 'category',
            'lookups': [
                LOOKUP_FILTER_TERMS,
                LOOKUP_FILTER_PREFIX,
                LOOKUP_FILTER_WILDCARD,
                LOOKUP_QUERY_IN,
                LOOKUP_QUERY_EXCLUDE,
            ],
        },
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
        'created_at': {
            'field': 'created_at',
            'lookups': [
                LOOKUP_FILTER_RANGE,
                LOOKUP_FILTER_WILDCARD,
                LOOKUP_QUERY_IN
            ]
        },
        'upload_date':{
            'field': 'upload_date',
            'lookups': [
                LOOKUP_FILTER_RANGE,
                LOOKUP_FILTER_WILDCARD,
                LOOKUP_QUERY_IN
            ]
        },
        'includes': 'includes.raw',
    }

    # Define ordering fields
    ordering_fields = {
        'id': None,
        'upload_date': 'upload_date',
        'created_at': 'created_at',
    }
    # Specify default ordering
    ordering = ('upload_date')