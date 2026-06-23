<?php
/**
 * Plugin Name: Euphoria
 * Plugin URI: https://pinemesh.com
 * Description: WooCommerce Review Widget.
 * Version: 0.0.1
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Pinemesh
 * License: GPL-2.0
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: euphoria
 * Update URI: https://pinemesh.com
 * Domain Path: /languages
 * @package Euphoria
 */

defined( 'ABSPATH' ) || exit;

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require __DIR__ . '/vendor/autoload.php';
}


final class Euphoria {

	private static $instance;

	/**
	 * Class constructor
	 */
	private function __construct() {
		$this->define_constants();
		add_action( 'init', array( $this, 'load_textdomain' ) );
		add_action( 'plugins_loaded', array( $this, 'euphoria_init' ) );
	}

	/**
	 * Define constants
	 */
	private function define_constants() {
		define( 'EUPHORIA_VERSION', '0.0.1' );
		define( 'EUPHORIA_PLUGIN_FILE', __FILE__ );
		define( 'EUPHORIA_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
		define( 'EUPHORIA_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
	}

	/**
	 * Load plugin text domain for translations.
	 */
	public function load_textdomain() {
		load_plugin_textdomain(
			'euphoria',
			false,
			dirname( plugin_basename( EUPHORIA_PLUGIN_FILE ) ) . '/languages'
		);
	}

	/**
	 * Initialize the plugin
	 */
	public function euphoria_init() {
		new \Euphoria\Includes\Settings();
		new \Euphoria\Includes\RestApi();
		new \Euphoria\Includes\AdminMenu();
	}

	public static function instance() {
		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Euphoria ) ) {
			self::$instance = new Euphoria();
		}

		return self::$instance;
	}

}

/**
 * Initializes the main plugin
 *
 * @return \Euphoria
 */
function euphoria() {
	return Euphoria::instance();
}

// Kick off the plugin.
euphoria();
