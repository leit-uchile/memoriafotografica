from __future__ import unicode_literals

from datetime import datetime

import django.contrib.auth.models as django_md
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.timezone import make_aware
from django.utils.translation import ugettext_lazy as _

from Gallery.models import Album, Comment, Photo, Reporte

from .managers import UserManager


class Notification(models.Model):
    NOTIFICATION_TYPE_CHOICES = (
        (1, 'Aprobación'),
        (2, 'Edición'),
        (3, 'Censura')
    )
    CONTENT_TYPE_CHOICES = (
        (1, 'usuario'),
        (2, 'foto'),
        (3, 'comentario')
    )
    type = models.PositiveSmallIntegerField(choices=NOTIFICATION_TYPE_CHOICES, default = 1)
    content = models.PositiveSmallIntegerField(choices=CONTENT_TYPE_CHOICES, default = 1)
    message = models.CharField(max_length=280)
    created_at = models.DateTimeField(default=datetime.now)
    updated_at = models.DateTimeField(default=datetime.now)
    read = models.BooleanField(default=False)

class User(AbstractBaseUser, PermissionsMixin):
    USER_TYPE_CHOICES = (
        (1, 'colaborator'),
        (2, 'curator'),
        (3, 'admin')
    )
    ROL_TYPE_CHOICES = (
        (1, 'Alumno'),
        (2, 'Ex-Alumno'),
        (3, 'Académico'),
        (4, 'Ex-Académico'),
        (5, 'Funcionario'),
        (6, 'Externo')
    )
    # DATOS:
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30)
    last_name = models.CharField(_('last name'), max_length=30)
    birth_date = models.DateField(_('birth date'))
    date_joined = models.DateTimeField(_('date joined'),auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=False)      #Habilitado
    completed_registration = models.BooleanField(_('completed_registration'), default=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    deleted = models.BooleanField(_('deleted'), default = False)    #Eliminado
    generation = models.CharField(_('generation'), max_length = 5, blank = True)

    #CONTENIDO GENERADO
    albums = models.ManyToManyField(Album, blank=True)
    photos = models.ManyToManyField(Photo, blank=True)
    comments = models.ManyToManyField(Comment, blank = True)
    report = models.ManyToManyField(Reporte, blank= True)
    notifications = models.ManyToManyField(Notification, blank=True)

    #TIPO DE USUARIO
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default = 1)
    rol_type = models.PositiveSmallIntegerField(choices=ROL_TYPE_CHOICES, default=6)
    is_staff = models.BooleanField(_('staff status'), default=False)
    public_profile = models.BooleanField(default=False)
    #LOGGING
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    
    objects = UserManager()


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_full_name(self):
        '''
        Returns the first_name plus the last_name, with a space in between.
        '''
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        '''
        Returns the short name for the user.
        '''
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        '''
        Sends an email to this User.
        '''
        send_mail(subject, message, from_email, [self.email], **kwargs)
        
class RegisterLink(models.Model):
    LINK_STATES = (
        (0, 'activated'),
        (1, 'available')
    )
    code = models.CharField(max_length=256)
    status = models.PositiveSmallIntegerField(choices=LINK_STATES, default = 1)
    user= models.OneToOneField(
        User,
        on_delete=models.SET_NULL,
        null=True, 
        blank=True
    )