#!/bin/bash

set -x

docker run --rm -ti -v $PWD:/badger -p 80:80 -e GOOGLE_APPLICATION_CREDENTIALS=/badger/credentials.json --name badger badger bash -c "npm run build && dumb-init node src/js/server.js"
