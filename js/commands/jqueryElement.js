
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
var getMultipleSelectors;

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

module.exports.command = function(selector, callback) {
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
    element = getElementFromSelector(selector, {
      jquery: true
    });
    return element.get(0);
  };
  execcallback = (function(_this) {
    return function(result) {
      if (callback) {
        return callback.call(_this, result.value);
      }
    };
  })(this);
  this.execute(execute, params, execcallback);
  return this;
};
