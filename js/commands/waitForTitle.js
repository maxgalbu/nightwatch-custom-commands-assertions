var WaitForTitle, events,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

events = require('events');


/**
 * This custom command allows us to wait until the value of the page title matches the provided expression
 * (aka. the 'checker' function).
 * It retries executing the checker function every 100ms until either it evaluates to true or it reaches
 * maxTimeInMilliseconds (which fails the test).
 * Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
 *
 * h3 Examples:
 *
 *     browser.waitForTitle(function(title) {
 *         return title === "something";
 *     });
 *
 * @author dkoo761
 * @see https://github.com/beatfactor/nightwatch/issues/246#issuecomment-59461345
 * @param {Function} checker - function that must return true if the title matches your requisite, false otherwise
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
 */

WaitForTitle = (function(superClass) {
  extend(WaitForTitle, superClass);

  WaitForTitle.prototype.timeoutRetryInMilliseconds = 100;

  WaitForTitle.prototype.defaultTimeoutInMilliseconds = 5000;

  function WaitForTitle() {
    WaitForTitle.__super__.constructor.apply(this, arguments);
    this.startTimeInMilliseconds = null;
  }

  WaitForTitle.prototype.command = function(checker, timeoutInMilliseconds) {
    this.startTimeInMilliseconds = new Date().getTime();
    if (typeof timeoutInMilliseconds !== 'number') {
      timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
    }
    if (typeof timeoutInMilliseconds !== 'number') {
      timeoutInMilliseconds = this.defaultTimeoutInMilliseconds;
    }
    this.check(checker, (function(_this) {
      return function(result, loadedTimeInMilliseconds) {
        var message;
        if (result) {
          message = "waitForTitle: Expression was true after " + (loadedTimeInMilliseconds - _this.startTimeInMilliseconds) + ".";
        } else {
          message = "WaitForTitle: " + element + "@" + attribute + ". Expression wasn't true in " + timeoutInMilliseconds + " ms.";
        }
        _this.client.assertion(result, 'expression false', 'expression true', message, true);
        return _this.emit('complete');
      };
    })(this), timeoutInMilliseconds);
    return this;
  };

  WaitForTitle.prototype.check = function(checker, callback, maxTimeInMilliseconds) {
    return this.api.getTitle((function(_this) {
      return function(title) {
        var now;
        now = new Date().getTime();
        if (checker(title)) {
          return callback(true, now);
        } else if (now - _this.startTimeInMilliseconds < maxTimeInMilliseconds) {
          return setTimeout(function() {
            return _this.check(checker, callback, maxTimeInMilliseconds);
          }, _this.timeoutRetryInMilliseconds);
        } else {
          return callback(false);
        }
      };
    })(this));
  };

  return WaitForTitle;

})(events.EventEmitter);

module.exports = WaitForTitle;
