import hashlib
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework import status
from knox.models import AuthToken
from django.conf import settings
from .serializers import (CreateUserSerializer, UserSerializer,
                          LoginUserSerializer, UserAlbumSerializer,
                          UserCommentSerializer, UserPhotoSerializer,
                          NotificationSerializer, UserNotificationSerializer,
                          ChangePasswordSerializer, ReCaptchaSerializer)
from .models import User, RegisterLink, Notification
from Gallery.models import Photo
from Gallery.serializers import PhotoSerializer
from .permissions import *
from WebAdmin.views import sendEmail
from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_condition import ConditionalPermission, C, And, Or, Not
from django.http import Http404
from datetime import datetime
import hashlib
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from .task import create_notification


def createHash(id):
    integer = str(id).encode("UTF-8")
    return str(hashlib.sha256(integer).hexdigest())


class CompleteRegistration(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        registerLink = RegisterLink.objects.filter(code=request.data["code"])
        if (registerLink.exists()):
            registerLink = registerLink.first()
            if (registerLink.status == 0):
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            registerLink.status = 0
            registerLink.save()
            user = registerLink.user
            if (not (user.completed_registration == False
                     and user.is_active == False)):
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            user.set_password(request.data["password"])
            user.birth_date = request.data["date"]
            user.completed_registration = True
            user.is_active = True
            user.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)


class ResendActivationEmail(generics.GenericAPIView):
    allowed_methods = ["POST"]

    def post(self, request, *args, **kwargs):
        if "email" in request.data.keys():
            try:
                user = User.objects.get(email=request.data['email'])
                activation_link = RegisterLink.objects.get(user=user)
                if (not user.is_active and user.completed_registration):
                    sendEmail(user.email, "sign_up", "Active su cuenta",activation_link.code)
                    return Response(status=status.HTTP_200_OK)
                if (not user.is_active and not user.completed_registration):
                    sendEmail(user.email, "complete_guest_registration","Completa tu registro", activation_link.code)
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist or RegisterLink.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

