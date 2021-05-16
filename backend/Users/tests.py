from rest_framework.test import APITestCase
from rest_framework import status
from .models import User
from unittest.mock import patch

class UserApiTest(APITestCase):

    def setUp(self):
        self.register_url = "/api/auth/register/"
        self.login_url = "/api/auth/login/"

        self.user_data = {
            "email": "example@gmail.com",
            "password": "pw1234",
            "birth_date": "1991-01-01",
            "rol_type": "1",
            "first_name": "ExampleName",
            "last_name": "ExampleLastName"
        }
        return super().setUp()
    
    def tearDown(self):
        return super().tearDown()

    def test_user_register_with_no_data(self):
        res = self.client.post(self.register_url)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    @patch("Users.serializers.ReCaptchaSerializer.is_valid")
    def test_user_register_successful(self, mock_recaptcha_is_valid):
        mock_recaptcha_is_valid.return_value = True
        res = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    @patch("Users.serializers.ReCaptchaSerializer.is_valid")
    def test_user_login_unverified_email(self, mock_recaptcha_is_valid):
        mock_recaptcha_is_valid.return_value = True
        self.client.post(self.register_url, self.user_data, format="json")
        res = self.client.post(self.login_url, {"email": self.user_data["email"], "password": self.user_data["password"]}, format="json")
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    @patch("Users.serializers.ReCaptchaSerializer.is_valid")
    def test_user_login_successful(self, mock_recaptcha_is_valid):
        mock_recaptcha_is_valid.return_value = True
        res = self.client.post(self.register_url, self.user_data, format="json")
        user = User.objects.get(email=self.user_data["email"])
        user.is_active = True
        user.save()
        res = self.client.post(self.login_url, {"email": self.user_data["email"], "password": self.user_data["password"]}, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)