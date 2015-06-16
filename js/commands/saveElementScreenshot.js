
/**
 * Take a screenshot of the requested element
 *
 * This command requires ImageMagick installed on the system and node-easyimage installed as a npm module. You can install node-easyimage with:
 *
 *     npm install --production
 *
 * And imagemagick with:
 *
 *     #Centos
 *     yum install ImageMagick
 *
 *     #OSX
 *     brew install imagemagick --build-from-source
 *
 *     #Ubuntu
 *     apt-get install ImageMagick
 *
 * h3 Examples:
 *
 *     browser.saveElementScreenshot(".class", "screenshot-name.jpg");
 *
 * @author maxgalbu
 * @param {String} elementSelector - css/xpath selector for the element
 * @param {Function} fileName - file path where the screenshot is saved
 */
var SaveElementScreenshotAction, easyimg, events,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

events = require('events');

easyimg = require('easyimage');

SaveElementScreenshotAction = (function(superClass) {
  extend(SaveElementScreenshotAction, superClass);

  function SaveElementScreenshotAction() {
    return SaveElementScreenshotAction.__super__.constructor.apply(this, arguments);
  }

  SaveElementScreenshotAction.prototype.command = function(elementSelector, fileName) {
    this.api.getElementSize(elementSelector, (function(_this) {
      return function(sizeResult) {
        return _this.api.getLocation(elementSelector, function(locationResult) {
          return _this.api.saveScreenshot(fileName, function() {
            return _this.crop(fileName, sizeResult.value, locationResult.value);
          });
        });
      };
    })(this));
    return this;
  };

  SaveElementScreenshotAction.prototype.crop = function(fileName, size, location) {
    easyimg.crop({
      src: fileName,
      dst: fileName,
      cropwidth: size.width,
      cropheight: size.height,
      x: location.x,
      y: location.y,
      gravity: 'North-West'
    }).then((function(_this) {
      return function(file) {
        return _this.emit("complete");
      };
    })(this), (function(_this) {
      return function(err) {
        console.error(err);
        return _this.emit("complete");
      };
    })(this));
  };

  return SaveElementScreenshotAction;

})(events.EventEmitter);

module.exports = SaveElementScreenshotAction;
