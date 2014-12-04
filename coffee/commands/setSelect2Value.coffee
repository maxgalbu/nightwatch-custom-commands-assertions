module.exports.command = (selector, value, callback) ->
	params = [selector, value];
	
	execute = (selector, value) ->
		$(selector).select2("val", value);
		$(selector).trigger("change");
		return true;
	execcallback = (result) =>
		if callback
			callback.call(this, result);
	
	this.execute(execute, params, execcallback);