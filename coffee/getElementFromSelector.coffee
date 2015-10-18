#The param "selector" can be an array of selectors, or a string.
#If there's an array i get the parent element, then use jQuery.find()
#or element.querySelectorAll() to find the actual element
getElementFromSelector = (selector, options = {jquery: false}) ->
	if Array.isArray(selector)
		section_selector = selector[0]
		selector = selector[1]

		if options.jquery
			return $(section_selector).find(selector)
		else
			section_element = document.querySelectorAll(section_selector)
			if !section_element.length
				return null;

			section_element = section_element[0]
			if options.parent_element
				section_element = parent_element

			elements = section_element.querySelectorAll(selector)
			if elements.length
				if options.return_all
					return elements
				return elements[0]
	else
		if options.jquery
			return $(selector)
		else
			elements = document.querySelectorAll(selector)
			if elements.length
				if options.return_all
					return elements
				return elements[0]

	return null