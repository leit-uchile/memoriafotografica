from unittest.mock import patch
from unittest import skip

from io import BytesIO

from rest_framework import status
from rest_framework.test import APITestCase

from Gallery.models import Album
from Users.tests import UserMixin
from .mixins import PhotoMixin, AlbumMixin

class AlbumApiTest(APITestCase, PhotoMixin, UserMixin, AlbumMixin):
    def setUp(self):
        self.admin = self.create_user(True)
        self.user = self.create_user(False)
        self.photo = self.create_photo(user_id=self.user.id)
        self.base_url = '/api/albums/'
    
    def tearDown(self):
        self.client.credentials() # Reset credentials
        return super().tearDown()
    
    def test_albums_get_authenticated(self):
        auth = self.login_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        self.populate_albums(2, False, user_id=self.user.id, photo_id=self.photo.id)

        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 2)
    
    def test_albums_get_unauthenticated(self):
        self.populate_albums(2, False, user_id=self.user.id, photo_id=self.photo.id)

        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 2)
    
    def test_create_album(self):
        auth = self.login_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        res = self.client.post(self.base_url, {
            "name": "This is not a name",
            "pictures": [self.photo.id]
        }, format='multipart')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
    
    def test_reject_anonymous_create(self):
        res = self.client.post(self.base_url, {
            "name": "This is not a name",
            "pictures": [self.photo.id]
        }, format='multipart')
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_collection(self):
        auth = self.login_user(self.admin)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        res = self.client.post(self.base_url, {
            "name": "This is not a name",
            "pictures": [self.photo.id],
            "collection": True,
        }, format='multipart')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
    
    def test_reject_collab_create_collection(self):
        auth = self.login_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        res = self.client.post(self.base_url, {
            "name": "This is not a name",
            "pictures": [self.photo.id],
            "collection": True,
        }, format='multipart')
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_admin_delete_album(self):
        self.populate_albums(1, False, user_id=self.user.id, photo_id=self.photo.id)
        id = Album.objects.first().pk

        auth = self.login_user(self.admin)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])

        res = self.client.delete(self.base_url+str(id)+"/")

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
    
    def test_collab_delete_album(self):
        self.populate_albums(1, False, user_id=self.user.id, photo_id=self.photo.id)
        id = Album.objects.first().pk

        auth = self.login_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])

        res = self.client.delete(self.base_url+str(id)+"/")

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)