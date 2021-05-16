from django.conf import settings
from django_elasticsearch_dsl import Document, fields, Index
from Search_indexes.documents.analyzers import html_strip

from Gallery.models import Comments

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
