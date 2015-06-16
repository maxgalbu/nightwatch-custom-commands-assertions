var fs = require('fs'),
	mockServer = require('mockserver-client'),
	mockServerClient = mockServer.mockServerClient;

function monkeyPatch(mockSrvClnt)
{
	mockSrvClnt.mockHTMLResponse = function(uri, filePath) {
		if (!fs.existsSync(filePath))
		{
			console.log("File doesn't exist: "+filePath);
			return;
		}

		mockSrvClnt.mockAnyResponse({
			'httpRequest': {
				'method': 'GET',
				'path': uri,
			},
			'httpResponse': {
				'statusCode': 200,
				'body': fs.readFileSync(filePath, {encoding: "utf8"}),
				'headers': [{
					"name": "Content-Type",
					"values": ["text/html; charset=utf-8"]
				}],
			}
		});
	};

	return mockSrvClnt;
}

monkeyPatchedMSC = monkeyPatch(mockServerClient("localhost", 9999));
monkeyPatchedMSC.mockHTMLResponse('/urlMatch', "html/urlMatch.html");
monkeyPatchedMSC.mockHTMLResponse('/jqueryClick', "html/jqueryClick.html");
monkeyPatchedMSC.mockHTMLResponse('/jqueryElement', "html/jqueryElement.html");
monkeyPatchedMSC.mockHTMLResponse('/jqueryElementPresent', "html/jqueryElement.html");
monkeyPatchedMSC.mockHTMLResponse('/setSelect2Data', "html/select2.html");
monkeyPatchedMSC.mockHTMLResponse('/setSelect2Value', "html/select2.html");
monkeyPatchedMSC.mockHTMLResponse('/setValueAndTrigger', "html/input.html");
monkeyPatchedMSC.mockHTMLResponse('/waitForJqueryElement', "html/waitForJqueryElement.html");
monkeyPatchedMSC.mockHTMLResponse('/waitForAttribute', "html/attribute.html");
monkeyPatchedMSC.mockHTMLResponse('/waitForText', "html/text.html");
monkeyPatchedMSC.mockHTMLResponse('/waitForTitle', "html/title.html");
monkeyPatchedMSC.mockHTMLResponse('/saveElementScreenshot', "html/screenshot.html");
monkeyPatchedMSC.mockHTMLResponse('/children', "html/children.html");
monkeyPatchedMSC.mockHTMLResponse('/nochildren', "html/nochildren.html");
