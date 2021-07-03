from elasticsearch_dsl import analyzer

# analyzer
html_strip = analyzer(
    'html_strip',
    tokenizer="standard",
    filter=["lowercase", "stop"],
    char_filter=["html_strip"]
)
