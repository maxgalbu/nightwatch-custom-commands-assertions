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

#=include ../getMultipleSelectors.coffee

module.exports.command = (selector, callback) ->
	selector = getMultipleSelectors(selector)
	params = [selector];
	
	execute = (selector) ->
		#=include ../getElementFromSelector.coffee

		element = getElementFromSelector(selector, jquery: true);
		element[0].click() if element.length
		return true;
	execcallback = =>
		if callback
			callback.call(this, true);
	
	this.execute(execute, params, execcallback);
	
	return this;