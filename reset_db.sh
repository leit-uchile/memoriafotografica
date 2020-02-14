#! /bin/sh

sudo docker-compose run backend python3 manage.py flush
sudo rm -f backend/db.sqlite3
sudo docker-compose run backend python3 manage.py makemigrations
sudo docker-compose run backend python3 manage.py migrate
sudo docker-compose run backend python3 manage.py createsuperuser