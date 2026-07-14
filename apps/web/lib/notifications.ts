export type NotificationState = "DELIVERED" | "OPENED" | "CLICKED" | "ACTIONED" | "SNOOZED";

export type NotificationItem = {
  id: string;
  triggerId: string;
  title: string;
  message: string;
  entity: { type: "REVIEW_ITEM" | "ACTION_ITEM"; id: string };
  channel: "IN_APP";
  state: NotificationState;
  deliveredAt: string;
  cta: string;
};

export function markNotificationsOpened(items: NotificationItem[]): NotificationItem[] {
  return items.map((item) => item.state === "DELIVERED" ? { ...item, state: "OPENED" } : item);
}

export function actionNotification(items: NotificationItem[], id: string): { items: NotificationItem[]; converted: boolean } {
  let converted = false;
  const next = items.map((item) => {
    if (item.id !== id || item.state === "ACTIONED") return item;
    converted = true;
    return { ...item, state: "ACTIONED" as const };
  });
  return { items: next, converted };
}

export function snoozeNotification(items: NotificationItem[], id: string): NotificationItem[] {
  return items.map((item) => item.id === id && item.state !== "ACTIONED" ? { ...item, state: "SNOOZED" } : item);
}
