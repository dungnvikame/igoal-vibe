---
phase: 1
title: Nền tảng UI Kit và kiến trúc
status: in-progress
priority: P1
dependencies: []
---

# Phase 1: Nền tảng UI Kit và kiến trúc

## Overview

Thiết lập source of truth UI Kit và tách foundation khỏi prototype monolith, không thay đổi business behavior.

## Requirements

- Cài `@frontend-team/ui-kit` từ private registry bằng `.npmrc` git-ignored; không commit token.
- Bỏ `tailwindcss`/`@tailwindcss/postcss` khỏi app tiêu thụ sau khi xác nhận kit stylesheet thay thế được các token/layout cần thiết.
- Import `@frontend-team/ui-kit/style.css` một lần, thêm `TooltipProvider` và `Toaster` tại root.
- Tách type, seed/demo data, app shell, feature modules và hooks để không file UI nào vượt 200 LOC.

## Related Code Files

- Modify: `apps/web/package.json`, `apps/web/package-lock.json`, `apps/web/app/layout.tsx`, `apps/web/app/page.tsx`, `apps/web/app/igoal-app.tsx`, `apps/web/app/globals.css`.
- Create: `apps/web/app/components/`, `apps/web/app/features/`, `apps/web/app/hooks/`, `apps/web/app/types/` theo boundaries được xác nhận khi implement.
- Modify: `.gitignore` chỉ để đảm bảo `apps/web/.npmrc` bị ignore.

## Implementation Steps

1. Xác thực registry access và thêm `.npmrc` từ safe template; cài UI Kit, không thêm UI library khác.
2. Thiết lập provider/style tại root; tạo app-shell có sidebar/topbar/content tier bằng `Sidebar`, `Button`, `Tooltip`, `Toast` primitives.
3. Di chuyển domain types và demo fixtures khỏi component; giữ imports policy/analytics/domain functions không đổi.
4. Chia `IGoalApp` thành route/view coordinator, shell, and independently owned screen modules; move mutations/state transitions into hooks.
5. Xóa CSS foundation cũ chỉ khi every replacement has token/UI Kit ownership; keep only minimal app-specific layout selectors, each file <=200 LOC.

## Success Criteria

- [ ] Không còn UI Kit/stylesheet/provider omission.
- [ ] Không còn file component/style vượt 200 LOC.
- [ ] Không có raw hex, raw color utility hoặc custom button/input/drawer primitive còn lại.
- [ ] Existing role switching and product-event calls retain behavior.

## Risk Assessment

- Registry không truy cập được: dừng trước dependency mutation, xin user/DevOps cấp access; không fallback sang library khác.
- Refactor có thể làm mất state client: cover từng user flow trước và sau split.

## Implementation Steps

<!-- Detailed steps -->

## Success Criteria

- [ ] ...
