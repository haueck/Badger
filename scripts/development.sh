#!/bin/bash

if [ ! -e certificates ]
then
  ln -s server/certificates certificates
fi
if [ ! -e dist ]
then
  ln -s client/dist dist
fi
export GOOGLE_APPLICATION_CREDENTIALS="/badger/credentials.json"
docker run --network host --rm -ti -v home:/root -v $PWD:/badger -e GOOGLE_APPLICATION_CREDENTIALS -w /badger node:12-buster-slim bash

