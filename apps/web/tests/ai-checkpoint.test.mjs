import assert from "node:assert/strict";
import test from "node:test";
import { acceptCheckpointSections, aggregateCheckpointEvidence, generateCheckpointDraft, rejectCheckpointDraft, saveCheckpointDraft, validateCheckpointDraft } from "../lib/ai-checkpoint.ts";

const evidence = [
  { id: "CP-OKR-01", type: "OKR", label: "Activation KR", period: "2026-01", summary: "Progress 31%" },
  { id: "CP-RPT-04", type: "REPORT", label: "April report", period: "2026-04", summary: "API blocker" },
  { id: "CP-RPT-06", type: "REPORT", label: "June report", period: "2026-06", summary: "Progress 62%" },
  { id: "CP-EKS-01", type: "EKS", label: "Strategic communication", period: "2026-02", summary: "Level up" },
  { id: "CP-FB-02", type: "FEEDBACK", label: "Feedback themes", period: "2026-05", summary: "Anonymity-safe themes", anonymitySafe: true },
];

test("aggregates six-month structured evidence without raw content", () => {
  const summary = aggregateCheckpointEvidence(evidence);
  assert.equal(summary.total, 5);
  assert.equal(summary.byType.REPORT, 2);
  assert.equal(summary.coveredMonths, 5);
});

test("generates cited self and manager drafts with no autonomous ranking", () => {
  for (const role of ["IKAMER", "MANAGER"]) {
    const { draft, interaction } = generateCheckpointDraft("CP-H1-2026", "H1.2026", role, evidence);
    assert.equal(validateCheckpointDraft(draft), true);
    assert.ok(draft.safetyFlags.includes("NO_AUTO_RANKING"));
    assert.ok(draft.safetyFlags.includes("NO_AUTO_SAVE"));
    assert.equal("rawContext" in interaction, false);
    assert.equal("ranking" in draft, false);
  }
  const subset = generateCheckpointDraft("CP-H1-2026", "H1.2026", "IKAMER", evidence.slice(0, 3));
  assert.equal(validateCheckpointDraft(subset.draft), true);
});

test("fails closed for insufficient or unsafe feedback context", () => {
  assert.throws(() => generateCheckpointDraft("CP-H1-2026", "H1.2026", "IKAMER", evidence.slice(0, 2)), /INSUFFICIENT_EVIDENCE/);
  assert.throws(() => generateCheckpointDraft("CP-H1-2026", "H1.2026", "IKAMER", [...evidence.slice(0, 4), { ...evidence[4], anonymitySafe: false }]), /UNSAFE_FEEDBACK_CONTEXT/);
});

test("accepting sections only updates editor content and interaction outcome", () => {
  const { draft, interaction } = generateCheckpointDraft("CP-H1-2026", "H1.2026", "IKAMER", evidence);
  const accepted = acceptCheckpointSections(draft, interaction, ["WHAT"]);
  assert.deepEqual(accepted.interaction.acceptedDiff, ["WHAT"]);
  assert.equal(typeof accepted.sections.WHAT, "string");
  assert.equal("status" in accepted, false);
});

test("saving remains draft and cannot finalize a ranking", () => {
  const saved = saveCheckpointDraft("CP-H1-2026", { WHAT: "Kết quả đã xác nhận thủ công." });
  assert.equal(saved.status, "DRAFT");
  assert.equal(saved.ranking, null);
  assert.throws(() => saveCheckpointDraft("CP-H1-2026", {}), /CONTENT_REQUIRED/);
  const { interaction } = generateCheckpointDraft("CP-H1-2026", "H1.2026", "IKAMER", evidence);
  assert.equal(rejectCheckpointDraft(interaction, "Thiếu evidence").feedback, "Thiếu evidence");
});
