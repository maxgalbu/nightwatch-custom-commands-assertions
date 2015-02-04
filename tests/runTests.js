var baseurl = "http://localhost:9999";

module.exports = {
	"test urlMatch": function(browser) {
		return browser
			.url(baseurl+"/urlMatch")
			.assert.urlMatch(/tch$/)
			.assert.urlMatch(/\/[a-zA-z]+$/)
			.end();
	},

	"test jqueryClick": function(browser) {
		return browser
			.url(baseurl+"/jqueryClick")
			.jqueryClick("div:eq(2) button")
			.assert.visible("#div")
			.end();
	},

	"test jqueryElement": function(browser) {
		return browser
			.url(baseurl+"/jqueryElement")
			.jqueryElement(".myclass:has(button)", function(element) {
				this.assert.equal(!!element, true, "jqueryElement: element found");
			})
			.jqueryElement(".nonexistingclass:eq(10)", function(element) {
				this.assert.equal(!element, true, "jqueryElement: element not found");
			})
			.end();
	},

	"test setSelect2Data": function(browser) {
		return browser
			.url(baseurl+"/setSelect2Data")
			.setSelect2Data("#select2", {id:1, text:"ciao"})
			.assert.value("input[name=select2]", "1")
			.end();
	},

	"test setSelect2Value": function(browser) {
		return browser
			.url(baseurl+"/setSelect2Value")
			.setSelect2Value("#select2", "1")
			.assert.value("input[name=select2]", "1")
			.end();
	},

	"test setValueAndTrigger": function(browser) {
		return browser
			.url(baseurl+"/setValueAndTrigger")
			.setValueAndTrigger("#textinput", "1")
			.pause(200)
			.assert.visible("#div")
			.end();
	},
};