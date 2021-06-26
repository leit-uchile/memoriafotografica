from rest_framework import status
from rest_framework.test import APITestCase

from Users.tests import UserMixing


class PhotoApiTest(APITestCase, UserMixing):

    def test_photos_get_authenticated(self):
        self.create_user()
        self.login_user()
        res = self.client.get('/api/photos/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_photos_get_unauthenticated(self):
        self.client.force_authenticate(user=None)
        res = self.client.get('/api/photos/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
