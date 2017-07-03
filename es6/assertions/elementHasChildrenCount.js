/**
 * Assert that the element identified by the selector has a number of children nodes
 * that match the children selectors (if passed)
 *
 * h3 Examples:
 *
 *     browser
 *         .url("http://www.github.com")
 *         .assert.elementHasChildrenCount("#list-of-tasks", 10)
 *
 *     browser
 *         .url("http://www.github.com")
 *         .assert.elementHasChildrenCount("#list-of-tasks", 1, ".myclass, li input:checked")
 *
 * @author maxgalbu
 * @param {String} selector - the element selector
 * @param {Integer} children_count - number of elements that should match
 * @param {String} [children_selectors] - a list of selectors for children nodes
 * @param {String} [msg] - output to identify the assertion
 */

import util from 'util';

//=include ../getMultipleSelectors.js

export function assertion(selector, children_count, children_selectors = "", msg = null) {
	this.message = msg;
	if (!this.message) {
		if (children_selectors)
			this.message = util.format('Testing if element <%s> has %d child nodes that matches these selectors: \'%s\'',
				selector, children_count, children_selectors);
		else
			this.message = util.format('Testing if element <%s> has %d child nodes', selector, children_count);
	}
	this.expected = children_count;
	
	this.pass = (value) => {
		return value == this.expected;
	};

	this.value = (result) => {
		if (result.value.error) {
			console.error(result.value.message);
		}
		return result.value;
	};
	
	this.command = (callback) => {
		selector = getMultipleSelectors(selector);
		let children_selectors = getMultipleSelectors(children_selectors);
		let params = [selector, children_selectors];
		let execute = (selector, children_selectors) => {
			//=include ../getElementFromSelector.js

			let element = getElementFromSelector(selector);
			if (!element) {
				return -1;
			}
			
			if (!children_selectors) {
				return element.children.length;
			} else {
				let children = getElementFromSelector(children_selectors, {return_all: true, parent_element: element});
				return children.length;
			}
		};
		let execcallback = (result) => {
			if (callback)
				callback.call(this, result);
		};
		
		return this.api.execute(execute, params, execcallback);
	};
}
