
<?php
/** 
* Plugin Name: Three Model 
* Description: test if can includ 3d model to the wordpress
* Author: Naji Nabulsi
* Version: 0.1.0
*/

add_shortcode('envo_3d', function()
{
    
    return '<div id="container" ></div>';
});  

function envo_wp_scripts() 
{          
    ?>
    <script type="module" src="http://localhost/3dBlock/wp-content/plugins/three-test/three-master/coffinScript.js"></script>
  <?php
}



if(!function_exists('load_three_model'))
{
    function load_three_model()
    {
         
      if(shortcode_exists( 'envo_3d' )){        
        add_action( 'wp_enqueue_scripts', 'envo_wp_scripts' );
      }

    } 

    add_action('init','load_three_model');
    
}
