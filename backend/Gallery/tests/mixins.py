from io import BytesIO
from Gallery.models import Photo, Comment, Category
from Users.models import User
from django.core.files.uploadedfile import SimpleUploadedFile

class PhotoMixin:

    image_bytes = b'GIF87a\x01\x00\x01\x00\x80\x01\x00\x00\x00\x00ccc,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00'
    image = BytesIO(image_bytes)
    image.name = 'my_test_image.jpg'

    def create_photo(self, approved=True, user_id=1):

        user = User.objects.get(pk=user_id)
        photo = Photo.objects.create(
                image=SimpleUploadedFile(name=self.image.name, content=self.image_bytes),
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
                image=SimpleUploadedFile(name=self.image.name, content=self.image_bytes),
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

class CategoryMixin:
    def populate_categories(self, total, photo_id=1):
        """
        Populate categories
        """
        for i in range(total):
            category = Category(
                title="This is not a title",
            )
            category.save()
            category.pictures.add(photo_id)

        