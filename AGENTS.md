# iGoal Vibe — Coding Agent Instructions

## Read first

Trước mọi thay đổi, đọc `00_PRODUCT_CONTEXT.md`, `01_DOMAIN_MODEL.md` và tài liệu slice liên quan. Bản DOCX là nguồn yêu cầu gốc; bộ Markdown là quyết định triển khai.

## Boundaries

- Implement theo vertical slice: data → policy → API/interface → UI → event → tests.
- Không mở rộng thành HRIS hoặc refactor ngoài phạm vi slice.
- API/policy là source of truth; không bảo vệ dữ liệu chỉ bằng UI.
- Không log nội dung nhạy cảm, feedback anonymous hoặc raw AI context.
- AI không tự ghi dữ liệu chính hay finalize performance decision.

## UI quality

Mọi màn hình có loading, empty, error và forbidden state; hỗ trợ keyboard/focus; dùng status language thống nhất; mọi insight dẫn tới evidence và next action.

## Completion report

Nêu files thay đổi, business rules, tests đã chạy, event được thêm, permission cases, demo steps và phần còn giả lập.

