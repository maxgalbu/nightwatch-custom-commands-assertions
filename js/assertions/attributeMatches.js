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
    * Assert that the element identified by the selector has an attribute that matches
    * the provided regexp.
    *
    * h3 Examples:
    *
    *     browser
    *         .url("http://www.github.com")
    *         .assert.attributeMatches("body", "class", /body-class/g)
    *
    *     browser
    *         .url("http://www.github.com")
    *         .assert.attributeMatches("body", "class", new RegExp("body-class", "g")
    *
    * @author maxgalbu
    * @param {String} selector - the element selector
    * @param {String} attribute - the element attribute
    * @param {RegExp} regexp - the regexp that should match the attribute
    * @param {String} [msg] - output to identify the assertion
    */

function assertion(selector, attribute, regexp) {
	var _this = this;

	var msg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

	this.message = msg;
	if (!this.message) {
		this.message = _util2.default.format('Testing if element <%s> has attribute <%s> that matches %s', selector, attribute, regexp.toString());
	}
	this.expected = regexp;

	this.pass = function (value) {
		return _this.expected.test(value);
	};

	this.value = function (result) {
		if (result.value.error) {
			console.error(result.value);
			return "";
		}

		return result.value;
	};

	this.command = function (callback) {
		return _this.api.getAttribute(selector, attribute, callback);
	};
}