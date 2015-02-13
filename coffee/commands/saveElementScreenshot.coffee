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