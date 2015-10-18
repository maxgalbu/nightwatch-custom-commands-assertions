
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

module.exports.command = function(selector, data, callback) {
  var execcallback, execute, params;
  selector = getMultipleSelectors(selector);
  params = [selector, data];
  execute = function(selector, data) {
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
    element.select2("data", data);
    element.trigger("change");
    return true;
  };
  execcallback = (function(_this) {
    return function(result) {
      if (callback) {
        return callback.call(_this, result);
      }
    };
  })(this);
  return this.execute(execute, params, execcallback);
};
