/**
 * this is a custom validation for the carousel component max limit
 */
$(window).adaptTo("foundation-registry").register("foundation.validation.validator", {
	selector : "[data-cmp-is='childrenEditor']",
	validate : function(el) {
		var $el = $(el);
		// check if editor container is a carousel
		var cpath = $el.data("container-path");
		if (cpath) {
			var p = cpath.split("/");
			if (p && p.length > 0) {
				var pname = p[p.length - 1];
				if ("carousel" == pname) {
					// count the number of items to be added in the carousel
					var listItems = $el.find(".coral3-Multifield-item");
					if (listItems) {
						if (listItems.length > 5) {
							// adjust top for tooltip error
							$el.css({"margin-top":"30px"});
							return "The carousel is limited to only 5 items.";
						}
					}
				}
			}
		}
	}
});