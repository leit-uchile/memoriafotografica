from Gallery.models import Photo
from io import BytesIO
from PIL import Image
from django.core.files.base import File
from Users.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
import tempfile

class PhotoMixin:

    @staticmethod
    def get_image_file(name='test.png', ext='png', size=(50, 50), color=(256, 0, 0)):
        """
        Creates an empty image
        """
        file_obj = BytesIO()
        image = Image.new("RGB", size=size, color=color)
        image.save(file_obj, ext)
        file_obj.seek(0)
        return File(file_obj, name=name)

    def create_form_image(self, name="test_image.png"):
        """
        Create an image to be sent on a multipart POST request
        """
        return SimpleUploadedFile(
            name=name,
            content=self.get_image_file().read(),
            content_type='image/jpeg'
        )

    def populate_photos(self, total, approved=True, user_id=1):
        """
        Populate photos with associated permissions given a user id
        """
        user = User.objects.get(pk=user_id)
        for i in range(total):
            photo = Photo.objects.create(
                #image=SimpleUploadedFile('test.png', content=self.get_image_file(size=(200,200)), content_type='image/png'),
                image=tempfile.NamedTemporaryFile(suffix=".jpg").name,
                title="This is not a title",
                description="Text that's not important to the story",
                approved=approved,
                censure=False,
                permission='CC BY',
                aspect_h=1,
                aspect_w=1,
            )
            user.photos.add(photo)
        user.save()

        