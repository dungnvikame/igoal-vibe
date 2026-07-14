# iGoal Vibe — API Contracts

## Conventions

- Base path `/api/v1`.
- Response envelope: `{ data, meta, error }`.
- Error: `{ code, message, correlationId, fieldErrors? }`.
- Cursor pagination cho review/risk/activity feed.
- `EntityRef = { type, id }`.
- Mutation nhạy cảm nhận `version`; create side-effect nhận `Idempotency-Key`.

## MVP endpoints

```text
GET  /api/v1/manager/home
GET  /api/v1/review-items
GET  /api/v1/review-items/{id}
POST /api/v1/review-items/{id}/open
POST /api/v1/review-items/{id}/review
POST /api/v1/review-items/{id}/actions
GET  /api/v1/action-items
POST /api/v1/action-items/{id}/complete
GET  /api/v1/notifications
POST /api/v1/notifications/{id}/action
POST /api/v1/notifications/{id}/snooze
GET  /api/v1/risks
POST /api/v1/risks/{id}/acknowledge
POST /api/v1/risks/{id}/assign
POST /api/v1/risks/{id}/resolve
POST /api/v1/risks/{id}/ignore
GET  /api/v1/executive/summary
POST /api/v1/ai/report-draft
POST /api/v1/ai/manager-summary
GET  /api/v1/checkpoints/{id}
GET  /api/v1/checkpoints/{id}/evidence
PUT  /api/v1/checkpoints/{id}/draft
POST /api/v1/ai/checkpoint-draft
POST /api/v1/ai/interactions/{id}/feedback
POST /api/v1/analytics/events
```

## Review completion request

```json
{
  "resolutionType": "COMMENT",
  "comment": "Bổ sung evidence cho KR2 trước thứ Sáu",
  "version": 3
}
```

Server kiểm tra policy, item đã opened và resolution hợp lệ trước khi đặt `reviewedAt`.

## Follow-up action rules

- Tạo action bắt buộc có `source`, `assigneeId`, `title`, `dueAt` và `Idempotency-Key`.
- Action từ review giữ `source = { type: "REVIEW_ITEM", id }` để truy ngược evidence.
- Hoàn thành action bắt buộc có `completionNote`; chỉ cho phép transition `OPEN → COMPLETED`.
- Manager thao tác trong direct team; iKamer chỉ cập nhật action được giao cho chính mình; BOD không đọc action cá nhân.

## Notification conversion rules

- Notification giữ `triggerId`, `entity`, `channel` và state machine từ `DELIVERED` đến `ACTIONED` hoặc `SNOOZED`.
- CTA phải dẫn tới đúng entity và chỉ ghi nhận `notification_actioned` một lần.
- Payload không chứa report, comment hoặc feedback thô.

## Risk engine v1 rules

- `STALE`: tạo risk khi entity quá 7 ngày chưa cập nhật.
- `NO_REPORT`: tạo risk khi report chưa submit và đã quá SLA.
- `LOW_PROGRESS`: tạo risk khi `expectedProgress - actualProgress >= 15%`.
- Mỗi risk có `ruleVersion`, deterministic severity, evidence refs và dedupe key `{type}:{entityId}:{ruleVersion}`.
- Lifecycle hợp lệ: `NEW → ACKNOWLEDGED → RESOLVED`; `IGNORED` và `RESOLVED` bắt buộc có reason/resolution.
- BOD chỉ đọc aggregate evidence và assign Manager owner; API không trả nội dung cá nhân khi không có grant.

## AI Report Assistant contract

- Input chỉ gồm use case, `promptVersion`, actor/scope, structured fields và `contextRefs` đã được policy lọc.
- Output gồm sections, claims, citations, confidence, evidence coverage, progress suggestion và safety flags.
- Claim định lượng thiếu citation bị chặn trước khi accept.
- Accept/rewrite chỉ cập nhật editor draft; submit report và progress update luôn là mutation riêng do người dùng xác nhận.
- Fallback không phụ thuộc AI: editor và submit thủ công vẫn hoạt động.

## AI Manager Review contract

- Input chỉ gồm direct-team context refs mà Manager được phép xem.
- Output gồm weekly summary, report summary, suggested comments, risk explanations và 1:1 prep với citations.
- Accept comment chỉ điền vào review editor; không được tự đặt review thành `REVIEWED`.
- Accept 1:1 prep chỉ lưu bản nháp; không tự tạo lịch, action hoặc performance decision.
- Thiếu context hoặc citation validation fail phải đóng AI path và giữ review thủ công hoạt động.

## AI Checkpoint Assistant contract

- Checkpoint evidence được tổng hợp từ OKR, EKS, report và feedback đã lọc policy trong tối đa 6 tháng; anonymous feedback chỉ đưa vào dưới dạng theme anonymity-safe.
- iKamer dùng scope `SELF`; Manager chỉ dùng checkpoint của direct team. BOD không đọc checkpoint cá nhân nếu chưa có grant rõ ràng.
- AI tạo draft theo từng section: iKamer dùng `WHAT | HOW | LEVEL_UP`; Manager dùng `PERFORMANCE | MISMATCH | COACHING`.
- Mọi section có `contextRefs`, citations, confidence và safety flags. Citation ngoài context bị chặn trước khi accept.
- Accept chỉ cập nhật editor draft. `PUT /checkpoints/{id}/draft` là mutation riêng do user xác nhận và chỉ lưu trạng thái `DRAFT`.
- AI không submit checkpoint, không ghi score và không finalize ranking. Thiếu evidence hoặc feedback chưa anonymity-safe phải fail closed, giữ editor thủ công hoạt động.
