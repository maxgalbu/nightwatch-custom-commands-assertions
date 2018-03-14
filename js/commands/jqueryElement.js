"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.command = command;
/**
 * Returns an element using jquery selectors
 *
 * h3 Examples:
 *
 *     browser.jqueryElement(".classname:first > input:checked", function(element) {
 *         //element is the DOM element
 *     })
 *     browser.jqueryElement("div:has(.classname):contains('something'):last", function(element) {
 *         //element is the DOM element
 *     })
 *
 * @author maxgalbu
 * @param {String} selector - jQuery selector for the element
 * @param {Function} callback - function that will be called with the element as argument
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

function command(selector, callback) {
	var _this = this;

	selector = getMultipleSelectors(selector);
	var params = [selector];

	var execute = function execute(selector) {
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
		return element.get(0);
	};
	var execcallback = function execcallback(result) {
		if (callback) {
			return callback.call(_this, result.value);
		}
	};

	this.execute(execute, params, execcallback);

	return this;
}