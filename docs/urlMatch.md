

<!-- Start coffee/assertions/urlMatch.coffee -->

Assert that the url matches the regex provided
### Examples:

    browser
        .url("http://www.google.com")
        .assert.urlMatch(/\.com$/)

    browser
        .url("http://www.google.com")
        .assert.urlMatch(new RegExp("\.com$", "i")

Author: maxgalbu

### Params:

* **RegExp** *regex* - regular expression
* **String** *[msg]* - output to identify the assertion

<!-- End coffee/assertions/urlMatch.coffee -->

