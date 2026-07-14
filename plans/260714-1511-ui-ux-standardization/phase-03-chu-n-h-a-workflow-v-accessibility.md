---
phase: 3
title: "Chuẩn hóa workflow và accessibility"
status: pending
priority: P1
dependencies: [1, 2]
---

# Phase 3: Chuẩn hóa workflow và accessibility

## Overview

Chuẩn hóa Actions, Risks, Reports, Checkpoint, notification và AI workflows với accessible interaction patterns; không tự động hóa performance decision.

## Requirements

- Thay bảy custom overlay drawers bằng UI Kit Drawer/Modal có label, focus trap/return và Escape close.
- Thay các tab thủ công bằng UI Kit Tabs có full ARIA semantics và arrow-key navigation.
- Form controls dùng Input/Textarea/Select/Checkbox UI Kit với label, errors, disabled and status states.
- Giữ policy checks, evidence citations, human-confirmed submits, idempotency, analytics event semantics.

## Related Code Files

- Modify/Create: feature modules for Actions, Risks, Reports, Checkpoint, Notifications, Manager Copilot; associated hooks extracted from `apps/web/app/igoal-app.tsx`.
- Modify: app layout/style modules for feature-only composition.
- Preserve: `apps/web/lib/permissions.ts`, `follow-up.ts`, `risks.ts`, `notifications.ts`, `analytics.ts`, `ai-*.ts` unless a type-only boundary requires a compatible export.

## Implementation Steps

1. Establish a reusable accessible overlay convention based on UI Kit Drawer/Modal; migrate review, action, completion, notification, risk, manager copilot, and analytics panels.
2. Migrate Actions and Risks while preserving current loading/empty/error/forbidden branches and scope-specific actions.
3. Migrate Report, Checkpoint and Manager AI flows; distinguish AI draft, cited evidence, manual fallback, and human confirmation visually.
4. Replace tablists/filter groups with UI Kit primitives and audit keyboard/focus announcement per state.
5. Add focused UI tests for overlay close/focus, tabs, disabled submission and role-forbidden views.

## Success Criteria

- [ ] Every overlay has accessible name, Escape behavior, trapped/restored focus and keyboard-operable close control.
- [ ] Every tab exposes selected state, controlled panel and expected keyboard navigation.
- [ ] All workflow states remain present and permission behavior stays API/policy-aligned.
- [ ] AI cannot create final report, checkpoint, review or ranking without human action.

## Risk Assessment

- Overlay state is cross-cutting; migrate one workflow at a time and retain existing unit tests before deleting custom code.

## Implementation Steps

<!-- Detailed steps -->

## Success Criteria

- [ ] ...
