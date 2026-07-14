# iGoal Vibe Web

Bản thử nghiệm role-based performance operating system cho Manager và BOD.

## Milestone hiện tại

- Manager Home và Review Queue với dữ liệu demo có cấu trúc.
- Review side panel, evidence và completion rule.
- Role switch kiểm chứng permission contract.
- Product event wrapper và analytics debug panel.
- Follow-up action từ review với owner, SLA, queue, completion note và scope permission.
- Notification inbox có CTA tới đúng review/action, snooze và conversion idempotent.
- Risk Engine v1 với ba rule deterministic, evidence, severity, lifecycle và scoped Risk Center.
- Executive Dashboard cho BOD với North Star, trend, BU health, top risks, owner assignment và manager effectiveness.
- AI Report Assistant với context refs, citation validation, rewrite, accept selected/all, reject, manual fallback và human-confirmed submit.
- AI Manager Review Assistant với cited weekly summary, suggested comments, risk explanation, 1:1 prep và non-autonomous review workflow.
- AI Checkpoint Assistant với evidence 6 tháng, section draft cho iKamer/Manager, anonymity-safe feedback và no-auto-ranking guardrails.
- Responsive layout cho desktop/mobile.
- Production deploy dùng prerendered app shell và static Worker để loại bỏ phụ thuộc SSR ở milestone demo.

## Local workflow

```bash
npm ci
npm run dev
npm run lint
npx tsc --noEmit
npm test
```

Business rules và roadmap nằm ở bộ tài liệu `00_PRODUCT_CONTEXT.md` đến `08_ROADMAP.md` tại workspace root.

Dữ liệu hiện giữ trong client state và reset khi tải lại. Policy và follow-up domain functions đã được tách riêng để chuyển ra sau `/api/v1` khi bật persistence.
