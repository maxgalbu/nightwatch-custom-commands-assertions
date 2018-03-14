//The param "selector" can be an array of selectors, or a string.
//If there's an array i get the parent element, then use jQuery.find()
//or element.querySelectorAll() to find the actual element
let getElementFromSelector = function(selector, options = {jquery: false}) {
	if (Array.isArray(selector)) {
		let section_selector = selector[0];
		selector = selector[1];

		if (options.jquery) {
			return $(section_selector).find(selector);
		} else {
			let section_element = document.querySelectorAll(section_selector);
			if (!section_element.length) {
				return null;
			}

			section_element = section_element[0];
			if (options.parent_element) {
				section_element = options.parent_element;
			}

			var elements = section_element.querySelectorAll(selector);
			if (elements.length) {
				if (options.return_all) {
					return elements;
				}
				return elements[0];
			}
		}
	} else {
		if (options.jquery) {
			return $(selector);
		} else {
			let parent_element = document;
			if (options.parent_element) {
				parent_element = options.parent_element;
			}

			var elements = parent_element.querySelectorAll(selector);
			if (elements.length) {
				if (options.return_all) {
					return elements;
				}
				return elements[0];
			}
		}
	}

	return null;
};