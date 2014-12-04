events = require('events');
childprocess = require("child_process");

class ShellAction extends events.EventEmitter
	command: (command, callback) ->
		windows = /^win/.test(process.platform);
		
		childprocess.exec("#{command} 2>&1", null, (err, stdout, stderr) =>
			console.log("Done #{command}:\n#{stdout}");
			
			if (typeof callback == "function")
				callback.call(@, err, stdout, stderr);
			
			@emit('complete'); 
		);
		
		return this;

module.exports = ShellAction;