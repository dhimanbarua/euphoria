<?php
/**
 * Uninstall Euphoria
 *
 * @package Euphoria
 */

defined( 'WP_UNINSTALL_PLUGIN' ) || exit;

delete_option( 'euphoria_email_reminder_settings' );