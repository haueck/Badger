#!/bin/bash

docker run --rm -ti -v home:/root -v $PWD:/workspace -v $PWD/../Legacy:/legacy -e GOOGLE_APPLICATION_CREDENTIALS=/workspace/credentials.json -w /workspace badger bash

