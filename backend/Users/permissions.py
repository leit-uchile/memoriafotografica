from rest_framework import permissions

from Users.models import User


class IsColaborator(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.user_type == 1:
            return True
        else:
            return False


class IsCurator(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.user_type == 2:
            return True
        else:
            return False


class IsAdmin(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.user_type == 3:
            return True
        else:
            return False

class ModifyUserType(permissions.BasePermission):
    def has_permission(self, request, view):
        user_type = request.user.user_type
        try:
            c = request.data['user_type']
            return user_type == 3
        except KeyError:
            return True

