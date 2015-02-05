var WaitForText, events,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

events = require('events');


/*
 * Taken from: https://github.com/beatfactor/nightwatch/issues/246#issuecomment-59461345
 * Written by: @dkoo761
 *
 * This custom command allows us to locate an HTML element on the page and then wait until the value of the element's
 * inner text (the text between the opening and closing tags) matches the provided expression (aka. the 'checker' function).
 * It retries executing the checker function every 100ms until either it evaluates to true or it reaches
 * maxTimeInMilliseconds (which fails the test).
 * Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
 */

WaitForText = (function(_super) {
  __extends(WaitForText, _super);

  WaitForText.prototype.timeoutRetryInMilliseconds = 100;

  WaitForText.prototype.defaultTimeoutInMilliseconds = 5000;

  function WaitForText() {
    WaitForText.__super__.constructor.apply(this, arguments);
    this.startTimeInMilliseconds = null;
  }

  WaitForText.prototype.command = function(element, checker, timeoutInMilliseconds) {
    this.startTimeInMilliseconds = new Date().getTime();
    if (typeof timeoutInMilliseconds !== 'number') {
      timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
    }
    if (typeof timeoutInMilliseconds !== 'number') {
      timeoutInMilliseconds = this.defaultTimeoutInMilliseconds;
    }
    this.check(element, checker, (function(_this) {
      return function(result, loadedTimeInMilliseconds) {
        var message;
        if (result) {
          message = "waitForText: " + element + ". Expression was true after " + (loadedTimeInMilliseconds - _this.startTimeInMilliseconds) + " ms.";
        } else {
          message = "waitForText: " + element + ". Expression wasn't true in " + timeoutInMilliseconds + " ms.";
        }
        _this.client.assertion(result, 'expression false', 'expression true', message, true);
        return _this.emit('complete');
      };
    })(this), timeoutInMilliseconds);
    return this;
  };

  WaitForText.prototype.check = function(element, checker, callback, maxTimeInMilliseconds) {
    return this.api.getText(element, (function(_this) {
      return function(result) {
        var now;
        now = new Date().getTime();
        if (result.status === 0 && checker(result.value)) {
          return callback(true, now);
        } else if (now - _this.startTimeInMilliseconds < maxTimeInMilliseconds) {
          return setTimeout(function() {
            return _this.check(element, checker, callback, maxTimeInMilliseconds);
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