class RegisterGuest(generics.GenericAPIView):
    allowed_methods = ["POST"]

    def post(self, request, *args, **kwargs):
        formData = request.data.copy()
        if "recaptchaToken" in formData.keys():
            tokenRecaptcha = {"recaptcha": formData.pop("recaptchaToken")}
        else:
            return Response('No recaptchaToken',
                            status=status.HTTP_401_UNAUTHORIZED)

        recaptchaSer = ReCaptchaSerializer(data=tokenRecaptcha)
        if recaptchaSer.is_valid():
            try:
                user = User.objects.get(email=formData['email'])
                if (user.is_active):
                    if (user.completed_registration):
                        return Response({'redirect': 'login'}, status=status.HTTP_200_OK)
                    else:
                        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                else:
                    if (user.completed_registration):
                        return Response({'redirect': 'activate_user'}, status=status.HTTP_200_OK)
                    else:
                        return Response({'redirect': 'guest_complete_registration'}, status=status.HTTP_200_OK)

            except User.DoesNotExist:
                newGuest = User.objects.create(
                    email=formData['email'],
                    first_name=formData['name'],
                    last_name=formData['lastname'],
                    birth_date=datetime.today().strftime('%Y-%m-%d'),
                    rol_type=formData['rol'],
                    is_active=False,
                    completed_registration=False)

                activation_link = RegisterLink.objects.create(code=createHash(
                    newGuest.pk),
                    status=1,
                    user=newGuest)
                sendEmail(newGuest.email, "complete_guest_registration",
                          "Completa tu registro", activation_link.code)
                return Response(
                    {
                        "user": UserSerializer(newGuest).data,
                        "token": AuthToken.objects.create(newGuest)
                    },
                    status=status.HTTP_200_OK)
        else:
            return Response(recaptchaSer.errors,
                            status=status.HTTP_400_BAD_REQUEST)


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class RegistrationAPI(generics.GenericAPIView):
    """
    post:
    Create a new registration session.
    """
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        formData = request.data.copy()
        if "recaptchaToken" in formData.keys():
            tokenRecaptcha = {"recaptcha": formData.pop("recaptchaToken")[0]}
        else:
            return Response("No recaptcha token",
                            status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(data=formData,
                                           context={'request': request})
        recaptchaSer = ReCaptchaSerializer(data=tokenRecaptcha)

        if recaptchaSer.is_valid():
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            activation_link = RegisterLink(code=createHash(user.pk),
                                           status=1,
                                           user=user)
            activation_link.save()
            sendEmail(user.email, "sign_up", "Active su cuenta",
                      activation_link.code)
            return Response(status=status.HTTP_200_OK)
        return Response(recaptchaSer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class RegisterLinkAPI(generics.GenericAPIView):
    """
    get:
    Get code status and user to activate
    """
    permission_classes = [
        IsAuthenticated | ReadOnly,
    ]

    def get_object(self, code):
        return RegisterLink.objects.filter(code=code)

    def get(self, request, *args, **kwargs):
        try:
            if "code" in request.query_params:
                register_link = self.get_object(
                    request.query_params["code"])[0]
                code_status = register_link.status
                if code_status == 1:
                    user = User.objects.get(pk=register_link.user.id)
                    user.is_active = 1
                    user.public_profile = True
                    user.save()
                    create_notification.delay(content_pk=register_link.user.id, type=1, content=1)
                    register_link.status = 0
                    register_link.save()
                    return Response(
                        {
                            "user": UserSerializer(user).data,
                            "token": AuthToken.objects.create(user)
                        },
                        status=status.HTTP_200_OK)
                return Response(status=status.HTTP_304_NOT_MODIFIED)
            else:
                raise Exception
        except Exception as e:
            print("Exception at RegisterLink", e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class LoginAPI(generics.GenericAPIView):
    """
    post:
    Create a new token for a user that is already registered.
    """
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user).
            data,  # NOTE: context adds the base url and we dont need it here context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

class PasswordAPI(generics.GenericAPIView):
    """
    put:
    Change user password
    """
    permission_classes = [
        IsAuthenticated,
    ]

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            old_password = serializer.data.get("old_password")
            if not self.object.check_password(old_password):
                return Response({"old_password": ["Wrong password."]},
                                status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserTokenAPI(generics.RetrieveAPIView):
    """
    get:
    Get details of the user 
    """
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserListAPI(generics.GenericAPIView):
    """
    get:
    Return a list of all the existing users.

    post:
    Create a new user instance.
    """

    permission_classes = [
        IsAuthenticated | ReadOnly,
    ]

    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

    # Exclusivo del administrador:
    def post(self, request, *args, **kwargs):
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailAPI(generics.GenericAPIView):
    """
       get:
       Get details of a *user*.

       put:
       Modify (partially) the attributes of an user.

       delete:
       Delete an user.
       """
    permission_classes = [
        IsAuthenticated | ReadOnly,
    ]
    serializer_class = UserSerializer

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        user = self.get_object(pk)
        if request.user.is_anonymous and not user.public_profile:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        if ((not request.user.is_anonymous) and request.user.user_type == 1) and not user.public_profile:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        user = self.get_object(pk)

        if str(request.user.id) == pk or request.user.user_type != 1:
            serializer = UserSerializer(
                user,
                data=request.data,
                context={'user_type': request.user.user_type},
                partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, *args, **kwargs):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserPhotosAPI(generics.GenericAPIView):
    """
       get:
       Get photos of a *user*.
       """
    permission_classes = [IsAuthenticated | ReadOnly, ]
    serializer_class = UserPhotoSerializer

    def get(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
            filters = {}
            if "approved" in request.query_params:
                approved = True
                if request.query_params["approved"] == "false":
                    approved = False
                filters['approved'] = approved
    
            user_pics = user.photos.filter(**filters)
            serializer = PhotoSerializer(user_pics, many=True)
            if "page" in request.query_params and "page_size" in request.query_params:
                return self.get_paginated_response(self.paginate_queryset(serializer.data))
            return Response(serializer.data)
        except User.DoesNotExist:
            raise Http404


class UserAlbumsAPI(generics.GenericAPIView):
    """
       get:
       Get albums of a *user*.

       """
    permission_classes = [
        IsAuthenticated | ReadOnly,
    ]
    serializer_class = UserAlbumSerializer

    def get(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
            serializer = UserAlbumSerializer(user)
            if "page" in request.query_params and "page_size" in request.query_params:
                return self.get_paginated_response(self.paginate_queryset(serializer.data["albums"]))
            return Response(serializer.data)
        except User.DoesNotExist:
            raise Http404


class UserCommentsAPI(generics.GenericAPIView):
    """
       get:
       Get comments of a *user*.
       Permits pagination if page_size and page are on the query parameters

       TODO delete:
       Delete an comment asociated to a *user*.
       """
    permission_classes = [
        IsAuthenticated | ReadOnly,
    ]
    serializer_class = UserCommentSerializer

    def get(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
            serializer = self.serializer_class(user)
            if "page" in request.query_params and "page_size" in request.query_params:
                return self.get_paginated_response(self.paginate_queryset(serializer.data["comments"]))
            return Response(serializer.data)
        except User.DoesNotExist:
            raise Http404

class UserNotificationsAPI(generics.GenericAPIView):
    """
       get:
       Get notifications of a *user*.
       Permits pagination if page_size and page are on the query parameters

       put:
       Change state from unread to read
    """
    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get_object(self, pk, admin):
        notification = Notification.objects.get(pk=pk)
        try:
            return notification
        except Notification.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
            filters = {}
            if "read" in request.query_params:
                read = True
                if request.query_params["read"] == "false":
                    read = False
                filters['read'] = read
            
            user_notifications = user.notifications.filter(**filters)
            user_notifications = user_notifications.order_by("-created_at")
            serializer = NotificationSerializer(user_notifications, many=True)
            if "page" in request.query_params and "page_size" in request.query_params:
                return self.get_paginated_response(self.paginate_queryset(serializer.data))
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data)
        except User.DoesNotExist:
            raise Http404

    def put(self, request, pk, *args, **kwargs):
        notification = self.get_object(pk, True)
        if notification.user_set.first() == request.user:
            notification = self.get_object(pk, False)
            serializer_class = NotificationSerializer
            serializer = NotificationSerializer(notification, data = request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status= status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)



@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args,
                                 **kwargs):
    """
    get:
        Handles password reset tokens
        When a token is created, an  e-mail needs to be sent to the user
    """
    sendEmail(reset_password_token.user.email, "reset_password",
              'Reinicia tu contraseña', reset_password_token.key)
    return Response(status=status.HTTP_200_OK)
