# Create your tasks here

from celery import shared_task
from .models import User


@shared_task
def add(x, y):
    return x + y


@shared_task
def create_notification(user_pk=None):
    user = User.objects.filter(pk=user_pk).first()
    if user:
        print('Created')
    else:
        print("Not found")

#@shared_task
# def count_widgets():
#    return Widget.objects.count()


#@shared_task
# def rename_widget(widget_id, name):
#    w = Widget.objects.get(id=widget_id)
#    w.name = name
#    w.save()