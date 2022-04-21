
<?php
/** 
* Plugin Name: Three Model 
* Description: test if can includ 3d model to the wordpress
* Author: Naji Nabulsi
* Version: 0.1.0
*/
global $pluginUrl ;

/** shot code function  */
add_shortcode('envo_3d', function()
{
    
    return '<div id="container" ></div>';
});  

function envo_scripts() 
{          
  /** global var to get the posts from wordepress rest api */
  global $post;
 
  /** get the plugin url from the theme */
  $pluginUrl = plugins_url();
  
  if (is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'envo_3d') ) {
    ?>    
    <script type="module" src="<?php echo $pluginUrl ?>/three-test/three-master/coffinScript.js">       
    </script>
    <?php    
  }
}
add_action( 'wp_footer', 'envo_scripts' );

/** initialize plugin */
// if(!function_exists('load_three_model'))
// {
//     function load_three_model()
//     {
       
//     } 
//     add_action('init','load_three_model');
// }
