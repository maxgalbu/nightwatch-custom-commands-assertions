var util;

util = require('util');

exports.assertion = function(selector, msg) {
  this.message = msg || util.format('Testing if element <%s> is present.', selector);
  this.expected = 'present';
  this.pass = function(value) {
    return !!value;
  };
  this.value = function(result) {
    var value;
    value = null;
    if (result) {
      value = !!result;
    }
    return value;
  };
  this.command = function(callback) {
    return this.api.jqueryElement(selector, callback);
  };
};
