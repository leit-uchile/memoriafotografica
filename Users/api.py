from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from knox.models import AuthToken
from django.conf import settings
from .serializers import (CreateUserSerializer,UserSerializer, LoginUserSerializer)

User = settings.AUTH_USER_MODEL

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

class ProfileAPI(generics.RetrieveAPIView):
    """
    TODO: Crear Serializador para obtener los datos necesarios para mostrar el perfil de usuario.
            Basarse en UserSerializer :)
          Agregar la URL para llamar a este endpoint
    """
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = EL_SERIALIZADOR_QUE_HAY_QUE_CREAR
    def get_object(self):
        """
        si se descomenta la linea de codigo a continuacion se obtiene
        la informacion del usuario autenticado, hay que buscar una forma de obtener
        el perfil de cualquier usuario.
        """
        #return self.request.user
        pass

class ReportProfileAPI(generics.GenericAPIView):
    """
    TODO: Crear un metodo (post) para generar un reporte del perfil de usuario
    que se esta visitando.
    """
    def post(self, request, *args, **kwargs):
        pass



class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_queryset(self):
        return self.request.user.notes.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
