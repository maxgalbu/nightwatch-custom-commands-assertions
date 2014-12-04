util = require('util');

exports.assertion = (selector, msg) ->
	this.message = msg || util.format('Testing if element <%s> is present.', selector);
	this.expected = 'present';
	
	this.pass = (value) ->
		return !!value;

	this.value = (result) ->
		value = null;
		if result
			value = !!result;
		return value;
	
	this.command = (callback) ->
		return this.api.jqueryElement(selector, callback);
	
	return;