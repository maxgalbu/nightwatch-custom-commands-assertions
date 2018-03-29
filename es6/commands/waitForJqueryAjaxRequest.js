import events from 'events';

/**
 * This custom command allows us to wait for every AJAX request made by jquery to be completed
 * It checks for jQuery.active every 100ms until either it evaluates to true or it reaches
 * maxTimeInMilliseconds (which fails the test).
 * Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
 *
 * h3 Examples:
 *
 *     browser.waitForJqueryAjaxRequest();
 *
 * @author maxgalbu
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
 * @param {String} [defaultMessage] - message to display
*/

class WaitForJqueryAjaxRequest extends events.EventEmitter {
	constructor() {
		super();

		this.timeoutRetryInMilliseconds = this.api.globals.waitForConditionPollInterval || 100;
		this.defaultTimeoutInMilliseconds = this.api.globals.waitForConditionTimeout || 5000;
		this.startTimeInMilliseconds = null;
	}

	command(timeoutInMilliseconds, defaultMessage) {
		this.startTimeInMilliseconds = new Date().getTime();

		if (typeof timeoutInMilliseconds !== 'number') {
			timeoutInMilliseconds = this.defaultTimeoutInMilliseconds;
		}
		if (defaultMessage && typeof defaultMessage !== 'string') {
            this.emit('error', "defaultMessage is not a string");
            return;
        }

		this.check((result, loadedTimeInMilliseconds) => {
			let message = "";
			if (defaultMessage) {
				message = defaultMessage;
			} else if (result) {
				message = `waitForJqueryAjaxRequest: AJAX requests finished after ${loadedTimeInMilliseconds - this.startTimeInMilliseconds} ms.`;
			} else {
				message = `waitForJqueryAjaxRequest: AJAX requests not finished in ${timeoutInMilliseconds} ms.`;
			}
			
			this.client.assertion(result, 'expression false', 'expression true', message, true);
			return this.emit('complete');
		}, timeoutInMilliseconds);

		return this;
	}

	check(callback, maxTimeInMilliseconds) {
		let executeFunc = selector => jQuery.active;

		return this.api.execute(executeFunc, [], result => {
			let now = new Date().getTime();
			if (result.status === 0 && result.value === 0) {
				return callback(true, now);
			} else if (now - this.startTimeInMilliseconds < maxTimeInMilliseconds) {
				return setTimeout(() => {
					return this.check(callback, maxTimeInMilliseconds);
				}, this.timeoutRetryInMilliseconds);
			} else {
				return callback(false);
			}
		});
	}
}

export default WaitForJqueryAjaxRequest;