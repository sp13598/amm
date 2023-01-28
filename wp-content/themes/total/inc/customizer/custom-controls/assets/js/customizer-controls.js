jQuery(document).ready(function ($) {
    'use strict';

    var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    // Select Preloader
    $('.total-preloader-selector').on('change', function () {
        var activePreloader = $(this).val();
        $(this).next('.total-preloader-container').find('.total-preloader').hide();
        $(this).next('.total-preloader-container').find('.ht-' + activePreloader).show();
    });

    // Icon Control JS
    $('body').on('click', '.total-icon-box-wrap .total-icon-list li', function () {
        var icon_class = $(this).find('i').attr('class');
        $(this).closest('.total-icon-box').find('.total-icon-list li').removeClass('icon-active');
        $(this).addClass('icon-active');
        $(this).closest('.total-icon-box').prev('.total-selected-icon').children('i').attr('class', '').addClass(icon_class);
        $(this).closest('.total-icon-box').slideUp()
        $(this).closest('.total-icon-box').next('input').val(icon_class).trigger('change');
    });

    $('body').on('click', '.total-icon-box-wrap .total-selected-icon', function () {
        if (!$(this).next().is('.total-icon-box')) {
            var iconbox = $('#total-append-icon-box').clone();
            iconbox.removeAttr('id');
            iconbox.insertAfter($(this));
        }
        $(this).next().slideToggle();
    });

    $('body').on('change', '.total-icon-box-wrap .total-icon-search select', function () {
        var $ele = $(this);
        var selected = $ele.val();
        $ele.parent('.total-icon-search').siblings('.total-icon-list').hide().removeClass('active');
        $ele.parent('.total-icon-search').siblings('.' + selected).show().addClass('active');
        $ele.closest('.total-icon-box').find('.total-icon-search-input').val('');
        $ele.parent('.total-icon-search').siblings('.' + selected).find('li').show();
    });

    $('body').on('keyup', '.total-icon-box-wrap .total-icon-search input', function (e) {
        var $input = $(this);
        var keyword = $input.val().toLowerCase();
        var search_criteria = $input.closest('.total-icon-box').find('.total-icon-list.active i');
        delay(function () {
            $(search_criteria).each(function () {
                if ($(this).attr('class').indexOf(keyword) > -1) {
                    $(this).parent().show();
                } else {
                    $(this).parent().hide();
                }
            });
        }, 500);
    });

    // Switch Control
    $('body').on('click', '.total-switch', function () {
        var $this = $(this);
        if ($this.hasClass('total-switch-on')) {
            $(this).removeClass('total-switch-on');
            $this.next('input').val('off').trigger('change');
        } else {
            $(this).addClass('total-switch-on');
            $this.next('input').val('on').trigger('change');
        }
    });

    // MultiCheck box Control JS
    $('.customize-control-total-checkbox-multiple input[type="checkbox"]').on('change', function () {
        var checkbox_values = $(this).parents('.customize-control').find('input[type="checkbox"]:checked').map(function () {
            return $(this).val();
        }).get().join(',');
        $(this).parents('.customize-control').find('input[type="hidden"]').val(checkbox_values).trigger('change');
    });

    // Chosen JS
    $('.total-chosen-select').chosen({
        width: '100%'
    });

    // Selectize JS
    $(".total-selectize").selectize({
        plugins: ['remove_button', 'drag_drop'],
        delimiter: ',',
        persist: false
    });

    // Image Selector JS
    $('body').on('click', '.total-selector-labels label', function () {
        var $this = $(this);
        var value = $this.attr('data-val');
        $this.siblings().removeClass('selector-selected');
        $this.addClass('selector-selected');
        $this.closest('.total-selector-labels').next('input').val(value).trigger('change');
    });
    $('body').on('change', '.total-type-radio input[type="radio"]', function () {
        var $this = $(this);
        $this.parent('label').siblings('label').find('input[type="radio"]').prop('checked', false);
        var value = $this.closest('.radio-labels').find('input[type="radio"]:checked').val();
        $this.closest('.radio-labels').next('input').val(value).trigger('change');
    });
    $('body').on('change', '.total-type-radio input[type="radio"]', function () {
        var $this = $(this);
        $this.parent('label').siblings('label').find('input[type="radio"]').prop('checked', false);
        var value = $this.closest('.radio-labels').find('input[type="radio"]:checked').val();
        $this.closest('.radio-labels').next('input').val(value).trigger('change');
    });

    // Range JS
    $('.customize-control-total-range-slider').each(function () {
        var sliderValue = $(this).find('input').val();
        var newSlider = $(this).find('.total-range-slider');
        var sliderMinValue = parseFloat(newSlider.attr('slider-min-value'));
        var sliderMaxValue = parseFloat(newSlider.attr('slider-max-value'));
        var sliderStepValue = parseFloat(newSlider.attr('slider-step-value'));
        newSlider.slider({
            value: sliderValue,
            min: sliderMinValue,
            max: sliderMaxValue,
            step: sliderStepValue,
            range: 'min',
            slide: function (e, ui) {
                $(this).parent().find('input').trigger('change');
            },
            change: function (e, ui) {
                $(this).parent().find('input').trigger('change');
            }
        });
    });

    // Change the value of the input field as the slider is moved
    $('.customize-control-total-range-slider .total-range-slider').on('slide', function (event, ui) {
        $(this).parent().find('input').val(ui.value);
    });

    // Reset slider and input field back to the default value
    $('.customize-control-total-range-slider .total-slider-reset').on('click', function () {
        var resetValue = $(this).attr('slider-reset-value');
        $(this).parents('.customize-control-total-range-slider').find('input').val(resetValue);
        $(this).parents('.customize-control-total-range-slider').find('.total-range-slider').slider('value', resetValue);
    });

    // Update slider if the input field loses focus as it's most likely changed
    $('.customize-control-total-range-slider input').blur(function () {
        var resetValue = $(this).val();
        var slider = $(this).parents('.customize-control-total-range-slider').find('.total-range-slider');
        var sliderMinValue = parseInt(slider.attr('slider-min-value'));
        var sliderMaxValue = parseInt(slider.attr('slider-max-value'));
        // Make sure our manual input value doesn't exceed the minimum & maxmium values
        if (resetValue < sliderMinValue) {
            resetValue = sliderMinValue;
            $(this).val(resetValue);
        }
        if (resetValue > sliderMaxValue) {
            resetValue = sliderMaxValue;
            $(this).val(resetValue);
        }
        $(this).parents('.customize-control-total-range-slider').find('.total-range-slider').slider('value', resetValue);
    });

    // TinyMCE Editor
    $(document).on('tinymce-editor-init', function () {
        $('.customize-control').find('.wp-editor-area').each(function () {
            var tArea = $(this),
                    id = tArea.attr('id'),
                    input = $('input[data-customize-setting-link="' + id + '"]'),
                    editor = tinyMCE.get(id),
                    content;
            if (editor) {
                editor.onChange.add(function () {
                    this.save();
                    content = editor.getContent();
                    input.val(content).trigger('change');
                });
            }
            tArea.css({
                visibility: 'visible'
            }).on('keyup', function () {
                content = tArea.val();
                input.val(content).trigger('change');
            });
        });
    });

    // Select Image
    $('.total-image-selector').on('change', function () {
        var activeImage = $(this).find(':selected').attr('data-image');
        $(this).next('.total-image-container').find('img').attr('src', activeImage);
    });

    // Date Picker
    $('.total-datepicker').datepicker({
        dateFormat: 'yy/mm/dd'
    });

    // Color Tab
    $('.total-color-tab-toggle').on('click', function () {
        $(this).closest('.customize-control').find('.total-color-tab-wrap').slideToggle();
    });

    $('.total-color-tab-switchers li').on('click', function () {
        if ($(this).hasClass('active')) {
            return false;
        }
        var clicked = $(this).attr('data-tab');
        $(this).parent('.total-color-tab-switchers').find('li').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.total-color-tab-wrap').find('.total-color-tab-contents > div').hide();
        $(this).closest('.total-color-tab-wrap').find('.' + clicked).fadeIn();
    });

    //Gallery Control
    $('.total-gallery-button').click(function (e) {
        e.preventDefault();

        var button = $(this);
        var hiddenfield = button.prev();
        if (hiddenfield.val()) {
            var hiddenfieldvalue = hiddenfield.val().split(",");
        } else {
            var hiddenfieldvalue = new Array();
        }

        var frame = wp.media({
            title: 'Insert Images',
            library: {
                type: 'image',
                post__not_in: hiddenfieldvalue
            },
            button: {text: 'Use Images'},
            multiple: 'add'
        });

        frame.on('select', function () {
            var attachments = frame.state().get('selection').map(function (a) {
                a.toJSON();
                return a;
            });
            var i;
            /* loop through all the images */
            for (i = 0; i < attachments.length; ++i) {
                /* add HTML element with an image */
                $('ul.total-gallery-container').append('<li data-id="' + attachments[i].id + '"><span style="background-image:url(' + attachments[i].attributes.url + ')"></span><a href="#" class="total-gallery-remove">×</a></li>');
                /* add an image ID to the array of all images */
                hiddenfieldvalue.push(attachments[i].id);
            }
            /* refresh sortable */
            $("ul.total-gallery-container").sortable("refresh");
            /* add the IDs to the hidden field value */
            hiddenfield.val(hiddenfieldvalue.join()).trigger('change');
        }).open();
    });

    $('ul.total-gallery-container').sortable({
        items: 'li',
        cursor: '-webkit-grabbing', /* mouse cursor */
        stop: function (event, ui) {
            ui.item.removeAttr('style');

            var sort = new Array(), /* array of image IDs */
                    gallery = $(this); /* ul.total-gallery-container */

            /* each time after dragging we resort our array */
            gallery.find('li').each(function (index) {
                sort.push($(this).attr('data-id'));
            });
            /* add the array value to the hidden input field */
            gallery.next().val(sort.join()).trigger('change');
        }
    });

    /*
     * Remove certain images
     */
    $('body').on('click', '.total-gallery-remove', function () {
        var id = $(this).parent().attr('data-id'),
                gallery = $(this).parent().parent(),
                hiddenfield = gallery.next(),
                hiddenfieldvalue = hiddenfield.val().split(","),
                i = hiddenfieldvalue.indexOf(id);

        $(this).parent().remove();

        /* remove certain array element */
        if (i != -1) {
            hiddenfieldvalue.splice(i, 1);
        }

        /* add the IDs to the hidden field value */
        hiddenfield.val(hiddenfieldvalue.join()).trigger('change');

        /* refresh sortable */
        gallery.sortable("refresh");

        return false;
    });

    // Scroll to Footer - add scroll to header as well
    $('.customize-control-total-repeater').on('click', '#accordion-section-total_footer_section .accordion-section-title', function (event) {
        var preview_section_id = 'total-colophon';
        var $contents = jQuery('#customize-preview iframe').contents();
        if ($contents.find('#' + preview_section_id).length > 0) {
            $contents.find('html, body').animate({
                scrollTop: $contents.find('#' + preview_section_id).offset().top
            }, 1000);
        }
    });

    // Repeater Fields
    $('.customize-control-total-repeater').on('click', '.total-repeater-field-title', function () {
        $(this).next().slideToggle();
        $(this).closest('.total-repeater-field-control').toggleClass('expanded');
    });

    $('.customize-control-total-repeater').on('click', '.total-repeater-field-close', function () {
        $(this).closest('.total-repeater-fields').slideUp();
        $(this).closest('.total-repeater-field-control').toggleClass('expanded');
    });

    $('.customize-control-total-repeater').on('click', '.total-add-control-field', function () {
        var $this = $(this).parent();
        if (typeof $this != 'undefined') {
            var field = $this.find('.total-repeater-field-control:first').clone();
            if (typeof field != 'undefined') {
                field.find('input[type="text"][data-name]').each(function () {
                    var defaultValue = $(this).attr('data-default');
                    $(this).val(defaultValue);
                });
                field.find('textarea[data-name]').each(function () {
                    var defaultValue = $(this).attr('data-default');
                    $(this).val(defaultValue);
                });
                field.find('select[data-name]').each(function () {
                    var defaultValue = $(this).attr('data-default');
                    $(this).val(defaultValue);
                });
                field.find('.radio-labels input[type="radio"]').each(function () {
                    var defaultValue = $(this).closest('.radio-labels').next('input[data-name]').attr('data-default');
                    $(this).closest('.radio-labels').next('input[data-name]').val(defaultValue);
                    if ($(this).val() == defaultValue) {
                        $(this).prop('checked', true);
                    } else {
                        $(this).prop('checked', false);
                    }
                });
                field.find('.total-type-checkbox input[type="checkbox"]').each(function () {
                    var defaultValue = $(this).attr('data-default');
                    if ($(this).val() == defaultValue) {
                        $(this).prop('checked', true);
                    } else {
                        $(this).prop('checked', false);
                    }
                });
                field.find('.total-selector-labels label').each(function () {
                    var defaultValue = $(this).closest('.total-selector-labels').next('input[data-name]').attr('data-default');
                    var dataVal = $(this).attr('data-val');
                    $(this).closest('.total-selector-labels').next('input[data-name]').val(defaultValue);
                    if (defaultValue == dataVal) {
                        $(this).addClass('selector-selected');
                    } else {
                        $(this).removeClass('selector-selected');
                    }
                });
                field.find('.total-range-slider-control-wrap').each(function () {
                    var $slider = $(this).find('.total-range-slider');
                    $slider.removeClass('ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all').empty();
                    var defaultValue = parseFloat($slider.attr('data-default'));
                    $(this).find('input').val(defaultValue);
                    $slider.slider({
                        range: 'min',
                        value: parseFloat($slider.attr('data-default')),
                        min: parseFloat($slider.attr('data-min')),
                        max: parseFloat($slider.attr('data-max')),
                        step: parseFloat($slider.attr('data-step')),
                        slide: function (event, ui) {
                            $slider.closest('.total-range-slider-control-wrap').find('input[data-name]').val(ui.value);
                            total_refresh_repeater_values();
                        }
                    });
                });
                field.find('.total-onoffswitch').each(function () {
                    var defaultValue = $(this).next('input[data-name]').attr('data-default');
                    $(this).next('input[data-name]').val(defaultValue);
                    if (defaultValue == 'on') {
                        $(this).addClass('total-switch-on');
                    } else {
                        $(this).removeClass('total-switch-on');
                    }
                });
                field.find('.total-toggle').each(function () {
                    var defaultValue = $(this).find('input[data-name]').attr('data-default');
                    $(this).find('input[data-name]').val(defaultValue);
                    if (defaultValue == 'yes') {
                        $(this).find('.total-onoff-switch-label').addClass('total-toggle-on');
                    } else {
                        $(this).find('.total-onoff-switch-label').removeClass('total-toggle-on');
                    }
                });
                field.find('.total-color-picker').each(function () {
                    $total_colorPicker = $(this);
                    $total_colorPicker.closest('.wp-picker-container').after($(this));
                    $total_colorPicker.prev('.wp-picker-container').remove();
                    $(this).wpColorPicker({
                        change: function (event, ui) {
                            setTimeout(function () {
                                total_refresh_repeater_values();
                            }, 100);
                        }
                    });
                });
                field.find('.attachment-media-view').each(function () {
                    var defaultValue = $(this).find('input[data-name]').attr('data-default');
                    $(this).find('input[data-name]').val(defaultValue);
                    if (defaultValue) {
                        $(this).find('.thumbnail-image').html('<img src="' + defaultValue + '"/>').prev('.placeholder').addClass('hidden');
                    } else {
                        $(this).find('.thumbnail-image').html('').prev('.placeholder').removeClass('hidden');
                    }
                });
                field.find('.total-icon-box').each(function () {
                    var defaultValue = $(this).next('input[data-name]').attr('data-default');
                    $(this).next('input[data-name]').val(defaultValue);
                    $(this).prev('.total-selected-icon').children('i').attr('class', '').addClass(defaultValue);
                    $(this).find('li').each(function () {
                        var icon_class = $(this).find('i').attr('class');
                        if (defaultValue == icon_class) {
                            $(this).addClass('icon-active');
                        } else {
                            $(this).removeClass('icon-active');
                        }
                    });
                });
                field.find('.total-multi-category-list').each(function () {
                    var defaultValue = $(this).next('input[data-name]').attr('data-default');
                    $(this).next('input[data-name]').val(defaultValue);
                    $(this).find('input[type="checkbox"]').each(function () {
                        if ($(this).val() == defaultValue) {
                            $(this).prop('checked', true);
                        } else {
                            $(this).prop('checked', false);
                        }
                    });
                });
                //field.find('.total-fields').show();
                $this.find('.total-repeater-field-control-wrap').append(field);
                field.addClass('expanded').find('.total-repeater-fields').show();
                $('.accordion-section-content').animate({
                    scrollTop: $this.height()
                }, 1000);
                total_refresh_repeater_values();
            }
        }
        return false;
    });

    $('.customize-control-total-repeater').on('click', '.total-repeater-field-remove', function () {
        if (typeof $(this).parent() != 'undefined') {
            $(this).closest('.total-repeater-field-control').slideUp('normal', function () {
                $(this).remove();
                total_refresh_repeater_values();
            });
        }
        return false;
    });

    $('.customize-control-total-repeater').on('keyup change', '[data-name]', function () {
        delay(function () {
            total_refresh_repeater_values();
            return false;
        }, 500);
    });

    $('.customize-control-total-repeater').on('change', 'input[type="checkbox"][data-name]', function () {
        if ($(this).is(':checked')) {
            $(this).val('yes');
            $(this).parent('label').addClass('total-toggle-on');
        } else {
            $(this).val('no');
            $(this).parent('label').removeClass('total-toggle-on');
        }
        return false;
    });

    // Drag and drop to change order
    $('.total-repeater-field-control-wrap').sortable({
        orientation: 'vertical',
        handle: '.total-repeater-field-title',
        update: function (event, ui) {
            total_refresh_repeater_values();
        }
    });

    // Set all variables to be used in scope
    var frame;
    // ADD IMAGE LINK
    $('.customize-control-total-repeater').on('click', '.total-upload-button', function (event) {
        event.preventDefault();
        var imgContainer = $(this).closest('.total-fields-wrap').find('.thumbnail-image'),
                placeholder = $(this).closest('.total-fields-wrap').find('.placeholder'),
                imgIdInput = $(this).siblings('.upload-id');
        // Create a new media frame
        frame = wp.media({
            title: 'Select or Upload Image',
            button: {
                text: 'Use Image'
            },
            multiple: false // Set to true to allow multiple files to be selected
        });
        // When an image is selected in the media frame...
        frame.on('select', function () {
            // Get media attachment details from the frame state
            var attachment = frame.state().get('selection').first().toJSON();
            // Send the attachment URL to our custom image input field.
            imgContainer.html('<img src="' + attachment.url + '" style="max-width:100%;"/>');
            placeholder.addClass('hidden');
            // Send the attachment id to our hidden input
            imgIdInput.val(attachment.url).trigger('change');
        });
        // Finally, open the modal on click
        frame.open();
    });

    // DELETE IMAGE LINK
    $('.customize-control-total-repeater').on('click', '.total-delete-button', function (event) {
        event.preventDefault();
        var imgContainer = $(this).closest('.total-fields-wrap').find('.thumbnail-image'),
                placeholder = $(this).closest('.total-fields-wrap').find('.placeholder'),
                imgIdInput = $(this).siblings('.upload-id');
        // Clear out the preview image
        imgContainer.find('img').remove();
        placeholder.removeClass('hidden');
        // Delete the image id from the hidden input
        imgIdInput.val('').trigger('change');
    });

    var ColorChange = false;
    $('.customize-control-total-repeater .total-color-picker').wpColorPicker({
        change: function (event, ui) {
            total_refresh_repeater_values();
        }
    });
    ColorChange = true;

    //MultiCheck box Control JS
    $('.customize-control-total-repeater').on('change', '.total-type-multicategory input[type="checkbox"]', function () {
        var checkbox_values = $(this).parents('.total-type-multicategory').find('input[type="checkbox"]:checked').map(function () {
            return $(this).val();
        }).get().join(',');
        $(this).parents('.total-type-multicategory').find('input[type="hidden"]').val(checkbox_values).trigger('change');
        total_refresh_repeater_values();
    });

    $('.total-type-range').each(function () {
        var $slider = $(this).find('.total-range-slider');
        $slider.slider({
            range: 'min',
            value: parseFloat($slider.attr('data-value')),
            min: parseFloat($slider.attr('data-min')),
            max: parseFloat($slider.attr('data-max')),
            step: parseFloat($slider.attr('data-step')),
            slide: function (event, ui) {
                $slider.closest('.total-range-slider-control-wrap').find('input').val(ui.value);
                total_refresh_repeater_values();
            }
        });
    });

    function total_refresh_repeater_values() {
        $('.control-section.open .total-repeater-field-control-wrap').each(function () {
            var values = [];
            var $this = $(this);

            $this.find('.total-repeater-field-control').each(function () {
                var valueToPush = {};

                $(this).find('[data-name]').each(function () {
                    var dataName = $(this).attr('data-name');
                    var dataValue = $(this).val();
                    valueToPush[dataName] = dataValue;
                });

                values.push(valueToPush);
            });

            $this.next('.total-repeater-collector').val(JSON.stringify(values)).trigger('change');
        });
    }
});

