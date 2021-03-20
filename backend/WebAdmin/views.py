from django.shortcuts import render

# Email View
from django.conf import settings
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def sendEmail(emailto, case, subject, attached):
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [
        emailto,
    ]

    if case == "sign_up":
        template = 'sendEmail/sign_up_email.html'
        data = 'http://memoriafotografica.cl/confirm/?code=' + attached  #code

    elif case == "reset_password":
        template = 'sendEmail/reset_password_email.html'
        data = 'http://memoriafotografica.cl/recoveruser/confirm/?code=' + attached  #code

    elif case == "contact_us":
        template = 'sendEmail/contact_us_response_email.html'
        data = attached  #reply
    elif case == "photo_request_success":
        template = 'sendEmail/photo_request_success_email.html'
        data = attached  #array list. Each element is a dict that contains title, cc and url of the photo approved
    elif case == "photo_request_failure":
        template = 'sendEmail/photo_request_failure_email.html'
        data = ''  #automessage from template

    elif case == 'complete_guest_registration':
        template = 'sendEmail/complete_guest_registration.html'
        data = 'http://localhost:3001/complete_guest_registration/?code=' + attached

    html_message = render_to_string(template, {'data': data})
    email = EmailMessage(
        subject=subject,
        body=html_message,
        from_email=email_from,
        to=recipient_list,
    )
    email.content_subtype = "html"
    if case == "photo_request_success":
        for element in attached:
            email.attach_file(settings.MEDIA_ROOT +
                              element["url"])  #url without /media/
    email.send()
    return