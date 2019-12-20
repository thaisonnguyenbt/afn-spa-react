$(document).on("foundation-contentloaded", function(e) {
    var container = e.target;
    $(container).find('[data-validation=checkboxGroup]').each(function(i, el) {

        var max = parseInt($(el).attr("data-max"));
        var checkboxGroupName = $(el).find('[data-validation=checkbox]:first').prop('name');
        var checkboxGroup = $(el).children();
        var checkableCheckboxes = checkboxGroup.find('coral-checkbox[name=\'' + checkboxGroupName + '\']:not([disabled]):not([checked])');
        var nonCheckableCheckboxes = checkboxGroup.find('coral-checkbox[name=\'' + checkboxGroupName + '\'][disabled]:not([checked])');
        var checkboxCheckedCount = checkboxGroup.find('coral-checkbox[name=\'' + checkboxGroupName + '\']:not([disabled])[checked]').length;

        if (!isNaN(max) && checkboxCheckedCount >= max) {
            checkableCheckboxes.each(function() {
                $(this).prop("disabled", true)
            })
        } else {
            nonCheckableCheckboxes.each(function() {
                $(this).prop("disabled", false)
            })
        }
        return;
    });

});

$(window).adaptTo("foundation-registry").register("foundation.validation.validator", {
    selector: "[data-validation=checkbox]",
    validate: function(el) {

        var element = $(el);
        var checkboxGroupName = element.prop('name');
        var checkboxGroup = element.closest('[data-validation=checkboxGroup]');
        var checkboxGroupChildren = checkboxGroup.children();
        var max = parseInt(checkboxGroup.attr("data-max"));
        var checkableCheckboxes = checkboxGroupChildren.find('coral-checkbox[name=\'' + checkboxGroupName + '\']:not([disabled]):not([checked])');
        var nonCheckableCheckboxes = checkboxGroupChildren.find('coral-checkbox[name=\'' + checkboxGroupName + '\'][disabled]:not([checked])');
        var checkboxCheckedCount = checkboxGroupChildren.find('coral-checkbox[name=\'' + checkboxGroupName + '\']:not([disabled])[checked]').length;

        if (!isNaN(max) && checkboxCheckedCount >= max) {
            checkableCheckboxes.each(function() {
                $(this).prop("disabled", true)
            })
        } else {
            nonCheckableCheckboxes.each(function() {
                $(this).prop("disabled", false)
            })
        }

        return;
    }
});