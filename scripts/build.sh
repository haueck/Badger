#!/bin/bash

set -ex
webpack
cp -R src/html/* src/css images images/favicons/favicon.ico public
HASH=`ls public/js/bundle.* | sed "s/.\+\/bundle\.//" | sed "s/\.js//"`
sed -i "s/{contenthash}/$HASH/" public/index.html
