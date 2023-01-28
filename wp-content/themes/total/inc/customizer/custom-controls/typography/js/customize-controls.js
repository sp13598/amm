jQuery(document).ready(function ($) {
    $(document).on('change', '.total-typography-font-family select', function () {
        var font_family = $(this).val();
        var $this = $(this);
        $.ajax({
            url: ajaxurl,
            data: {
                action: 'total_get_google_font_variants',
                font_family: font_family,
            },
            beforeSend: function () {
                $this.parent('.total-typography-font-family').next('.total-typography-font-style').addClass('total-typography-loading');
            },
            success: function (response) {
                $this.parent('.total-typography-font-family').next('.total-typography-font-style').removeClass('total-typography-loading');
                $this.parent('.total-typography-font-family').next('.total-typography-font-style').children('select').html(response).trigger('chosen:updated').trigger('change');
            }
        });
    });

    $('.total-typography-color .total-color-picker-hex').wpColorPicker({
        change: function (event, ui) {
            var setting = $(this).attr('data-customize-setting-link');
            var hexcolor = $(this).wpColorPicker('color');
            // Set the new value.
            wp.customize(setting, function (obj) {
                obj.set(hexcolor);
            });
        }
    });

    $('.total-slider-range-font-size').each(function () {
        $(this).slider({
            range: 'min',
            value: 18,
            min: parseInt($(this).attr('min')),
            max: parseInt($(this).attr('max')),
            step: parseInt($(this).attr('step')),
            slide: function (event, ui) {
                $(this).next('.total-slider-value-font-size').find('span').text(ui.value);
                var setting = $(this).next('.total-slider-value-font-size').find('span').attr('data-customize-setting-link');

                // Set the new value.
                wp.customize(setting, function (obj) {
                    obj.set(ui.value);
                });
            }
        });

        $(this).slider('value', $(this).next('.total-slider-value-font-size').find('span').attr('value'));
    });



    $('.total-slider-range-line-height').slider({
        range: 'min',
        value: 1.5,
        min: 0.8,
        max: 5,
        step: 0.1,
        slide: function (event, ui) {
            $(this).next('.total-slider-value-line-height').find('span').text(ui.value);
            var setting = $(this).next('.total-slider-value-line-height').find('span').attr('data-customize-setting-link');
            // Set the new value.
            wp.customize(setting, function (obj) {
                obj.set(ui.value);
            });
        }
    });

    $('.total-slider-range-line-height').each(function () {
        $(this).slider('value', $(this).next('.total-slider-value-line-height').find('span').attr('value'));
    });

    $('.total-slider-range-letter-spacing').slider({
        range: 'min',
        value: 0,
        min: -5,
        max: 5,
        step: 0.1,
        slide: function (event, ui) {
            $(this).next('.total-slider-value-letter-spacing').find('span').text(ui.value);
            var setting = $(this).next('.total-slider-value-letter-spacing').find('span').attr('data-customize-setting-link');
            // Set the new value.
            wp.customize(setting, function (obj) {
                obj.set(ui.value);
            });
        }
    });

    $('.total-slider-range-letter-spacing').each(function () {
        $(this).slider('value', $(this).next('.total-slider-value-letter-spacing').find('span').attr('value'));
    });

    // Chosen JS
    $('.customize-control-total-typography select').chosen({
        width: '100%',
    });
});


(function (api) {

    api.controlConstructor['typography'] = api.Control.extend({
        ready: function () {
            var control = this;

            control.container.on('change', '.total-typography-font-family select',
                    function () {
                        control.settings['family'].set(jQuery(this).val());
                    }
            );

            control.container.on('change', '.total-typography-font-style select',
                    function () {
                        control.settings['style'].set(jQuery(this).val());
                    }
            );

            control.container.on('change', '.total-typography-text-transform select',
                    function () {
                        control.settings['text_transform'].set(jQuery(this).val());
                    }
            );

            control.container.on('change', '.total-typography-text-decoration select',
                    function () {
                        control.settings['text_decoration'].set(jQuery(this).val());
                    }
            );

        }
    });

})(wp.customize);
