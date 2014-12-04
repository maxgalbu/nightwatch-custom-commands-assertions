module.exports.command = (selector, callback) ->
	params = [selector];
	
	execute = (selector) ->
		return $(selector).get(0);
	execcallback = (element) =>
		if callback
			callback.call(this, element);
	
	this.execute(execute, params, execcallback);
	
	return this;