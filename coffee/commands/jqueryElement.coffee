###*
 * Returns an element using jquery selectors
 *
 * h3 Examples:
 *
 *     browser.jqueryElement(".classname:first > input:checked", function(element) {
 *         //element is the DOM element
 *     })
 *     browser.jqueryElement("div:has(.classname):contains('something'):last", function(element) {
 *         //element is the DOM element
 *     })
 *
 * @author maxgalbu
 * @param {String} selector - jQuery selector for the element
 * @param {Function} callback - function that will be called with the element as argument
###

module.exports.command = (selector, callback) ->
	params = [selector];
	
	execute = (selector) ->
		return $(selector).get(0);
	execcallback = (result) =>
		if callback
			callback.call(this, result.value);
	
	this.execute(execute, params, execcallback);
	
	return this;