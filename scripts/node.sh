#!/bin/bash

docker run --network host --rm -ti -v $PWD:/badger -e GOOGLE_APPLICATION_CREDENTIALS=/badger/credentials.json --name badger badger bash -c "dumb-init node --experimental-modules src/server/main.mjs"
