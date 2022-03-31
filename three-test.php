<?php
/** 
* Plugin Name: Three Model 
* Description: test if can includ 3d model to the wordpress
* Author: Naji Nabulsi
* Version: 0.1.0
*/

if(!function_exists('load_three_model'))
{
    function load_three_model()
    {
         add_shortcode('envo_model', function()
        {
            function wpdocs_theme_name_scripts() 
            {            
            //    echo '<div class="webgl">';
               echo '<div id="container" >';
               echo '</div>';
            //    echo  '</div>';

                ?>

                <script type="module" src="http://localhost/3dBlock/wp-content/plugins/three-test/three-master/coffinScript.js"></script>

                <?php
            }

            add_action( 'wp_enqueue_scripts', 'wpdocs_theme_name_scripts' );

        });   
    } 

    add_action('init','load_three_model');
}