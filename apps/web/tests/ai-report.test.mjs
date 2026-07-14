import assert from "node:assert/strict";
import test from "node:test";
import { acceptDraftSections, generateReportDraft, rewriteReportDraft, toInteractionOutcome, validateDraftCitations } from "../lib/ai-report.ts";

const context = {
  period: "W28",
  objective: "Tăng activation rate",
  progress: 62,
  previousProgress: 54,
  blocker: "API đối tác chậm 2 ngày.",
  evidenceRefs: [
    { id: "EV-1", label: "Activation dashboard", metric: "Activation rate", value: "62%" },
    { id: "EV-2", label: "Experiment log", metric: "Experiment coverage", value: "4/5" },
  ],
};

test("generates a structured draft with evidence citations and safety flags", () => {
  const { draft, interaction } = generateReportDraft(context);
  assert.equal(validateDraftCitations(draft), true);
  assert.equal(draft.evidenceCoverage, 100);
  assert.ok(draft.safetyFlags.includes("NO_AUTO_SUBMIT"));
  assert.equal(interaction.outcome, "GENERATED");
  assert.equal(interaction.feedback, null);
  assert.equal(interaction.estimatedCostUsd, 0);
  assert.deepEqual(interaction.contextRefs, ["EV-1", "EV-2"]);
  assert.equal("rawContext" in interaction, false);
});

test("keeps the manual fallback available when evidence is missing", () => {
  assert.throws(() => generateReportDraft({ ...context, evidenceRefs: [] }), /EVIDENCE_REQUIRED/);
});

test("accepts selected sections without submitting the report", () => {
  const { draft, interaction } = generateReportDraft(context);
  const accepted = acceptDraftSections(draft, ["ACHIEVEMENTS", "NEXT_STEPS"]);
  assert.deepEqual(accepted.acceptedSectionIds, ["ACHIEVEMENTS", "NEXT_STEPS"]);
  assert.doesNotMatch(accepted.content, /Blocker & hỗ trợ/);
  const log = toInteractionOutcome(interaction, "ACCEPTED", accepted.acceptedSectionIds);
  assert.equal(log.outcome, "ACCEPTED");
  assert.equal("submitted" in log, false);
});

test("rewrites copy without losing evidence citations", () => {
  const { draft } = generateReportDraft(context);
  const rewritten = rewriteReportDraft(draft, "OUTCOME_FOCUSED");
  assert.match(rewritten.sections[0].content, /^Kết quả:/);
  assert.deepEqual(rewritten.sections.map((section) => section.citationIds), draft.sections.map((section) => section.citationIds));
});
