from rest_framework import status
from Users.tests import UserApiTest

class PhotoApiTest(UserApiTest):

    def setUp(self):
        return super().setUp()

    def photos_get_authenticated(self):
        self.create_user()
        self.first_login_user()
        res = self.client.get('/api/photos/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def photos_get_unauthenticated(self):
        self.client.force_authenticate(user=None)
        res = self.client.get('/api/photos/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
