Feature: Conditional Settings

Requirements
- [x] Create a master toggle: Enable Email Reminder.
- [x] When the toggle is ON, all settings sections are fully enabled.
- [x] When the toggle is OFF:
  - [x] General Settings → disabled
  - [x] Timing Settings → disabled
  - [x] Delivery Settings → disabled
- [x] Disabled fields should remain visible but not editable.
- [x] Show a small notice: "Enable Email Reminder to configure these settings."
- [x] Preserve all previously saved values; disabling should not reset them.
- [x] Use centralized React state (Context or existing state management).
- [x] Avoid prop drilling.
- [x] Ensure the UI updates instantly without page refresh.
- [x] Keep the code modular and reusable.
- [x] Do not break existing REST API, PHPUnit tests, or Playwright E2E tests.