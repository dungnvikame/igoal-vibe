# iGoal H2.2026 Product Development Specification

## 1. Product thesis

iGoal không cần thắng bằng số lượng module. iGoal cần trở thành **hệ thống điều hành hiệu suất nội bộ**: phát hiện đúng vấn đề, đưa đúng action cho Manager và cung cấp insight có thể hành động cho BOD.

**North Star:** Weekly Managed Team Rate — tỷ lệ team mỗi tuần có dữ liệu cập nhật đúng hạn, Manager đã review và risk quan trọng đã được xử lý/acknowledge.

## 2. Strategic pillars

1. Trust the system: permission, data quality, measurement.
2. Manager Operating System: Manager Home, Review Queue, Follow-up.
3. BOD Decision Intelligence: Executive Dashboard, Risk Center, drill-down.
4. Behavior Engine: notification dẫn tới action và escalation.
5. AI Performance Copilot: report, manager review, checkpoint có evidence.

## 3. Product principles

- Action-first: mọi màn hình phải dẫn tới next action.
- Evidence-first: mọi insight/AI output phải dẫn nguồn.
- One workflow, one home cho Manager.
- Automate collection, not accountability.
- Measure before optimize.
- Human-in-the-loop cho mọi quyết định performance.

## 4. Roadmap theo outcome

### Phase 0 — Stabilize & Measure
- Permission refactor
- Bug cleanup
- Event taxonomy
- AI logging
- Data quality rules

### Phase 1 — Manager Loop
- Manager Home
- Review Queue
- Review state
- Follow-up action
- Notification v1
- Risk detection

### Phase 2 — BOD Intelligence
- Executive Dashboard
- Risk Center
- Drill-down Company → BU → Team → Project
- Manager effectiveness
- Trend

### Phase 3 — AI Copilot
- AI Report Assistant
- AI Manager Review Assistant
- AI Checkpoint Assistant
- Goal quality coach

## 5. Core epics

### FND-01 Product analytics foundation
Track login, update OKR/EKS, report submit, Manager open/comment/review, notification conversion, AI generate/accept/edit/reject, checkpoint, feedback.

### FND-02 Permission refactor
Một permission service, shared FE/BE policy contract, staging không bypass, audit log, cache invalidation rõ ràng.

### FND-03 Data trust
Completeness, freshness, evidence, consistency, Manager verification.

### MGR-01 Manager Home
- Attention required
- Team health
- Action queue
- AI weekly summary

### MGR-02 Review Queue
Review chỉ hoàn thành khi Manager đọc và comment hoặc chọn resolution action hợp lệ. Viewed không đồng nghĩa reviewed.

### MGR-03 Follow-up
Quick comment, action assignment, 1:1 prep, resolution tracking, reminder.

### BOD-01 Executive Dashboard
Executive summary, organizational performance, manager effectiveness, top risks, checkpoint overview.

### BOD-02 Risk Center
Risk lifecycle: New → Acknowledged → In Progress → Resolved/Ignored.

### NOTIF-01 Behavior Engine
State: CREATED → DELIVERED → OPENED → CLICKED → ACTIONED/SNOOZED/EXPIRED/FAILED.

### AI-01 Report Assistant
Draft, quality check, rewrite, evidence link, progress suggestion. Không auto-submit/update.

### AI-02 Manager Review Assistant
Weekly summary, report summary, suggested comments, risk explanation, 1:1 prep.

### AI-03 Checkpoint Assistant
Tổng hợp 6 tháng và draft theo section. Không finalize ranking.

### FB-01 Feedback 360 redesign
Assignment, writing UX, anonymity, progress, AI theme summary.

### CP-01 Checkpoint simplification
Wizard, evidence panel, side-by-side review, campaign dashboard.

## 6. New domain objects

- review_item
- risk
- action_item
- notification_event
- ai_interaction
- review_state

## 7. Suggested API

```text
GET  /api/v1/manager/home
GET  /api/v1/review-items
POST /api/v1/review-items/{id}/review
POST /api/v1/review-items/{id}/actions
GET  /api/v1/executive/summary
GET  /api/v1/risks
POST /api/v1/risks/{id}/acknowledge
POST /api/v1/ai/report-draft
POST /api/v1/ai/manager-summary
POST /api/v1/ai/interactions/{id}/feedback
```

## 8. Build order for vibe coding

1. S0 Tracking skeleton
2. S1 Permission contract
3. S2 Review state
4. S3 Manager Home MVP
5. S4 Follow-up action
6. S5 Notification conversion
7. S6 Risk engine MVP
8. S7 BOD Dashboard MVP
9. S8 AI Report Assistant
10. S9 AI Manager Summary
11. S10 Checkpoint AI

## 9. Repo documentation pack

- 00_PRODUCT_CONTEXT.md
- 01_DOMAIN_MODEL.md
- 02_ARCHITECTURE.md
- 03_PERMISSION_POLICY.md
- 04_API_CONTRACTS.md
- 05_EVENT_TAXONOMY.md
- 06_AI_SYSTEM.md
- 07_QA_STRATEGY.md
- 08_ROADMAP.md
- AGENTS.md

## 10. Global Definition of Done

- Business rule confirmed
- Full UI states
- API contract documented
- Permission positive/negative test pass
- Analytics verified
- Performance target met
- No P0/P1
- AI guardrail/logging/fallback
- Runbook updated
- Feature flag and rollback plan
