
/**
 * Execute a command on the shell
 *
 * h3 Examples:
 *
 *     browser.shell("mysql -u root database_name < fakedata.sql")
 *
 * @author maxgalbu
 * @param {String} command to execute on the shell
 */
var ShellAction, childprocess, events,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

events = require('events');

childprocess = require("child_process");

ShellAction = (function(_super) {
  __extends(ShellAction, _super);

  function ShellAction() {
    return ShellAction.__super__.constructor.apply(this, arguments);
  }

  ShellAction.prototype.command = function(command, callback) {
    var windows;
    windows = /^win/.test(process.platform);
    childprocess.exec("" + command + " 2>&1", null, (function(_this) {
      return function(err, stdout, stderr) {
        console.log("Done " + command + ":\n" + stdout);
        if (typeof callback === "function") {
          callback.call(_this, err, stdout, stderr);
        }
        return _this.emit('complete');
      };
    })(this));
    return this;
  };

  return ShellAction;

})(events.EventEmitter);

module.exports = ShellAction;
