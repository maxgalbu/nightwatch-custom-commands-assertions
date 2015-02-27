

<!-- Start coffee/commands/waitForTitle.coffee -->

This custom command allows us to wait until the value of the page title matches the provided expression
(aka. the 'checker' function).
It retries executing the checker function every 100ms until either it evaluates to true or it reaches
maxTimeInMilliseconds (which fails the test).
Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
### Examples:

    browser.waitForTitle(function(title) {
        return title === "something";
    });

Author: dkoo761

See: https://github.com/beatfactor/nightwatch/issues/246#issuecomment-59461345

### Params:

* **Function** *checker* - function that must return true if the title matches your requisite, false otherwise
* **Integer** *[timeoutInMilliseconds]* - timeout of this wait commands in milliseconds

<!-- End coffee/commands/waitForTitle.coffee -->

