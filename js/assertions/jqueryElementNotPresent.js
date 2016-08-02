'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.assertion = assertion;

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assertion(selector, msg) {
	this.message = msg || _util2.default.format('Testing if element <%s> is not present.', selector);
	this.expected = 'present';

	this.pass = function (value) {
		return !value;
	};

	this.value = function (result) {
		if (!result) {
			return false;
		}
		return result.value;
	};

	this.command = function (callback) {
		return this.api.jqueryElement(selector, callback);
	};
} /**
   * assert that the element identified by the jquery selector does NOT exist in the DOM.
   * ***Requires jqueryElement command***
   *
   * h3 Examples:
   *
   *     browser
   *         .url("http://www.github.com")
   *         .assert.jqueryElementNotPresent("div:eq(10000)")
   *
   * @author maxgalbu
   * @param {String} selector - jQuery selector
   * @param {String} [msg] - output to identify the assertion
  */