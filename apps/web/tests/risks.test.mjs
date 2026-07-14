import assert from "node:assert/strict";
import test from "node:test";
import { acknowledgeRisk, assignRisk, ignoreRisk, resolveRisk, runRiskEngine } from "../lib/risks.ts";

const snapshot = {
  entityId: "KR-12",
  memberId: "USR-1",
  memberName: "Minh Anh",
  memberInitials: "MA",
  teamId: "TEAM-1",
  teamName: "Growth Platform",
  daysSinceUpdate: 10,
  reportSubmitted: false,
  reportOverdueDays: 2,
  progress: 30,
  expectedProgress: 55,
  impact: "TEAM",
};

test("detects the three deterministic MVP risk rules", () => {
  const result = runRiskEngine([snapshot]);
  assert.deepEqual(result.risks.map((risk) => risk.type), ["STALE", "NO_REPORT", "LOW_PROGRESS"]);
  assert.deepEqual(result.risks.map((risk) => risk.severity), ["HIGH", "HIGH", "HIGH"]);
  assert.equal(new Set(result.risks.map((risk) => risk.dedupeKey)).size, 3);
  assert.equal(result.ruleVersion, "risk-v1.0");
});

test("does not create risk below configured thresholds", () => {
  const result = runRiskEngine([{ ...snapshot, daysSinceUpdate: 7, reportSubmitted: true, reportOverdueDays: 0, progress: 41, expectedProgress: 55 }]);
  assert.equal(result.risks.length, 0);
});

test("enforces risk lifecycle and mandatory resolution", () => {
  const risk = runRiskEngine([snapshot]).risks[0];
  assert.throws(() => resolveRisk(risk, "done"), /INVALID_RISK_TRANSITION/);
  const acknowledged = acknowledgeRisk(risk);
  assert.equal(acknowledged.status, "ACKNOWLEDGED");
  assert.throws(() => resolveRisk(acknowledged, " "), /RESOLUTION_REQUIRED/);
  assert.equal(resolveRisk(acknowledged, "Đã cập nhật KR").status, "RESOLVED");
  assert.equal(ignoreRisk(risk, "False positive do nghỉ phép").status, "IGNORED");
});

test("assigns only active risks to a concrete owner", () => {
  const risk = runRiskEngine([snapshot]).risks[0];
  assert.equal(assignRisk(risk, "USR-MGR-2", "Lan Phạm").assigneeName, "Lan Phạm");
  assert.throws(() => assignRisk({ ...risk, status: "RESOLVED" }, "USR-MGR-2", "Lan Phạm"), /INVALID_RISK_TRANSITION/);
});
