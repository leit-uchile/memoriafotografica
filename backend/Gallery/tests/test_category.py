from unittest.mock import patch
from unittest import skip

from rest_framework import status
from rest_framework.test import APITestCase

from Gallery.models import Category
from Users.tests import UserMixin
from .mixins import PhotoMixin, CategoryMixin

class CategoryApiTest(APITestCase, UserMixin, PhotoMixin, CategoryMixin):

    def setUp(self):
        self.admin = self.create_user(True)
        self.user = self.create_user()
        self.photo = self.create_photo(user_id=self.user.id)
        self.base_url = '/api/categories/'

    def tearDown(self):
        self.client.credentials() # Reset credentials
        return super().tearDown()

    def test_categories_get_authenticated(self):
        auth = self.login_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        self.populate_categories(2, photo_id=self.photo.id)

        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 2)

    def test_categories_get_unauthenticated(self):
        self.populate_categories(2, photo_id=self.photo.id)

        res = self.client.get(self.base_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 2)

    def test_create_category(self):
        auth = self.login_user(self.admin)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        res = self.client.post(self.base_url, {
            "title": "This is not a title",
            "pictures": [self.photo.id]
        }, format='multipart')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
    
    def test_create_category_as_colab(self):
        auth = self.login_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
        res = self.client.post(self.base_url, {
            "title": "This is not a title",
        }, format='multipart')
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_delete_category(self):
        self.populate_categories(1, photo_id=self.photo.id)
        id = Category.objects.first().pk

        auth = self.login_user(self.admin)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])

        res = self.client.delete(self.base_url+str(id)+"/")

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    def test_reject_delete_category(self):
        self.populate_categories(1, photo_id=self.photo.id)
        id = Category.objects.first().pk

        auth = self.login_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])

        res = self.client.delete(self.base_url+str(id)+"/")
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
