
<?php
/** 
* Plugin Name: Three Model 
* Description: test if can includ 3d model to the wordpress
* Author: Naji Nabulsi
* Version: 0.1.0
*/
global $pluginUrl ;

add_shortcode('envo_3d', function()
{
    
    return '<div id="container" ></div>';
});  

function envo_wp_scripts() 
{          
 
  /**
   * get the plugin url from the theme
   */
  $pluginUrl = plugins_url();
  
  ?>
    <script type="module" src="<?php echo $pluginUrl ?>/three-test/three-master/coffinScript.js">       
    </script>
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
