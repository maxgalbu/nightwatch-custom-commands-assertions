module.exports.command = (selector, callback) ->
	params = [selector];
	
	execute = (selector) ->
		return $(selector).get(0);
	execcallback = (result) =>
		if callback
			callback.call(this, result.value);
	
	this.execute(execute, params, execcallback);
	
	return this;