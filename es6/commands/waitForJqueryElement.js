import events from 'events';

/**
 * This custom command allows us to locate an HTML element on the page and then wait until the value of a
 * specified attribute matches the provided expression (aka. the 'checker' function).
 * It retries executing the checker function every 100ms until either it evaluates to true or it reaches
 * maxTimeInMilliseconds (which fails the test). Nightwatch uses the Node.js EventEmitter pattern to handle
 * asynchronous code so this command is also an EventEmitter.
 *
 * h3 Examples:
 *
 *     browser.waitForJqueryElement(".classname:first > input:checked");
 *     browser.waitForJqueryElement(".classname", 10000);
 *
 * @author maxgalbu
 * @param {String} elementSelector - jquery selector for the element
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
 * @param {String} [defaultMessage] - message to display
*/

class WaitForJqueryElement extends events.EventEmitter {
    constructor() {
        super();

        this.timeoutRetryInMilliseconds = this.api.globals.waitForConditionPollInterval || 100;
        this.defaultTimeoutInMilliseconds = this.api.globals.waitForConditionTimeout || 5000;
        this.startTimeInMilliseconds = null;
    }

    command(elementSelector, timeoutInMilliseconds, defaultMessage) {
        this.startTimeInMilliseconds = new Date().getTime();

        if (typeof timeoutInMilliseconds !== 'number') {
            timeoutInMilliseconds = this.defaultTimeoutInMilliseconds;
        }
        if (defaultMessage && typeof defaultMessage !== 'string') {
            this.emit('error', "defaultMessage is not a string");
            return;
        }

        this.check(elementSelector, (result, loadedTimeInMilliseconds) => {
            let message = "";
            if (defaultMessage) {
                message = defaultMessage;
            } else if (result) {
                message = `waitForJqueryElement: ${elementSelector}. Expression was true after ${loadedTimeInMilliseconds - this.startTimeInMilliseconds}.`;
            } else {
                message = `waitForJqueryElement: ${elementSelector}. Expression wasn't true in ${timeoutInMilliseconds} ms.`;
            }
            
            this.client.assertion(result, 'expression false', 'expression true', message, true);
            return this.emit('complete');
        }, timeoutInMilliseconds);

        return this;
    }

    check(elementSelector, callback, maxTimeInMilliseconds) {
        return this.api.jqueryElement(elementSelector, result => {
            let now = new Date().getTime();
            if (result) {
                return callback(true, now);
            } else if (now - this.startTimeInMilliseconds < maxTimeInMilliseconds) {
                return setTimeout(() => {
                    return this.check(elementSelector, callback, maxTimeInMilliseconds);
                }, this.timeoutRetryInMilliseconds);
            } else {
                return callback(false);
            }
        });
    }
}

export default WaitForJqueryElement;
