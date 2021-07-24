from unittest.mock import patch
from unittest import skip

from rest_framework import status
from rest_framework.test import APITestCase

from Gallery.tests.mixins import PhotoMixin
from Users.tests import UserMixing

class PhotoApiTest(APITestCase, PhotoMixin, UserMixing):

    def setUp(self):
        self.user = self.create_user()
        self.base_url = '/api/photos/'

    def tearDown(self):
        self.client.credentials() # Reset credentials
        return super().tearDown()

    def test_photos_get_authenticated(self):
        auth = self.login_user()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        self.populate_photos(2, user_id=self.user.id)

        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 2)

    def test_photos_get_authenticated_not_approved(self):
        auth = self.login_user()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        self.populate_photos(2, False, user_id=self.user.id)

        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 0)

    def test_photos_get_unauthenticated(self):
        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 0)

    @patch('django.core.files.storage.FileSystemStorage.save')
    def test_upload_photo(self, mock_save):
        mock_save.return_value = "mocked.jpg"
        auth = self.login_user()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        res = self.client.post(self.base_url, {
            "image": self.create_form_image(),
            "title": "This is not a title",
            "description": "Text that's not important to the story",
            "permission": 'CC BY',
            "aspect_h": 1,
            "aspect_w": 1,
        }, format='multipart')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    @patch('django.core.files.storage.FileSystemStorage.save')
    def test_upload_photo_as_guest(self, mock_save):
        mock_save.return_value = "mocked.jpg"
        copy_data = self.user_data.copy()
        copy_data["email"] = "user2@leit.cl"
        guest = self.create_guest(copy_data)
        auth = self.get_auth_token(guest)
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth)
        res = self.client.post(self.base_url, {
            "image": self.create_form_image(),
            "title": "This is not a title",
            "description": "Text that's not important to the story",
            "permission": 'CC BY',
            "aspect_h": 1,
            "aspect_w": 1,
        }, format='multipart')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    @patch('django.core.files.storage.FileSystemStorage.save')
    def test_reject_anonymous_upload(self, mock_save):
        mock_save.return_value = "mocked.jpg"
        res = self.client.post(self.base_url, {
            "image": self.create_form_image(),
            "title": "This is not a title",
            "description": "Text that's not important to the story",
            "permission": 'CC BY',
            "aspect_h": 1,
            "aspect_w": 1,
        }, format='multipart')
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    # TODO: Complete the following tests with variations
    @skip('Not yet tested')
    def test_edit_photo(self):
        pass
    
    @skip('Not yet tested')
    def test_get_photo_comments(self):
        pass
    
    @skip('Not yet tested')
    def test_get_one_photo(self):
        pass