function total_set_bg_color_value($container, $element, $obj) {
    $container.find($element).wpColorPicker({
        change: function (event, ui) {
            var color = ui.color.to_s();
            $obj.set(color);
        },
        clear: function (event) {
            var element = jQuery(event.target).closest('.wp-picker-input-wrap').find('.wp-color-picker')[0];
            var color = '';
            if (element) {
                $obj.set(color);
            }
        },
    });
}

(function (api) {
    api.controlConstructor['background-image'] = api.Control.extend({
        ready: function () {
            var control = this;
            control.container.on('click', '.total-upload-button', function (event) {
                event.preventDefault();
                var imgContainer = jQuery(this).closest('.customize-control-background-image').find('.total-thumbnail'),
                        placeholder = jQuery(this).closest('.customize-control-background-image').find('.total-placeholder'),
                        imgIdInput = jQuery(this).closest('.customize-control-background-image').find('.total-background-image-id'),
                        imgUrlInput = jQuery(this).closest('.customize-control-background-image').find('.total-background-image-url'),
                        backgroundFields = jQuery(this).closest('.customize-control-background-image').find('.total-background-image-fields');
                var frame = wp.media({
                    title: 'Select or Upload Image',
                    button: {
                        text: 'Select Image'
                    },
                    multiple: false
                });
                frame.on('select', function () {
                    var attachment = frame.state().get('selection').first().toJSON();
                    imgContainer.html('<img src="' + attachment.url + '"/>');
                    placeholder.addClass('hidden');
                    imgIdInput.val(attachment.id).trigger('change');
                    imgUrlInput.val(attachment.url).trigger('change');
                    backgroundFields.show();
                });
                // Finally, open the modal on click
                frame.open();
            });

            // DELETE IMAGE LINK
            control.container.on('click', '.total-remove-button', function (event) {
                event.preventDefault();
                var imgContainer = jQuery(this).closest('.customize-control-background-image').find('.total-thumbnail'),
                        placeholder = jQuery(this).closest('.customize-control-background-image').find('.total-placeholder'),
                        imgIdInput = jQuery(this).closest('.customize-control-background-image').find('.total-background-image-id'),
                        imgUrlInput = jQuery(this).closest('.customize-control-background-image').find('.total-background-image-url'),
                        backgroundFields = jQuery(this).closest('.customize-control-background-image').find('.total-background-image-fields');
                imgContainer.find('img').remove();
                placeholder.removeClass('hidden');
                imgIdInput.val('').trigger('change');
                imgUrlInput.val('').trigger('change');
                backgroundFields.hide();
            });

            control.container.on('change', '.background-image-repeat select', function () {
                control.settings['repeat'].set(jQuery(this).val());
            });
            control.container.on('change', '.background-image-size select', function () {
                control.settings['size'].set(jQuery(this).val());
            });
            control.container.on('change', '.background-image-attachment select', function () {
                control.settings['attachment'].set(jQuery(this).val());
            });
            control.container.on('change', '.background-image-position select', function () {
                control.settings['position'].set(jQuery(this).val());
            });
            total_set_bg_color_value(control.container, '.background-image-color input', control.settings['color']);
            total_set_bg_color_value(control.container, '.background-image-overlay input', control.settings['overlay']);
        }
    });

    // Tab Control
    api.Tabs = [];
    api.Tab = api.Control.extend({
        ready: function () {
            var control = this;
            control.container.find('a.total-customizer-tab').click(function (evt) {
                var tab = jQuery(this).data('tab');
                evt.preventDefault();
                control.container.find('a.total-customizer-tab').removeClass('active');
                jQuery(this).addClass('active');
                control.toggleActiveControls(tab);
            });
            api.Tabs.push(control.id);
        },
        toggleActiveControls: function (tab) {
            var control = this,
                    currentFields = control.params.buttons[tab].fields;
            _.each(control.params.fields, function (id) {
                var tabControl = api.control(id);
                if (undefined !== tabControl) {
                    if (tabControl.active() && jQuery.inArray(id, currentFields) >= 0) {
                        tabControl.toggle(true);
                    } else {
                        tabControl.toggle(false);
                    }
                }
            });
        }
    });
    jQuery.extend(api.controlConstructor, {
        'total-tab': api.Tab
    });
    api.bind('ready', function () {
        _.each(api.Tabs, function (id) {
            var control = api.control(id);
            control.toggleActiveControls(0);
        });
    });

    // Alpha Color Picker Control
    api.controlConstructor['total-alpha-color'] = api.Control.extend({
        ready: function () {
            var control = this;
            var paletteInput = control.container.find('.total-alpha-color-control').data('palette');
            if (true == paletteInput) {
                palette = true;
            } else if (typeof paletteInput !== 'undefined' && paletteInput.indexOf('|') !== -1) {
                palette = paletteInput.split('|');
            } else {
                palette = false;
            }
            control.container.find('.total-alpha-color-control').wpColorPicker({
                change: function (event, ui) {
                    var color = ui.color.to_s();
                    control.setting.set(color);
                },
                clear: function (event) {
                    var element = jQuery(event.target).closest('.wp-picker-input-wrap').find('.wp-color-picker')[0];
                    var color = '';
                    if (element) {
                        control.setting.set(color);
                    }
                },
                palettes: palette
            });
        }
    });

    // Color Tab Control
    api.controlConstructor['total-color-tab'] = api.Control.extend({
        ready: function () {
            var control = this;
            control.container.find('.total-alpha-color-control').each(function () {
                var $elem = jQuery(this);
                var paletteInput = $elem.data('palette');
                var setting = jQuery(this).attr('data-customize-setting-link');
                if (true == paletteInput) {
                    palette = true;
                } else if (typeof paletteInput !== 'undefined' && paletteInput.indexOf('|') !== -1) {
                    palette = paletteInput.split('|');
                } else {
                    palette = false;
                }
                $elem.wpColorPicker({
                    change: function (event, ui) {
                        var color = ui.color.to_s();
                        wp.customize(setting, function (obj) {
                            obj.set(color);
                        });
                    },
                    clear: function (event) {
                        var element = jQuery(event.target).closest('.wp-picker-input-wrap').find('.wp-color-picker')[0];
                        var color = '';
                        if (element) {
                            wp.customize(setting, function (obj) {
                                obj.set(color);
                            });
                        }
                    },
                    palettes: palette
                });
            });
        }
    });

    // Dimenstion Control
    api.controlConstructor['dimensions'] = api.Control.extend({
        ready: function () {
            var control = this;
            control.container.on('change keyup paste', '.total-dimension-desktop_top', function () {
                control.settings['desktop_top'].set(jQuery(this).val());
            });
            control.container.on('change keyup paste', '.total-dimension-desktop_right', function () {
                control.settings['desktop_right'].set(jQuery(this).val());
            });
            control.container.on('change keyup paste', '.total-dimension-desktop_bottom', function () {
                control.settings['desktop_bottom'].set(jQuery(this).val());
            });
            control.container.on('change keyup paste', '.total-dimension-desktop_left', function () {
                control.settings['desktop_left'].set(jQuery(this).val());
            });
            control.container.on('change keyup paste', '.total-dimension-tablet_top', function () {
                control.settings['tablet_top'].set(jQuery(this).val());
            });
            control.container.on('change keyup paste', '.total-dimension-tablet_right', function () {
                control.settings['tablet_right'].set(jQuery(this).val());
            });
            control.container.on('change keyup paste', '.total-dimension-tablet_bottom', function () {
                control.settings['tablet_bottom'].set(jQuery(this).val());
            });
            control.container.on('change keyup paste', '.total-dimension-tablet_left', function () {
                control.settings['tablet_left'].set(jQuery(this).val());
            });
            control.container.on('change keyup paste', '.total-dimension-mobile_top', function () {
                control.settings['mobile_top'].set(jQuery(this).val());
            });
            control.container.on('change keyup paste', '.total-dimension-mobile_right', function () {
                control.settings['mobile_right'].set(jQuery(this).val());
            });
            control.container.on('change keyup paste', '.total-dimension-mobile_bottom', function () {
                control.settings['mobile_bottom'].set(jQuery(this).val());
            });
            control.container.on('change keyup paste', '.total-dimension-mobile_left', function () {
                control.settings['mobile_left'].set(jQuery(this).val());
            });
        }
    });

    // Range Slider Control
    api.controlConstructor['total-responsive-range-slider'] = api.Control.extend({
        ready: function () {
            var control = this,
                    desktop_slider = control.container.find('.total-res-range-slider.desktop-slider'),
                    desktop_slider_input = desktop_slider.next('.total-res-range-slider-input').find('input.desktop-input'),
                    tablet_slider = control.container.find('.total-res-range-slider.tablet-slider'),
                    tablet_slider_input = tablet_slider.next('.total-res-range-slider-input').find('input.tablet-input'),
                    mobile_slider = control.container.find('.total-res-range-slider.mobile-slider'),
                    mobile_slider_input = mobile_slider.next('.total-res-range-slider-input').find('input.mobile-input'),
                    slider_input,
                    $this,
                    val;
            // Desktop slider
            desktop_slider.slider({
                range: 'min',
                value: desktop_slider_input.val(),
                min: +desktop_slider_input.attr('min'),
                max: +desktop_slider_input.attr('max'),
                step: +desktop_slider_input.attr('step'),
                slide: function (event, ui) {
                    desktop_slider_input.val(ui.value).keyup();
                },
                change: function (event, ui) {
                    control.settings['desktop'].set(ui.value);
                }
            });
            // Tablet slider
            tablet_slider.slider({
                range: 'min',
                value: tablet_slider_input.val(),
                min: +tablet_slider_input.attr('min'),
                max: +tablet_slider_input.attr('max'),
                step: +desktop_slider_input.attr('step'),
                slide: function (event, ui) {
                    tablet_slider_input.val(ui.value).keyup();
                },
                change: function (event, ui) {
                    control.settings['tablet'].set(ui.value);
                }
            });
            // Mobile slider
            mobile_slider.slider({
                range: 'min',
                value: mobile_slider_input.val(),
                min: +mobile_slider_input.attr('min'),
                max: +mobile_slider_input.attr('max'),
                step: +desktop_slider_input.attr('step'),
                slide: function (event, ui) {
                    mobile_slider_input.val(ui.value).keyup();
                },
                change: function (event, ui) {
                    control.settings['mobile'].set(ui.value);
                }
            });
            // Update the slider when the number value change
            jQuery('input.desktop-input').on('change keyup paste', function () {
                $this = jQuery(this);
                val = $this.val();
                slider_input = $this.parent().prev('.total-res-range-slider.desktop-slider');
                slider_input.slider('value', val);
            });
            jQuery('input.tablet-input').on('change keyup paste', function () {
                $this = jQuery(this);
                val = $this.val();
                slider_input = $this.parent().prev('.total-res-range-slider.tablet-slider');
                slider_input.slider('value', val);
            });
            jQuery('input.mobile-input').on('change keyup paste', function () {
                $this = jQuery(this);
                val = $this.val();
                slider_input = $this.parent().prev('.total-res-range-slider.mobile-slider');
                slider_input.slider('value', val);
            });
            // Save the values
            control.container.on('change keyup paste', '.desktop input', function () {
                control.settings['desktop'].set(jQuery(this).val());
            });
            control.container.on('change keyup paste', '.tablet input', function () {
                control.settings['tablet'].set(jQuery(this).val());
            });
            control.container.on('change keyup paste', '.mobile input', function () {
                control.settings['mobile'].set(jQuery(this).val());
            });
        }
    });

    // Sortable Control
    api.controlConstructor['total-sortable'] = api.Control.extend({
        ready: function () {
            var control = this;
            // Set the sortable container.
            control.sortableContainer = control.container.find('ul.total-sortable').first();
            // Init sortable.
            control.sortableContainer.sortable({
                // Update value when we stop sorting.
                stop: function () {
                    control.updateValue();
                }
            }).disableSelection().find('li').each(function () {
                // Enable/disable options when we click on the eye of Thundera.
                jQuery(this).find('i.visibility').click(function () {
                    jQuery(this).toggleClass('dashicons-visibility-faint').parents('li:eq(0)').toggleClass('invisible');
                });
            }).click(function () {
                // Update value on click.
                control.updateValue();
            });
        },
        /**
         * Updates the sorting list
         */
        updateValue: function () {
            var control = this,
                    newValue = [];
            this.sortableContainer.find('li').each(function () {
                if (!jQuery(this).is('.invisible')) {
                    newValue.push(jQuery(this).data('value'));
                }
            });
            control.setting.set(newValue);
        }
    });

    api.sectionConstructor['total-upgrade-section'] = api.Section.extend({

        // No events for this type of section.
        attachEvents: function () {},

        // Always make the section active.
        isContextuallyActive: function () {
            return true;
        }
    });
})(wp.customize);


