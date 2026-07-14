# iGoal Vibe — Product Context

## Product thesis

iGoal là hệ thống điều hành hiệu suất nội bộ cho khoảng 250 nhân sự. Sản phẩm giúp Manager phát hiện đúng việc cần chú ý, review và tạo follow-up; giúp BOD nhìn thấy exception, xu hướng và risk có thể hành động.

## North Star

**Weekly Managed Team Rate** = số team trong tuần đồng thời đạt đủ ba điều kiện / tổng số team hợp lệ:

1. Dữ liệu OKR/EKS/report được cập nhật đúng SLA.
2. Manager hoàn thành review hợp lệ.
3. Risk quan trọng đã được acknowledge hoặc xử lý.

## Personas

- **iKamer:** cập nhật mục tiêu, report, feedback và checkpoint.
- **Manager:** review direct team, comment, giao action và xử lý risk.
- **BOD:** xem dữ liệu tổng hợp, trend, top risk và owner.
- **P&OD:** vận hành compliance, campaign, SLA, audit và cấu hình.

## Core loop

`Detect → Prioritize → Review → Act → Follow-up → Measure`

## Product principles

- Action-first; mỗi card phải dẫn tới next action.
- Evidence-first; insight và AI output phải truy về dữ liệu nguồn.
- Một home và một workflow chính cho mỗi role.
- Tự động thu thập, không tự động hóa accountability.
- AI đề xuất; con người xác nhận trước khi ghi dữ liệu chính.

## MVP boundary

MVP gồm tracking, permission, review state, Manager Home, follow-up, notification, risk engine và BOD Dashboard. Feedback 360, Checkpoint và AI Copilot nằm sau khi core loop ổn định.

## Source of truth

1. `iGoal_H2_Product_Development_Spec.docx` — đặc tả đầy đủ.
2. Bộ tài liệu `00_...08_...` — quyết định triển khai đã chuẩn hóa.
3. API schema, migration và automated tests — hành vi thực thi.

