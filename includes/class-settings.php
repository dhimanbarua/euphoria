<?php
/**
 * Settings handler.
 *
 * @package Euphoria\\Includes
 * 
 */

namespace Euphoria\Includes;

defined('ABSPATH') || exit;

/**
 * Class Euphoria_Settings
 */
class Euphoria_Settings
{

	/**
	 * Option name.
	 */
	const OPTION_NAME = 'euphoria_email_reminder_settings';

	/**
	 * Initialize hooks.
	 */
	public static function init()
	{
		// Reserved for future settings hooks.
	}

	/**
	 * Default settings.
	 *
	 * @return array<string, mixed>
	 */
	public static function get_defaults()
	{
		return array(
			'enabled' => true,
			'general' => array(
				'trigger_when' => 'delivered',
				'exclude_refunded' => true,
				'exclude_cancelled' => true,
				'enable_in_email_rating' => false,
				'add_unsubscribe_link' => false,
			),
			'timing' => array(
				'send_from' => '09:00 AM',
				'send_to' => '08:00 PM',
			),
			'delivery' => array(
				'method' => 'smtp',
			),
			'ratings_scale' => array(
				'low_ratings' => '2_stars_and_below',
				'high_ratings' => '4_stars_and_above',
			),
			'redirection' => array(
				'low_ratings_to' => 'none',
				'high_ratings_to' => 'thank_you',
			),
		);
	}

	/**
	 * Get saved settings merged with defaults.
	 *
	 * @return array<string, mixed>
	 */
	public static function get_settings()
	{
		$saved = get_option(self::OPTION_NAME, array());

		if (!is_array($saved)) {
			$saved = array();
		}

		return self::merge_recursive(self::get_defaults(), $saved);
	}

	/**
	 * Save settings after sanitization.
	 *
	 * @param array<string, mixed> $data Raw settings payload.
	 * @return array<string, mixed>|WP_Error
	 */
	public static function save_settings($data)
	{
		if (!is_array($data)) {
			return new WP_Error(
				'euphoria_invalid_settings',
				__('Settings must be an object.', 'euphoria'),
				array('status' => 400)
			);
		}

		$sanitized = self::sanitize_settings($data);
		$validated = self::validate_settings($sanitized);

		if (is_wp_error($validated)) {
			return $validated;
		}

		update_option(self::OPTION_NAME, $validated);

		return $validated;
	}

	/**
	 * Sanitize settings payload.
	 *
	 * @param array<string, mixed> $data Raw settings.
	 * @return array<string, mixed>
	 */
	public static function sanitize_settings($data)
	{
		$defaults = self::get_defaults();

		return array(
			'enabled' => !empty($data['enabled']),
			'general' => array(
				'trigger_when' => self::sanitize_select(
					$data['general']['trigger_when'] ?? '',
					array('delivered', 'completed', 'processing'),
					$defaults['general']['trigger_when']
				),
				'exclude_refunded' => !empty($data['general']['exclude_refunded']),
				'exclude_cancelled' => !empty($data['general']['exclude_cancelled']),
				'enable_in_email_rating' => !empty($data['general']['enable_in_email_rating']),
				'add_unsubscribe_link' => !empty($data['general']['add_unsubscribe_link']),
			),
			'timing' => array(
				'send_from' => self::sanitize_time_option(
					$data['timing']['send_from'] ?? '',
					$defaults['timing']['send_from']
				),
				'send_to' => self::sanitize_time_option(
					$data['timing']['send_to'] ?? '',
					$defaults['timing']['send_to']
				),
			),
			'delivery' => array(
				'method' => self::sanitize_select(
					$data['delivery']['method'] ?? '',
					array('smtp', 'wp_mail'),
					$defaults['delivery']['method']
				),
			),
			'ratings_scale' => array(
				'low_ratings' => self::sanitize_select(
					$data['ratings_scale']['low_ratings'] ?? '',
					array('1_star_and_below', '2_stars_and_below', '3_stars_and_below'),
					$defaults['ratings_scale']['low_ratings']
				),
				'high_ratings' => self::sanitize_select(
					$data['ratings_scale']['high_ratings'] ?? '',
					array('3_stars_and_above', '4_stars_and_above', '5_stars'),
					$defaults['ratings_scale']['high_ratings']
				),
			),
			'redirection' => array(
				'low_ratings_to' => self::sanitize_select(
					$data['redirection']['low_ratings_to'] ?? '',
					array('none', 'custom_page', 'contact_form'),
					$defaults['redirection']['low_ratings_to']
				),
				'high_ratings_to' => self::sanitize_select(
					$data['redirection']['high_ratings_to'] ?? '',
					array('none', 'thank_you', 'custom_page'),
					$defaults['redirection']['high_ratings_to']
				),
			),
		);
	}

	/**
	 * Validate sanitized settings.
	 *
	 * @param array<string, mixed> $data Sanitized settings.
	 * @return array<string, mixed>|WP_Error
	 */
	public static function validate_settings($data)
	{
		$from = strtotime($data['timing']['send_from']);
		$to = strtotime($data['timing']['send_to']);

		if (false === $from || false === $to) {
			return new WP_Error(
				'euphoria_invalid_timing',
				__('Invalid timing values provided.', 'euphoria'),
				array('status' => 400)
			);
		}

		return $data;
	}

	/**
	 * Sanitize select value against allowed options.
	 *
	 * @param string $value   Raw value.
	 * @param array  $allowed Allowed values.
	 * @param string $default Default value.
	 * @return string
	 */
	private static function sanitize_select($value, $allowed, $default)
	{
		$value = sanitize_key($value);

		return in_array($value, $allowed, true) ? $value : $default;
	}

	/**
	 * Sanitize time option label.
	 *
	 * @param string $value   Raw value.
	 * @param string $default Default value.
	 * @return string
	 */
	private static function sanitize_time_option($value, $default)
	{
		$value = sanitize_text_field($value);
		$times = self::get_time_options();

		return in_array($value, $times, true) ? $value : $default;
	}

	/**
	 * Allowed time options for delivery window.
	 *
	 * @return array<int, string>
	 */
	public static function get_time_options()
	{
		$options = array();

		for ($hour = 0; $hour < 24; $hour++) {
			foreach (array('00', '30') as $minute) {
				$timestamp = strtotime(sprintf('%02d:%s', $hour, $minute));
				$options[] = gmdate('h:i A', $timestamp);
			}
		}

		return $options;
	}

	/**
	 * Deep merge settings arrays.
	 *
	 * @param array<string, mixed> $defaults Default values.
	 * @param array<string, mixed> $saved    Saved values.
	 * @return array<string, mixed>
	 */
	private static function merge_recursive($defaults, $saved)
	{
		$merged = $defaults;

		foreach ($saved as $key => $value) {
			if (is_array($value) && isset($merged[$key]) && is_array($merged[$key])) {
				$merged[$key] = self::merge_recursive($merged[$key], $value);
			} else {
				$merged[$key] = $value;
			}
		}

		return $merged;
	}
}
