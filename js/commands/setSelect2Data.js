"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.command = command;
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

//The param "selector" that is passed to a custom command or assertion
//can be an array of selector, or a string.
//It's an array when a custom command is called from a section, and
//this array cannot be used straight away in a command, because nightwatch
//or selenium encode it in JSON, but the array itself has circular references
//that json doesn't like. So I simply extract the selectors for each item
//of the array and return it
var getMultipleSelectors = function getMultipleSelectors(selector) {
	if (Array.isArray(selector)) {
		var section_selector = selector[0].selector;
		var real_selector = selector[1].selector;
		return [section_selector, real_selector];
	} else {
		return selector;
	}
};

function command(selector, data, callback) {
	var _this = this;

	selector = getMultipleSelectors(selector);
	var params = [selector, data];

	var execute = function execute(selector, data) {
		//The param "selector" can be an array of selectors, or a string.
		//If there's an array i get the parent element, then use jQuery.find()
		//or element.querySelectorAll() to find the actual element
		var getElementFromSelector = function getElementFromSelector(selector) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { jquery: false };

			if (Array.isArray(selector)) {
				var section_selector = selector[0];
				selector = selector[1];

				if (options.jquery) {
					return $(section_selector).find(selector);
				} else {
					var section_element = document.querySelectorAll(section_selector);
					if (!section_element.length) {
						return null;
					}

					section_element = section_element[0];
					if (options.parent_element) {
						section_element = options.parent_element;
					}

					var elements = section_element.querySelectorAll(selector);
					if (elements.length) {
						if (options.return_all) {
							return elements;
						}
						return elements[0];
					}
				}
			} else {
				if (options.jquery) {
					return $(selector);
				} else {
					var parent_element = document;
					if (options.parent_element) {
						parent_element = options.parent_element;
					}

					var elements = parent_element.querySelectorAll(selector);
					if (elements.length) {
						if (options.return_all) {
							return elements;
						}
						return elements[0];
					}
				}
			}

			return null;
		};

		var element = getElementFromSelector(selector, { jquery: true });
		element.select2("data", data);
		element.trigger("change");
		return true;
	};
	var execcallback = function execcallback(result) {
		if (callback) {
			return callback.call(_this, result);
		}
	};

	return this.execute(execute, params, execcallback);
}