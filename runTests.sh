#!/usr/bin/env bash

if [ ! -f ./node_modules/.bin/nightwatch ]; then
	echo "Nightwatch not installed. This is necessary for running tests"
	echo "Run `npm install` to install it locally"
	exit 1
fi

NIGHTWATCH_ENV=${NIGHTWATCH_ENV:-default}

#Run background jobs
echo "Starting mockserver..."
java -Droot.logLevel=OFF -Dmockserver.logLevel=OFF -jar tests/mockserver-netty-3.9.17-jar-with-dependencies.jar -serverPort 9999 > /dev/null 2>&1 &
MOCKSERVER_PID=$!
sleep 3

trap ctrl_c INT
function ctrl_c() {
	echo "Killing mockserver..."
	kill $MOCKSERVER_PID > /dev/null 2>&1
	wait

	exit 1
}

cd tests

#Set the urls of the mockserver
echo "Creating mocks..."
node setMocks.js

#Run tests
../node_modules/.bin/nightwatch --test --env "$NIGHTWATCH_ENV"
status_nightwatch=$?

cd ..

echo "Killing mockserver..."
kill $MOCKSERVER_PID > /dev/null 2>&1
wait

if [[ ${status_nightwatch} != 0 ]] ; then
    exit ${status_nightwatch}
fi
