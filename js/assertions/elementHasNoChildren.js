
/**
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
var util;

util = require('util');

exports.assertion = function(selector, msg) {
  if (msg == null) {
    msg = null;
  }
  this.message = msg || util.format('Testing if element <%s> doesn\'t have child nodes', selector);
  this.expected = true;
  this.pass = (function(_this) {
    return function(value) {
      return value === _this.expected;
    };
  })(this);
  this.value = function(result) {
    return result.value;
  };
  this.command = function(callback) {
    var execcallback, execute, params;
    params = [selector];
    execute = function(selector) {
      var element, elements;
      elements = document.querySelectorAll(selector);
      if (!elements.length) {
        return false;
      }
      element = elements[0];
      return element.children.length === 0;
    };
    execcallback = (function(_this) {
      return function(result) {
        if (callback) {
          return callback.call(_this, result);
        }
      };
    })(this);
    return this.api.execute(execute, params, execcallback);
  };
};
