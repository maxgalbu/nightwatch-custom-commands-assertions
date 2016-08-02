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

import events from 'events';
import childprocess from "child_process";

class ShellAction extends events.EventEmitter {
	command(command, callback) {
		let windows = /^win/.test(process.platform);
		
		childprocess.exec(`${command} 2>&1`, null, (err, stdout, stderr) => {
			console.log(`Done ${command}:\n${stdout}`);
			
			if (typeof callback === "function") {
				callback.call(this, err, stdout, stderr);
			}
			
			return this.emit('complete');
		});
		
		return this;
	}
}

export default ShellAction;