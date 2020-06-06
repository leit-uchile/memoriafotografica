#! /bin/sh

sudo docker-compose run backend python3 manage.py flush
sudo docker-compose run backend python3 manage.py makemigrations
sudo docker-compose run backend python3 manage.py migrate
sudo docker-compose run backend python3 manage.py createsuperuser