###*
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
###

module.exports.command = (selector, data, callback) ->
	params = [selector, data];
	
	execute = (selector, data) ->
		$(selector).select2("data", data);
		$(selector).trigger("change");
		return true;
	execcallback = (result) =>
		if callback
			callback.call(this, result);
	
	this.execute(execute, params, execcallback);