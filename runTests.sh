#Lint the coffee files
coffeelint -r coffee/

(
	cd tests

	#Set the urls of the mockserver
	node setMocks.js

	#Run tests
	nightwatch --test
)