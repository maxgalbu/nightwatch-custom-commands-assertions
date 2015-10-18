
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
var getMultipleSelectors, util;

util = require('util');

getMultipleSelectors = function(selector) {
  var section_selector;
  if (Array.isArray(selector)) {
    section_selector = selector[0].selector;
    selector = selector[1].selector;
    return [section_selector, selector];
  } else {
    return selector;
  }
};

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
    selector = getMultipleSelectors(selector);
    params = [selector];
    execute = function(selector) {
      var element, getElementFromSelector;
      getElementFromSelector = function(selector, options) {
        var elements, section_element, section_selector;
        if (options == null) {
          options = {
            jquery: false
          };
        }
        if (Array.isArray(selector)) {
          section_selector = selector[0];
          selector = selector[1];
          if (options.jquery) {
            return $(section_selector).find(selector);
          } else {
            section_element = document.querySelectorAll(section_selector);
            if (!section_element.length) {
              return null;
            }
            section_element = section_element[0];
            if (options.parent_element) {
              section_element = parent_element;
            }
            elements = section_element.querySelectorAll(selector);
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
            elements = document.querySelectorAll(selector);
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
      element = getElementFromSelector(selector);
      if (!element) {
        return false;
      }
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
