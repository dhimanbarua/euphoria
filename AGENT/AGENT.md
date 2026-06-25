# AGENT.md

## Project Overview

Euphoria is a modern WordPress plugin built using:

* PHP 7.4+
* WordPress 6.0+
* React
* WordPress REST API
* Tailwind CSS
* Composer (PSR-4 Autoloading)

The current plugin implements the WooCommerce Review Widget → Email Reminder settings page.

The goal is to evolve this plugin into a production-quality SaaS-style WordPress plugin architecture.

---

# Development Principles

Follow these rules for all generated code:

1. Use modern PHP and WordPress coding standards.
2. Follow PSR-4 autoloading.
3. Keep business logic outside REST controllers.
4. Use reusable React components.
5. Avoid duplicated code.
6. Prefer composition over large monolithic classes.
7. Sanitize all input.
8. Escape all output.
9. Follow WordPress security best practices.
10. Write maintainable code suitable for long-term growth.

---

# Current Architecture

Current structure:

```text
euphoria/
├── app/
│   └── Includes/
│       ├── AdminMenu.php
│       ├── RestApi.php
│       └── Settings.php
│
├── assets/
│   └── build/
│
├── src/
│
├── euphoria.php
└── uninstall.php
```

---

# Target Architecture

As the plugin grows, migrate toward:

```text
app/
├── Admin/
├── Api/
├── Contracts/
├── Repositories/
├── Services/
├── Models/
├── Helpers/
└── Includes/
```

---

# Architectural Rules

## Service Layer

REST controllers should not contain business logic.

Bad:

```php
register_rest_route(...);

update_option(...);
send_email(...);
```

Good:

```php
SettingsService
EmailReminderService
TemplateService
```

REST endpoints should delegate work to services.

---

## Repository Pattern

Do not access storage directly from controllers.

Bad:

```php
update_option();
get_option();
```

Good:

```php
SettingsRepository
```

All storage interactions should go through repositories.

---

## Dependency Injection

Avoid:

```php
$this->repository = new SettingsRepository();
```

Prefer:

```php
public function __construct(
    SettingsRepository $repository
)
```

Dependencies should be injected whenever possible.

---

## Interfaces

Repositories and services should have contracts.

Example:

```php
interface SettingsRepositoryInterface
{
    public function get();
    public function save(array $data);
}
```

Implementations:

```php
OptionSettingsRepository
CustomTableSettingsRepository
```

---

# React Guidelines

Use:

* Functional Components
* React Hooks
* Controlled Inputs
* Reusable Components

Preferred structure:

```text
src/
├── components/
├── hooks/
├── pages/
├── api/
├── utils/
└── store/
```

---

# State Management

Current scope:

```text
useState
useEffect
```

Future scope:

```text
React Context
```

Avoid Redux unless complexity requires it.

---

# Feature Roadmap

## Phase 1

Dynamic Email Preview System

Features:

* Live preview
* Merge tags
* Real-time updates

Supported merge tags:

```text
{customer_name}
{product_name}
{store_name}
{order_id}
{review_url}
```

---

## Phase 2

Email Template Editor

Features:

* Editable template
* Live preview
* Template persistence

---

## Phase 3

WooCommerce Integration

Use:

```php
wc_get_order_statuses()
```

Load statuses dynamically.

Do not hardcode WooCommerce data.

---

## Phase 4

Template Library

Features:

* Template A
* Template B
* Template C

Allow switching templates.

---

## Phase 5

Import / Export Settings

Export:

```json
{
  "enabled": true
}
```

Import settings from JSON.

---

## Phase 6

Test Email Feature

Allow sending test emails.

Use WordPress mail APIs.

---

## Phase 7

Advanced Architecture

Introduce:

* SettingsService
* EmailReminderService
* TemplateService

Introduce repositories and interfaces.

---

# Security Requirements

Always:

* verify REST nonce
* validate permissions
* sanitize incoming data
* escape output

Use:

```php
sanitize_text_field()
sanitize_key()
esc_html()
esc_attr()
```

---

# UI Requirements

Follow:

* WordPress Admin UX
* Responsive Design
* Tailwind CSS

Include:

* Loading states
* Success notices
* Error notices
* Disabled states

---

# Documentation

Whenever new features are added:

1. Update README.md
2. Update changelog.txt
3. Update architecture notes

---

# Testing Strategy

Future testing:

* PHPUnit
* React Testing Library
* WordPress E2E Tests

---

# AI Coding Instructions

When generating code:

1. Generate complete files.
2. Do not generate pseudocode.
3. Follow existing folder structure.
4. Preserve backward compatibility.
5. Explain architectural decisions.
6. Prefer reusable solutions over quick fixes.

The goal is to build a maintainable, scalable, production-quality WordPress plugin.
