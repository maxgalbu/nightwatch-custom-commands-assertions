module.exports.command = (selector, data, callback) ->
	params = [selector, data];
	
	execute = (selector, data) ->
		$(selector).select2("data", data);
		$(selector).trigger("change");
		return true;
	execcallback = (result) =>
		if callback
			callback.call(this, result);
	
	this.execute(execute, params, execcallback);