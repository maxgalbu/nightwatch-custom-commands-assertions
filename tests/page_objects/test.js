module.exports = {
	elements: {
		thirdDiv: 'div:nth-child(3)',
		thatButton: 'div:eq(2) #button',
		waitForCss: {
			selector: '#div',
			locateStrategy: "css",
		},
		waitForXpath: {
			selector: '//div[@id="div"]',
			locateStrategy: "xpath",
		},
	},
	sections: {
		menu: {
			selector: '#navbar',
			elements: {
				homeButton: '.homebutton',
				otherButton: '.otherbutton'
			}
		},
		jqueryClick: {
			selector: "body",
			elements: {
				element: 'div:eq(2) button'
			}
		},
		select2: {
			selector: "body",
			elements: {
				element: '#select2'
			}
		},
		trigger: {
			selector: "body",
			elements: {
				element: '#textinput'
			}
		},
		children: {
			selector: "body",
			elements: {
				element: '.myclass',
				element2: 'li'
			}
		},
		jqueryWait: {
			selector: ".myclass:eq(2)",
			elements: {
				element: ' > #div:visible'
			}
		}
	}
};