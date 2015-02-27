###*
 * Clicks an element using jquery selectors.
 *
 * h3 Examples:
 *
 *     browser.jqueryClick(".classname:first > input:checked")
 *     browser.jqueryClick("div:has(.classname):contains('something'):last")
 *
 * @author maxgalbu
 * @param {String} selector - jQuery selector for the element
 * @param {Function} [callback] - function that will be called after the element is clicked
###

module.exports.command = (selector, callback) ->
	params = [selector];
	
	execute = (selector) ->
		$(selector).click();
		return true;
	execcallback = =>
		if callback
			callback.call(this, true);
	
	this.execute(execute, params, execcallback);
	
	return this;