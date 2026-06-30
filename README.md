# Euphoria

WordPress plugin that provides a React-powered admin page for the **WooCommerce Review Widget → Email Reminder** settings screen.

Reference design: `DESIGN.jpg`

## Requirements

- WordPress 6.0+
- PHP 7.4+
- Node.js 18+
- Composer

## Installation

1. Copy the `euphoria` folder into `wp-content/plugins/`.
2. Install PHP dependencies:

```bash
composer install
```

3. Install frontend dependencies and build assets:

```bash
npm install
npm run build
```

4. Activate **Euphoria** in the WordPress admin.

## Development

```bash
composer install
npm install
npm start
```

Open **Euphoria** in the WordPress admin while `npm start` is running.

## Release

To create a production-ready plugin zip for distribution:

1. Update the `Version:` in `euphoria.php`.
2. Build frontend assets:

```bash
npm run build
```

3. Create the release package:

```bash
npm run buildfolder
```

This command:

- Copies production files into `build/euphoria-{version}/` (slug and version are read from `euphoria.php`)
- Creates `euphoria-{version}.zip` in the plugin root
- Excludes dev files (`src/`, `node_modules/`, config files, etc.)
- Keeps the correct WordPress folder structure inside the zip (`euphoria/`)

Example output for version `1.0.0`:

```text
build/euphoria-1.0.0/   # Staged release folder
euphoria-1.0.0.zip      # Installable WordPress plugin zip
```

Alternative zip command (without staging folder):

```bash
npm run zip
```

## Features

- React admin UI with Tailwind CSS
- Static sidebar navigation matching the design
- Settings, First Email, and Follow-ups tabs
- Email Reminder toggle and settings sections
- **Phase 1 – Dynamic Email Preview System**
  - Live Desktop / Mobile email preview panel that re-renders on every keystroke
  - Merge tag resolution via centralized `parseTemplate()` utility
  - `MergeTagsPanel` component with click-to-copy merge tag support
  - Supported merge tags: `{customer_name}`, `{product_name}`, `{store_name}`, `{order_id}`, `{review_url}`
- **Feature: Conditional Settings (Phase 3 / TASK-03)**
  - Master "Enable Email Reminder" toggle that conditionally controls General, Timing, and Delivery settings
  - Interactive read-only states for disabled sections with clear user warning notices
  - Context-driven state management (`SettingsContext`) to avoid prop-drilling
- REST API settings persistence at `/wp-json/euphoria/v1/settings`

## REST API

- `GET /wp-json/euphoria/v1/settings` — load saved settings
- `POST /wp-json/euphoria/v1/settings` — save settings (requires `manage_options` and REST nonce)

## Uninstall

When the plugin is deleted from WordPress, all Euphoria settings are removed automatically via `uninstall.php`.

This deletes the `euphoria_email_reminder_settings` option from the database. Deactivating the plugin does not remove saved settings.

## AI Usage Disclosure

- **Cursor** — plugin scaffolding, PHP architecture, React UI implementation, and documentation based on `AGENT.MD` and `DESIGN.jpg`

## Project Structure

```text
euphoria/
├── euphoria.php              # Plugin bootstrap and entry point
├── uninstall.php             # Removes plugin data on delete
├── composer.json             # PHP autoloading (PSR-4 → app/)
├── package.json              # Frontend build scripts (@wordpress/scripts)
│
├── app/Includes/             # PHP backend
│   ├── AdminMenu.php         # Registers admin page and enqueues React assets
│   ├── RestApi.php           # REST routes for settings CRUD
│   └── Settings.php          # WordPress option storage and defaults
│
├── src/                      # React source (compiled to assets/build/)
│   ├── index.js              # Admin app entry point
│   ├── App.jsx               # Root component (wrapped with SettingsProvider)
│   ├── api/settings.js       # REST API client
│   ├── components/           # Reusable UI (Sidebar, Tabs, Toggle, MergeTagsPanel, etc.)
│   ├── pages/EmailReminder.jsx  # Main settings screen
│   ├── store/SettingsContext.jsx # Global settings state provider
│   └── utils/parseTemplate.js  # Merge tag parser + MERGE_TAGS mock data
│
├── assets/build/             # Compiled admin.js, admin.css (generated)
├── build/                    # Distribution output from `npm run buildfolder`
└── languages/                # Translation files
```

**Flow:** WordPress loads `euphoria.php`, which bootstraps PHP classes in `app/Includes/`. The admin page mounts the React app from `src/`, which reads and saves settings via the REST API. Run `npm run build` to compile frontend assets into `assets/build/`. Run `npm run buildfolder` to package a release zip.

See `AGENT.MD` for full architecture, scope, and design reference.
