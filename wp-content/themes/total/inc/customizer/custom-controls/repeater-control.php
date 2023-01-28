<?php

/** Repeater Control */
class Total_Repeater_Control extends WP_Customize_Control {

    /**
     * The control type.
     *
     * @access public
     * @var string
     */
    public $type = 'total-repeater';
    public $box_label = '';
    public $add_label = '';
    private $cats = '';

    /**
     * The fields that each container row will contain.
     *
     * @access public
     * @var array
     */
    public $fields = array();

    /**
     * Repeater drag and drop controller
     *
     * @since  1.0.0
     */
    public function __construct($manager, $id, $args = array(), $fields = array()) {
        $this->fields = $fields;
        $this->box_label = isset($args['box_label']) ? $args['box_label'] : '';
        $this->add_label = isset($args['add_label']) ? $args['add_label'] : '';
        $this->cats = get_categories(array('hide_empty' => false));
        parent::__construct($manager, $id, $args);
    }

    public function render_content() {
        ?>
        <span class="customize-control-title"><?php echo esc_html($this->label); ?></span>

        <?php if ($this->description) { ?>
            <span class="description customize-control-description">
                <?php echo wp_kses_post($this->description); ?>
            </span>
        <?php } ?>

        <ul class="total-repeater-field-control-wrap">
            <?php
            $this->total_get_fields();
            ?>
        </ul>

        <input type="hidden" <?php esc_attr($this->link()); ?> class="total-repeater-collector" value="<?php echo esc_attr($this->value()); ?>" />
        <button type="button" class="button total-add-control-field"><?php echo esc_html($this->add_label); ?></button>
        <?php
    }

