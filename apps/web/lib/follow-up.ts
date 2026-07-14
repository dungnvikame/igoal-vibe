export type ActionStatus = "OPEN" | "COMPLETED";

export type ActionItem = {
  id: string;
  source: { type: "REVIEW_ITEM"; id: string };
  title: string;
  assigneeId: string;
  assigneeName: string;
  assigneeInitials: string;
  creatorId: string;
  dueAt: string;
  status: ActionStatus;
  completionNote: string | null;
  createdAt: string;
  idempotencyKey: string;
};

export type CreateActionInput = Pick<ActionItem, "source" | "title" | "assigneeId" | "assigneeName" | "assigneeInitials" | "dueAt" | "idempotencyKey">;

export type FollowUpErrorCode = "TITLE_REQUIRED" | "ASSIGNEE_REQUIRED" | "DUE_DATE_INVALID" | "COMPLETION_NOTE_REQUIRED" | "INVALID_TRANSITION";

export class FollowUpError extends Error {
  code: FollowUpErrorCode;

  constructor(code: FollowUpErrorCode) {
    super(code);
    this.code = code;
  }
}

export function createActionItem(
  existing: ActionItem[],
  input: CreateActionInput,
  now = new Date(),
): { action: ActionItem; created: boolean } {
  const duplicate = existing.find((action) => action.idempotencyKey === input.idempotencyKey);
  if (duplicate) return { action: duplicate, created: false };
  if (!input.title.trim()) throw new FollowUpError("TITLE_REQUIRED");
  if (!input.assigneeId) throw new FollowUpError("ASSIGNEE_REQUIRED");
  const due = new Date(`${input.dueAt}T23:59:59`);
  if (Number.isNaN(due.getTime()) || due < now) throw new FollowUpError("DUE_DATE_INVALID");

  return {
    created: true,
    action: {
      id: `ACT-${String(existing.length + 101).padStart(4, "0")}`,
      ...input,
      title: input.title.trim(),
      creatorId: "USR-TOM",
      status: "OPEN",
      completionNote: null,
      createdAt: now.toISOString(),
    },
  };
}

export function completeActionItem(action: ActionItem, completionNote: string): ActionItem {
  if (action.status !== "OPEN") throw new FollowUpError("INVALID_TRANSITION");
  if (!completionNote.trim()) throw new FollowUpError("COMPLETION_NOTE_REQUIRED");
  return { ...action, status: "COMPLETED", completionNote: completionNote.trim() };
}
