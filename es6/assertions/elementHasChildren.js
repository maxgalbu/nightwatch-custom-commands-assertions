/**
 * Assert that the element identified by the selector has children nodes
 * that matches the children selectors (if passed)
 *
 * h3 Examples:
 *
 *     browser
 *         .url("http://www.github.com")
 *         .assert.elementHasChildren("#list-of-tasks", "div, span")
 *
 *     browser
 *         .url("http://www.github.com")
 *         .assert.elementHasChildren("#list-of-tasks", ".myclass, li input:checked")
 *
 * @author maxgalbu
 * @param {String} selector - the element selector
 * @param {String} [children_selectors] - a list of selectors for children nodes
 * @param {String} [msg] - output to identify the assertion
 */

import util from 'util';

//=include ../getMultipleSelectors.js

export function assertion(selector, children_selectors = "", msg = null) {
	this.message = msg;
	if (!this.message) {
		if (children_selectors)
			this.message = util.format('Testing if element <%s> has child nodes that matches these selectors: \'%s\'', selector, children_selectors);
		else
			this.message = util.format('Testing if element <%s> has child nodes', selector);
	}
	this.expected = true;
	
	this.pass = (value) => {
		return value == this.expected;
	};

	this.value = (result) => {
		return !!result.value;
	};
	
	this.command = (callback) => {
		selector = getMultipleSelectors(selector);
		let children_selectors = getMultipleSelectors(children_selectors);
		let params = [selector, children_selectors];
		let execute = (selector, children_selectors) => {
			//=include ../getElementFromSelector.js

			element = getElementFromSelector(selector);
			if (!element) {
				return false;
			}
			
			if (!children_selectors) {
				return element.children.length !== 0;
			} else {
				children = getElementFromSelector(children_selectors, {return_all: true, parent_element: element});
				return children.length !== 0;
			}
		};
		let execcallback = (result) => {
			if (callback)
				callback.call(this, result);
		};
		
		return this.api.execute(execute, params, execcallback);
	};
}