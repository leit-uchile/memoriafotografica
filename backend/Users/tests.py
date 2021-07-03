import hashlib
from unittest.mock import patch

from rest_framework import status
from rest_framework.test import APITestCase

from Users.api import CompleteRegistration
from Users.models import User

from .models import Notification, RegisterLink, User


def createHash(id):
    integer = str(id).encode("UTF-8")
    return str(hashlib.sha256(integer).hexdigest())

class UserMixing():
    """
    Standard user mixin for testing
    """
    register_url = "/api/auth/register/"
    login_url = "/api/auth/login/"
    complete_registration_url="/api/users/complete_registration/"
    resend_activation_url="/api/users/resend_activation/"
    register_guest_url="/api/users/guest/"

    user_data = {
        "email": "user@leit.cl",
        "password": "pw1234",
        "birth_date": "1991-01-01",
        "rol_type": "1",
        "first_name": "Name",
        "last_name": "LastName",
    }

    def create_user(self, admin=False, is_active=False):
        user =  User.objects.create(
            **self.user_data
        )
        if admin:
            user.is_superuser = True
            user.user_type = 3
            user.is_staff = True
        user.is_active = is_active
        user.save()
        return user
    
    def create_guest(self):
        return User.objects.create(
            **self.user_data,
            completed_registration=False
        )
    
    def create_register_link(self,user,status=1):
        return RegisterLink.objects.create(
         code=createHash(user.pk),
         status=status,
         user=user
        )

    def login_user(self):
        user = User.objects.get(email=self.user_data["email"])
        user.is_active = True
        user.save()
        res = self.client.post(self.login_url, {"email": self.user_data["email"], "password": self.user_data["password"]}, format="json")
        return res


class UserApiTest(APITestCase, UserMixing):
    
    def tearDown(self):
        return super().tearDown()

    @patch("Users.serializers.ReCaptchaSerializer.is_valid")
    def create_user(self, mock_recaptcha_is_valid, admin=False):
        mock_recaptcha_is_valid.return_value = True
        
        self.user_data['recaptchaToken'] = "sample"
        res = self.client.post(self.register_url, self.user_data, format="json")
        del self.user_data['recaptchaToken']
        if admin:
            user = User.objects.get(email=self.user_data["email"])
            user.is_superuser = True
            user.user_type = 3
            user.is_staff = True
            user.save()
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
        res = self.login_user()
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_complete_registration_works_once(self):
        guest= self.create_guest()
        reg_link= self.create_register_link(guest)
        user_data = self.user_data.copy()
        user_data['code'] = reg_link.code
        user_data["date"] = "1991-01-01"
        res = self.client.post(self.complete_registration_url, user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res = self.client.post(self.complete_registration_url, user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_complete_registration_rejected(self):
        user = super().create_user(is_active=True)
        reg_link_user = self.create_register_link(user)
        user_data = self.user_data.copy()
        user_data["date"] = "1991-01-01"
        user_data['code']=reg_link_user.code
        res = self.client.post(self.complete_registration_url, user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
        user_data['code']='1'
        res = self.client.post(self.complete_registration_url, user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    @patch("Users.api.sendEmail")
    def test_resend_activation_email_user(self,mock_email):
        self.create_user()
        user = User.objects.first()
        reg_link = RegisterLink.objects.filter(user=user)
        self.assertTrue(reg_link.exists())
        res = self.client.post(self.resend_activation_url, self.user_data, format="json")
        mock_email.assert_called_with(user.email, "sign_up", "Active su cuenta",reg_link.first().code)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    @patch("Users.api.sendEmail")
    def test_resend_activation_email_guest(self,mock_email):
        guest = super().create_guest()
        reg_link = self.create_register_link(guest)
        res = self.client.post(self.resend_activation_url, self.user_data, format="json")
        mock_email.assert_called_with(guest.email, "complete_guest_registration","Completa tu registro",reg_link.code)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_resend_activation_rejected(self):
        res = self.client.post(self.resend_activation_url, {"email": "test@test.cl"}, format="json")
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        user = super().create_user()
        res = self.client.post(self.resend_activation_url, self.user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        self.create_register_link(user)
        user.is_active=True
        user.save()
        res = self.client.post(self.resend_activation_url, self.user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)


    #Case when user is active and completed registration. 
    # redirect to login
    # This is a User that finished its register process
    @patch("Users.serializers.ReCaptchaSerializer.is_valid")
    def test_register_guest_case_user1(self,mock_recaptcha_is_valid):
        user= super().create_user(is_active=True)
        mock_recaptcha_is_valid.return_value = True
        user_data = self.user_data.copy()
        user_data['recaptchaToken'] = "sample"
        res = self.client.post(self.register_guest_url, user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data,{'redirect':'login'})

    #Case when user is active but not completed registration,
    # This case should neve happen
    @patch("Users.serializers.ReCaptchaSerializer.is_valid")
    def test_register_guest_case_user2(self,mock_recaptcha_is_valid):
        user= super().create_user(is_active=True)
        user.completed_registration=False
        user.save()
        mock_recaptcha_is_valid.return_value = True
        user_data = self.user_data.copy()
        user_data['recaptchaToken'] = "sample"
        res = self.client.post(self.register_guest_url, user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)

    #Case when user is not active and completed registration,
    # This is a User that hasnt verified its email
    @patch("Users.serializers.ReCaptchaSerializer.is_valid")
    def test_register_guest_case_user3(self,mock_recaptcha_is_valid):
        user= super().create_user()
        user.completed_registration=True
        user.save()
        mock_recaptcha_is_valid.return_value = True
        user_data = self.user_data.copy()
        user_data['recaptchaToken'] = "sample"
        res = self.client.post(self.register_guest_url, user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data,{'redirect':'activate_user'})

    #Case when user is not active and not completed registration,
    # This is a Guest that hasnt finished its registration process
    @patch("Users.serializers.ReCaptchaSerializer.is_valid")
    def test_register_guest_case_guest1(self,mock_recaptcha_is_valid):
        guest = super().create_guest()
        mock_recaptcha_is_valid.return_value = True
        user_data = self.user_data.copy()
        user_data['recaptchaToken'] = "sample"
        res = self.client.post(self.register_guest_url, user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data,{'redirect':'guest_complete_registration'})


    #Case when user is not active and n
    # This is a visitor becoming a Guest
    @patch("Users.serializers.ReCaptchaSerializer.is_valid")
    def test_register_guest_case_guest2(self,mock_recaptcha_is_valid):
        mock_recaptcha_is_valid.return_value = True
        user_data = self.user_data.copy()
        user_data['recaptchaToken'] = "sample"
        user_data["name"] = "Name"
        user_data["lastname"] = "LastName"
        user_data['rol']=  '1'
        res = self.client.post(self.register_guest_url, user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(res.data['token'])
        self.assertTrue(res.data['user'])
        self.assertEqual(res.data['user']['email'], 'user@leit.cl')
        self.assertEqual(res.data['user']['first_name'],'Name' )
        self.assertEqual(res.data['user']['is_active'], False)
        self.assertEqual(res.data['user']['completed_registration'], False)