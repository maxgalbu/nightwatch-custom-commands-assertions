

<!-- Start coffee/commands/waitForAttribute.coffee -->

This custom command allows us to locate an HTML element on the page and then wait until the value of a
specified attribute matches the provided expression (aka. the 'checker' function).
It retries executing the checker function every 100ms until either it evaluates to true or it reaches
maxTimeInMilliseconds (which fails the test). Nightwatch uses the Node.js EventEmitter pattern to handle
asynchronous code so this command is also an EventEmitter.
### Examples:

    browser.waitForAttribute("img", "src", function(imageSource) {
        return imageSource === "img/header.jpg";
    });

Author: dkoo761

See: https://github.com/beatfactor/nightwatch/issues/246#issuecomment-59461345

### Params:

* **String** *elementSelector* - css/xpath selector for the element
* **String** *attribute* - attribute to be checked
* **Function** *checker* - function that must return true if the attribute matches, false otherwise
* **Integer** *[timeoutInMilliseconds]* - timeout of this wait commands in milliseconds

<!-- End coffee/commands/waitForAttribute.coffee -->

