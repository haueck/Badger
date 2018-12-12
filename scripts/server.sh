#!/bin/bash

set -x

docker run --network host --rm -ti -v $PWD:/badger -e GOOGLE_APPLICATION_CREDENTIALS=/badger/credentials.json --name badger badger bash -c "npm run build && dumb-init node src/js/server.js"
