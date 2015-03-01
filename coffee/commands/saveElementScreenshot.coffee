###*
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
###

events = require('events');
easyimg = require('easyimage');

class SaveElementScreenshotAction extends events.EventEmitter
	command: (elementSelector, fileName) ->
		@api.getElementSize(elementSelector, (sizeResult) =>
			@api.getLocation(elementSelector, (locationResult) =>
				@api.saveScreenshot(fileName, =>
					@crop(fileName, sizeResult.value, locationResult.value);
				);
			);
		);
		
		return this;

	crop: (fileName, size, location) ->
		easyimg.crop({
			src: fileName
			dst: fileName
			cropwidth: size.width
			cropheight: size.height
			x: location.x
			y: location.y
			gravity: 'North-West'
		}).then(
			(file) => @emit("complete");
			(err) => console.error(err); @emit("complete");
		);

		return;

module.exports = SaveElementScreenshotAction;