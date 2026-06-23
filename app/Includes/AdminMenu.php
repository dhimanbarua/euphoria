<?php
/**
 * Admin menu handler.
 *
 * @package Euphoria\\Includes
 * 
 */

namespace Euphoria\Includes;

defined('ABSPATH') || exit;

use Euphoria\Includes\RestApi;

/**
 * Class AdminMenu
 */
class AdminMenu
{

	/**
	 * Admin page hook suffix.
	 *
	 * @var string
	 */
	private static $page_hook = '';

	/**
	 * Initialize hooks.
	 */
	public function __construct()
	{
		add_action('admin_menu', array( $this, 'register_menu'));
		add_action('admin_enqueue_scripts', array( $this, 'enqueue_assets'));
	}

	/**
	 * Register admin menu page.
	 */
	public function register_menu()
	{
		self::$page_hook = add_menu_page(
			__('Euphoria', 'euphoria'),
			__('Euphoria', 'euphoria'),
			'manage_options',
			'euphoria',
			array( $this, 'render_page'),
			'dashicons-star-filled',
			58
		);
	}

	/**
	 * Enqueue admin assets.
	 *
	 * @param string $hook Current admin page hook.
	 */
	public function enqueue_assets($hook)
	{
		if (self::$page_hook !== $hook) {
			return;
		}

		$asset_file = EUPHORIA_PLUGIN_DIR . 'assets/build/admin.asset.php';
		$script_url = EUPHORIA_PLUGIN_URL . 'assets/build/admin.js';
		$style_url = EUPHORIA_PLUGIN_URL . 'assets/build/admin.css';

		if (!file_exists($asset_file)) {
			return;
		}

		$asset = include $asset_file;

		wp_enqueue_style(
			'euphoria-admin',
			$style_url,
			array(),
			$asset['version']
		);

		wp_enqueue_script(
			'euphoria-admin',
			$script_url,
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_localize_script(
			'euphoria-admin',
			'euphoriaAdmin',
			array(
				'restUrl' => esc_url_raw(rest_url(RestApi::REST_NAMESPACE . '/')),
				'nonce' => wp_create_nonce('wp_rest'),
				'pluginUrl' => esc_url_raw(EUPHORIA_PLUGIN_URL),
			)
		);
	}

	/**
	 * Render admin page container.
	 */
	public function render_page()
	{
		echo '<div id="euphoria-root" class="euphoria-admin"></div>';
	}
}
