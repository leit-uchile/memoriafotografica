from rest_framework import permissions

from Users.models import User


class IsOwner(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
            # Instance must have an attribute named `owner`.

        return obj.user_set.first() == request.user

class FilterContent(permissions.BasePermission):
    def has_permission(self, request, view):
        #Leer los permisos asignados al usuario
        user_type = request.user.user_type
        try:
            c = request.data['censure']
            return user_type != 1
        except KeyError:
            return True

class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS
