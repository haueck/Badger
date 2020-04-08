#!/bin/bash

docker run -it --rm -p 80:80 -v $HOME/letsencrypt:/etc/letsencrypt certbot/certbot certonly

