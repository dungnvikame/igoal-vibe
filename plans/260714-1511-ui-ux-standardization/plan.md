---
title: Chuẩn hóa UI/UX iGoal Vibe theo team UI Kit
description: >-
  Kế hoạch chuẩn hóa frontend từ prototype CSS tùy biến sang
  @frontend-team/ui-kit và ikame Core DS 1.1, giữ nguyên policy/domain behavior.
status: in-progress
priority: P2
branch: main
tags: []
blockedBy: []
blocks: []
created: '2026-07-14T08:12:57.860Z'
createdBy: 'ck:plan'
source: skill
---

# Chuẩn hóa UI/UX iGoal Vibe theo team UI Kit

## Overview

Audit `dk:ui-review` toàn bộ `apps/web` cho verdict `major-violations`: UI Kit chưa được dùng, CSS có 516 literal hex, `IGoalApp` dài 1,265 LOC, và drawers/tabs chưa đáp ứng keyboard/dialog semantics. Kế hoạch này chuẩn hóa UI/UX theo vertical slices, không đổi policy, event, dữ liệu demo hay contract domain.

## Acceptance Criteria

- [ ] `@frontend-team/ui-kit` là nguồn component duy nhất; CSS của kit import một lần, có `TooltipProvider` và `Toaster`.
- [ ] Không còn raw colors, custom visual primitives, hay standalone Tailwind trong app tiêu thụ; UI dùng token classes Core DS 1.1.
- [ ] Mỗi file UI mới/chỉnh sửa tuân thủ giới hạn 200 LOC; handlers/state workflow nằm trong hooks hoặc feature modules.
- [ ] Navigation, tabs, modal/drawer dùng component accessible; keyboard, focus, Escape và screen reader state được kiểm chứng.
- [ ] Manager, BOD, iKamer vẫn giữ permission boundaries và loading/empty/error/forbidden states đã có.
- [ ] Lint, TypeScript, build, test và manual light/dark/mobile QA pass.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Nền tảng UI Kit và kiến trúc](./phase-01-n-n-t-ng-ui-kit-v-ki-n-tr-c.md) | In Progress |
| 2 | [Chuẩn hóa shell và Manager Home](./phase-02-chu-n-h-a-shell-v-manager-home.md) | Pending |
| 3 | [Chuẩn hóa workflow và accessibility](./phase-03-chu-n-h-a-workflow-v-accessibility.md) | Pending |
| 4 | [Xác thực đa role và rollout](./phase-04-x-c-th-c-a-role-v-rollout.md) | Pending |

## Dependencies

- Không có cross-plan dependency.
- Cần quyền truy cập private registry cho `@frontend-team/ui-kit` và secret `IKAME_NPM_TOKEN` được cấu hình ngoài git trước Phase 1.

## Audit Baseline

- Screens: Home, Actions, Risks, Report, Checkpoint; route Next duy nhất là `/`.
- Giữ lại: policy helpers, analytics events, domain functions và role-based forbidden states.
- Không thay đổi API/schema hoặc thêm UI library khác.

## Validation Strategy

- Sau mỗi phase: lint + `tsc --noEmit` khi dependencies đã cài.
- Phase 3: keyboard-only walkthrough, screen-reader semantics check, reduced-motion and 320px/760px/desktop checks.
- Phase 4: `npm test`, build, role regression matrix và visual light/dark review.

## Open Questions

- Private npm registry/token cho `@frontend-team/ui-kit` đã sẵn sàng ở môi trường phát triển và CI chưa?
