module.exports.command = function(selector, callback) {
  var execcallback, execute, params;
  params = [selector];
  execute = function(selector) {
    $(selector).click();
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
