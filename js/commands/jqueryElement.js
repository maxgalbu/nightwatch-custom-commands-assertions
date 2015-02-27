
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
module.exports.command = function(selector, callback) {
  var execcallback, execute, params;
  params = [selector];
  execute = function(selector) {
    return $(selector).get(0);
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
