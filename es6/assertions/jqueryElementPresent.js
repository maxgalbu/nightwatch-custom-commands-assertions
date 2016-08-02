/**
 * Assert that the element identified by the jquery selector exists in the DOM.
 * ***Requires jqueryElement command***
 *
 * h3 Examples:
 *
 *     browser
 *         .url("http://www.github.com")
 *         .assert.jqueryElementPresent("div:eq(2)")
 *
 * @author maxgalbu
 * @param {String} selector - jQuery selector
 * @param {String} [msg] - output to identify the assertion
*/

import util from 'util';

export function assertion(selector, msg) {
	this.message = msg || util.format('Testing if element <%s> is present.', selector);
	this.expected = 'present';
	
	this.pass = value => !!value;

	this.value = function(result) {
		let value = null;
		if (result) {
			value = !!result;
		}
		return value;
	};
	
	this.command = function(callback) {
		return this.api.jqueryElement(selector, callback);
	};
	
}