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
		this.elementSelector = elementSelector;
		this.fileName = fileName;
		this.defaultMessage = defaultMessage;
		
		this.api.getElementSize(elementSelector, sizeResult => {
			return this.api.getLocation(elementSelector, locationResult => {
				return this.api.saveScreenshot(fileName, () => {
					this.crop(sizeResult.value, locationResult.value);
				});
			});
		});
		
		return this;
	}

	crop(size, location) {
		return easyimg.crop({
			src: this.fileName,
			dst: this.fileName,
			cropwidth: size.width,
			cropheight: size.height,
			x: location.x,
			y: location.y,
			gravity: 'North-West'
		}).then(
			file => {
				let message = `Saved screenshot for <${this.elementSelector}> to ${this.fileName}`;
				if (this.defaultMessage) {
					message = this.defaultMessage;
				}

				this.client.assertion(true, 'expression false', 'expression true', message, true);
				return this.emit("complete");
			},
			err => {
				return this.emit('error', `SaveElementScreenshotAction: could not save screenshot (error is ${err})`);
			}
		);

	}
}

export default SaveElementScreenshotAction;
