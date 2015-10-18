###*
 * Assert that the element identified by the selector doesn't have children nodes
 *
 * h3 Examples:
 *
 *     browser
 *         .url("http://www.github.com")
 *         .assert.elementHasNoChildren("#list-of-tasks")
 *
 * @author maxgalbu
 * @param {String} selector - the element selector
 * @param {String} [msg] - output to identify the assertion
###

util = require('util');

#=include ../getMultipleSelectors.coffee

exports.assertion = (selector, msg = null) ->
	@message = msg || util.format('Testing if element <%s> doesn\'t have child nodes', selector);
	@expected = true;
	
	this.pass = (value) =>
		return value == @expected;

	this.value = (result) ->
		return result.value;
	
	this.command = (callback) ->
		selector = getMultipleSelectors(selector)
		params = [selector];
		execute = (selector) ->
			#=include ../getElementFromSelector.coffee

			element = getElementFromSelector(selector);
			if !element
				return false
			return element.children.length == 0;
		execcallback = (result) =>
			if callback
				callback.call(this, result);

		return this.api.execute(execute, params, execcallback);
	
	return;