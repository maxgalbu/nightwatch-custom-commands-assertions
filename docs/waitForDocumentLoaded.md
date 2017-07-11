

<!-- Start es6/commands/waitForDocumentLoaded.js -->

## WaitForDocumentLoaded

This custom command allows us to wait until the page is fully loaded. It checks document.readyState
every 100ms until its value is "complete" or the timeout is reached.
Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
### Examples:

    browser.waitForDocumentLoaded();
    browser.waitForDocumentLoaded(5000, 'Document fully loaded!');

Author: rober710

### Params:

* **Integer** *[timeoutInMilliseconds]* - timeout of this wait commands in milliseconds
* **String** *[message]* - message to display

<!-- End es6/commands/waitForDocumentLoaded.js -->

