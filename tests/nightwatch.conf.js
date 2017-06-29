var seleniumServer = require('selenium-server');

module.exports = {
	"src_folders": "runTests.js",
	"output_folder": false,
	"custom_commands_path": "../js/commands",
	"custom_assertions_path": "../js/assertions",
	"page_objects_path": "./page_objects",
	
	"selenium": {
		"start_process": true,
		"server_path": seleniumServer.path,
		"log_path": false,
		"host": "127.0.0.1",
		"port": 4444,
		"cli_args": {
			"webdriver.gecko.driver": "../node_modules/geckodriver/bin/geckodriver",
			"webdriver.chrome.driver": "../node_modules/chromedriver/lib/chromedriver/chromedriver",
			"webdriver.ie.driver": ""
		}
	},
	
	"test_settings": {
		"default": {
			"launch_url": "http://localhost",
			"selenium_port" : 4444,
			"selenium_host" : "localhost",
			"silent": true,
			"screenshots": {
				"enabled": false,
				"path": ""
			},
			"desiredCapabilities": {
				"browserName": "firefox",
				"javascriptEnabled": true,
				"acceptSslCerts": true
			}
		},
		
		"chrome": {
			"desiredCapabilities": {
				"browserName": "chrome",
				"chromeOptions" : {
					"args": ["no-sandbox"]
				}
			}
		}
	}
}
