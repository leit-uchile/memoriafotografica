from unittest.mock import patch
from unittest import skip

from io import BytesIO

from rest_framework import status
from rest_framework.test import APITestCase

from Gallery.models import PhotoRequest
from Users.tests import UserMixin
from .mixins import PhotoMixin, PhotoRequestMixin


class PhotoRequestAPITest(APITestCase, UserMixin, PhotoMixin, PhotoRequestMixin):
    def setUp(self):
        self.admin = self.create_user(True)
        self.user = self.create_user(False)
        self.photo = self.create_photo(True, self.user.id)
        self.base_url = '/api/requests/'

    def tearDown(self):
        self.client.credentials()  # Reset credentials
        return super().tearDown()

    def test_admin_get_pr(self):
        auth = self.login_user(self.admin)
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        self.populate_pr(2, self.photo.id)

        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 2)

    def test_reject_get_pr(self):
        self.populate_pr(2, self.photo.id)

        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

        auth = self.login_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_pr(self):
        auth = self.login_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        res = self.client.post(self.base_url, {
            "reason": "This is not a reason",
            "photos": [self.photo.id],
        }, format='multipart')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_anonymous_create_pr(self):
        res = self.client.post(self.base_url, {
            "reason": "This is not a reason",
            "photos": [self.photo.id]
        }, format='multipart')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_collab_delete_pr(self):
        self.populate_pr(1, self.photo.id)
        id = PhotoRequest.objects.first().pk

        auth = self.login_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + auth.data['token'])

        res = self.client.delete(self.base_url+str(id)+"/")

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_delete_pr(self):
        self.populate_pr(1, self.photo.id)
        id = PhotoRequest.objects.first().pk

        auth = self.login_user(self.admin)
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + auth.data['token'])

        res = self.client.delete(self.base_url+str(id)+"/")

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