    private function total_get_fields() {
        $fields = $this->fields;
        $values = json_decode($this->value());

        if (is_array($values)) {
            foreach ($values as $value) {
                ?>
                <li class="total-repeater-field-control">
                    <h3 class="total-repeater-field-title"><?php echo esc_html($this->box_label); ?></h3>

                    <div class="total-repeater-fields">
                        <?php
                        foreach ($fields as $key => $field) {
                            $class = isset($field['class']) ? $field['class'] : '';
                            ?>
                            <div class="total-fields total-type-<?php echo esc_attr($field['type']) . ' ' . esc_attr($class); ?>">

                                <?php
                                $label = isset($field['label']) ? $field['label'] : '';
                                $description = isset($field['description']) ? $field['description'] : '';
                                if ($field['type'] != 'toggle' && $field['type'] != 'checkbox') {
                                    ?>
                                    <span class="customize-control-repeater-title"><?php echo esc_html($label); ?></span>
                                    <span class="description customize-control-description"><?php echo wp_kses_post($description); ?></span>
                                    <?php
                                }

                                $new_value = isset($value->$key) ? $value->$key : '';
                                $default = isset($field['default']) ? $field['default'] : '';

                                switch ($field['type']) {
                                    case 'text':
                                        echo '<input data-default="' . esc_attr($default) . '" data-name="' . esc_attr($key) . '" type="text" value="' . esc_attr($new_value) . '"/>';
                                        break;

                                    case 'textarea':
                                        echo '<textarea data-default="' . esc_attr($default) . '"  data-name="' . esc_attr($key) . '">' . esc_textarea($new_value) . '</textarea>';
                                        break;

                                    case 'upload':
                                        $image_class = "";
                                        if ($new_value) {
                                            $image_class = ' hidden';
                                        }
                                        echo '<div class="total-fields-wrap">';
                                        echo '<div class="attachment-media-view">';
                                        echo '<div class="placeholder' . esc_attr($image_class) . '">';
                                        esc_html_e('No image selected', 'total');
                                        echo '</div>';
                                        echo '<div class="thumbnail thumbnail-image">';
                                        if ($new_value) {
                                            echo '<img src="' . esc_url($new_value) . '" style="max-width:100%;"/>';
                                        }
                                        echo '</div>';
                                        echo '<div class="actions total-clearfix">';
                                        echo '<button type="button" class="button total-delete-button align-left">' . esc_html__('Remove', 'total') . '</button>';
                                        echo '<button type="button" class="button total-upload-button alignright">' . esc_html__('Select Image', 'total') . '</button>';
                                        echo '<input data-default="' . esc_attr($default) . '" class="upload-id" data-name="' . esc_attr($key) . '" type="hidden" value="' . esc_attr($new_value) . '"/>';
                                        echo '</div>';
                                        echo '</div>';
                                        echo '</div>';
                                        break;

                                    case 'category':
                                        echo '<select data-default="' . esc_attr($default) . '"  data-name="' . esc_attr($key) . '">';
                                        echo '<option value="-1" ' . selected($new_value, '-1', false) . '>' . esc_html__('Latest Posts', 'total') . '</option>';
                                        foreach ($this->cats as $cat) {
                                            printf('<option value="%1$s" %2$s>%3$s</option>', esc_attr($cat->term_id), selected($new_value, $cat->term_id, false), esc_html($cat->name));
                                        }
                                        echo '</select>';
                                        break;

                                    case 'select':
                                        $options = $field['options'];
                                        echo '<select  data-default="' . esc_attr($default) . '"  data-name="' . esc_attr($key) . '">';
                                        foreach ($options as $option => $val) {
                                            printf('<option value="%1$s" %2$s>%3$s</option>', esc_attr($option), selected($new_value, $option, false), esc_html($val));
                                        }
                                        echo '</select>';
                                        break;

                                    case 'toggle':
                                        $checkbox_class = ($new_value == 'yes') ? 'total-toggle-on' : '';
                                        echo '<div class="total-toggle">';
                                        echo '<label class="total-toggle-label ' . esc_attr($checkbox_class) . '">';
                                        echo '<input class="total-toggle-checkbox" data-default="' . esc_attr($default) . '" value="' . esc_attr($new_value) . '" data-name="' . esc_attr($key) . '" type="checkbox" ' . checked($new_value, 'yes', false) . '/>';
                                        echo '</label>';
                                        echo '</div>';
                                        if (!empty($label)) {
                                            echo '<span class="customize-control-title total-toggle-title">' . esc_html($label) . '</span>';
                                        }
                                        if (!empty($description)) {
                                            echo '<span class="description customize-control-description">' . esc_html($description) . '</span>';
                                        }
                                        break;

                                    case 'checkbox':
                                        echo '<label>';
                                        echo '<input data-default="' . esc_attr($default) . '" value="' . esc_attr($new_value) . '" data-name="' . esc_attr($key) . '" type="checkbox" ' . checked($new_value, 'yes', false) . '/>';
                                        echo esc_html($label);
                                        echo '<span class="description customize-control-description">' . esc_html($description) . '</span>';
                                        echo '</label>';
                                        break;

                                    case 'colorpicker':
                                        echo '<input data-default="' . esc_attr($default) . '" class="total-color-picker" data-alpha="true" data-name="' . esc_attr($key) . '" type="text" value="' . esc_attr($new_value) . '"/>';
                                        break;

                                    case 'selector':
                                        $options = $field['options'];
                                        echo '<div class="selector-labels">';
                                        foreach ($options as $option => $val) {
                                            $class = ( $new_value == $option ) ? 'selector-selected' : '';
                                            echo '<label class="' . $class . '" data-val="' . esc_attr($option) . '">';
                                            echo '<img src="' . esc_url($val) . '"/>';
                                            echo '</label>';
                                        }
                                        echo '</div>';
                                        echo '<input data-default="' . esc_attr($default) . '" type="hidden" value="' . esc_attr($new_value) . '" data-name="' . esc_attr($key) . '"/>';
                                        break;

                                    case 'radio':
                                        $options = $field['options'];
                                        echo '<div class="radio-labels">';
                                        foreach ($options as $option => $val) {
                                            echo '<label>';
                                            echo '<input value="' . esc_attr($option) . '" type="radio" ' . checked($new_value, $option, false) . '/>';
                                            echo esc_html($val);
                                            echo '</label>';
                                        }
                                        echo '</div>';
                                        echo '<input data-default="' . esc_attr($default) . '" type="hidden" value="' . esc_attr($new_value) . '" data-name="' . esc_attr($key) . '"/>';
                                        break;

                                    case 'switch':
                                        $switch = $field['switch'];
                                        $switch_class = ($new_value == 'on') ? 'total-switch-on' : '';
                                        echo '<div class="total-switch ' . esc_attr($switch_class) . '">';
                                        echo '<div class="total-switch-inner">';
                                        echo '<div class="total-switch-active">';
                                        echo '<div class="total-switch-button">' . esc_html($switch["on"]) . '</div>';
                                        echo '</div>';
                                        echo '<div class="total-switch-inactive">';
                                        echo '<div class="total-switch-button">' . esc_html($switch["off"]) . '</div>';
                                        echo '</div>';
                                        echo '</div>';
                                        echo '</div>';
                                        echo '<input data-default="' . esc_attr($default) . '" type="hidden" value="' . esc_attr($new_value) . '" data-name="' . esc_attr($key) . '"/>';
                                        break;

                                    case 'range':
                                        $options = $field['options'];
                                        $new_value = $new_value ? $new_value : $options['val'];
                                        echo '<div class="total-range-slider-control-wrap">';
                                        echo '<div class="total-range-slider" data-default="' . esc_attr($options['val']) . '" data-value="' . esc_attr($new_value) . '" data-min="' . esc_attr($options['min']) . '" data-max="' . esc_attr($options['max']) . '" data-step="' . esc_attr($options['step']) . '"></div>';
                                        echo '<div class="total-range-slider-input">';
                                        echo '<input type="number" disabled="disabled" value="' . esc_attr($new_value) . '"  data-name="' . esc_attr($key) . '"/>';
                                        echo '</div>';
                                        echo '<span class="total-range-slider-unit">' . esc_html($options['unit']) . '</span>';
                                        echo '</div>';
                                        break;

                                    case 'icon':
                                        echo '<div class="total-icon-box-wrap">';
                                        echo '<div class="total-selected-icon">';
                                        echo '<i class="' . esc_attr($new_value) . '"></i>';
                                        echo '<span><i class="total-down-icon"></i></span>';
                                        echo '</div>';
                                        echo '<input data-default="' . esc_attr($default) . '" type="hidden" value="' . esc_attr($new_value) . '" data-name="' . esc_attr($key) . '"/>';
                                        echo '</div>';
                                        break;

                                    case 'multicategory':
                                        $new_value_array = !is_array($new_value) ? explode(',', $new_value) : $new_value;
                                        echo '<ul class="total-multi-category-list">';
                                        foreach ($this->cats as $cat) {
                                            $checked = in_array($cat->term_id, $new_value_array) ? 'checked="checked"' : '';
                                            echo '<li>';
                                            echo '<label>';
                                            echo '<input type="checkbox" value="' . esc_attr($cat->term_id) . '" ' . $checked . '/>';
                                            echo esc_html($cat->name);
                                            echo '</label>';
                                            echo '</li>';
                                        }
                                        echo '</ul>';
                                        echo '<input data-default="' . esc_attr($default) . '" type="hidden" value="' . esc_attr(implode(',', $new_value_array)) . '" data-name="' . esc_attr($key) . '"/>';
                                        break;

                                    default:
                                        break;
                                }
                                ?>
                            </div>
                        <?php }
                        ?>

                        <div class="total-clearfix total-repeater-footer">
                            <div class="alignright">
                                <a class="total-repeater-field-remove" href="#remove"><?php esc_html_e('Delete', 'total') ?></a> |
                                <a class="total-repeater-field-close" href="#close"><?php esc_html_e('Close', 'total') ?></a>
                            </div>
                        </div>
                    </div>
                </li>
                <?php
            }
        }
    }

}
