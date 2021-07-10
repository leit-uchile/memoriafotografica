from rest_framework import status
from rest_framework.test import APITestCase

from Users.tests import UserMixing


class PhotoApiTest(APITestCase, UserMixing):

    def setUp(self):
        self.user = self.create_user()

    def tearDown(self):
        self.client.credentials() # Reset credentials
        return super().tearDown()()

    def test_photos_get_authenticated(self):
        auth = self.login_user()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        res = self.client.get('/api/photos/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_photos_get_unauthenticated(self):
        res = self.client.get('/api/photos/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
