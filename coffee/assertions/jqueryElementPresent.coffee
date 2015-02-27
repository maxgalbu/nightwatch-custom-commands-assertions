###*
 * Assert that the url matches the regex provided.
 * ***Requires jqueryElement command***
 *
 * h3 Examples:
 *
 *     browser
 *         .url("http://www.github.com")
 *         .assert.jqueryElementPresent("div:eq(2)")
 *
 * @author maxgalbu
 * @param {RegExp} selector - jQuery selector
 * @param {String} [msg] - output to identify the assertion
###

util = require('util');

exports.assertion = (selector, msg) ->
	this.message = msg || util.format('Testing if element <%s> is present.', selector);
	this.expected = 'present';
	
	this.pass = (value) ->
		return !!value;

	this.value = (result) ->
		value = null;
		if result
			value = !!result;
		return value;
	
	this.command = (callback) ->
		return this.api.jqueryElement(selector, callback);
	
	return;