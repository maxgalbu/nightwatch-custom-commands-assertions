events = require('events');

###*
 * This custom command allows us to wait until the value of the page title matches the provided expression
 * (aka. the 'checker' function).
 * It retries executing the checker function every 100ms until either it evaluates to true or it reaches
 * maxTimeInMilliseconds (which fails the test).
 * Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
 *
 * h3 Examples:
 *
 *     browser.waitForTitle(function(title) {
 *         return title === "something";
 *     });
 *
 * @author dkoo761
 * @see https://github.com/beatfactor/nightwatch/issues/246#issuecomment-59461345
 * @param {Function} checker - function that must return true if the title matches your requisite, false otherwise
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
###

class WaitForTitle extends events.EventEmitter
	timeoutRetryInMilliseconds: 100
	defaultTimeoutInMilliseconds: 5000

	constructor: ->
		super;
		@startTimeInMilliseconds = null;

	command: (checker, timeoutInMilliseconds) ->
		@startTimeInMilliseconds = new Date().getTime();

		if typeof timeoutInMilliseconds != 'number'
			timeoutInMilliseconds = @api.globals.waitForConditionTimeout;
		if typeof timeoutInMilliseconds != 'number'
			timeoutInMilliseconds = @defaultTimeoutInMilliseconds;

		@check(checker, (result, loadedTimeInMilliseconds) =>
			if result
				message = "waitForTitle: Expression was true after
					#{loadedTimeInMilliseconds - @startTimeInMilliseconds}.";
			else
				message = "WaitForTitle: #{element}@#{attribute}.
					Expression wasn't true in #{timeoutInMilliseconds} ms.";
			
			@client.assertion(result, 'expression false', 'expression true', message, true);
			@emit('complete');
		, timeoutInMilliseconds);

		return this;

	check: (checker, callback, maxTimeInMilliseconds) ->
		@api.getTitle((title) =>
			now = new Date().getTime();
			if checker(title)
				callback(true, now);
			else if now - @startTimeInMilliseconds < maxTimeInMilliseconds
				setTimeout(=>
					@check(checker, callback, maxTimeInMilliseconds);
				, @timeoutRetryInMilliseconds);
			else
				callback(false);
		);

module.exports = WaitForTitle;
