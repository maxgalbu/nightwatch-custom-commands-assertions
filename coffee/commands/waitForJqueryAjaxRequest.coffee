events = require('events');

###*
 * This custom command allows us to wait for every AJAX request made by jquery to be completed
 * It checks for jQuery.active every 100ms until either it evaluates to true or it reaches
 * maxTimeInMilliseconds (which fails the test).
 * Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
 *
 * h3 Examples:
 *
 *     browser.WaitForJqueryAjaxRequest();
 *
 * @author maxgalbu
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
###

class WaitForJqueryAjaxRequest extends events.EventEmitter
	timeoutRetryInMilliseconds: 100
	defaultTimeoutInMilliseconds: 5000

	constructor: ->
		super;
		@startTimeInMilliseconds = null;

	command: (timeoutInMilliseconds) ->
		@startTimeInMilliseconds = new Date().getTime();

		if typeof timeoutInMilliseconds != 'number'
			timeoutInMilliseconds = @api.globals.waitForConditionTimeout;
		if typeof timeoutInMilliseconds != 'number'
			timeoutInMilliseconds = @defaultTimeoutInMilliseconds;

		@check((result, loadedTimeInMilliseconds) =>
			if (result)
				message = "WaitForJqueryAjaxRequest: AJAX requests finished after #{loadedTimeInMilliseconds - @startTimeInMilliseconds} ms.";
			else
				message = "WaitForJqueryAjaxRequest: AJAX requests not finished in #{timeoutInMilliseconds} ms.";
			
			@client.assertion(result, 'expression false', 'expression true', message, true);
			@emit('complete');
		, timeoutInMilliseconds);

		return this;

	check: (callback, maxTimeInMilliseconds) ->
		executeFunc = (selector) ->
			return jQuery.active;

		@api.execute(executeFunc, [], (result) =>
			now = new Date().getTime();
			if result.status == 0 && result.value == 0
				callback(true, now);
			else if now - @startTimeInMilliseconds < maxTimeInMilliseconds
				setTimeout(=>
					@check(callback, maxTimeInMilliseconds);
				, @timeoutRetryInMilliseconds);
			else
				callback(false);
		);

module.exports = WaitForJqueryAjaxRequest;