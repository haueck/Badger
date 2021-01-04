#!/bin/bash

rm -rf $HOME/letsencrypt $HOME/certificates
mkdir $HOME/letsencrypt
mkdir $HOME/certificates
docker run -it --rm -p 80:80 -v $HOME/letsencrypt:/etc/letsencrypt certbot/certbot certonly
cp $HOME/letsencrypt/archive/www.badger-sett.com/privkey1.pem $HOME/certificates/privkey.pem
cp $HOME/letsencrypt/archive/www.badger-sett.com/fullchain1.pem $HOME/certificates/fullchain.pem
