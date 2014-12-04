var util;

util = require('util');

exports.assertion = function(regex, msg) {
  this.message = msg || util.format('Testing if the URL match the regex "%s".', regex);
  this.expected = regex;
  this.pass = function(value) {
    return this.expected.test(value);
  };
  this.value = function(result) {
    return result.value;
  };
  this.command = function(callback) {
    return this.api.url(callback);
  };
};
