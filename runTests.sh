#!/usr/bin/env bash

NIGHTWATCH_ENV=${NIGHTWATCH_ENV:-default}

#Lint the coffee files
coffeelint -r coffee/
status_coffeelint=$?

#Run background jobs
java -jar tests/mockserver-netty-3.9.1-jar-with-dependencies.jar -serverPort 9999 > /dev/null 2>&1 &
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

if [[ ${status_coffeelint} != 0 ]] ; then
    exit ${status_coffeelint}
fi

if [[ ${status_nightwatch} != 0 ]] ; then
    exit ${status_nightwatch}
fi
