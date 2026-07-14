import assert from "node:assert/strict";
import test from "node:test";
import { completeActionItem, createActionItem, FollowUpError } from "../lib/follow-up.ts";
import { can } from "../lib/permissions.ts";

const input = {
  source: { type: "REVIEW_ITEM", id: "RV-1042" },
  title: "Bổ sung evidence cho KR2",
  assigneeId: "USR-MA",
  assigneeName: "Nguyễn Minh Anh",
  assigneeInitials: "MA",
  dueAt: "2026-07-16",
  idempotencyKey: "RV-1042-USR-MA-2026-07-16",
};

test("creates an open follow-up and reuses the idempotency key", () => {
  const first = createActionItem([], input, new Date("2026-07-14T08:00:00Z"));
  assert.equal(first.created, true);
  assert.equal(first.action.status, "OPEN");
  const duplicate = createActionItem([first.action], input, new Date("2026-07-14T09:00:00Z"));
  assert.equal(duplicate.created, false);
  assert.equal(duplicate.action.id, first.action.id);
});

test("requires a valid SLA and completion evidence", () => {
  assert.throws(
    () => createActionItem([], { ...input, dueAt: "2026-07-10" }, new Date("2026-07-14T08:00:00Z")),
    (error) => error instanceof FollowUpError && error.code === "DUE_DATE_INVALID",
  );
  const { action } = createActionItem([], input, new Date("2026-07-14T08:00:00Z"));
  assert.throws(
    () => completeActionItem(action, "  "),
    (error) => error instanceof FollowUpError && error.code === "COMPLETION_NOTE_REQUIRED",
  );
  assert.equal(completeActionItem(action, "Đã bổ sung link dashboard").status, "COMPLETED");
});

test("enforces direct-team and self permission scopes", () => {
  assert.equal(can("MANAGER", "action:create", "action_item", { isDirectTeam: true }).allowed, true);
  assert.equal(can("MANAGER", "action:create", "action_item", { isDirectTeam: false }).reason, "RESOURCE_OUT_OF_SCOPE");
  assert.equal(can("IKAMER", "action:complete", "action_item", { isSelf: true }).allowed, true);
  assert.equal(can("IKAMER", "action:create", "action_item", { isSelf: true }).allowed, false);
  assert.equal(can("BOD", "action:read", "action_item").allowed, false);
  assert.equal(can("MANAGER", "risk:acknowledge", "risk", { isDirectTeam: true }).allowed, true);
  assert.equal(can("MANAGER", "risk:acknowledge", "risk", { isDirectTeam: false }).allowed, false);
  assert.equal(can("BOD", "risk:read", "risk").allowed, true);
  assert.equal(can("BOD", "risk:assign", "risk").allowed, true);
  assert.equal(can("BOD", "risk:acknowledge", "risk").allowed, false);
  assert.equal(can("IKAMER", "ai:report-draft", "report", { isSelf: true }).allowed, true);
  assert.equal(can("MANAGER", "ai:report-draft", "report", { isDirectTeam: true }).allowed, false);
  assert.equal(can("MANAGER", "ai:manager-summary", "team", { isDirectTeam: true }).allowed, true);
  assert.equal(can("BOD", "ai:manager-summary", "team").allowed, false);
  assert.equal(can("IKAMER", "ai:checkpoint-draft", "checkpoint", { isSelf: true }).allowed, true);
  assert.equal(can("IKAMER", "checkpoint:update", "checkpoint", { isSelf: false }).reason, "RESOURCE_OUT_OF_SCOPE");
  assert.equal(can("MANAGER", "ai:checkpoint-draft", "checkpoint", { isDirectTeam: true }).allowed, true);
  assert.equal(can("MANAGER", "checkpoint:update", "checkpoint", { isDirectTeam: false }).allowed, false);
  assert.equal(can("BOD", "checkpoint:read", "checkpoint").allowed, false);
});
