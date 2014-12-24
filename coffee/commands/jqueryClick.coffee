module.exports.command = (selector, callback) ->
	params = [selector];
	
	execute = (selector) ->
		$(selector).click();
		return true;
	execcallback = =>
		if callback
			callback.call(this, true);
	
	this.execute(execute, params, execcallback);
	
	return this;