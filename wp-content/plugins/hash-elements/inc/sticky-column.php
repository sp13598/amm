<?php

namespace HashElements\Inc;

// Exit if accessed directly
if (!defined('ABSPATH'))
    exit;

class Sticky_Column {

    private static $instance = null;

    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    function __construct() {
        $this->init();
    }

    public function init() {
        add_filter('elementor/element/column/layout/after_section_start', [$this, 'add_controls']);
        add_action('elementor/frontend/column/before_render', [$this, 'render_attribute'], 10);
        add_action('elementor/column/print_template', [$this, 'print_template'], 10, 2);
    }

    public function add_controls($section) {
        $section->add_control(
                'hash_elements_sidebar_sticky', [
            'label' => esc_html__('Enable Sticky Sidebar', 'hash-elements'),
            'type' => \Elementor\Controls_Manager::SWITCHER,
            'default' => '',
            'render_type' => 'template',
            'return_value' => 'true',
                ]
        );

        $section->add_control(
                'hash_elements_sidebar_sticky_top_spacing', array(
            'label' => esc_html__('Top Spacing(px)', 'hash-elements'),
            'type' => \Elementor\Controls_Manager::NUMBER,
            'default' => 50,
            'min' => 0,
            'max' => 500,
            'step' => 1,
            'condition' => array(
                'hash_elements_sidebar_sticky' => 'true',
            ),
            'render_type' => 'template',
                )
        );

        $section->add_control(
                'hash_elements_sidebar_sticky_bottom_spacing', array(
            'label' => esc_html__('Bottom Spacing(px)', 'hash-elements'),
            'type' => \Elementor\Controls_Manager::NUMBER,
            'default' => 50,
            'min' => 0,
            'max' => 500,
            'step' => 1,
            'condition' => array(
                'hash_elements_sidebar_sticky' => 'true',
            ),
            'render_type' => 'template',
                )
        );

        $section->add_control(
                'hash_elements_hr', [
            'type' => \Elementor\Controls_Manager::DIVIDER,
                ]
        );
    }

    public function render_attribute($widget) {
        $settings = $widget->get_settings_for_display();
        if ('true' === $settings['hash_elements_sidebar_sticky']) {
            $top_spacing = $settings['hash_elements_sidebar_sticky_top_spacing'] ? $settings['hash_elements_sidebar_sticky_top_spacing'] : 0;
            $bottom_spacing = $settings['hash_elements_sidebar_sticky_bottom_spacing'] ? $settings['hash_elements_sidebar_sticky_bottom_spacing'] : 0;
            $widget->add_render_attribute('_wrapper', array(
                'class' => 'he-elementor-sticky-column',
                'data-top-spacing' => absint($top_spacing),
                'data-bottom-spacing' => absint($bottom_spacing)
                    )
            );
        }
    }

    public function print_template($template, $widget) {
        ob_start();
        $old_template = $template;
        ?>
        <#
        if ( 'true' === settings.hash_elements_sidebar_sticky ) {
        view.addRenderAttribute( '_column_wrapper', 'class', 'he-elementor-sticky-column' );
        view.addRenderAttribute( '_column_wrapper', 'data-top-spacing', settings.hash_elements_sidebar_sticky_top_spacing );
        view.addRenderAttribute( '_column_wrapper', 'data-bottom-spacing', settings.hash_elements_sidebar_sticky_bottom_spacing );
        #>
        <div {{{ view.getRenderAttributeString( '_column_wrapper' ) }}}></div>
        <# } #>
        <?php
        $content = ob_get_contents();
        ob_end_clean();

        return $content . $old_template;
    }

}

Sticky_Column::instance();
