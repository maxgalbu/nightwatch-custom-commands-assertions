events = require('events');

###*
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
 * @author maxgalbu
 * @param {String} elementSelector - jquery selector for the element
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
###

class WaitForJqueryElement extends events.EventEmitter
	timeoutRetryInMilliseconds: 100
	defaultTimeoutInMilliseconds: 5000

	constructor: ->
		super;
		@startTimeInMilliseconds = null;

	command: (elementSelector, timeoutInMilliseconds) ->
		@startTimeInMilliseconds = new Date().getTime();

		if typeof timeoutInMilliseconds != 'number'
			timeoutInMilliseconds = @api.globals.waitForConditionTimeout;
		if typeof timeoutInMilliseconds != 'number'
			timeoutInMilliseconds = @defaultTimeoutInMilliseconds;

		@check(elementSelector, (result, loadedTimeInMilliseconds) =>
			if result
				message = "WaitForJqueryElement: #{elementSelector}.
					Expression was true after #{loadedTimeInMilliseconds - @startTimeInMilliseconds}.";
			else
				message = "WaitForJqueryElement: #{elementSelector}.
					Expression wasn't true in #{timeoutInMilliseconds} ms.";
			
			@client.assertion(result, 'expression false', 'expression true', message, true);
			@emit('complete');
		, timeoutInMilliseconds);

		return this;

	check: (elementSelector, callback, maxTimeInMilliseconds) ->
		@api.jqueryElement(elementSelector, (result) =>
			now = new Date().getTime();
			if result
				callback(true, now);
			else if now - @startTimeInMilliseconds < maxTimeInMilliseconds
				setTimeout(=>
					@check(elementSelector, callback, maxTimeInMilliseconds);
				, @timeoutRetryInMilliseconds);
			else
				callback(false);
		);

module.exports = WaitForJqueryElement;
