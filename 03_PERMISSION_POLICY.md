# iGoal Vibe — Permission Policy

## Policy contract

Quyết định quyền có dạng:

```ts
can({ actor, action, resource, organizationContext }): PolicyDecision
```

`PolicyDecision` gồm `allowed`, `reason`, `policyVersion` và `scope`.

## Default rules

| Actor | Scope mặc định | Được phép |
|---|---|---|
| iKamer | Dữ liệu cá nhân | Xem/cập nhật mục tiêu, report; phản hồi action của mình |
| Manager | Direct team | Xem report/evidence, review, comment, giao action, acknowledge risk |
| BOD | Aggregate được cấp | Xem dashboard, drill-down aggregate, assign risk |
| P&OD | Organization operations | Compliance, campaign, SLA, audit và cấu hình |

## Safety defaults

- BOD không xem nội dung cá nhân nếu chưa có grant rõ ràng.
- Manager không tự động có recursive scope.
- Anonymous feedback không được lộ sender qua UI, API, export hoặc AI context.
- UI ẩn action và API trả `403` cho cùng policy.
- Mọi deny trả reason code ổn định; không tiết lộ dữ liệu resource.

## Required tests

Positive/negative, direct URL, cross-team, multi-role, multi-entity, stale cache, permission change, anonymous feedback và privilege escalation.

