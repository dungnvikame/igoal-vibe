# iGoal Vibe — Architecture

## Target shape

Khởi đầu bằng modular monolith để giữ tốc độ build và transaction consistency.

- `apps/web`: role-based web experience và API-compatible UI.
- API modules: identity/org, policy, performance, review, action, risk, notification, analytics, AI.
- PostgreSQL/D1-compatible relational storage cho dữ liệu nghiệp vụ.
- Background jobs cho risk detection, notification delivery và AI.
- Transactional outbox cho domain event, analytics và integration.
- Adapter boundary cho Slack, Asana, email và model provider.

## Request flow

`UI → API boundary → authentication → policy check → application service → database/outbox → worker/integration`

## Frontend conventions

- Server data được cache theo query key có organization scope.
- Mutation dùng optimistic concurrency hoặc version cho dữ liệu nhạy cảm.
- Mọi feature có loading, empty, error và forbidden state.
- Không hydrate feed lớn; dùng cursor pagination và lazy detail panel.

## Reliability and observability

- Correlation ID xuyên request, audit và event.
- Idempotency key cho create action/notification và external delivery.
- Structured log không chứa report/feedback thô.
- Feature flag theo role/team; rollout có rollback plan.

## Initial implementation

Bản đầu trong `apps/web` dùng dữ liệu mẫu có cấu trúc để xác nhận UX, policy contract và event taxonomy. Persistence/API thật được thay vào cùng interface ở slice kế tiếp.

