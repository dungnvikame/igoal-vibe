# iGoal Vibe — Domain Model

## Core aggregates

### Organization

`organization_unit(id, type, parent_id, manager_id, name)` với `type = COMPANY | BU | TEAM`.

### Performance data

- `objective`, `key_result`, `eks`, `report`, `evidence_ref`.
- Mọi progress update có owner, period, source và evidence hoặc xác nhận của Manager.

### Review

`review_item(id, type, entity_ref, manager_id, member_id, status, priority, due_at, evidence_refs, resolution)`.

- Type: `REPORT | STALE_OKR | AT_RISK | EKS | FEEDBACK | CHECKPOINT`.
- Status: `NEW | OPENED | REVIEWED | ACTION_REQUIRED | RESOLVED | DISMISSED`.
- Viewed không đồng nghĩa reviewed.
- Review hoàn tất khi đã mở và có comment hoặc resolution action hợp lệ.
- Update mới có thể reopen item.

### Risk

`risk(id, type, severity, scope, owner_id, assignee_id, status, detected_at, sla_due_at, evidence, resolution)`.

- Type MVP: `STALE | NO_REPORT | LOW_PROGRESS`.
- Status: `NEW | ACKNOWLEDGED | IN_PROGRESS | RESOLVED | IGNORED`.
- Severity được tính từ impact, urgency và scope; rule phải deterministic và versioned.

### Action and notification

- `action_item`: source, assignee, creator, due date, status, completion note.
- `notification_event`: trigger, recipient, entity, channel và conversion state.
- Notification state: `CREATED → DELIVERED → OPENED → CLICKED → ACTIONED/SNOOZED/EXPIRED/FAILED`.

### AI

`ai_interaction` lưu use case, model, prompt version, context refs, output, feedback, accepted diff, latency và chi phí. Không lưu raw sensitive data nếu không cần thiết.

## Invariants

- Entity reference chuẩn: `{ type, id }`.
- Direct team là scope mặc định của Manager.
- API policy quyết định quyền; UI chỉ phản ánh.
- Dismiss risk/review item bắt buộc có reason.
- Action/notification creation phải idempotent.
- Mọi thay đổi permission, risk và AI-assisted content có audit trail.

