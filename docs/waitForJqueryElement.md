

<!-- Start es6/commands/waitForJqueryElement.js -->

## WaitForJqueryElement

This custom command allows us to locate an HTML element on the page and then wait until the value of a
specified attribute matches the provided expression (aka. the 'checker' function).
It retries executing the checker function every 100ms until either it evaluates to true or it reaches
maxTimeInMilliseconds (which fails the test). Nightwatch uses the Node.js EventEmitter pattern to handle
asynchronous code so this command is also an EventEmitter.
### Examples:

    browser.waitForJqueryElement(".classname:first > input:checked");
    browser.waitForJqueryElement(".classname", 10000);

Author: maxgalbu

### Params:

* **String** *elementSelector* - jquery selector for the element
* **Integer** *[timeoutInMilliseconds]* - timeout of this wait commands in milliseconds
* **String** *[defaultMessage]* - message to display

<!-- End es6/commands/waitForJqueryElement.js -->

