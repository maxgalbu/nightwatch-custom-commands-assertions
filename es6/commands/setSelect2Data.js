/**
 * Set a select2 value using select2("data", object)
 *
 * h3 Examples:
 *
 *     browser.setSelect2Data("input[type=hidden].has-select2", {id:1, text: "hello"})
 *
 * @author maxgalbu
 * @param {String} selector - jQuery selector for the select2 input/select2
 * @param {Object} data - data of the element to be set (see the example)
 * @param {Function} [callback] - function that will be called after the element's value has been set
*/

//=include ../getMultipleSelectors.js

export function command(selector, data, callback) {
	selector = getMultipleSelectors(selector);
	let params = [selector, data];
	
	let execute = function(selector, data) {
		//=include ../getElementFromSelector.js

		let element = getElementFromSelector(selector, {jquery: true});
		element.select2("data", data);
		element.trigger("change");
		return true;
	};
	let execcallback = result => {
		if (callback) {
			return callback.call(this, result);
		}
	};
	
	return this.execute(execute, params, execcallback);
}