
/**
 * Assert that the element identified by the selector has children nodes
 * that matches the children selectors (if passed)
 *
 * h3 Examples:
 *
 *     browser
 *         .url("http://www.github.com")
 *         .assert.elementHasChildren("#list-of-tasks", "div, span")
 *
 *     browser
 *         .url("http://www.github.com")
 *         .assert.elementHasChildren("#list-of-tasks", ".myclass, li input:checked")
 *
 * @author maxgalbu
 * @param {String} selector - the element selector
 * @param {String} [children_selectors] - a list of selectors for children nodes
 * @param {String} [msg] - output to identify the assertion
 */
var util;

util = require('util');

exports.assertion = function(selector, children_selectors, msg) {
  if (children_selectors == null) {
    children_selectors = "";
  }
  if (msg == null) {
    msg = null;
  }
  this.message = msg;
  if (!this.message) {
    if (children_selectors) {
      this.message = util.format('Testing if element <%s> has child nodes that matches these selectors: \'%s\'', selector, children_selectors);
    } else {
      this.message = util.format('Testing if element <%s> has child nodes', selector);
    }
  }
  this.expected = true;
  this.pass = (function(_this) {
    return function(value) {
      return value === _this.expected;
    };
  })(this);
  this.value = function(result) {
    return !!result.value;
  };
  this.command = function(callback) {
    var execcallback, execute, params;
    params = [selector, children_selectors];
    execute = function(selector, children_selectors) {
      var children, element, elements;
      elements = document.querySelectorAll(selector);
      if (!elements.length) {
        return false;
      }
      element = elements[0];
      if (!children_selectors) {
        return element.children.length !== 0;
      } else {
        children = element.querySelectorAll(children_selectors);
        return children.length !== 0;
      }
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
