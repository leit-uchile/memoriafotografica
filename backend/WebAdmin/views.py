from django.shortcuts import render

# Email View
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from email.mime.image import MIMEImage
from django.utils.html import strip_tags
from django.http import HttpResponse

def sendEmail(emailto, link):
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [emailto,]
    subject = 'Active su cuenta'
    html_message = render_to_string('sendEmail/sign_up_email.html', {'link': 'http://memoriafotografica.cl/confirm/?code=' + link })
    plain_message = strip_tags(html_message)
    res = send_mail( subject, plain_message, email_from, recipient_list, html_message=html_message )
    return