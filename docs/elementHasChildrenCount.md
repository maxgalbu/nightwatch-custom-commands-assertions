

<!-- Start es6/assertions/elementHasChildrenCount.js -->

Assert that the element identified by the selector has a number of children nodes
that match the children selectors (if passed)
### Examples:

    browser
        .url("http://www.github.com")
        .assert.elementHasChildrenCount("#list-of-tasks", 10)

    browser
        .url("http://www.github.com")
        .assert.elementHasChildrenCount("#list-of-tasks", 1, ".myclass, li input:checked")

Author: maxgalbu

### Params:

* **String** *selector* - the element selector
* **Integer** *children_count* - number of elements that should match
* **String** *[children_selectors]* - a list of selectors for children nodes
* **String** *[msg]* - output to identify the assertion

<!-- End es6/assertions/elementHasChildrenCount.js -->

