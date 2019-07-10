#!/bin/bash

set -ex
webpack
mkdir public/css
cp -R src/html/index.html images images/favicons/favicon.ico public
cp -R node_modules/tinymce/skins/ public/css/tinymce
HASH=`ls public/js/bundle.*.js | sed "s/.\+\/bundle\.//" | sed "s/\.js//"`
sed -i "s/{contenthash}/$HASH/" public/index.html
