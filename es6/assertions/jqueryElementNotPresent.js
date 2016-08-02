/**
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
*/

import util from 'util';

export function assertion(selector, msg) {
	this.message = msg || util.format('Testing if element <%s> is not present.', selector);
	this.expected = 'present';
	
	this.pass = value => !value;

	this.value = function(result) {
		if (!result) {
			return false;
		}
		return result.value;
	};
	
	this.command = function(callback) {
		return this.api.jqueryElement(selector, callback);
	};
	
}