# iGoal Vibe — QA Strategy

## Test pyramid

- Unit: policy rules, state machine, risk scoring, event transformer.
- Integration: API/database/outbox, notification delivery và analytics.
- Contract: request/response schema giữa UI và API.
- E2E: Manager weekly loop, BOD drill-down, notification CTA.
- Security: unauthorized API, direct URL, cross-team và escalation.
- AI eval: evidence validity, hallucination, latency và fallback.

## MVP release gates

- Không còn P0/P1.
- Permission positive và negative suite pass.
- Core events xuất hiện đúng một lần trên staging.
- Manager Home tải dưới 3 giây cho team 15 người.
- Manager hoàn tất review/action trong tối đa hai màn hình.
- BOD xác định top risk và owner dưới 30 giây.
- Loading, empty, error và forbidden state đã được duyệt.

