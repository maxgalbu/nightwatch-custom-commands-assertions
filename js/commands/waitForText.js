var WaitForText, events,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

events = require('events');


/**
 * This custom command allows us to locate an HTML element on the page and then wait until the value of the element's
 * inner text (the text between the opening and closing tags) matches the provided expression (aka. the 'checker' function).
 * It retries executing the checker function every 100ms until either it evaluates to true or it reaches
 * maxTimeInMilliseconds (which fails the test).
 * Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
 *
 * h3 Examples:
 *
 *     browser.waitForText("div", function(text) {
 *         return text === "something";
 *     });
 *
 * @author dkoo761
 * @see https://github.com/beatfactor/nightwatch/issues/246#issuecomment-59461345
 * @param {String} elementSelector - css/xpath selector for the element
 * @param {Function} checker - function that must return true if the element's text matches your requisite, false otherwise
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
 */

WaitForText = (function(superClass) {
  extend(WaitForText, superClass);

  WaitForText.prototype.timeoutRetryInMilliseconds = 100;

  WaitForText.prototype.defaultTimeoutInMilliseconds = 5000;

  WaitForText.prototype.locateStrategy = "css";

  function WaitForText() {
    WaitForText.__super__.constructor.apply(this, arguments);
    this.startTimeInMilliseconds = null;
  }

  WaitForText.prototype.restoreLocateStrategy = function() {
    if (this.locateStrategy === "xpath") {
      this.api.useXpath();
    }
    if (this.locateStrategy === "css") {
      return this.api.useCss();
    }
  };

  WaitForText.prototype.command = function(elementSelector, checker, timeoutInMilliseconds) {
    this.locateStrategy = this.client.locateStrategy;
    this.startTimeInMilliseconds = new Date().getTime();
    if (typeof timeoutInMilliseconds !== 'number') {
      timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
    }
    if (typeof timeoutInMilliseconds !== 'number') {
      timeoutInMilliseconds = this.defaultTimeoutInMilliseconds;
    }
    this.check(elementSelector, checker, (function(_this) {
      return function(result, loadedTimeInMilliseconds) {
        var message;
        if (result) {
          message = "waitForText: " + elementSelector + ". Expression was true after " + (loadedTimeInMilliseconds - _this.startTimeInMilliseconds) + " ms.";
        } else {
          message = "waitForText: " + elementSelector + ". Expression wasn't true in " + timeoutInMilliseconds + " ms.";
        }
        _this.client.assertion(result, 'expression false', 'expression true', message, true);
        return _this.emit('complete');
      };
    })(this), timeoutInMilliseconds);
    return this;
  };

  WaitForText.prototype.check = function(elementSelector, checker, callback, maxTimeInMilliseconds) {
    this.restoreLocateStrategy();
    return this.api.getText(elementSelector, (function(_this) {
      return function(result) {
        var now;
        now = new Date().getTime();
        if (result.status === 0 && checker(result.value)) {
          return callback(true, now);
        } else if (now - _this.startTimeInMilliseconds < maxTimeInMilliseconds) {
          return setTimeout(function() {
            return _this.check(elementSelector, checker, callback, maxTimeInMilliseconds);
          }, _this.timeoutRetryInMilliseconds);
        } else {
          return callback(false);
        }
      };
    })(this));
  };

  return WaitForText;

})(events.EventEmitter);

module.exports = WaitForText;
