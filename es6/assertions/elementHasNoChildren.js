/**
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
*/

import util from 'util';

//=include ../getMultipleSelectors.js

export function assertion(selector, msg = null) {
	this.message = msg || util.format('Testing if element <%s> doesn\'t have child nodes', selector);
	this.expected = true;
	
	this.pass = value => {
		return value === this.expected;
	};

	this.value = result => result.value;
	
	this.command = function(callback) {
		selector = getMultipleSelectors(selector);
		let params = [selector];
		let execute = function(selector) {
			//=include ../getElementFromSelector.js

			let element = getElementFromSelector(selector);
			if (!element) {
				return false;
			}
			return element.children.length === 0;
		};
		let execcallback = result => {
			if (callback) {
				return callback.call(this, result);
			}
		};

		return this.api.execute(execute, params, execcallback);
	};
	
}