var WaitForJqueryAjaxRequest, events,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

events = require('events');


/**
 * This custom command allows us to wait for every AJAX request made by jquery to be completed
 * It checks for jQuery.active every 100ms until either it evaluates to true or it reaches
 * maxTimeInMilliseconds (which fails the test).
 * Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
 *
 * h3 Examples:
 *
 *     browser.WaitForJqueryAjaxRequest();
 *
 * @author maxgalbu
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
 */

WaitForJqueryAjaxRequest = (function(superClass) {
  extend(WaitForJqueryAjaxRequest, superClass);

  WaitForJqueryAjaxRequest.prototype.timeoutRetryInMilliseconds = 100;

  WaitForJqueryAjaxRequest.prototype.defaultTimeoutInMilliseconds = 5000;

  function WaitForJqueryAjaxRequest() {
    WaitForJqueryAjaxRequest.__super__.constructor.apply(this, arguments);
    this.startTimeInMilliseconds = null;
  }

  WaitForJqueryAjaxRequest.prototype.command = function(timeoutInMilliseconds) {
    this.startTimeInMilliseconds = new Date().getTime();
    if (typeof timeoutInMilliseconds !== 'number') {
      timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
    }
    if (typeof timeoutInMilliseconds !== 'number') {
      timeoutInMilliseconds = this.defaultTimeoutInMilliseconds;
    }
    this.check((function(_this) {
      return function(result, loadedTimeInMilliseconds) {
        var message;
        if (result) {
          message = "WaitForJqueryAjaxRequest: AJAX requests finished after " + (loadedTimeInMilliseconds - _this.startTimeInMilliseconds) + " ms.";
        } else {
          message = "WaitForJqueryAjaxRequest: AJAX requests not finished in " + timeoutInMilliseconds + " ms.";
        }
        _this.client.assertion(result, 'expression false', 'expression true', message, true);
        return _this.emit('complete');
      };
    })(this), timeoutInMilliseconds);
    return this;
  };

  WaitForJqueryAjaxRequest.prototype.check = function(callback, maxTimeInMilliseconds) {
    var executeFunc;
    executeFunc = function(selector) {
      return jQuery.active;
    };
    return this.api.execute(executeFunc, [], (function(_this) {
      return function(result) {
        var now;
        now = new Date().getTime();
        if (result.status === 0 && result.value === 0) {
          return callback(true, now);
        } else if (now - _this.startTimeInMilliseconds < maxTimeInMilliseconds) {
          return setTimeout(function() {
            return _this.check(callback, maxTimeInMilliseconds);
          }, _this.timeoutRetryInMilliseconds);
        } else {
          return callback(false);
        }
      };
    })(this));
  };

  return WaitForJqueryAjaxRequest;

})(events.EventEmitter);

module.exports = WaitForJqueryAjaxRequest;
