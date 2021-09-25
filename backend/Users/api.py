from rest_framework import generics
from rest_framework.response import Response
from knox.models import AuthToken

from Users.serializers import LoginUserSerializer, UserSerializer


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
