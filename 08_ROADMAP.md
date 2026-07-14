# iGoal Vibe — Delivery Roadmap

## Build sequence

| Slice | Outcome | Dependency | Release evidence |
|---|---|---|---|
| S0 Tracking | Đo core loop | — | Event debug + baseline dashboard |
| S1 Permission | FE/BE policy parity | S0 | Security matrix pass |
| S2 Review state | Review report end-to-end | S1 | State transition demo |
| S3 Manager Home | Một nơi xử lý weekly review | S2 | Usability scenario pass |
| S4 Follow-up | Action có owner/SLA | S3 | Create/resolve demo |
| S5 Notification | Message dẫn tới action | S3 | Conversion funnel |
| S6 Risk Engine | Phát hiện exception | S0, S1 | Three deterministic rules |
| S7 BOD Dashboard | Insight và top risk | S6 | 30-second task pass |
| S8–S10 AI | Giảm effort có evidence | Core loop stable | AI eval gates pass |

## Current milestone

Milestone 0 xây product documentation, scaffold, Manager Home prototype, tracking debug và permission contract demo. Dữ liệu mẫu phải realistic và các interface sẵn sàng thay bằng API thật.

## Definition of Done

Mỗi slice có business rule, UI states, API contract, permission tests, analytics verification, performance target, regression, runbook, feature flag và rollback plan.

