jQuery(document).ready(function ($) {
    $("body").on("click", ".total-switch-section.total-switch", function () {
        var controlName = $(this).siblings("input").data("customize-setting-link");
        var controlValue = $(this).siblings("input").val();
        var iconClass = "dashicons-visibility";
        if (controlValue === "off") {
            iconClass = "dashicons-hidden";
            $("[data-control=" + controlName + "]")
                    .parent()
                    .addClass("total-section-hidden")
                    .removeClass("total-section-visible");
        } else {
            $("[data-control=" + controlName + "]")
                    .parent()
                    .addClass("total-section-visible")
                    .removeClass("total-section-hidden");
        }
        $("[data-control=" + controlName + "]")
                .children()
                .attr("class", "dashicons " + iconClass);
    });
});
