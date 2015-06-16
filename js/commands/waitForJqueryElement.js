var WaitForJqueryElement, events,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

events = require('events');


/**
 * This custom command allows us to locate an HTML element on the page and then wait until the value of a
 * specified attribute matches the provided expression (aka. the 'checker' function).
 * It retries executing the checker function every 100ms until either it evaluates to true or it reaches
 * maxTimeInMilliseconds (which fails the test). Nightwatch uses the Node.js EventEmitter pattern to handle
 * asynchronous code so this command is also an EventEmitter.
 *
 * h3 Examples:
 *
 *     browser.waitForAttribute("img", "src", function(imageSource) {
 *         return imageSource === "img/header.jpg";
 *     });
 *
 * @author maxgalbu
 * @param {String} elementSelector - jquery selector for the element
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
 */

WaitForJqueryElement = (function(superClass) {
  extend(WaitForJqueryElement, superClass);

  WaitForJqueryElement.prototype.timeoutRetryInMilliseconds = 100;

  WaitForJqueryElement.prototype.defaultTimeoutInMilliseconds = 5000;

  function WaitForJqueryElement() {
    WaitForJqueryElement.__super__.constructor.apply(this, arguments);
    this.startTimeInMilliseconds = null;
  }

  WaitForJqueryElement.prototype.command = function(elementSelector, timeoutInMilliseconds) {
    this.startTimeInMilliseconds = new Date().getTime();
    if (typeof timeoutInMilliseconds !== 'number') {
      timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
    }
    if (typeof timeoutInMilliseconds !== 'number') {
      timeoutInMilliseconds = this.defaultTimeoutInMilliseconds;
    }
    this.check(elementSelector, (function(_this) {
      return function(result, loadedTimeInMilliseconds) {
        var message;
        if (result) {
          message = "WaitForJqueryElement: " + elementSelector + ". Expression was true after " + (loadedTimeInMilliseconds - _this.startTimeInMilliseconds) + ".";
        } else {
          message = "WaitForJqueryElement: " + elementSelector + ". Expression wasn't true in " + timeoutInMilliseconds + " ms.";
        }
        _this.client.assertion(result, 'expression false', 'expression true', message, true);
        return _this.emit('complete');
      };
    })(this), timeoutInMilliseconds);
    return this;
  };

  WaitForJqueryElement.prototype.check = function(elementSelector, callback, maxTimeInMilliseconds) {
    return this.api.jqueryElement(elementSelector, (function(_this) {
      return function(result) {
        var now;
        now = new Date().getTime();
        if (result) {
          return callback(true, now);
        } else if (now - _this.startTimeInMilliseconds < maxTimeInMilliseconds) {
          return setTimeout(function() {
            return _this.check(elementSelector, callback, maxTimeInMilliseconds);
          }, _this.timeoutRetryInMilliseconds);
        } else {
          return callback(false);
        }
      };
    })(this));
  };

  return WaitForJqueryElement;

})(events.EventEmitter);

module.exports = WaitForJqueryElement;
