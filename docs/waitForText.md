

<!-- Start es6/commands/waitForText.js -->

## WaitForText

This custom command allows us to locate an HTML element on the page and then wait until the value of the element's
inner text (the text between the opening and closing tags) matches the provided expression (aka. the 'checker' function).
It retries executing the checker function every 100ms until either it evaluates to true or it reaches
maxTimeInMilliseconds (which fails the test).
Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
### Examples:

    browser.waitForText("div", function(text) {
        return text === "something";
    });

Author: dkoo761

See: https://github.com/beatfactor/nightwatch/issues/246#issuecomment-59461345

### Params:

* **String** *elementSelector* - css/xpath selector for the element
* **Function** *checker* - function that must return true if the element's text matches your requisite, false otherwise
* **Integer** *[timeoutInMilliseconds]* - timeout of this wait commands in milliseconds
* **String** *[defaultMessage]* - message to display

<!-- End es6/commands/waitForText.js -->

