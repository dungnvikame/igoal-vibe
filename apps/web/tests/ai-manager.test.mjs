import assert from "node:assert/strict";
import test from "node:test";
import { acceptManagerSuggestion, generateManagerBrief, rejectManagerBrief, validateManagerBrief } from "../lib/ai-manager.ts";

const context = [
  { id: "RPT-W28", type: "REPORT", label: "Weekly report 28" },
  { id: "KR-GP-02", type: "KR", label: "Activation KR" },
  { id: "RSK-301", type: "RISK", label: "Low progress risk" },
  { id: "ACT-1001", type: "ACTION", label: "API follow-up" },
];

test("generates a cited manager brief with non-autonomous safety flags", () => {
  const { brief, interaction } = generateManagerBrief("TEAM-GROWTH", context);
  assert.equal(validateManagerBrief(brief), true);
  assert.ok(brief.safetyFlags.includes("NO_AUTO_REVIEW"));
  assert.ok(brief.safetyFlags.includes("NO_AUTO_ACTION"));
  assert.deepEqual(interaction.contextRefs, context.map((ref) => ref.id));
  assert.equal(interaction.feedback, null);
  assert.equal("rawContext" in interaction, false);
});

test("fails closed when structured context is insufficient", () => {
  assert.throws(() => generateManagerBrief("TEAM-GROWTH", context.slice(0, 1)), /INSUFFICIENT_CONTEXT/);
});

test("accept and reject only update interaction outcome", () => {
  const { interaction } = generateManagerBrief("TEAM-GROWTH", context);
  assert.deepEqual(acceptManagerSuggestion(interaction, "COMMENT").acceptedDiff, ["COMMENT"]);
  assert.equal(rejectManagerBrief(interaction).outcome, "REJECTED");
  assert.equal("reviewCompleted" in interaction, false);
});
