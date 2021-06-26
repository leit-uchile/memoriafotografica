
from knox.auth import TokenAuthentication

class GuestOrUserAuth(TokenAuthentication):
    def validate_user(self, auth_token):
        if (
            not auth_token.user.completed_registration and not auth_token.user.is_active
            ) or (
                auth_token.user.is_active and auth_token.user.completed_registration
            ):
            return (auth_token.user, auth_token)
        else:
            raise exceptions.AuthenticationFailed(
                _('User is not a guest.'))


