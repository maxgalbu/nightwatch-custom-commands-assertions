

<!-- Start es6/assertions/elementHasChildren.js -->

Assert that the element identified by the selector has children nodes
that matches the children selectors (if passed)
### Examples:

    browser
        .url("http://www.github.com")
        .assert.elementHasChildren("#list-of-tasks", "div, span")

    browser
        .url("http://www.github.com")
        .assert.elementHasChildren("#list-of-tasks", ".myclass, li input:checked")

Author: maxgalbu

### Params:

* **String** *selector* - the element selector
* **String** *[children_selectors]* - a list of selectors for children nodes
* **String** *[msg]* - output to identify the assertion

<!-- End es6/assertions/elementHasChildren.js -->

