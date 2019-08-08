#!/bin/bash

docker run --rm -ti -v home:/root -v $PWD:/workspace -w /workspace badger bash

