'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.assertion = assertion;

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
}; /**
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

function assertion(selector) {
	var _this = this;

	var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	this.message = msg || _util2.default.format('Testing if element <%s> doesn\'t have child nodes', selector);
	this.expected = true;

	this.pass = function (value) {
		return value === _this.expected;
	};

	this.value = function (result) {
		return result.value;
	};

	this.command = function (callback) {
		var _this2 = this;

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

			var element = getElementFromSelector(selector);
			if (!element) {
				return false;
			}
			return element.children.length === 0;
		};
		var execcallback = function execcallback(result) {
			if (callback) {
				return callback.call(_this2, result);
			}
		};

		return this.api.execute(execute, params, execcallback);
	};
}