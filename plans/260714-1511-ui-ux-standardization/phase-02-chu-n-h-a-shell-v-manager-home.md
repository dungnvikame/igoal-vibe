---
phase: 2
title: "Chuẩn hóa shell và Manager Home"
status: pending
priority: P1
dependencies: [1]
---

# Phase 2: Chuẩn hóa shell và Manager Home

## Overview

Chuẩn hóa app shell và Manager/BOD Home thành reference implementation cho visual hierarchy Core DS 1.1.

## Requirements

- Dùng 3 background tiers: sidebar, working content, focal data; border/shadow theo guideline.
- Chỉ một primary CTA brand mỗi screen; tabs/filter/pagination neutral; utility links dùng `fg_link`.
- Thay custom card, badge, button, input, table và avatar bằng UI Kit equivalents.
- Active navigation phải công bố `aria-current="page"`; notification phải vẫn truy cập được trên mobile.

## Related Code Files

- Modify/Create: modules Home, app shell, navigation, review queue, team health, executive dashboard tách từ `apps/web/app/igoal-app.tsx`.
- Modify: app-specific CSS layouts thay thế cho `apps/web/app/globals.css` legacy rules.

## Implementation Steps

1. Implement token-based responsive shell and navigation; preserve view navigation and role switch behavior.
2. Rebuild Manager Home metrics/review queue/health/AI summary using kit Card, Badge, Table, Progress, Button and Skeleton.
3. Rebuild BOD dashboard with evidence-to-action emphasis and aggregate-only data treatment.
4. Migrate filters, selected states, status language and empty/loading/error/forbidden visual states to shared feature primitives.
5. Inspect desktop, tablet, and mobile density; do not hide a required entry point without an equivalent control.

## Success Criteria

- [ ] Home screens use token-first hierarchy and no raw color styling.
- [ ] One primary CTA per screen; all non-primary actions are neutral/link/utility.
- [ ] Active navigation is exposed to assistive tech; notification remains reachable at <=460px.
- [ ] Evidence and next action remain visible for every insight.

## Risk Assessment

- Visual migration may make BOD aggregate/privacy messaging less prominent; retain and test policy notes explicitly.

## Implementation Steps

<!-- Detailed steps -->

## Success Criteria

- [ ] ...
