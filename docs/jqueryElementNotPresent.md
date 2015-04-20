

<!-- Start coffee/assertions/jqueryElementNotPresent.coffee -->

assert that the element identified by the jquery selector does NOT exist in the DOM.
***Requires jqueryElement command***
### Examples:

    browser
        .url("http://www.github.com")
        .assert.jqueryElementNotPresent("div:eq(10000)")

Author: maxgalbu

### Params:

* **String** *selector* - jQuery selector
* **String** *[msg]* - output to identify the assertion

<!-- End coffee/assertions/jqueryElementNotPresent.coffee -->

