import type { Role } from "../../../lib/permissions";
import type { ActionItem } from "../../../lib/follow-up";
import type { RiskItem, RiskSeverity } from "../../../lib/risks";

type Priority = "P0" | "P1" | "P2";

type ReviewItem = {
  priority: Priority;
};

export function selectReviewItems<T extends ReviewItem>(items: T[], filter: "ALL" | Priority) {
  return items.filter((item) => filter === "ALL" || item.priority === filter);
}

export function selectScopedActions(actions: ActionItem[], role: Role) {
  return role === "IKAMER" ? actions.filter((action) => action.assigneeId === "USR-TOM") : actions;
}

export function selectActions(actions: ActionItem[], filter: "OPEN" | "OVERDUE" | "COMPLETED") {
  return actions.filter((action) => {
    if (filter === "COMPLETED") return action.status === "COMPLETED";
    if (action.status !== "OPEN") return false;
    return filter !== "OVERDUE" || action.dueAt < "2026-07-14";
  });
}

export function selectRisks(risks: RiskItem[], filter: "ACTIVE" | RiskSeverity | "RESOLVED") {
  return risks.filter((risk) => {
    if (filter === "RESOLVED") return risk.status === "RESOLVED" || risk.status === "IGNORED";
    if (risk.status === "RESOLVED" || risk.status === "IGNORED") return false;
    return filter === "ACTIVE" || risk.severity === filter;
  });
}
