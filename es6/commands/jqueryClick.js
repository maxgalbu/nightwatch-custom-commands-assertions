/**
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
*/

//=include ../getMultipleSelectors.js

export function command(selector, callback) {
	selector = getMultipleSelectors(selector);
	let params = [selector];
	
	let execute = function(selector) {
		//=include ../getElementFromSelector.js

		let element = getElementFromSelector(selector, {jquery: true});
		if (element.length) { element[0].click(); }
		return true;
	};
	let execcallback = () => {
		if (callback) {
			return callback.call(this, true);
		}
	};
	
	this.execute(execute, params, execcallback);
	
	return this;
}