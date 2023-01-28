<?php

class Total_Column_Control extends WP_Customize_Control {

    public $type = 'total-column';

    public function __construct($manager, $id, $args = array()) {
        parent::__construct($manager, $id, $args);
    }

    public function enqueue() {
        wp_enqueue_script('nouislider', TOTAL_CUSTOMIZER_URL . 'custom-controls/column-control/assets/nouislider.js', array('jquery'), TOTAL_VERSION, true);
        wp_enqueue_script('wNumb', TOTAL_CUSTOMIZER_URL . 'custom-controls/column-control/assets/wNumb.js', array('jquery'), TOTAL_VERSION, true);
        wp_enqueue_script('total-column-control', TOTAL_CUSTOMIZER_URL . 'custom-controls/column-control/assets/column-control.js', array('jquery'), TOTAL_VERSION, true);

        wp_enqueue_style('nouislider', TOTAL_CUSTOMIZER_URL . 'custom-controls/column-control/assets/nouislider.css', array(), TOTAL_VERSION);
    }

    public function render_content() {

        if (!empty($this->label)) :
            ?>
            <span class="customize-control-title"><?php echo esc_html($this->label); ?></span>
            <?php
        endif;

        if (!empty($this->description)) :
            ?>
            <span class="description customize-control-description"><?php echo esc_html($this->description); ?></span>
            <?php
        endif;

        echo '<div class="total-column-selector"></div>';

        echo '<div class="total-column-selector-buttons">';
        echo '<button class="total-remove-col"><i class="mdi mdi-minus"></i><span>' . esc_html('Remove Column', 'total') . '</span></button>';
        echo '<button class="total-add-col"><i class="mdi mdi-plus"></i><span>' . esc_html('Add Column', 'total') . '</span></button>';
        echo '<button class="total-reset-col"><i class="mdi mdi-cached"></i><span>' . esc_html('Reset Column', 'total') . '</span></button>';
        echo '</div>';
        ?>
        <input type="hidden" value="<?php echo esc_attr($this->value()) ?>" <?php $this->link(); ?> />
        </div>
        <?php
    }

}
