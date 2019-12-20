//https://blogs.perficientdigital.com/2018/10/26/simple-multifield-max-item-validation-for-aem-6-4/
$(window).adaptTo("foundation-registry").register("foundation.validation.validator", {
  // check elements that has attribute data-foundation-validation with value starting with "multifield-rule"
  selector: "[data-validation^='multifield-rule']",
  validate: function(el) {
    // get the rule
    var validationRule = el.getAttribute("data-validation");
    if (validationRule) {
    	var attr = validationRule.split("|");
    	if ((attr.length) > 1) {
    		// should contain the rule object
    		var ruleStr = attr[1];
    		try {
	    		var rule = JSON.parse(ruleStr.trim());
	    		if (rule) {
		    		if (rule.max) {
			    		var max = rule.max.value;
					    max = parseInt(max);
					    // el here is a coral-multifield element
					    // see: https://helpx.adobe.com/experience-manager/6-4/sites/developing/using/reference-materials/coral-ui/coralui3/Coral.Multifield.html
					    if (el.items.length > max){
					        // items added are more than allowed, return error
					        return rule.max.message;
					    }
		    		}
					if (rule.min) {
						var min = rule.min.value;
						min = parseInt(min);
						// el here is a coral-multifield element
						// see: https://helpx.adobe.com/experience-manager/6-4/sites/developing/using/reference-materials/coral-ui/coralui3/Coral.Multifield.html
						if (el.items.length < min){
							// items added are more than allowed, return error
							return rule.min.message;
						}
					}
	    		}
    		} catch(e){
    			console.error("error parsing validation rule: ", ruleStr);
    		}
    	}
  	}
  }
});