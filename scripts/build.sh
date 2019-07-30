#!/bin/bash

set -ex
if [ -d public ]
then
  rm -rf public/*
else
  mkdir public
fi
webpack
npm run-script static
