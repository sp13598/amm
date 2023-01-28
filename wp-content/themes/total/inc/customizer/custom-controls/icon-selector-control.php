<?php

/** Icon Chooser */
class Total_Icon_Selector_Control extends WP_Customize_Control {

    public $type = 'total-icon-selector';
    public $icon_array = array();

    public function __construct($manager, $id, $args = array()) {
        if (isset($args['icon_array'])) {
            $this->icon_array = $args['icon_array'];
        }
        parent::__construct($manager, $id, $args);
    }

    public function to_json() {
        parent::to_json();
        $this->json['filter_text'] = esc_attr__('Type to filter', 'total');
        $this->json['value'] = $this->value();
        $this->json['link'] = $this->get_link();
        if (isset($this->icon_array) && !empty($this->icon_array)) {
            $this->json['icon_array'] = $this->icon_array;
        }
    }

    public function content_template() {
        ?>
        <label>
            <# if ( data.label ) { #>
            <span class="customize-control-title">
                {{{ data.label }}}
            </span>
            <# } #>

            <# if ( data.description ) { #>
            <span class="description customize-control-description">
                {{{ data.description }}}
            </span>
            <# } #>

            <div class="total-icon-box-wrap">
                <div class="total-selected-icon">
                    <i class="{{ data.value }}"></i>
                    <span><i class="total-down-icon"></i></span>
                </div>

                <# if( data.icon_array ) { #>
                <div class="total-icon-box">
                    <div class="total-icon-search">
                        <input type="text" class="total-icon-search-input" placeholder="{{ data.filter_text }}" />
                    </div>

                    <ul class="total-icon-list total-clearfix active">
                        <# _.each( data.icon_array, function( val ) { #>
                        <li class="<# if ( val === data.value ) { #> icon-active <# } #>"><i class="{{ val }}"></i></li>
                        <# } ) #>
                    </ul>
                </div>
                <# } #>

                <input type="hidden" value="{{ data.value }}" {{{ data.link }}} />
            </div>
        </label>
        <?php
    }

}
