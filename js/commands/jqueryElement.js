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
