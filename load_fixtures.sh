#! /bin/sh

sudo docker-compose run backend python3 manage.py loaddata IPTC_keywords.json
sudo docker-compose run backend python3 manage.py loaddata Base_news.json