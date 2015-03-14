
/**
 * Clicks an element using jquery selectors.
 *
 * h3 Examples:
 *
 *     browser.jqueryClick(".classname:first > input:checked")
 *     browser.jqueryClick("div:has(.classname):contains('something'):last")
 *
 * @author maxgalbu
 * @param {String} selector - jQuery selector for the element
 * @param {Function} [callback] - function that will be called after the element is clicked
 */
module.exports.command = function(selector, callback) {
  var execcallback, execute, params;
  params = [selector];
  execute = function(selector) {
    var element;
    element = $(selector);
    if (element.length) {
      element[0].click();
    }
    return true;
  };
  execcallback = (function(_this) {
    return function() {
      if (callback) {
        return callback.call(_this, true);
      }
    };
  })(this);
  this.execute(execute, params, execcallback);
  return this;
};
