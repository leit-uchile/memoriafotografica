from rest_framework.test import APITestCase
from rest_framework import status
from .models import User
from unittest.mock import patch
from django.utils import timezone
import pytz
import datetime

class UserApiTest(APITestCase):

    def setUp(self):
        self.register_url = "/api/auth/register/"
        self.login_url = "/api/auth/login/"

        self.user_data = {
            "email": "user@leit.cl",
            "password": "pw1234",
            "birth_date": "1991-01-01",
            "rol_type": "1",
            "first_name": "Name",
            "last_name": "LastName",
            "recaptchaToken": "sample"
        }

        return super().setUp()
    
    def tearDown(self):
        return super().tearDown()

    @patch("Users.serializers.ReCaptchaSerializer.is_valid")
    def create_user(self, mock_recaptcha_is_valid, admin=False):
        mock_recaptcha_is_valid.return_value = True
        res = self.client.post(self.register_url, self.user_data, format="json")
        if admin:
            user = User.objects.get(email=self.user_data["email"])
            user.is_superuser = True
            user.user_type = 3
            user.is_staff = True
            user.save()
        return res

    def first_login_user(self):
        user = User.objects.get(email=self.user_data["email"])
        user.is_active = True
        user.save()
        res = self.client.post(self.login_url, {"email": self.user_data["email"], "password": self.user_data["password"]}, format="json")
        return res

    def test_user_register_with_no_data(self):
        res = self.client.post(self.register_url)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_register_successful(self):
        res = self.create_user()
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_user_login_unverified_email(self):
        reg_res = self.create_user()
        res = self.client.post(self.login_url, {"email": self.user_data["email"], "password": self.user_data["password"]}, format="json")
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_login_successful(self):
        reg_res = self.create_user()
        res = self.first_login_user()
        self.assertEqual(res.status_code, status.HTTP_200_OK)