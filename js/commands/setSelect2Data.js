module.exports.command = function(selector, data, callback) {
  var execcallback, execute, params;
  params = [selector, data];
  execute = function(selector, data) {
    $(selector).select2("data", data);
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
