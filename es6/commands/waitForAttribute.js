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
 *     browser.waitForAttribute("img", "src", function(imageSource) {
 *         return imageSource === "img/header.jpg";
 *     });
 *
 * @author dkoo761
 * @see https://github.com/beatfactor/nightwatch/issues/246#issuecomment-59461345
 * @param {String} elementSelector - css/xpath selector for the element
 * @param {String} attribute - attribute to be checked
 * @param {Function} checker - function that must return true if the attribute matches, false otherwise
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
 * @param {String} [defaultMessage] - message to display
*/

class WaitForAttribute extends events.EventEmitter {
	constructor() {
		super();

		this.timeoutRetryInMilliseconds = this.api.globals.waitForConditionPollInterval || 100;
		this.defaultTimeoutInMilliseconds = this.api.globals.waitForConditionTimeout || 5000;
		this.locateStrategy = "css";
		this.startTimeInMilliseconds = null;
	}

	restoreLocateStrategy() {
		if (this.locateStrategy === "xpath") {
			return this.api.useXpath();
		}
		if (this.locateStrategy === "css") {
			return this.api.useCss();
		}
	}

	command(elementSelector, attribute, checker, timeoutInMilliseconds, defaultMessage) {
		//Save the origian locate strategy, because if this command is used with
		//page objects, the "checker" function of this command is wrapped with another
		//function which resets the locate strategy after the function is called,
		//but since the function is called many times, from the second one the locateStrategy
		//is wrong
		this.locateStrategy = this.client.locateStrategy;

		this.startTimeInMilliseconds = new Date().getTime();

		if (typeof timeoutInMilliseconds !== 'number') {
			timeoutInMilliseconds = this.defaultTimeoutInMilliseconds;
		}
		if (defaultMessage && typeof defaultMessage !== 'string') {
            this.emit('error', "defaultMessage is not a string");
            return;
        }

		this.check(elementSelector, attribute, checker, (result, loadedTimeInMilliseconds) => {
			let message = "";
			if (defaultMessage) {
				message = defaultMessage;
			} else if (result) {
				message = `waitForAttribute: ${elementSelector}@${attribute}. Expression was true after ${loadedTimeInMilliseconds - this.startTimeInMilliseconds}.`;
			} else {
				message = `waitForAttribute: ${elementSelector}@${attribute}. Expression wasn't true in ${timeoutInMilliseconds} ms.`;
			}
			
			this.client.assertion(result, 'expression false', 'expression true', message, true);
			return this.emit('complete');
		}, timeoutInMilliseconds);

		return this;
	}

	check(elementSelector, attribute, checker, callback, maxTimeInMilliseconds) {
		//Restore the origian locate strategy
		this.restoreLocateStrategy();

		return this.api.getAttribute(elementSelector, attribute, result => {
			let now = new Date().getTime();
			if (result.status === 0 && checker(result.value)) {
				return callback(true, now);
			} else if (now - this.startTimeInMilliseconds < maxTimeInMilliseconds) {
				return setTimeout(() => {
					return this.check(elementSelector, attribute, checker, callback, maxTimeInMilliseconds);
				}, this.timeoutRetryInMilliseconds);
			} else {
				return callback(false);
			}
		});
	}
}

export default WaitForAttribute;
