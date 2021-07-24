from MetaData.models import Metadata, IPTCKeyword

class MetadataMixin:

    META_COUNT = 1

    def ensure_iptc(self):
        try:
            c = IPTCKeyword.objects.count()
            if c == 0:
                raise IPTCKeyword.DoesNotExist()
            else:
                iptc = IPTCKeyword.objects.first()
        except IPTCKeyword.DoesNotExist:
            iptc = IPTCKeyword.objects.create(
                name="default",
                definition="testing default",
                help_text="test",
            )
        return iptc

    def populate_metadata(self, total, approved=True, iptc=None):
        default_iptc = self.ensure_iptc()
        if iptc is not None:
            default_iptc = iptc
        for i in range(total):
            meta = Metadata.objects.create(
                value=str(self.META_COUNT)+'m',
                metadata=default_iptc,
                approved=approved
            )
            self.META_COUNT += 1
