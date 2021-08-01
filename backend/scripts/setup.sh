#! /bin/sh

python3 manage.py flush
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser

echo "Enter your superuser email:"
read email

python3 manage.py shell <<EOF
from django.contrib.auth import get_user_model
User = get_user_model()
u  = User.objects.get(email="$email")
u.is_active = True
u.user_type = 3
u.save()
EOF