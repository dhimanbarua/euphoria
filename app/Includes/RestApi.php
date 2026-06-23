<?php
/**
 * REST API handler.
 *
 * @package Euphoria
 */

namespace Euphoria\Includes;
defined( 'ABSPATH' ) || exit;

use Euphoria\Includes\Settings;

/**
 * Class RestApi
 */
class RestApi {

	/**
	 * REST namespace.
	 */
	const REST_NAMESPACE = 'euphoria/v1';

	/**
	 * Initialize hooks.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register REST routes.
	 */
	public function register_routes() {
		register_rest_route(
			self::REST_NAMESPACE,
			'/settings',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_settings' ),
					'permission_callback' => array( $this, 'check_permissions' ),
				),
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'save_settings' ),
					'permission_callback' => array( $this, 'check_permissions' ),
					'args'                => array(
						'enabled'       => array(
							'type' => 'boolean',
						),
						'general'       => array(
							'type' => 'object',
						),
						'timing'        => array(
							'type' => 'object',
						),
						'delivery'      => array(
							'type' => 'object',
						),
						'ratings_scale' => array(
							'type' => 'object',
						),
						'redirection'   => array(
							'type' => 'object',
						),
					),
				),
			)
		);
	}

	/**
	 * Verify user capability.
	 *
	 * @return bool
	 */
	public function check_permissions() {
		return current_user_can( 'manage_options' );
	}

	/**
	 * GET /settings
	 *
	 * @return WP_REST_Response
	 */
	public function get_settings() {
		return rest_ensure_response( Settings::get_settings() );
	}

	/**
	 * POST /settings
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error
	 */
	public function save_settings( \WP_REST_Request $request ) {
		$nonce = $request->get_header( 'X-WP-Nonce' );

		if ( ! $nonce || ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new \WP_Error(
				'euphoria_invalid_nonce',
				__( 'Invalid security token.', 'euphoria' ),
				array( 'status' => 403 )
			);
		}

		$result = Settings::save_settings( $request->get_json_params() );

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		return rest_ensure_response(
			array(
				'message'  => __( 'Settings saved successfully.', 'euphoria' ),
				'settings' => $result,
			)
		);
	}
}
