=== Euphoria ===

Contributors: Pinemesh
Tags: woocommerce, reviews, email reminder, react
Requires at least: 6.0
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A React-powered WordPress admin page for managing WooCommerce Review Widget Email Reminder settings.

== Description ==

Euphoria provides a modern React-based admin interface inspired by the supplied Figma design.

Features include:

* Email Reminder enable/disable toggle
* General settings configuration
* Timing settings
* Delivery settings
* Ratings Scale settings
* Redirection settings
* Desktop and Mobile email preview
* Settings persistence using the WordPress REST API
* React + Tailwind CSS admin experience

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/euphoria` directory, or install the plugin through the WordPress plugins screen.
2. Activate the plugin through the Plugins screen in WordPress.
3. Open the **Euphoria** menu from the WordPress admin sidebar.

== Frequently Asked Questions ==

= Where are settings stored? =

Settings are stored in the WordPress options table and loaded through the REST API.

= Does this plugin require WooCommerce? =

The assessment UI is based on a WooCommerce Review Widget Email Reminder screen, but the current implementation focuses on the settings interface only.

== Changelog ==

= 1.0.0 =

* Initial release
* React-powered admin page
* REST API settings persistence
* Email Reminder settings screen implementation

== Upgrade Notice ==

= 1.0.0 =

Initial release.
