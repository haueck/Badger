#!/bin/bash

set -ex
rm -rf public/{css,images}
mkdir -p public/css
cp -R src/html/index.html images images/favicons/favicon.ico public
cp -R node_modules/tinymce/skins/ public/css/tinymce
