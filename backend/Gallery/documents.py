from django.conf import settings
from django_elasticsearch_dsl import Document, fields, Index
from elasticsearch_dsl import analyzer

from Gallery.models import Comment, Photo

# analyzer
html_strip = analyzer(
    'html_strip',
    tokenizer="standard",
    filter=["lowercase", "stop", "snowball"],
    char_filter=["html_strip"]
)

# Comment index document
comment_index = Index(settings.ELASTICSEARCH_INDEX_NAMES[__name__+".comment"])
comment_index.settings(
    number_of_shards = 1,
    number_of_replicas = 0
)

@comment_index.doc_type
class CommentDocument(Document):
    content = fields.TextField(
        analyzer=html_strip,
        fields={
            'raw': fields.TextField(analyzer='keyword'),
        }
    )

    censure = fields.BooleanField()

    class Django(object):
        """Inner nested class Django."""

        model = Comment  # The model associate with this Document



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

    thumbnail = fields.TextField()

    upload_date = fields.DateField()

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

# Category index