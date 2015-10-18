###*
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
###

#=include ../getMultipleSelectors.coffee

module.exports.command = (selector, value, callback) ->
	selector = getMultipleSelectors(selector)
	params = [selector, value];
	
	execute = (selector, value) ->
		#=include ../getElementFromSelector.coffee

		element = getElementFromSelector(selector, jquery: true);
		element.val(value);
		element.trigger("change");
		return true;
	execcallback = (result) =>
		if callback
			callback.call(this, result);
	
	this.execute(execute, params, execcallback);