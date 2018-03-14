var fs = require("fs");
var easyimg = require("easyimage");
var baseurl = "http://localhost:9999";

module.exports = {
	"test page objects": function(browser) {
		var pageObject = browser.page.test();

		browser.url(baseurl+"/pageObjects");
		pageObject
			.jqueryClick("@thatButton")
			.assert.visible("#div")
			.assert.elementHasChildren("@thirdDiv");
		
		//Test using css selector
		browser.url(baseurl+"/waitForText");
		pageObject.waitForText("@waitForCss", function (text) {
			return text === "something else";
		});

		//test using xpath selector
		browser.url(baseurl+"/waitForText");
		pageObject.waitForText("@waitForXpath", function (text) {
			return text === "something else";
		});

		//Test using css selector
		browser.url(baseurl+"/waitForAttribute");
		pageObject.waitForAttribute("@waitForCss", "class", function (divclass) {
			return divclass === "myclass";
		});

		//test using xpath selector
		browser.url(baseurl+"/waitForAttribute");
		pageObject.waitForAttribute("@waitForXpath", "class", function (divclass) {
			return divclass === "myclass";
		});

		//test if locatestrategy is restored correctly
		browser.url(baseurl+"/waitForText");
		browser.waitForText("#div", function (text) {
			return text === "something else";
		});

		browser.end();
	},

	"test page objects with sections": function(browser) {
		var pageObject = browser.page.test();

		browser.url(baseurl+"/jqueryClick");
		pageObject.section.jqueryClick.jqueryClick("@element");
		browser.assert.visible("#div");

		browser.url(baseurl+"/setSelect2Data");
		pageObject.section.select2.setSelect2Data("@element", {id:1, text:"ciao"});
		browser.assert.value("input[name=select2]", "1");

		browser.url(baseurl+"/setSelect2Value");
		pageObject.section.select2.setSelect2Value("@element", "1");
		browser.assert.value("input[name=select2]", "1");

		browser.url(baseurl+"/setValueAndTrigger");
		pageObject.section.trigger.setValueAndTrigger("@element", "1");
		browser.assert.visible("#div");

		browser.url(baseurl+"/children");
		pageObject.section.children
			.assert.elementHasChildren("@element")
			.assert.elementHasChildren("@element", "li")
			.assert.elementHasChildren("@element", "@element2");

		browser.url(baseurl+"/nochildren");
		pageObject.section.children
			.assert.elementHasNoChildren("@element")
			.assert.elementHasNoChildren("@element");

		browser.url(baseurl+"/waitForJqueryElement");
		pageObject.section.jqueryWait
			.waitForJqueryElement("@element");

		browser.end();
	},

	"test elementHasChildren": function(browser) {
		return browser
			.url(baseurl+"/children")
			.assert.elementHasChildren(".myclass")
			.assert.elementHasChildren(".myclass", "li")
			.end();
	},

	"test elementHasChildrenCount": function(browser) {
		return browser
			.url(baseurl+"/children")
			.assert.elementHasChildrenCount(".myclass", 3)
			.assert.elementHasChildrenCount(".myclass", 3, "li")
			.end();
	},

	"test elementHasNoChildren": function(browser) {
		return browser
			.url(baseurl+"/nochildren")
			.assert.elementHasNoChildren(".myclass")
			.assert.elementHasNoChildren(".text")
			.end();
	},

	"test saveElementScreenshot": function(browser) {
		var imageFileName = "test.png";

		return browser
			.url(baseurl+"/saveElementScreenshot")
			.saveElementScreenshot(".jumbotron", imageFileName)
			.perform(function(client, done) {
				easyimg.info(imageFileName).then(function(imageInfo) {
					client.assert.equal(imageInfo.height, 234, "saveElementScreenshot works (height found ()"+imageInfo.height+") should be 234)");
					fs.unlinkSync(imageFileName);
					done();
				});
			})
			.end();
	},

	"test waitForJqueryElement": function(browser) {
		browser.globals.waitForConditionTimeout = 5000;
		
		return browser
			.url(baseurl+"/waitForJqueryElement")
			.waitForJqueryElement(".myclass:eq(2) > #div:visible", function() {
				client.assert.equal(true, true, "waitForJqueryElement works");
			})
			.end();
	},

	"test waitForAttribute": function(browser) {
		browser.globals.waitForConditionTimeout = 5000;
		
		return browser
			.url(baseurl+"/waitForAttribute")
			.waitForAttribute("#div", "class", function (divclass) {
				return divclass === "myclass";
			})
			.end();
	},

	"test waitForText": function(browser) {
		browser.globals.waitForConditionTimeout = 5000;
		
		return browser
			.url(baseurl+"/waitForText")
			.waitForText("#div", function (text) {
				return text === "something else";
			})
			.url(baseurl+"/waitForText")
			.useXpath()
			.waitForText("//div[@id='div']", function (text) {
				return text === "something else";
			})
			.useCss()
			.end();
	},

	"test waitForTitle": function(browser) {
		browser.globals.waitForConditionTimeout = 5000;
		
		return browser
			.url(baseurl+"/waitForTitle")
			.waitForTitle(function(title) {
				return title === "something else";
			})
			.end();
	},

	"test urlMatch": function(browser) {
		return browser
			.url(baseurl+"/urlMatch")
			.assert.urlMatch(/tch$/)
			.assert.urlMatch(/\/[a-zA-z]+$/)
			.end();
	},

	"test jqueryElementPresent": function(browser) {
		return browser
			.url(baseurl+"/jqueryElementPresent")
			.assert.jqueryElementPresent(".myclass:has(button)")
			.end();
	},

	"test jqueryElementNotPresent": function(browser) {
		return browser
			.url(baseurl+"/jqueryElementPresent")
			.assert.jqueryElementNotPresent(".noclass")
			.end();
	},

	"test jqueryClick": function(browser) {
		return browser
			.url(baseurl+"/jqueryClick")
			.jqueryClick("div:eq(2) button")
			.assert.visible("#div")
			.jqueryClick("a")
			.pause(1000)
			.assert.urlMatch(/github/)
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

	"test waitForJqueryAjaxRequest": function(browser) {
		return browser
			.url(baseurl+"/waitForAjaxRequest")
			.waitForJqueryAjaxRequest(5000)
			.assert.containsText("#div", "something else")
			.end();
	},

	"test waitForDocumentLoaded": function (browser) {
		return browser
			.url(baseurl + "/waitForDocumentLoaded")
			.waitForDocumentLoaded(5000)
			.assert.visible("#xkcd-img")
			.end();
    },
};
