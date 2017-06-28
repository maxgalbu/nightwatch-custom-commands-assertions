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
 * @param {String} [defaultMessage] - message to display
*/

import events from 'events';
import easyimg from 'easyimage';

class SaveElementScreenshotAction extends events.EventEmitter {
	command(elementSelector, fileName, defaultMessage) {
		if (defaultMessage && typeof defaultMessage !== 'string') {
            this.emit('error', "defaultMessage is not a string");
            return;
        }

		this.api.getElementSize(elementSelector, sizeResult => {
			return this.api.getLocation(elementSelector, locationResult => {
				return this.api.saveScreenshot(fileName, () => {
					return this.crop(fileName, sizeResult.value, locationResult.value);
				});
			});
		});
		
		return this;
	}

	crop(fileName, size, location) {
		easyimg.crop({
			src: fileName,
			dst: fileName,
			cropwidth: size.width,
			cropheight: size.height,
			x: location.x,
			y: location.y,
			gravity: 'North-West'
		}).then(
			file => {
				let message = `Saved screenshot for <${elementSelector}> to ${fileName}`;
				if (defaultMessage) {
					message = defaultMessage;
				}

				this.client.assertion(result, 'expression false', 'expression true', message, true); 
				return this.emit("complete");
			},
			err => {
				this.emit('error', `SaveElementScreenshotAction: could not save screenshot (error is ${err})`);
				return this.emit("complete");
			}
		);

	}
}

export default SaveElementScreenshotAction;