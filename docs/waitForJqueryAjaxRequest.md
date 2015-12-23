

<!-- Start coffee/commands/waitForJqueryAjaxRequest.coffee -->

This custom command allows us to wait for every AJAX request made by jquery to be completed
It checks for jQuery.active every 100ms until either it evaluates to true or it reaches
maxTimeInMilliseconds (which fails the test).
Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
### Examples:

    browser.WaitForJqueryAjaxRequest();

Author: maxgalbu

### Params:

* **Integer** *[timeoutInMilliseconds]* - timeout of this wait commands in milliseconds

<!-- End coffee/commands/waitForJqueryAjaxRequest.coffee -->

