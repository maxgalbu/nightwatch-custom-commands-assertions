

<!-- Start coffee/commands/jqueryElement.coffee -->

Returns an element using jquery selectors
### Examples:

    browser.jqueryElement(".classname:first > input:checked", function(element) {
        //element is the DOM element
    })
    browser.jqueryElement("div:has(.classname):contains('something'):last", function(element) {
        //element is the DOM element
    })

Author: maxgalbu

### Params:

* **String** *selector* - jQuery selector for the element
* **Function** *callback* - function that will be called with the element as argument

<!-- End coffee/commands/jqueryElement.coffee -->

