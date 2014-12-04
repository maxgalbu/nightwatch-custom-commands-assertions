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
