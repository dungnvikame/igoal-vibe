import assert from "node:assert/strict";
import test from "node:test";
import { actionNotification, markNotificationsOpened, snoozeNotification } from "../lib/notifications.ts";

const notification = {
  id: "NTF-1",
  triggerId: "TRG-1",
  title: "Action sắp tới hạn",
  message: "Cần cập nhật kết quả.",
  entity: { type: "ACTION_ITEM", id: "ACT-1" },
  channel: "IN_APP",
  state: "DELIVERED",
  deliveredAt: "2026-07-14T08:00:00Z",
  cta: "Mở action",
};

test("opens delivered notifications without changing terminal states", () => {
  assert.equal(markNotificationsOpened([notification])[0].state, "OPENED");
  assert.equal(markNotificationsOpened([{ ...notification, state: "ACTIONED" }])[0].state, "ACTIONED");
});

test("records notification conversion exactly once", () => {
  const first = actionNotification([notification], notification.id);
  assert.equal(first.converted, true);
  assert.equal(first.items[0].state, "ACTIONED");
  const duplicate = actionNotification(first.items, notification.id);
  assert.equal(duplicate.converted, false);
});

test("does not snooze an actioned notification", () => {
  assert.equal(snoozeNotification([{ ...notification, state: "ACTIONED" }], notification.id)[0].state, "ACTIONED");
});
