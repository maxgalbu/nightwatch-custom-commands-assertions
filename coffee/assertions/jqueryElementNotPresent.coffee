###*
 * assert that the element identified by the jquery selector does NOT exist in the DOM.
 * ***Requires jqueryElement command***
 *
 * h3 Examples:
 *
 *     browser
 *         .url("http://www.github.com")
 *         .assert.jqueryElementNotPresent("div:eq(10000)")
 *
 * @author maxgalbu
 * @param {String} selector - jQuery selector
 * @param {String} [msg] - output to identify the assertion
###

util = require('util');

exports.assertion = (selector, msg) ->
	this.message = msg || util.format('Testing if element <%s> is not present.', selector);
	this.expected = 'present';
	
	this.pass = (value) ->
		return !value;

	this.value = (result) ->
		return false if !result;
		return result.value;
	
	this.command = (callback) ->
		return this.api.jqueryElement(selector, callback);
	
	return;