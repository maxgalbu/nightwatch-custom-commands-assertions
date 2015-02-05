events = require('events');

###
# Taken from: https://github.com/beatfactor/nightwatch/issues/246#issuecomment-59461345
# Written by: @dkoo761
#
# This custom command allows us to locate an HTML element on the page and then wait until the value of the element's
# inner text (the text between the opening and closing tags) matches the provided expression (aka. the 'checker' function).
# It retries executing the checker function every 100ms until either it evaluates to true or it reaches
# maxTimeInMilliseconds (which fails the test).
# Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
###

class WaitForText extends events.EventEmitter
	timeoutRetryInMilliseconds: 100
	defaultTimeoutInMilliseconds: 5000

	constructor: ->
		super;
		@startTimeInMilliseconds = null;

	command: (element, checker, timeoutInMilliseconds) ->
		@startTimeInMilliseconds = new Date().getTime();

		if typeof timeoutInMilliseconds != 'number'
			timeoutInMilliseconds = @api.globals.waitForConditionTimeout;
		if typeof timeoutInMilliseconds != 'number'
			timeoutInMilliseconds = @defaultTimeoutInMilliseconds;

		@check(element, checker, (result, loadedTimeInMilliseconds) =>
			if (result)
				message = "waitForText: #{element}.
					Expression was true after #{loadedTimeInMilliseconds - @startTimeInMilliseconds} ms.";
			else
				message = "waitForText: #{element}.
					Expression wasn't true in #{timeoutInMilliseconds} ms.";
			
			@client.assertion(result, 'expression false', 'expression true', message, true);
			@emit('complete');
		, timeoutInMilliseconds);

		return this;

	check: (element, checker, callback, maxTimeInMilliseconds) ->
		@api.getText(element, (result) =>
			now = new Date().getTime();
			if result.status == 0 && checker(result.value)
				callback(true, now);
			else if now - @startTimeInMilliseconds < maxTimeInMilliseconds
				setTimeout(=>
					@check(element, checker, callback, maxTimeInMilliseconds);
				, @timeoutRetryInMilliseconds);
			else
				callback(false);
		);

module.exports = WaitForText;