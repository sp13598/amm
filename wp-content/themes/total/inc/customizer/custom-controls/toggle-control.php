<?php

/** Checkbox Control */
class Total_Toggle_Control extends WP_Customize_Control {

    /**
     * Control type
     *
     * @var string
     */
    public $type = 'total-toggle';

    /**
     * Control method
     *
     * @since 1.0.0
     */
    public function render_content() {
        ?>
        <div class="total-toggle-container">
            <div class="total-toggle">
                <input class="total-toggle-checkbox" type="checkbox" id="<?php echo esc_attr($this->id); ?>" name="<?php echo esc_attr($this->id); ?>" value="<?php echo esc_attr($this->value()); ?>" <?php $this->link(); ?> <?php checked($this->value()); ?>>
                <label class="total-toggle-label" for="<?php echo esc_attr($this->id); ?>"></label>
            </div>
            <span class="customize-control-title total-toggle-title"><?php echo esc_html($this->label); ?></span>
            <?php if (!empty($this->description)) { ?>
                <span class="description customize-control-description">
                    <?php echo $this->description; ?>
                </span>
            <?php } ?>
        </div>
        <?php
    }

}
