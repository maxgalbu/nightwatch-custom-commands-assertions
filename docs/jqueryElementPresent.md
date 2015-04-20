

<!-- Start coffee/assertions/jqueryElementPresent.coffee -->

Assert that the element identified by the jquery selector exists in the DOM.
***Requires jqueryElement command***
### Examples:

    browser
        .url("http://www.github.com")
        .assert.jqueryElementPresent("div:eq(2)")

Author: maxgalbu

### Params:

* **String** *selector* - jQuery selector
* **String** *[msg]* - output to identify the assertion

<!-- End coffee/assertions/jqueryElementPresent.coffee -->

