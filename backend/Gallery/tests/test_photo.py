from unittest.mock import patch
from unittest import skip

from io import BytesIO

from rest_framework import status
from rest_framework.test import APITestCase

from Gallery.tests.mixins import PhotoMixin
from Users.tests import UserMixin

class PhotoApiTest(APITestCase, PhotoMixin, UserMixin):

    def setUp(self):
        self.admin = self.create_user(True)
        self.user = self.create_user(False)
        self.base_url = '/api/photos/'

        self.image_bytes = b'GIF87a\x01\x00\x01\x00\x80\x01\x00\x00\x00\x00ccc,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00'
        self.image = BytesIO(self.image_bytes)
        self.image.name = 'my_test_image.jpg'

    def tearDown(self):
        self.client.credentials() # Reset credentials
        return super().tearDown()

    def test_photos_get_authenticated(self):
        auth = self.login_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        self.populate_photos(2, user_id=self.user.id)

        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 2)

    def test_photos_get_authenticated_not_approved(self):
        auth = self.login_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        self.populate_photos(2, False, user_id=self.user.id)

        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 0)

    def test_photos_get_unauthenticated(self):
        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 0)

    def test_upload_photo(self):
        auth = self.login_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        res = self.client.post(self.base_url, {
            "image": self.image,
            "title": "This is not a title",
            "description": "Text that's not important to the story",
            #"permission": 'CC BY',
            "aspect_h": 1,
            "aspect_w": 1,
        }, format='multipart')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_upload_photo_as_guest(self):
        copy_data = self.user_data.copy()
        copy_data["email"] = "user2@leit.cl"
        guest = self.create_guest(copy_data)
        auth = self.get_auth_token(guest)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth)
        res = self.client.post(self.base_url, {
            "image": self.image,
            "title": "This is not a title",
            "description": "Text that's not important to the story",
            #"permission": 'CC BY',
            "aspect_h": 1,
            "aspect_w": 1,
        }, format='multipart')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_reject_anonymous_upload(self):
        res = self.client.post(self.base_url, {
            "image": self.image,
            "title": "This is not a title",
            "description": "Text that's not important to the story",
            #"permission": 'CC BY',
            "aspect_h": 1,
            "aspect_w": 1,
        }, format='multipart')
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_get_photo_serializer_by_role(self):
        self.populate_photos(1, user_id=self.user.id)

        res_anon = self.client.get(self.base_url)
        auth = self.login_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        res_colaborator = self.client.get(self.base_url)
        self.assertEqual(res_anon.data, res_colaborator.data)

        auth = self.login_user(self.admin)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        res_admin = self.client.get(self.base_url)
        self.assertNotEqual(res_colaborator.data, res_admin.data)

    # TODO: Complete the following tests with variations
    @skip('Not yet tested')
    def test_edit_photo(self):
        pass
    
    @skip('Not yet tested')
    def test_get_one_photo(self):
        self.populate_photos(1, user_id=self.user.id)
        
