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
 * @author dkoo761
 * @see https://github.com/beatfactor/nightwatch/issues/246#issuecomment-59461345
 * @param {String} elementSelector - css/xpath selector for the element
 * @param {String} attribute - attribute to be checked
 * @param {Function} checker - function that must return true if the attribute matches, false otherwise
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
###

class WaitForAttribute extends events.EventEmitter
	timeoutRetryInMilliseconds: 100
	defaultTimeoutInMilliseconds: 5000
	locateStrategy: "css"

	constructor: ->
		super;
		@startTimeInMilliseconds = null;

	restoreLocateStrategy: ->
		@api.useXpath() if @locateStrategy == "xpath"
		@api.useCss() if @locateStrategy == "css"

	command: (elementSelector, attribute, checker, timeoutInMilliseconds) ->
		#Save the origian locate strategy, because if this command is used with
		#page objects, the "checker" function of this command is wrapped with another
		#function which resets the locate strategy after the function is called,
		#but since the function is called many times, from the second one the locateStrategy
		#is wrong
		@locateStrategy = @client.locateStrategy;

		@startTimeInMilliseconds = new Date().getTime();

		if typeof timeoutInMilliseconds != 'number'
			timeoutInMilliseconds = @api.globals.waitForConditionTimeout;
		if typeof timeoutInMilliseconds != 'number'
			timeoutInMilliseconds = @defaultTimeoutInMilliseconds;

		@check(elementSelector, attribute, checker, (result, loadedTimeInMilliseconds) =>
			if result
				message = "waitForAttribute: #{elementSelector}@#{attribute}.
					Expression was true after #{loadedTimeInMilliseconds - @startTimeInMilliseconds}.";
			else
				message = "waitForAttribute: #{elementSelector}@#{attribute}.
					Expression wasn't true in #{timeoutInMilliseconds} ms.";
			
			@client.assertion(result, 'expression false', 'expression true', message, true);
			@emit('complete');
		, timeoutInMilliseconds);

		return this;

	check: (elementSelector, attribute, checker, callback, maxTimeInMilliseconds) ->
		#Restore the origian locate strategy
		@restoreLocateStrategy();

		@api.getAttribute(elementSelector, attribute, (result) =>
			now = new Date().getTime();
			if result.status == 0 && checker(result.value)
				callback(true, now);
			else if now - @startTimeInMilliseconds < maxTimeInMilliseconds
				setTimeout(=>
					@check(elementSelector, attribute, checker, callback, maxTimeInMilliseconds);
				, @timeoutRetryInMilliseconds);
			else
				callback(false);
		);

module.exports = WaitForAttribute;
