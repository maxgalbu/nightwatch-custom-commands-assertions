var WaitForAttribute, events,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

events = require('events');

WaitForAttribute = (function(_super) {
  __extends(WaitForAttribute, _super);

  function WaitForAttribute() {
    WaitForAttribute.__super__.constructor.apply(this, arguments);
    this.startTimeInMilliseconds = null;
    this.timeoutRetryInMilliseconds = 100;
  }

  WaitForAttribute.prototype.command = function(element, attribute, checker, timeoutInMilliseconds) {
    this.startTimeInMilliseconds = new Date().getTime();
    if (typeof timeoutInMilliseconds !== 'number') {
      timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
    }
    this.check(element, attribute, checker, (function(_this) {
      return function(result, loadedTimeInMilliseconds) {
        var message;
        if (result) {
          message = "waitForAttribute: " + element + "@" + attribute + ". Expression was true after " + (loadedTimeInMilliseconds - _this.startTimeInMilliseconds) + ".";
        } else {
          message = "waitForAttribute: " + element + "@" + attribute + ". Expression wasn't true in " + timeoutInMilliseconds + " ms.";
        }
        _this.client.assertion(result, 'expression false', 'expression true', message, true);
        return _this.emit('complete');
      };
    })(this), timeoutInMilliseconds);
    return this;
  };

  WaitForAttribute.prototype.check = function(element, attribute, checker, callback, maxTimeInMilliseconds) {
    return this.api.getAttribute(element, attribute, (function(_this) {
      return function(result) {
        var now;
        now = new Date().getTime();
        if (result.status === 0 && checker(result.value)) {
          return callback(true, now);
        } else if (now - _this.startTimeInMilliseconds < maxTimeInMilliseconds) {
          return setTimeout(function() {
            return _this.check(element, attribute, checker, callback, maxTimeInMilliseconds);
          }, _this.timeoutRetryInMilliseconds);
        } else {
          return callback(false);
        }
      };
    })(this));
  };

  return WaitForAttribute;

})(events.EventEmitter);

module.exports = WaitForAttribute;
