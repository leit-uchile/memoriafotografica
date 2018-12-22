from rest_framework import permissions
from Users.models import User


class IsColaborator(permissions.BasePermission):

    def has_object_permission(self, request, view):
        if request.user.user_type == 1:
            return True
        else:
            return False


class IsCurator(permissions.BasePermission):

    def has_object_permission(self, request, view):
        if request.user.user_type == 2:
            return True
        else:
            return False


class IsAdmin(permissions.BasePermission):

    def has_object_permission(self, request, view):
        if request.user.user_type == 3:
            return True
        else:
            return False