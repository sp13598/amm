<?php

class Total_Gallery_Control extends WP_Customize_Control {

    public $type = 'total-gallery';

    public function render_content() {
        ?>
        <label>
            <span class="customize-control-title">
                <?php echo esc_html($this->label); ?>
            </span>

            <?php if ($this->description) { ?>
                <span class="description customize-control-description">
                    <?php echo wp_kses_post($this->description); ?>
                </span>
            <?php } ?>

            <ul class="total-gallery-container">
                <?php
                if ($this->value()) {
                    $images = explode(',', $this->value());
                    foreach ($images as $image) {
                        $image_src = wp_get_attachment_image_src($image, 'thumbnail');
                        echo '<li data-id="' . $image . '"><span style="background-image:url(' . $image_src[0] . ')"></span><a href="#" class="total-gallery-remove">×</a></li>';
                    }
                }
                ?>
            </ul>

            <input type="hidden" <?php echo esc_attr($this->link()) ?> value="<?php echo esc_attr($this->value()); ?>" />

            <a href="#" class="button total-gallery-button"><?php esc_html_e('Add Images', 'total') ?></a>
        </label>
        <?php
    }

}
