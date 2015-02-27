
/**
 * Set a select2 value using select2("value", string/number)
 *
 * h3 Examples:
 *
 *     browser.setSelect2Value("select.has-select2:hidden", "some value")
 *
 * @author maxgalbu
 * @param {String} selector - jQuery selector for the select2 input/select2
 * @param {Mixed} value - value of the element to be set
 * @param {Function} [callback] - function that will be called after the element's value has been set
 */
module.exports.command = function(selector, value, callback) {
  var execcallback, execute, params;
  params = [selector, value];
  execute = function(selector, value) {
    $(selector).select2("val", value);
    $(selector).trigger("change");
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