jQuery(document).ready(function ($) {
    // Responsive switchers
    $('.customize-control .responsive-switchers button').on('click', function (event) {
        // Set up variables
        var $this = $(this),
                $devices = $('.responsive-switchers'),
                $device = $(event.currentTarget).data('device'),
                $control = $('.customize-control.has-switchers'),
                $body = $('.wp-full-overlay'),
                $footer_devices = $('.wp-full-overlay-footer .devices');
        // Button class
        $devices.find('button').removeClass('active');
        $devices.find('button.preview-' + $device).addClass('active');
        // Control class
        $control.find('.control-wrap').removeClass('active');
        $control.find('.control-wrap.' + $device).addClass('active');
        $control.removeClass('control-device-desktop control-device-tablet control-device-mobile').addClass('control-device-' + $device);
        // Wrapper class
        $body.removeClass('preview-desktop preview-tablet preview-mobile').addClass('preview-' + $device);
        // Panel footer buttons
        $footer_devices.find('button').removeClass('active').attr('aria-pressed', false);
        $footer_devices.find('button.preview-' + $device).addClass('active').attr('aria-pressed', true);
        // Open switchers
        if ($this.hasClass('preview-desktop')) {
            $control.toggleClass('responsive-switchers-open');
        }
    });
    // If panel footer buttons clicked
    $('.wp-full-overlay-footer .devices button').on('click', function (event) {
        // Set up variables
        var $this = $(this),
                $devices = $('.customize-control.has-switchers .responsive-switchers'),
                $device = $(event.currentTarget).data('device'),
                $control = $('.customize-control.has-switchers');
        // Button class
        $devices.find('button').removeClass('active');
        $devices.find('button.preview-' + $device).addClass('active');
        // Control class
        $control.find('.control-wrap').removeClass('active');
        $control.find('.control-wrap.' + $device).addClass('active');
        $control.removeClass('control-device-desktop control-device-tablet control-device-mobile').addClass('control-device-' + $device);
        // Open switchers
        if (!$this.hasClass('preview-desktop')) {
            $control.addClass('responsive-switchers-open');
        } else {
            $control.removeClass('responsive-switchers-open');
        }
    });
    // Linked button
    $('.total-linked').on('click', function () {
        // Set up variables
        var $this = $(this);
        // Remove linked class
        $this.parent().parent('.total-dimension-wrap').prevAll().slice(0, 4).find('input').removeClass('linked').attr('data-element', '');
        // Remove class
        $this.parent('.total-link-dimensions').removeClass('unlinked');
    });
    // Unlinked button
    $('.total-unlinked').on('click', function () {
        // Set up variables
        var $this = $(this),
                $element = $this.data('element');
        // Add linked class
        $this.parent().parent('.total-dimension-wrap').prevAll().slice(0, 4).find('input').addClass('linked').attr('data-element', $element);
        // Add class
        $this.parent('.total-link-dimensions').addClass('unlinked');
    });
    // Values linked inputs
    $('.total-dimension-wrap').on('input', '.linked', function () {
        var $data = $(this).attr('data-element'),
                $val = $(this).val();
        $('.linked[ data-element="' + $data + '" ]').each(function (key, value) {
            $(this).val($val).change();
        });
    });


    // Select Preloader
    $('.total-preloader-selector').on('change', function () {
        var activePreloader = $(this).val();
        $(this).next('.total-preloader-container').find('.total-preloader').hide();
        $(this).next('.total-preloader-container').find('.total-' + activePreloader).show();
    });

});


