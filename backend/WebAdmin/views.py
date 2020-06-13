from django.shortcuts import render

# Email View
from django.conf import settings
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from email.mime.image import MIMEImage
from django.utils.html import strip_tags
from django.http import HttpResponse

def sendEmail(emailto, case, subject, attached):
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [emailto,]
    if case == "sign_up":
        html_message = render_to_string('sendEmail/sign_up_email.html', {'link': 'http://memoriafotografica.cl/confirm/?code=' + attached })
    elif case == "contact_us":
        html_message = render_to_string('sendEmail/contact_us_response_email.html', {'response': attached })
    elif case == "photo_request_failure":
        html_message = render_to_string('sendEmail/photo_request_failure_email.html')
    elif case == "photo_request_success":
        html_message = render_to_string('sendEmail/photo_request_success_email.html')
        plain_message = strip_tags(html_message)
        msg = EmailMultiAlternatives(subject, plain_message, email_from, recipient_list)
        msg.attach_alternative(html_message, "text/html")
        for url in attached:
            msg.attach_alternative('http://localhost:8000' + url, "image/")
        msg.send()
        return
    plain_message = strip_tags(html_message)
    res = send_mail( subject, plain_message, email_from, recipient_list, html_message=html_message )
    return