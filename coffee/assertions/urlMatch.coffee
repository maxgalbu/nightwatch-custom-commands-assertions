util = require('util');

exports.assertion = (regex, msg) ->
	this.message = msg || util.format('Testing if the URL match the regex "%s".', regex);
	this.expected = regex;
	
	this.pass = (value) ->
		return this.expected.test(value);

	this.value = (result) ->
		return result.value;
	
	this.command = (callback) ->
		return this.api.url(callback);
	
	return;