#!/usr/bin/env bash

if ! which nightwatch ; then
	echo "Nightwatch not installed globally. This is necessary for running tests"
	echo "npm install nightwatch -g"
	exit 1
fi

NIGHTWATCH_ENV=${NIGHTWATCH_ENV:-default}

#Run background jobs
java -Droot.logLevel=OFF -Dmockserver.logLevel=OFF -jar tests/mockserver-netty-3.9.17-jar-with-dependencies.jar -serverPort 9999 > /dev/null 2>&1 &
sleep 3

cd tests

#Set the urls of the mockserver
node setMocks.js

#Run tests
nightwatch --test --env "$NIGHTWATCH_ENV"
status_nightwatch=$?

cd ..

#Kill background jobs
killall java
wait

if [[ ${status_nightwatch} != 0 ]] ; then
    exit ${status_nightwatch}
fi
