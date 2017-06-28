/**
 * Set a value on an `<input>` or a `<select>` and trigger a `change` event
 *
 * h3 Examples:
 *
 *     browser.setValueAndTrigger("#a-select-or-input", "some value")
 *
 * @author maxgalbu
 * @param {String} selector - jQuery selector for the element
 * @param {String} value - value of the element to be set
 * @param {Function} [callback] - function that will be called after the change event is triggered
 * @param {String} [message] - message to display
*/

//=include ../getMultipleSelectors.js

export function command(selector, value, callback) {
	selector = getMultipleSelectors(selector);
	let params = [selector, value];
	
	let execute = function(selector, value) {
		//=include ../getElementFromSelector.js

		let element = getElementFromSelector(selector, {jquery: true});
		element.val(value);
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