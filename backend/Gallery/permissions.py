from rest_framework import permissions
from Users.models import User


class UserObjectPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        print(request.method)
        if request.method in ['GET', 'POST']:
            return True
        if(not request.user.is_anonymous):
            return True
        return False
