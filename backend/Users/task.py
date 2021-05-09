# Create your tasks here
from rest_framework import status
from rest_framework.response import Response
from celery import shared_task
from .models import User
from Gallery.models import Photo, Comment
from .serializers import NotificationSerializer

messages = [
    [
        "Ha activado su cuenta exitosamente.",
        "Una de sus fotografías ha sido aprobada.",
        "Uno de sus comentarios ha sido aprobado."
    ],[
        "Su usuario ha sido editado por no cumplir con nuestras normas o para corregir información.",
        "Una de sus fotografías ha sido editada por no cumplir con nuestras normas o para corregir información.",
        "Uno de sus comentarios ha sido editado por no cumplir con nuestras normas."
    ],[
        "Su cuenta ha sido censurada. No podrá hacer uso de la plataforma.",
        "Una de sus fotografías ha sido censurada por no cumplir con nuestras normas.",
        "Uno de sus comentarios ha sido censurado por no cumplir con nuestras normas.",
    ]]

@shared_task
def create_notification(content_pk=None, type=1, content=1):
    """
    Creates a notification to the author of the content
    Content_pk: Content id,
    Type: Approved, Edited, Censured
    Content: User, Photo, Comment 
    """
    if content==1:
        user = User.objects.get(pk=content_pk)
    elif content==2:
        user = Photo.objects.get(pk=content_pk).user_set.first() 
    elif content==3:
        user = Comment.objects.get(pk=content_pk).user_set.first()
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    if (type>=1 and type<=3):
        message = messages[type-1][content-1]
        serializer = NotificationSerializer(data={
            'type': type, 
            'content': content,
            'message': message
            })
        if serializer.is_valid():
            notification = serializer.save()
            user.notifications.add(notification)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)
    