#! /bin/bash

BADGER_IMAGE="gcr.io/badger-218310/badger:latest"
BADGER_CONTAINER="badger"
BADGER_SEARCH_IMAGE="gcr.io/badger-218310/badger-search:latest"
BADGER_SEARCH_CONTAINER="badger-search"

function stop_container() {
    if [ "$(docker ps -aq -f name=$1)" ]
    then
        docker stop $1
        docker rm $1
    fi
}

if [ ! "$(docker network ls --filter name=local --format='{{ .Name }}')" ]
then
    docker network create --subnet=172.16.0.0/16 local
fi

stop_container $BADGER_CONTAINER
stop_container $BADGER_SEARCH_CONTAINER

docker pull $BADGER_IMAGE
docker pull $BADGER_SEARCH_IMAGE

if [ "$(docker images -f "dangling=true" -q)" ]
then
    docker rmi -f $(docker images -f "dangling=true" -q)
fi

docker run -d --log-driver=gcplogs --restart=on-failure:5 --net=local --ip=172.16.0.2 --add-host=badger_search:172.16.0.3 --publish=80:80 --name=$BADGER_CONTAINER $BADGER_IMAGE
docker run -d --log-driver=gcplogs --restart=on-failure:5 --net=local --ip=172.16.0.3 --name=$BADGER_SEARCH_CONTAINER $BADGER_SEARCH_IMAGE
