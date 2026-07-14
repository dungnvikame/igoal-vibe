# iGoal Vibe — Event Taxonomy

## Envelope

Mọi event có `eventId`, `name`, `occurredAt`, `userId`, `role`, `sessionId`, `source`, `entityType`, `entityId`, `properties` và `schemaVersion`.

## Core events

| Event | Khi phát | Thuộc tính chính |
|---|---|---|
| `manager_home_viewed` | Manager mở home | teamId, itemCount, riskCount |
| `executive_dashboard_viewed` | BOD mở tổng quan | teamCount, highRiskCount |
| `review_item_opened` | Mở item | itemType, priority |
| `review_completed` | Comment/action hợp lệ | timeToReview, resolutionType |
| `action_queue_viewed` | Mở follow-up queue | openCount, overdueCount |
| `action_created` | Giao action hợp lệ | sourceType, assigneeType, dueAt |
| `action_completed` | Action có kết quả hợp lệ | sourceType, hadCompletionNote |
| `report_submitted` | Gửi report | linkedEntityCount, aiAssisted |
| `ai_draft_generated` | AI tạo report draft | useCase, promptVersion, contextRefCount, latencyMs |
| `ai_draft_accepted` | User áp dụng draft | acceptedSectionCount, evidenceCoverage, editedBeforeSubmit |
| `ai_draft_rejected` | User loại draft | useCase, hadFeedback |
| `ai_manager_brief_generated` | Tạo Manager brief | promptVersion, contextRefCount, latencyMs, evidenceValid |
| `ai_manager_suggestion_accepted` | Manager dùng một gợi ý | suggestionType, reviewItemId, contextRefCount |
| `ai_manager_brief_rejected` | Manager loại brief | useCase, hadFeedback |
| `checkpoint_opened` | Mở checkpoint workspace | actorScope, allowed, evidenceRefCount |
| `ai_checkpoint_draft_generated` | AI tạo checkpoint draft | promptVersion, contextRefCount, latencyMs, evidenceCoverage |
| `ai_checkpoint_section_accepted` | User dùng một section | sectionId, contextRefCount, evidenceCoverage |
| `ai_checkpoint_draft_rejected` | User loại checkpoint draft | useCase, hadFeedback |
| `ai_checkpoint_issue_reported` | Báo hallucination/issue | reason, contextRefCount |
| `checkpoint_draft_saved` | User xác nhận lưu draft | savedSectionCount, aiAssisted, rankingFinalized |
| `notification_actioned` | CTA hoàn tất | triggerId, channel, timeToAction |
| `risk_detected` | Engine tạo risk | riskType, severity, scope |
| `risk_acknowledged` | Manager nhận xử lý risk | riskType, severity, ruleVersion |
| `risk_assigned` | BOD giao owner xử lý | severity, scope, assigneeRole |
| `risk_resolved` | Risk đóng | resolutionType, ageHours |
| `permission_decision` | Policy check quan trọng | action, allowed, reason, policyVersion |

## Privacy and quality

- Không đưa report, feedback, comment hoặc prompt thô vào analytics.
- Event producer chịu trách nhiệm idempotency bằng `eventId`.
- Staging có debug console để kiểm tra payload.
- CI kiểm tra required properties; dashboard theo dõi missing/duplicate rate.
