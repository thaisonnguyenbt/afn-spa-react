(function($window) {
	$window.adaptTo("foundation-registry").register("foundation.validation.validator", {
		selector : "[data-validation^='coordinates-rule']",
		validate : function(el) {
			if (el.getAttribute("data-validation")) {
				try {
					var v = el.value;
					if (v) {
						var rgx = new RegExp('^-?\\d+(\\.\\d+)*$');
						if (!rgx.test(v.trim())){
							return "Invalid entry";
						}
					}
				} catch (e) {
					console.error("error parsing coordinates validation: ", attr);
				}
			}
		}
	});
})($(window));