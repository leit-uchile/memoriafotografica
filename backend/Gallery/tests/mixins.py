from io import BytesIO
from PIL import Image
from django.core.files.base import File
from Gallery.models import Photo, Comment
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

    def create_photo(self, approved=True, user_id=1):
        user = User.objects.get(pk=user_id)
        photo = Photo.objects.create(
                #image=SimpleUploadedFile('test.png', content=self.get_image_file(size=(200,200)), content_type='image/png'),
                image=tempfile.NamedTemporaryFile(suffix=".jpg").name,
                title="This is not a title",
                description="Text that's not important to the story",
                approved=approved,
                censure=False,
                #permission='CC BY',
                aspect_h=1,
                aspect_w=1,
                author=user
        )
        return photo

    def populate_photos(self, total, approved=True, user_id=1):
        """
        Populate photos with associated permissions given a user id
        """
        user = User.objects.get(pk=user_id)
        for _ in range(total):
            Photo.objects.create(
                image=tempfile.NamedTemporaryFile(suffix=".jpg").name,
                title="This is not a title",
                description="Text that's not important to the story",
                approved=approved,
                censure=False,
                aspect_h=1,
                aspect_w=1,
                author=user
            )

class CommentMixin:
    def populate_comments(self, total, censure=False, user_id=1, photo_id=1):
        """
        Populate comments with associated permissions given a user id
        """
        user = User.objects.get(pk=user_id)
        picture = Photo.objects.get(pk=photo_id)
        for i in range(total):
            comment = Comment.objects.create(
                content="This is not a comment",
                author=user,
                censure=censure,
                picture=picture,
            )

        