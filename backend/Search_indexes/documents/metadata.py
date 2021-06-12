from django.conf import settings
from django_elasticsearch_dsl import Document, fields, Index
from Search_indexes.documents.analyzers import html_strip

from MetaData.models import Metadata 

# Metadata index document
metadata_index = Index(settings.ELASTICSEARCH_INDEX_NAMES[__name__+".metadata"])
metadata_index.settings(
    number_of_shards = 1,
    number_of_replicas = 0
)

@metadata_index.doc_type
class MetadataDocument(Document):
    id = fields.IntegerField(attr='id')

    value = fields.TextField(
        analyzer=html_strip,
        fields={
            'raw': fields.TextField(analyzer='keyword'),
        },
        multi=True
    )

    metadata = fields.TextField(
        attr='name_indexing',
        analyzer=html_strip,
        fields={
            'raw': fields.TextField(analyzer='keyword'),
        }
    )

    class Django(object):
        """Inner nested class Django."""

        model = Metadata