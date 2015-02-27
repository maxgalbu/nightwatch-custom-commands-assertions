
/**
 * Assert that the url matches the regex provided
 *
 * h3 Examples:
 *
 *     browser
 *         .url("http://www.google.com")
 *         .assert.urlMatch(/\.com$/)
 *
 *     browser
 *         .url("http://www.google.com")
 *         .assert.urlMatch(new RegExp("\.com$", "i")
 *
 * @author maxgalbu
 * @param {RegExp} regex - regular expression
 * @param {String} [msg] - output to identify the assertion
 */
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
