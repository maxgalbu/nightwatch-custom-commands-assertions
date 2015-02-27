

<!-- Start coffee/assertions/jqueryElementPresent.coffee -->

Assert that the url matches the regex provided.
***Requires jqueryElement command***
### Examples:

    browser
        .url("http://www.github.com")
        .assert.jqueryElementPresent("div:eq(2)")

Author: maxgalbu

### Params:

* **RegExp** *selector* - jQuery selector
* **String** *[msg]* - output to identify the assertion

<!-- End coffee/assertions/jqueryElementPresent.coffee -->

