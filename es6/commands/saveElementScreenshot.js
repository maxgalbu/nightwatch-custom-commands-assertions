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

import events from 'events';
import easyimg from 'easyimage';

class SaveElementScreenshotAction extends events.EventEmitter {
	command(elementSelector, fileName) {
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
			file => this.emit("complete"),
			err => (console.error(err), this.emit("complete"))
		);

	}
}

export default SaveElementScreenshotAction;