from unittest.mock import patch
from unittest import skip

from rest_framework import status
from rest_framework.test import APITestCase

from Users.tests import UserMixin
from .mixins import PhotoMixin, CommentMixin

class CommentApiTest(APITestCase, UserMixin, PhotoMixin, CommentMixin):

    def setUp(self):
        self.user = self.create_user()
        self.photo = self.create_photo(user_id=self.user.id)
        self.base_url = '/api/comments/'

    def tearDown(self):
        #self.client.credentials() # Reset credentials
        return super().tearDown()

    def test_comments_get_authenticated(self):
        #auth = self.login_user()
        #self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        self.populate_comments(2, user_id=self.user.id, photo_id=self.photo.id)

        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 2)

    def test_comments_get_authenticated_not_approved(self):
        #auth = self.login_user()
        #self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        self.populate_comments(1, censure=True, user_id=self.user.id, photo_id=self.photo.id)

        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 0)

    def test_comments_get_unauthenticated(self):
        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 0)