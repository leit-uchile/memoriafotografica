from django.shortcuts import render

# Email View
from django.conf import settings
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def sendEmail(emailto, case, subject, attached):
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [emailto,]
    if case == "sign_up":
        template = 'sendEmail/sign_up_email.html'
        data = 'http://memoriafotografica.cl/confirm/?code=' + attached #code
    elif case == "contact_us":
        template = 'sendEmail/contact_us_response_email.html'
        data = attached #reply
    elif case == "photo_request_failure":
        template = 'sendEmail/photo_request_failure_email.html'
        data = '' #automessage from template
    elif case == "photo_request_success":
        template = 'sendEmail/photo_request_success_email.html'
        data = '' #attached type list            
    html_message = render_to_string(template, {'data': data })
    email = EmailMessage(
        subject=subject, 
        body=html_message, 
        from_email=email_from, 
        to=recipient_list, 
    )
    email.content_subtype = "html"
    if case == "photo_request_success":
        for url in attached:
            email.attach_file(settings.MEDIA_ROOT + url[6:]) #url without media
    email.send()
    return