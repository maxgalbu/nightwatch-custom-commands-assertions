

<!-- Start es6/assertions/attributeMatches.js -->

Assert that the element identified by the selector has an attribute that matches
the provided regexp.
### Examples:

    browser
        .url("http://www.github.com")
        .assert.attributeMatches("body", "class", /body-class/g)

    browser
        .url("http://www.github.com")
        .assert.attributeMatches("body", "class", new RegExp("body-class", "g")

Author: maxgalbu

### Params:

* **String** *selector* - the element selector
* **String** *attribute* - the element attribute
* **RegExp** *regexp* - the regexp that should match the attribute
* **String** *[msg]* - output to identify the assertion

<!-- End es6/assertions/attributeMatches.js -->

