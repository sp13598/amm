<?php

define('TOTAL_CUSTOMIZER_URL', get_template_directory_uri() . '/inc/customizer/');
define('TOTAL_CUSTOMIZER_PATH', get_template_directory() . '/inc/customizer/');

require TOTAL_CUSTOMIZER_PATH . 'customizer-custom-controls.php';
require TOTAL_CUSTOMIZER_PATH . 'custom-controls/typography/typography.php';
require TOTAL_CUSTOMIZER_PATH . 'customizer-control-sanitization.php';
require TOTAL_CUSTOMIZER_PATH . 'customizer-functions.php';
require TOTAL_CUSTOMIZER_PATH . 'customizer-fonts-icons.php';
require TOTAL_CUSTOMIZER_PATH . 'customizer-panel/register-customizer-controls.php';
