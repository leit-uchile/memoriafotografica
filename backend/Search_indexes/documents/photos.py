from django.conf import settings
from django_elasticsearch_dsl import Document, fields, Index
from Search_indexes.documents.analyzers import html_strip

from Gallery.models import Photo


# Photo index document
photo_index = Index(settings.ELASTICSEARCH_INDEX_NAMES[__name__+".photo"])
photo_index.settings(
    number_of_shards = 1,
    number_of_replicas = 0
)

@photo_index.doc_type
class PhotoDocument(Document):
    title = fields.TextField(
        analyzer=html_strip,
        fields={
            'raw': fields.TextField(analyzer='keyword'),
        }
    )

    description = fields.TextField(
        analyzer=html_strip,
        fields={
            'raw': fields.TextField(analyzer='keyword'),
        }
    )

    permission = fields.TextField(
        analyzer=html_strip,
        fields={
            'raw': fields.TextField(analyzer='keyword'),
        }
    )
    
    thumbnail = fields.FileField()

    upload_date = fields.DateField()

    created_at = fields.DateField()

    approved = fields.BooleanField()

    censure = fields.BooleanField()

    metadata = fields.TextField(
        attr='metadata_indexing',
        analyzer=html_strip,
        fields={
            'raw': fields.TextField(analyzer='keyword', multi=True),
            'suggest': fields.CompletionField(multi=True),
        },
        multi=True
    )

    category = fields.TextField(
        attr='categories_indexing',
        analyzer=html_strip,
        fields={
            'raw': fields.TextField(analyzer='keyword', multi=True),
            'suggest': fields.CompletionField(multi=True),
        },
        multi=True
    )

    class Django(object):
        """Inner nested class Django."""

        model = Photo  # The model associate with this Document
