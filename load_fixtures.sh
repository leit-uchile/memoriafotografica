#! /bin/sh

sudo docker-compose run backend manage.py loaddata IPTC_keywords.json
sudo docker-compose run backend manage.py loaddata Base_news.json