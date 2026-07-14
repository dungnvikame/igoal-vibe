# iGoal Vibe — AI System

## Principles

- Structured context và evidence references thay vì nhồi toàn bộ dữ liệu thô.
- Mọi claim định lượng phải có citation.
- AI không tự submit report, đổi progress hoặc finalize ranking.
- User có Accept all, Accept selected, Edit và Reject.

## Gateway contract

Input gồm use case, prompt version, actor/scope, context refs và requested output schema. Output gồm structured sections, claims, citations, confidence và safety flags.

## Logging

Lưu model, prompt version, latency, token/cost, context refs, feedback và accepted diff. Nội dung nhạy cảm áp dụng retention và access policy riêng.

## Evaluation gates

- Golden dataset theo từng use case.
- Evidence coverage, hallucination rate, acceptance, edit distance, time saved và latency.
- Fallback luôn giữ workflow thủ công hoạt động.
- Không rollout nếu citation validation hoặc permission filtering fail.

