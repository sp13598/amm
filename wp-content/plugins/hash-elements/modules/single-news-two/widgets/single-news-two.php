<?php

namespace HashElements\Modules\SingleNewsTwo\Widgets;

// Elementor Classes
use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Image_Size;
use Elementor\Group_Control_Typography;
use Elementor\Core\Schemes\Typography;
use Elementor\Core\Schemes\Color;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Tiled Posts Widget
 */
class Single_News_Two extends Widget_Base {

    /** Widget Name */
    public function get_name() {
        return 'he-single-news-two';
    }

    /** Widget Title */
    public function get_title() {
        return esc_html__('Single News Two', 'hash-elements');
    }

    /** Icon */
    public function get_icon() {
        return 'he-news-modules he-single-news-two';
    }

    /** Category */
    public function get_categories() {
        return ['he-magazine-elements'];
    }

    /** Controls */
    protected function register_controls() {

        $this->start_controls_section(
                'section_post_query', [
            'label' => esc_html__('Content Filter', 'hash-elements'),
                ]
        );

        $this->add_control(
                'filter_option', [
            'label' => esc_html__('Select Filter', 'hash-elements'),
            'type' => Controls_Manager::SELECT,
            'options' => array(
                'single-post' => esc_html__('By Post Title', 'hash-elements'),
                'categories' => esc_html__('By Categories', 'hash-elements'),
                'tags' => esc_html__('By Tags', 'hash-elements'),
            ),
            'default' => 'categories',
            'label_block' => true,
            'description' => esc_html__('Displays only one post', 'hash-elements')
                ]
        );

        $this->add_control(
                'post_id', [
            'label' => esc_html__('Select Post', 'hash-elements'),
            'type' => Controls_Manager::SELECT2,
            'options' => hash_elements_get_posts(),
            'label_block' => true,
            'condition' => [
                'filter_option' => 'single-post'
            ]
                ]
        );

        $this->add_control(
                'categories', [
            'label' => esc_html__('Select Categories', 'hash-elements'),
            'type' => Controls_Manager::SELECT2,
            'options' => hash_elements_get_categories(),
            'label_block' => true,
            'multiple' => true,
            'condition' => [
                'filter_option' => 'categories'
            ],
            'description' => esc_html__('Displays latest post from the selected categories', 'hash-elements')
                ]
        );

        $this->add_control(
                'tags', [
            'label' => esc_html__('Select Tags', 'hash-elements'),
            'type' => Controls_Manager::SELECT2,
            'options' => hash_elements_get_tags(),
            'multiple' => true,
            'label_block' => true,
            'condition' => [
                'filter_option' => 'tags'
            ],
            'description' => esc_html__('Displays latest post from the selected tags', 'hash-elements')
                ]
        );

        $this->add_control(
                'offset', [
            'label' => esc_html__('Offset', 'hash-elements'),
            'type' => Controls_Manager::NUMBER,
            'min' => 1,
            'max' => 50,
            'condition' => [
                'filter_option' => ['categories', 'tags']
            ],
                ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
                'section_post_meta', [
            'label' => esc_html__('Post Meta', 'hash-elements'),
                ]
        );

        $this->add_control(
                'post_author', [
            'label' => esc_html__('Post Author', 'hash-elements'),
            'type' => Controls_Manager::SWITCHER,
            'label_on' => esc_html__('Yes', 'hash-elements'),
            'label_off' => esc_html__('No', 'hash-elements'),
            'return_value' => 'yes',
            'default' => 'yes'
                ]
        );

        $this->add_control(
                'post_date', [
            'label' => esc_html__('Post Date', 'hash-elements'),
            'type' => Controls_Manager::SWITCHER,
            'label_on' => esc_html__('Yes', 'hash-elements'),
            'label_off' => esc_html__('No', 'hash-elements'),
            'return_value' => 'yes',
            'default' => 'yes'
                ]
        );

        $this->add_control(
                'post_comment', [
            'label' => esc_html__('Post Comments', 'hash-elements'),
            'type' => Controls_Manager::SWITCHER,
            'label_on' => esc_html__('Yes', 'hash-elements'),
            'label_off' => esc_html__('No', 'hash-elements'),
            'return_value' => 'yes',
            'default' => 'yes'
                ]
        );

        $this->add_control(
                'date_format', [
            'label' => esc_html__('Date Format', 'hash-elements'),
            'type' => Controls_Manager::SELECT,
            'options' => [
                'relative_format' => esc_html__('Relative Format (Ago)', 'hash-elements'),
                'default' => esc_html__('WordPress Default Format', 'hash-elements'),
                'custom' => esc_html__('Custom Format', 'hash-elements'),
            ],
            'default' => 'default',
            'separator' => 'before',
            'label_block' => true,
            'condition' => [
                'post_date' => 'yes'
            ]
                ]
        );

        $this->add_control(
                'custom_date_format', [
            'label' => esc_html__('Custom Date Format', 'hash-elements'),
            'type' => Controls_Manager::TEXT,
            'default' => 'F j, Y',
            'placeholder' => esc_html__('F j, Y', 'hash-elements'),
            'condition' => [
                'date_format' => 'custom',
                'post_date' => 'yes'
            ]
                ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
                'section_post_excerpt', [
            'label' => esc_html__('Post Excerpt', 'hash-elements'),
                ]
        );

        $this->add_control('excerpt_length', [
            'label' => esc_html__('Excerpt Length (in Letters)', 'hash-elements'),
            'type' => Controls_Manager::NUMBER,
            'min' => 0,
            'default' => 0,
            'description' => esc_html__('Leave blank or enter 0 to hide the excerpt', 'hash-elements'),
        ]);

        $this->end_controls_section();

        $this->start_controls_section(
                'section_post_image', [
            'label' => esc_html__('Image Settings', 'hash-elements'),
                ]
        );

        $this->add_group_control(
                Group_Control_Image_Size::get_type(), [
            'name' => 'image',
            'exclude' => ['custom'],
            'include' => [],
            'default' => 'large',
                ]
        );

        $this->add_control(
                'image_height', [
            'label' => esc_html__('Image Height (%)', 'hash-elements'),
            'type' => Controls_Manager::SLIDER,
            'size_units' => ['%'],
            'range' => [
                '%' => [
                    'min' => 30,
                    'max' => 150,
                    'step' => 1
                ],
            ],
            'default' => [
                'unit' => '%',
                'size' => 100,
            ],
            'selectors' => [
                '{{WRAPPER}} .he-post-thumb .he-thumb-container' => 'padding-bottom: {{SIZE}}{{UNIT}};',
            ],
                ]
        );
        
        $this->add_control(
                'image_border_radius', [
            'label' => esc_html__('Image Border Radius(px)', 'hash-elements'),
            'type' => Controls_Manager::SLIDER,
            'size_units' => ['px'],
            'range' => [
                'px' => [
                    'min' => 0,
                    'max' => 30,
                    'step' => 1
                ],
            ],
            'default' => [
                'unit' => 'px',
                'size' => 0,
            ],
            'selectors' => [
                '{{WRAPPER}} .he-post-image' => 'border-radius: {{SIZE}}{{UNIT}};'
            ],
                ]
        );

        $this->add_control(
                'content_alignment', [
            'label' => esc_html__('Content Alignment', 'hash-elements'),
            'type' => Controls_Manager::SELECT,
            'options' => [
                'left' => esc_html__('Left', 'hash-elements'),
                'center' => esc_html__('Center', 'hash-elements'),
                'right' => esc_html__('Right', 'hash-elements'),
            ],
            'default' => 'left'
                ]
        );

        $this->add_control(
                'content_padding', [
            'label' => esc_html__('Content Padding', 'hash-elements'),
            'type' => Controls_Manager::DIMENSIONS,
            'size_units' => ['px', '%', 'em'],
            'selectors' => [
                '{{WRAPPER}} .he-post-graident-title .he-post-content' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
            ],
                ]
        );

        $this->add_control(
                'content_margin', [
            'label' => esc_html__('Content Margin', 'hash-elements'),
            'type' => Controls_Manager::DIMENSIONS,
            'size_units' => ['px', '%', 'em'],
            'selectors' => [
                '{{WRAPPER}} .he-post-graident-title .he-post-content' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
            ],
                ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
                'overlay_background_section', [
            'label' => esc_html__('Overlay Background', 'hash-elements'),
                ]
        );

        $this->add_group_control(
                \Elementor\Group_Control_Background::get_type(), [
            'name' => 'background',
            'label' => __('Overlay Background', 'hash-elements'),
            'types' => ['gradient'],
            'selector' => '{{WRAPPER}} .he-post-graident-title .he-post-content',
                ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
                'title_style', [
            'label' => esc_html__('Post Title', 'hash-elements'),
            'tab' => Controls_Manager::TAB_STYLE,
                ]
        );

        $this->add_control(
                'title_color', [
            'label' => esc_html__('Color', 'hash-elements'),
            'type' => Controls_Manager::COLOR,
            'scheme' => [
                'type' => Color::get_type(),
                'value' => Color::COLOR_1,
            ],
            'selectors' => [
                '{{WRAPPER}} .he-post-title a' => 'color: {{VALUE}}',
            ],
                ]
        );

        $this->add_group_control(
                Group_Control_Typography::get_type(), [
            'name' => 'title_typography',
            'label' => esc_html__('Typography', 'hash-elements'),
            'scheme' => Typography::TYPOGRAPHY_1,
            'selector' => '{{WRAPPER}} .he-post-title a',
                ]
        );

        $this->add_control(
                'title_margin', [
            'label' => esc_html__('Margin', 'hash-elements'),
            'type' => Controls_Manager::DIMENSIONS,
            'allowed_dimensions' => 'vertical',
            'size_units' => ['px', '%', 'em'],
            'selectors' => [
                '{{WRAPPER}} h3.he-post-title' => 'margin: {{TOP}}{{UNIT}} 0 {{BOTTOM}}{{UNIT}} 0;',
            ],
                ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
                'meta_style', [
            'label' => esc_html__('Post Metas', 'hash-elements'),
            'tab' => Controls_Manager::TAB_STYLE,
                ]
        );

        $this->add_control(
                'meta_color', [
            'label' => esc_html__('Color', 'hash-elements'),
            'type' => Controls_Manager::COLOR,
            'scheme' => [
                'type' => Color::get_type(),
                'value' => Color::COLOR_1,
            ],
            'selectors' => [
                '{{WRAPPER}} .he-post-meta span' => 'color: {{VALUE}}',
            ],
                ]
        );

        $this->add_group_control(
                Group_Control_Typography::get_type(), [
            'name' => 'meta_typography',
            'label' => esc_html__('Typography', 'hash-elements'),
            'scheme' => Typography::TYPOGRAPHY_1,
            'selector' => '{{WRAPPER}} .he-post-meta span',
                ]
        );

        $this->add_control(
                'meta_margin', [
            'label' => esc_html__('Margin', 'hash-elements'),
            'type' => Controls_Manager::DIMENSIONS,
            'allowed_dimensions' => 'vertical',
            'size_units' => ['px', '%', 'em'],
            'selectors' => [
                '{{WRAPPER}} .he-post-meta' => 'margin: {{TOP}}{{UNIT}} 0 {{BOTTOM}}{{UNIT}} 0;',
            ],
                ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
                'excerpt_style', [
            'label' => esc_html__('Post Excerpt', 'hash-elements'),
            'tab' => Controls_Manager::TAB_STYLE,
                ]
        );

        $this->add_control(
                'excerpt_color', [
            'label' => esc_html__('Color', 'hash-elements'),
            'type' => Controls_Manager::COLOR,
            'scheme' => [
                'type' => Color::get_type(),
                'value' => Color::COLOR_1,
            ],
            'selectors' => [
                '{{WRAPPER}} .he-post-content .he-post-excerpt' => 'color: {{VALUE}}',
            ],
                ]
        );

        $this->add_group_control(
                Group_Control_Typography::get_type(), [
            'name' => 'excerpt_typography',
            'label' => esc_html__('Typography', 'hash-elements'),
            'scheme' => Typography::TYPOGRAPHY_1,
            'selector' => '{{WRAPPER}} .he-post-content .he-post-excerpt',
                ]
        );

        $this->add_control(
                'excerpt_margin', [
            'label' => esc_html__('Margin', 'hash-elements'),
            'type' => Controls_Manager::DIMENSIONS,
            'allowed_dimensions' => 'vertical',
            'size_units' => ['px', '%', 'em'],
            'selectors' => [
                '{{WRAPPER}} .he-post-content .he-post-excerpt' => 'margin: {{TOP}}{{UNIT}} 0 {{BOTTOM}}{{UNIT}} 0;',
            ],
                ]
        );

        $this->end_controls_section();
    }

    /** Render Layout */
    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="he-single-post">

            <?php
            $args = $this->query_args();
            $post_query = new \WP_Query($args);

            if ($post_query->have_posts()) {
                ?>
                <div class="he-single-post-two">
                    <?php
                    while ($post_query->have_posts()) {
                        $post_query->the_post();
                        $image_size = $settings['image_size'];
                        $excerpt_length = $settings['excerpt_length'];
                        ?>

                        <div class="he-post-image he-post-graident-title">
                            <div class="he-post-thumb">
                                <a href="<?php the_permalink(); ?>">
                                    <div class="he-thumb-container">
                                        <?php
                                        if (has_post_thumbnail()) {
                                            $image = wp_get_attachment_image_src(get_post_thumbnail_id(), $image_size);
                                            ?>
                                            <img alt="<?php echo the_title_attribute() ?>" src="<?php echo esc_url($image[0]) ?>">
                                        <?php }
                                        ?>
                                    </div>
                                </a>
                            </div>

                            <div class="he-post-content he-align-<?php echo $settings['content_alignment']; ?>">
                                <h3 class="he-post-title"><a href="<?php the_permalink(); ?>"><?php echo esc_html(get_the_title()); ?></a></h3>

                                <?php $this->get_post_meta(); ?>

                                <?php if ($excerpt_length) { ?>
                                    <div class="he-post-excerpt"><?php echo hash_elements_custom_excerpt($excerpt_length); ?></div>
                                <?php } ?>
                            </div>
                        </div>
                        <?php
                    }
                    wp_reset_postdata();
                    ?>
                </div>
                <?php
            }
            ?>

        </div>
        <?php
    }

    /** Get Post Metas */
    protected function get_post_meta() {
        $settings = $this->get_settings_for_display();
        $post_author = $settings['post_author'];
        $post_date = $settings['post_date'];
        $post_comment = $settings['post_comment'];

        if ($post_author == 'yes' || $post_date == 'yes' || $post_comment == 'yes') {
            ?>
            <div class="he-post-meta">
                <?php
                if ($post_author == 'yes') {
                    hash_elements_author_name();
                }

                if ($post_date == 'yes') {
                    $date_format = $settings['date_format'];

                    if ($date_format == 'relative_format') {
                        hash_elements_time_ago();
                    } else if ($date_format == 'default') {
                        hash_elements_post_date();
                    } else if ($date_format == 'custom') {
                        $format = $settings['custom_date_format'];
                        hash_elements_post_date($format);
                    }
                }

                if ($post_comment == 'yes') {
                    hash_elements_comment_count();
                }
                ?>
            </div>
            <?php
        }
    }

    /** Query Args */
    protected function query_args() {
        $settings = $this->get_settings_for_display();

        $filter_option = $settings['filter_option'];
        if ($filter_option == 'single-post') {
            if (!empty($settings['post_id'])) {
                $args['p'] = $settings['post_id'];
            }
        } elseif ($filter_option == 'categories') {
            if (!empty($settings['categories'])) {
                $args['tax_query'][] = [
                    'taxonomy' => 'category',
                    'field' => 'term_id',
                    'terms' => $settings['categories'],
                ];
            }
        } elseif ($filter_option == 'tags') {
            if (!empty($settings['tags'])) {
                $args['tax_query'][] = [
                    'taxonomy' => 'post_tag',
                    'field' => 'term_id',
                    'terms' => $settings['tags'],
                ];
            }
        }

        if ($settings['offset']) {
            $args['offset'] = $settings['offset'];
        }

        $args['ignore_sticky_posts'] = 1;
        $args['post_status'] = 'publish';
        $args['posts_per_page'] = 1;

        return $args;
    }

}
