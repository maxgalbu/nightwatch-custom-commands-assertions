/**
 * Assert that the element identified by the selector has an attribute that matches
 * the provided regexp.
 *
 * h3 Examples:
 *
 *     browser
 *         .url("http://www.github.com")
 *         .assert.attributeMatches("body", "class", /body-class/g)
 *
 *     browser
 *         .url("http://www.github.com")
 *         .assert.attributeMatches("body", "class", new RegExp("body-class", "g")
 *
 * @author maxgalbu
 * @param {String} selector - the element selector
 * @param {String} attribute - the element attribute
 * @param {RegExp} regexp - the regexp that should match the attribute
 * @param {String} [msg] - output to identify the assertion
 */

import util from 'util';

//=include ../getMultipleSelectors.js

export function assertion(selector, attribute, regexp, msg = null) {
	this.message = msg;
	if (!this.message) {
		this.message = util.format('Testing if element <%s> has attribute <%s> that matches %s', selector, attribute, regexp.toString());
	}
	this.expected = regexp;
	
	this.pass = (value) => {
		return this.expected.test(value);
	};

	this.value = (result) => {
		if (result.value.error) {
			console.error(result.value);
			return "";
		}
		
		return result.value;
	}
	
	this.command = (callback) => {
		return this.api.getAttribute(selector, attribute, callback);
	};
}
