import events from 'events';

/**
 * This custom command allows us to wait until the page is fully loaded. It checks document.readyState
 * every 100ms until its value is "complete" or the timeout is reached.
 * Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
 *
 * h3 Examples:
 *
 *     browser.waitForDocumentLoaded();
 *     browser.waitForDocumentLoaded(5000, 'Document fully loaded!');
 *
 * @author rober710
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
 * @param {String} [message] - message to display
 */

class WaitForDocumentLoaded extends events.EventEmitter {
    constructor() {
        super();
        this.timeoutRetryInMilliseconds = this.api.globals.waitForConditionPollInterval || 100;
        this.defaultTimeoutInMilliseconds = this.api.globals.waitForConditionTimeout || 5000;
        this.startTimeInMilliseconds = null;
    }

    command(timeoutInMilliseconds, message) {
        this.startTimeInMilliseconds = new Date().getTime();

        if (typeof timeoutInMilliseconds !== 'number') {
            timeoutInMilliseconds = this.defaultTimeoutInMilliseconds;
        }

        if (message && typeof message !== 'string') {
            this.emit('error', "defaultMessage is not a string");
            return;
        }

        this.check((pageLoaded, loadedTimeInMilliseconds, readyState) => {
            let messageToShow;
            if (message) {
                messageToShow = message;
            } else if (pageLoaded) {
                messageToShow = `waitForDocumentLoaded: document fully loaded after ${loadedTimeInMilliseconds - this.startTimeInMilliseconds} ms.`;
            } else {
                messageToShow = `waitForDocumentLoaded: document not loaded after ${timeoutInMilliseconds} ms.`;
            }

            this.client.assertion(pageLoaded, readyState, 'complete', messageToShow, true);
            return this.emit('complete');
        }, timeoutInMilliseconds);
    }

    check(callback, maxTimeInMilliseconds) {
        return this.api.execute(function () {
            return document.readyState;
        }, [], result => {
            let now = new Date().getTime();
            if (result.status === 0 && result.value === 'complete') {
                return callback(true, now, result.value);
            } else if (now - this.startTimeInMilliseconds < maxTimeInMilliseconds) {
                return setTimeout(() => {
                    this.check(callback, maxTimeInMilliseconds);
                }, this.timeoutRetryInMilliseconds);
            } else {
                return callback(false, now, result.value);
            }
        });
    }
}

export default WaitForDocumentLoaded;
