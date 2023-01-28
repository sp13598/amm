<?php

/** Control Tab */
class Total_Group_Control extends WP_Customize_Control {

    public $type = 'total-group';
    public $params = '';

    public function __construct($manager, $id, $args = array()) {
        parent::__construct($manager, $id, $args);
        if (isset($args['params'])) {
            $this->params = $args['params'];
        }
    }

    public function to_json() {
        parent::to_json();
        $params = $this->params;

        $this->json['heading'] = $params['heading'];
        $this->json['icon'] = $params['icon'];
        $this->json['fields'] = $params['fields'];
        $this->json['open'] = $params['open'];
    }

    public function content_template() {
        ?>
        <div class="total-group-wrap">
            <div class="total-group-heading">
                <# if ( data.heading ) { #>
                <label>{{{ data.heading }}}</label>
                <# } #>
            </div>

            <div class="total-group-content"></div>
        </div>
        <?php
    }

}
