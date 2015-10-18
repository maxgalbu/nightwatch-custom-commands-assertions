
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
    selector = getMultipleSelectors(selector);
    children_selectors = getMultipleSelectors(children_selectors);
    params = [selector, children_selectors];
    execute = function(selector, children_selectors) {
      var children, element, getElementFromSelector;
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
      if (!children_selectors) {
        return element.children.length !== 0;
      } else {
        children = getElementFromSelector(children_selectors, {
          return_all: true,
          parent_element: element
        });
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
