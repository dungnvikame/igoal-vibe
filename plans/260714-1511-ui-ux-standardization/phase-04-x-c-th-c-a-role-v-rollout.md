---
phase: 4
title: "Xác thực đa role và rollout"
status: pending
priority: P2
dependencies: [1, 2, 3]
---

# Phase 4: Xác thực đa role và rollout

## Overview

Xác thực chuẩn hóa UI/UX ở toàn bộ role, responsive/dark mode và release quality gates; chỉ rollout khi behavior không regress.

## Requirements

- Run lint, typecheck, build and current test suite after node dependencies are installed.
- Add regression coverage for accessibility and interaction paths introduced by refactor.
- Test MANAGER, BOD and IKAMER against positive/negative permission cases.
- Review light, dark, 320px, 760px and desktop rendering plus reduced-motion behavior.

## Related Code Files

- Modify: `apps/web/tests/*.test.mjs` and add focused UI/a11y test setup only if it can run in current Next/Vinext test environment without an unnecessary test framework.
- Modify: `apps/web/README.md` only if setup/validation commands change.

## Implementation Steps

1. Build a role × screen × state matrix covering Home, Actions, Risks, Report and Checkpoint; include direct navigation forbidden cases.
2. Execute automated domain/render tests and add accessible interaction tests for phased components.
3. Perform manual keyboard, screen-reader label, responsive, dark-mode and reduced-motion QA; document evidence and deviations.
4. Re-run `dk:ui-review` and resolve all major violations before declaring compliance.
5. Update only necessary documentation and produce implementation report, QA handoff, architecture-sync/ADR verdicts and review decision required by project gate.

## Success Criteria

- [ ] Automated validation passes; no test is disabled or weakened.
- [ ] Role boundaries, evidence visibility and event behavior are unchanged.
- [ ] No major `dk:ui-review` violations remain.
- [ ] Release handoff contains reproducible QA steps and known limitations.

## Risk Assessment

- Toolchain validation is currently blocked because local `node_modules` lacks ESLint; run `npm ci` only after registry prerequisites are resolved.

## Implementation Steps

<!-- Detailed steps -->

## Success Criteria

- [ ] ...
