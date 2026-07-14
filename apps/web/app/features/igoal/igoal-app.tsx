"use client";

import { useMemo, useState } from "react";
import { can, type Role } from "../../../lib/permissions";
import { createEvent, type ProductEvent } from "../../../lib/analytics";
import { completeActionItem, createActionItem, FollowUpError, type ActionItem } from "../../../lib/follow-up";
import { actionNotification, markNotificationsOpened, snoozeNotification, type NotificationItem } from "../../../lib/notifications";
import { acknowledgeRisk, assignRisk, ignoreRisk, resolveRisk, runRiskEngine, type RiskItem, type RiskSeverity } from "../../../lib/risks";
import { acceptDraftSections, generateReportDraft, rewriteReportDraft, toInteractionOutcome, validateDraftCitations, type AIInteraction, type AIReportDraft, type DraftSection, type EvidenceRef } from "../../../lib/ai-report";
import { acceptManagerSuggestion, generateManagerBrief, rejectManagerBrief, validateManagerBrief, type ManagerAIBrief, type ManagerAIInteraction, type ManagerContextRef } from "../../../lib/ai-manager";
import { acceptCheckpointSections, aggregateCheckpointEvidence, generateCheckpointDraft, rejectCheckpointDraft, saveCheckpointDraft, validateCheckpointDraft, type CheckpointAIDraft, type CheckpointAIInteraction, type CheckpointEvidenceRef, type CheckpointSectionId } from "../../../lib/ai-checkpoint";
import { useOverlayDismissal } from "./use-overlay-dismissal";
import { selectActions, selectReviewItems, selectRisks, selectScopedActions } from "./igoal-selectors";
import { NavigationIcon } from "./igoal-navigation";

type Priority = "P0" | "P1" | "P2";
type ReviewStatus = "NEW" | "OPENED" | "REVIEWED";

type ReviewItem = {
  id: string;
  member: string;
  initials: string;
  color: string;
  title: string;
  detail: string;
  reason: string;
  type: string;
  priority: Priority;
  due: string;
  evidence: string[];
  status: ReviewStatus;
};

const initialItems: ReviewItem[] = [
  {
    id: "RV-1042",
    member: "Nguyễn Minh Anh",
    initials: "MA",
    color: "mint",
    title: "Weekly report cần review",
    detail: "Growth Platform · Tuần 28",
    reason: "Có 2 KR thay đổi và 1 blocker mới",
    type: "REPORT",
    priority: "P0",
    due: "Hôm nay, 16:00",
    evidence: ["Weekly report #28", "KR2 giảm 8%", "Blocker: API đối tác"],
    status: "NEW",
  },
  {
    id: "RV-1039",
    member: "Trần Đức Huy",
    initials: "DH",
    color: "blue",
    title: "OKR chưa cập nhật 9 ngày",
    detail: "Customer Experience · KR3",
    reason: "Vượt SLA cập nhật 2 ngày",
    type: "STALE_OKR",
    priority: "P1",
    due: "Quá hạn 2 ngày",
    evidence: ["Lần cập nhật cuối: 04/07", "SLA: 7 ngày", "Progress hiện tại: 42%"],
    status: "NEW",
  },
  {
    id: "RV-1035",
    member: "Lê Hoàng Nam",
    initials: "HN",
    color: "amber",
    title: "Progress thấp hơn kế hoạch",
    detail: "Revenue Operations · KR1",
    reason: "Chênh lệch −18% so với forecast",
    type: "AT_RISK",
    priority: "P1",
    due: "Ngày mai",
    evidence: ["Actual: 37%", "Forecast: 55%", "2 dependencies chưa hoàn thành"],
    status: "OPENED",
  },
  {
    id: "RV-1028",
    member: "Phạm Thuỳ Linh",
    initials: "TL",
    color: "rose",
    title: "EKS cần phản hồi",
    detail: "Leadership pathway · H2.2026",
    reason: "Đã gửi yêu cầu review 3 ngày trước",
    type: "EKS",
    priority: "P2",
    due: "Thứ Sáu",
    evidence: ["EKS: Strategic communication", "Self review đã hoàn thành"],
    status: "NEW",
  },
];

const initialActions: ActionItem[] = [
  {
    id: "ACT-1001",
    source: { type: "REVIEW_ITEM", id: "RV-1042" },
    title: "Bổ sung evidence và phương án xử lý blocker API",
    assigneeId: "USR-MA",
    assigneeName: "Nguyễn Minh Anh",
    assigneeInitials: "MA",
    creatorId: "USR-TOM",
    dueAt: "2026-07-15",
    status: "OPEN",
    completionNote: null,
    createdAt: "2026-07-13T08:30:00.000Z",
    idempotencyKey: "seed-ACT-1001",
  },
  {
    id: "ACT-1002",
    source: { type: "REVIEW_ITEM", id: "RV-1039" },
    title: "Cập nhật tiến độ KR3 và nguyên nhân trễ SLA",
    assigneeId: "USR-DH",
    assigneeName: "Trần Đức Huy",
    assigneeInitials: "DH",
    creatorId: "USR-TOM",
    dueAt: "2026-07-13",
    status: "OPEN",
    completionNote: null,
    createdAt: "2026-07-11T03:15:00.000Z",
    idempotencyKey: "seed-ACT-1002",
  },
  {
    id: "ACT-1003",
    source: { type: "REVIEW_ITEM", id: "RV-1035" },
    title: "Chốt owner cho hai dependency Revenue Ops",
    assigneeId: "USR-TOM",
    assigneeName: "Tom Mac",
    assigneeInitials: "TM",
    creatorId: "USR-TOM",
    dueAt: "2026-07-17",
    status: "OPEN",
    completionNote: null,
    createdAt: "2026-07-12T09:00:00.000Z",
    idempotencyKey: "seed-ACT-1003",
  },
  {
    id: "ACT-0998",
    source: { type: "REVIEW_ITEM", id: "RV-1028" },
    title: "Gửi ví dụ cho EKS Strategic communication",
    assigneeId: "USR-TL",
    assigneeName: "Phạm Thuỳ Linh",
    assigneeInitials: "TL",
    creatorId: "USR-TOM",
    dueAt: "2026-07-11",
    status: "COMPLETED",
    completionNote: "Đã đính kèm 2 tình huống thực tế trong EKS.",
    createdAt: "2026-07-09T04:00:00.000Z",
    idempotencyKey: "seed-ACT-0998",
  },
];

const initialNotifications: NotificationItem[] = [
  {
    id: "NTF-201",
    triggerId: "ACTION_SLA_24H",
    title: "Action của Minh Anh sắp tới hạn",
    message: "Còn 1 ngày để bổ sung evidence và phương án xử lý blocker API.",
    entity: { type: "ACTION_ITEM", id: "ACT-1001" },
    channel: "IN_APP",
    state: "DELIVERED",
    deliveredAt: "2026-07-14T02:15:00.000Z",
    cta: "Mở action",
  },
  {
    id: "NTF-199",
    triggerId: "REVIEW_OVERDUE",
    title: "Review OKR đã quá hạn 2 ngày",
    message: "KR3 của Trần Đức Huy chưa được cập nhật trong 9 ngày.",
    entity: { type: "REVIEW_ITEM", id: "RV-1039" },
    channel: "IN_APP",
    state: "DELIVERED",
    deliveredAt: "2026-07-14T01:00:00.000Z",
    cta: "Review ngay",
  },
  {
    id: "NTF-194",
    triggerId: "ACTION_COMPLETED",
    title: "Thuỳ Linh đã hoàn thành action",
    message: "Kết quả và evidence đã được ghi nhận trong follow-up.",
    entity: { type: "ACTION_ITEM", id: "ACT-0998" },
    channel: "IN_APP",
    state: "OPENED",
    deliveredAt: "2026-07-13T09:40:00.000Z",
    cta: "Xem kết quả",
  },
];

const initialRiskRun = runRiskEngine([
  { entityId: "KR-GP-02", memberId: "USR-MA", memberName: "Nguyễn Minh Anh", memberInitials: "MA", teamId: "TEAM-GROWTH", teamName: "Growth Platform", daysSinceUpdate: 4, reportSubmitted: true, reportOverdueDays: 0, progress: 38, expectedProgress: 62, impact: "PROJECT" },
  { entityId: "KR-CX-03", memberId: "USR-DH", memberName: "Trần Đức Huy", memberInitials: "DH", teamId: "TEAM-CX", teamName: "Customer Experience", daysSinceUpdate: 10, reportSubmitted: true, reportOverdueDays: 0, progress: 42, expectedProgress: 54, impact: "TEAM" },
  { entityId: "RPT-REV-W28", memberId: "USR-HN", memberName: "Lê Hoàng Nam", memberInitials: "HN", teamId: "TEAM-REVENUE", teamName: "Revenue Operations", daysSinceUpdate: 3, reportSubmitted: false, reportOverdueDays: 2, progress: 37, expectedProgress: 55, impact: "TEAM" },
  { entityId: "KR-PEO-04", memberId: "USR-TL", memberName: "Phạm Thuỳ Linh", memberInitials: "TL", teamId: "TEAM-PEOPLE", teamName: "People Experience", daysSinceUpdate: 8, reportSubmitted: true, reportOverdueDays: 0, progress: 71, expectedProgress: 76, impact: "PROJECT" },
]);

const reportEvidence: EvidenceRef[] = [
  { id: "EV-ACT-28", label: "Activation dashboard", metric: "Activation rate", value: "62% (+8% WoW)" },
  { id: "EV-EXP-14", label: "Experiment log #14", metric: "Experiment coverage", value: "4/5 experiments completed" },
  { id: "EV-API-07", label: "Partner API incident", metric: "Blocker duration", value: "2 ngày, đã có workaround" },
];

const managerContextRefs: ManagerContextRef[] = [
  { id: "RPT-W28", type: "REPORT", label: "Weekly report 28" },
  { id: "KR-GP-02", type: "KR", label: "Activation KR" },
  { id: "RSK-301", type: "RISK", label: "Low progress risk" },
  { id: "ACT-1001", type: "ACTION", label: "API follow-up" },
];

const checkpointEvidence: CheckpointEvidenceRef[] = [
  { id: "CP-OKR-01", type: "OKR", label: "Activation KR", period: "2026-01", summary: "31% → 62% trong H1", metric: "+31 điểm %" },
  { id: "CP-EKS-01", type: "EKS", label: "Strategic communication", period: "2026-02", summary: "3 tình huống thực hành", metric: "Level 3/5" },
  { id: "CP-RPT-04", type: "REPORT", label: "Weekly reports · Tháng 4", period: "2026-04", summary: "Blocker API và workaround", metric: "4 reports" },
  { id: "CP-FB-02", type: "FEEDBACK", label: "Feedback themes", period: "2026-05", summary: "Phối hợp tốt; cần cảnh báo sớm", metric: "Ẩn danh an toàn", anonymitySafe: true },
  { id: "CP-RPT-06", type: "REPORT", label: "Weekly reports · Tháng 6", period: "2026-06", summary: "4/5 thử nghiệm hoàn thành", metric: "62% activation" },
];

const roleCopy: Record<Role, { eyebrow: string; title: string; sub: string }> = {
  MANAGER: {
    eyebrow: "Thứ Hai · 13 tháng 7",
    title: "Chào buổi sáng, Tom",
    sub: "Team của bạn có 4 việc cần chú ý trong tuần này.",
  },
  BOD: {
    eyebrow: "Executive view · H2.2026",
    title: "Toàn cảnh tổ chức",
    sub: "5/7 team đang được quản lý đúng nhịp; 3 risk cần owner xác nhận.",
  },
  IKAMER: {
    eyebrow: "My work · Tuần 28",
    title: "Chào buổi sáng, Tom",
    sub: "Bạn có 2 cập nhật và 1 phản hồi cần hoàn thành.",
  },
};

export function IGoalApp() {
  const Icon = NavigationIcon;
  const [role, setRole] = useState<Role>("MANAGER");
  const [view, setView] = useState<"HOME" | "ACTIONS" | "RISKS" | "REPORT" | "CHECKPOINT">("HOME");
  const [items, setItems] = useState(initialItems);
  const [actions, setActions] = useState(initialActions);
  const [actionFilter, setActionFilter] = useState<"OPEN" | "OVERDUE" | "COMPLETED">("OPEN");
  const [actionLoadState, setActionLoadState] = useState<"READY" | "LOADING" | "ERROR">("READY");
  const [actionComposer, setActionComposer] = useState<ReviewItem | null>(null);
  const [actionTitle, setActionTitle] = useState("");
  const [actionDueAt, setActionDueAt] = useState("2026-07-16");
  const [actionError, setActionError] = useState<string | null>(null);
  const [completingAction, setCompletingAction] = useState<ActionItem | null>(null);
  const [completionNote, setCompletionNote] = useState("");
  const [notifications, setNotifications] = useState(initialNotifications);
  const [notificationPanel, setNotificationPanel] = useState(false);
  const [risks, setRisks] = useState(initialRiskRun.risks);
  const [riskFilter, setRiskFilter] = useState<"ACTIVE" | RiskSeverity | "RESOLVED">("ACTIVE");
  const [riskLoadState, setRiskLoadState] = useState<"READY" | "LOADING" | "ERROR">("READY");
  const [selectedRisk, setSelectedRisk] = useState<RiskItem | null>(null);
  const [riskResolution, setRiskResolution] = useState("");
  const [riskError, setRiskError] = useState<string | null>(null);
  const [riskEventsEmitted, setRiskEventsEmitted] = useState(false);
  const [riskAssignee, setRiskAssignee] = useState("USR-TOM|Tom Mac");
  const [reportContent, setReportContent] = useState("");
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState(reportEvidence.map((evidence) => evidence.id));
  const [aiDraft, setAiDraft] = useState<AIReportDraft | null>(null);
  const [aiInteraction, setAiInteraction] = useState<AIInteraction | null>(null);
  const [aiLoadState, setAiLoadState] = useState<"IDLE" | "GENERATING" | "ERROR">("IDLE");
  const [aiError, setAiError] = useState<string | null>(null);
  const [selectedDraftSections, setSelectedDraftSections] = useState<DraftSection["id"][]>(["ACHIEVEMENTS", "BLOCKERS", "NEXT_STEPS"]);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reviewComment, setReviewComment] = useState("Cảm ơn em đã cập nhật. Bổ sung evidence và đề xuất phương án xử lý trước thứ Tư nhé.");
  const [managerCopilotOpen, setManagerCopilotOpen] = useState(false);
  const [managerAiState, setManagerAiState] = useState<"IDLE" | "GENERATING" | "ERROR">("IDLE");
  const [managerBrief, setManagerBrief] = useState<ManagerAIBrief | null>(null);
  const [managerInteraction, setManagerInteraction] = useState<ManagerAIInteraction | null>(null);
  const [managerAiTab, setManagerAiTab] = useState<"SUMMARY" | "COMMENTS" | "ONE_ON_ONE">("SUMMARY");
  const [managerAiError, setManagerAiError] = useState<string | null>(null);
  const [oneOnOneSaved, setOneOnOneSaved] = useState(false);
  const [checkpointAiState, setCheckpointAiState] = useState<"IDLE" | "GENERATING" | "ERROR">("IDLE");
  const [checkpointDraft, setCheckpointDraft] = useState<CheckpointAIDraft | null>(null);
  const [checkpointInteraction, setCheckpointInteraction] = useState<CheckpointAIInteraction | null>(null);
  const [checkpointSectionContent, setCheckpointSectionContent] = useState<Partial<Record<CheckpointSectionId, string>>>({});
  const [checkpointActiveSection, setCheckpointActiveSection] = useState<CheckpointSectionId>("WHAT");
  const [selectedCheckpointEvidence, setSelectedCheckpointEvidence] = useState(checkpointEvidence.map((evidence) => evidence.id));
  const [checkpointSaved, setCheckpointSaved] = useState(false);
  const [checkpointError, setCheckpointError] = useState<string | null>(null);
  const [checkpointIssueReported, setCheckpointIssueReported] = useState(false);
  const [filter, setFilter] = useState<"ALL" | Priority>("ALL");
  const [selected, setSelected] = useState<ReviewItem | null>(null);
  const [events, setEvents] = useState<ProductEvent[]>([
    createEvent("manager_home_viewed", "MANAGER", "team", "TEAM-GROWTH", {
      itemCount: 4,
      riskCount: 2,
    }),
  ]);
  const [eventPanel, setEventPanel] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useOverlayDismissal({
    onDismiss: () => {
      setSelected(null);
      setActionComposer(null);
      setCompletingAction(null);
      setNotificationPanel(false);
      setSelectedRisk(null);
      setManagerCopilotOpen(false);
      setEventPanel(false);
    },
  });

  const visibleItems = useMemo(
    () => selectReviewItems(items, filter),
    [filter, items],
  );
  const scopedActions = useMemo(
    () => selectScopedActions(actions, role),
    [actions, role],
  );
  const visibleActions = useMemo(() => selectActions(scopedActions, actionFilter), [actionFilter, scopedActions]);
  const visibleRisks = useMemo(() => selectRisks(risks, riskFilter), [riskFilter, risks]);

  function track(event: ProductEvent) {
    setEvents((current) => [event, ...current].slice(0, 20));
  }

  function changeRole(nextRole: Role) {
    setRole(nextRole);
    setView("HOME");
    setSelected(null);
    setActionComposer(null);
    setCheckpointDraft(null);
    setCheckpointInteraction(null);
    setCheckpointSectionContent({});
    setCheckpointActiveSection(nextRole === "MANAGER" ? "PERFORMANCE" : "WHAT");
    setCheckpointSaved(false);
    setCheckpointError(null);
    track(createEvent("role_context_changed", nextRole, "organization", "IKAME", { from: role }));
    if (nextRole === "BOD") track(createEvent("executive_dashboard_viewed", nextRole, "organization", "IKAME", { teamCount: 7, highRiskCount: risks.filter((risk) => risk.severity === "HIGH" && risk.status !== "RESOLVED").length }));
  }

  function openItem(item: ReviewItem) {
    const decision = can(role, "review:read", "review_item", { isDirectTeam: true });
    track(createEvent("permission_decision", role, "review_item", item.id, {
      action: "review:read",
      allowed: decision.allowed,
      reason: decision.reason,
      policyVersion: decision.policyVersion,
    }));
    if (!decision.allowed) {
      setToast("Vai trò hiện tại chỉ được xem dữ liệu tổng hợp.");
      window.setTimeout(() => setToast(null), 2400);
      return;
    }
    setItems((current) =>
      current.map((entry) => entry.id === item.id && entry.status === "NEW" ? { ...entry, status: "OPENED" } : entry),
    );
    setSelected({ ...item, status: item.status === "NEW" ? "OPENED" : item.status });
    setReviewComment("Cảm ơn em đã cập nhật. Bổ sung evidence và đề xuất phương án xử lý trước thứ Tư nhé.");
    track(createEvent("review_item_opened", role, "review_item", item.id, {
      itemType: item.type,
      priority: item.priority,
    }));
  }

  function completeReview() {
    if (!selected) return;
    if (!reviewComment.trim()) {
      setToast("Cần nhập comment hoặc resolution hợp lệ để hoàn thành review.");
      return;
    }
    const decision = can(role, "review:complete", "review_item", { isDirectTeam: true });
    track(createEvent("permission_decision", role, "review_item", selected.id, {
      action: "review:complete",
      allowed: decision.allowed,
      reason: decision.reason,
      policyVersion: decision.policyVersion,
    }));
    if (!decision.allowed) return;
    setItems((current) => current.map((item) => item.id === selected.id ? { ...item, status: "REVIEWED" } : item));
    track(createEvent("review_completed", role, "review_item", selected.id, {
      resolutionType: "COMMENT",
      timeToReview: 94,
    }));
    setSelected(null);
    setToast("Đã lưu nhận xét và hoàn thành review.");
    window.setTimeout(() => setToast(null), 2400);
  }

  function openActionComposer(item: ReviewItem) {
    const decision = can(role, "action:create", "action_item", { isDirectTeam: true });
    track(createEvent("permission_decision", role, "action_item", item.id, {
      action: "action:create", allowed: decision.allowed, reason: decision.reason, policyVersion: decision.policyVersion,
    }));
    if (!decision.allowed) {
      setToast("Bạn không có quyền giao action cho item này.");
      return;
    }
    setSelected(null);
    setActionComposer(item);
    setActionTitle(item.type === "REPORT" ? "Bổ sung evidence và phương án xử lý blocker" : `Xử lý: ${item.title}`);
    setActionDueAt("2026-07-16");
    setActionError(null);
  }

  function submitAction() {
    if (!actionComposer) return;
    try {
      const result = createActionItem(actions, {
        source: { type: "REVIEW_ITEM", id: actionComposer.id },
        title: actionTitle,
        assigneeId: `USR-${actionComposer.initials}`,
        assigneeName: actionComposer.member,
        assigneeInitials: actionComposer.initials,
        dueAt: actionDueAt,
        idempotencyKey: `${actionComposer.id}-${actionComposer.initials}-${actionDueAt}`,
      });
      if (result.created) {
        setActions((current) => [result.action, ...current]);
        track(createEvent("action_created", role, "action_item", result.action.id, {
          sourceType: "REVIEW_ITEM", assigneeType: "DIRECT_REPORT", dueAt: actionDueAt,
        }));
      }
      setActionComposer(null);
      setToast(result.created ? "Đã giao action và thiết lập SLA." : "Action này đã tồn tại, không tạo trùng.");
    } catch (error) {
      if (error instanceof FollowUpError) {
        setActionError(error.code === "DUE_DATE_INVALID" ? "Hạn hoàn thành phải từ hôm nay trở đi." : "Hãy nhập đủ tiêu đề và người thực hiện.");
      }
    }
  }

  function finishAction() {
    if (!completingAction) return;
    const decision = can(role, "action:complete", "action_item", {
      isDirectTeam: role === "MANAGER",
      isSelf: completingAction.assigneeId === "USR-TOM",
    });
    track(createEvent("permission_decision", role, "action_item", completingAction.id, {
      action: "action:complete", allowed: decision.allowed, reason: decision.reason, policyVersion: decision.policyVersion,
    }));
    if (!decision.allowed) {
      setToast("Action nằm ngoài phạm vi bạn được phép cập nhật.");
      return;
    }
    try {
      const completed = completeActionItem(completingAction, completionNote);
      setActions((current) => current.map((action) => action.id === completed.id ? completed : action));
      track(createEvent("action_completed", role, "action_item", completed.id, {
        sourceType: completed.source.type, hadCompletionNote: true,
      }));
      setCompletingAction(null);
      setCompletionNote("");
      setToast("Đã hoàn thành action và lưu kết quả.");
    } catch (error) {
      if (error instanceof FollowUpError) setActionError("Cần ghi kết quả trước khi hoàn thành action.");
    }
  }

  function navigate(nextView: "HOME" | "ACTIONS" | "RISKS" | "REPORT" | "CHECKPOINT") {
    setView(nextView);
    if (nextView === "ACTIONS") {
      track(createEvent("action_queue_viewed", role, "team", "TEAM-GROWTH", {
        openCount: scopedActions.filter((action) => action.status === "OPEN").length,
        overdueCount: scopedActions.filter((action) => action.status === "OPEN" && action.dueAt < "2026-07-14").length,
      }));
    }
    if (nextView === "HOME" && role === "BOD") {
      track(createEvent("executive_dashboard_viewed", role, "organization", "IKAME", { teamCount: 7, highRiskCount: risks.filter((risk) => risk.severity === "HIGH" && risk.status !== "RESOLVED").length }));
    }
    if (nextView === "RISKS" && !riskEventsEmitted) {
      risks.forEach((risk) => track(createEvent("risk_detected", role, "risk", risk.id, {
        riskType: risk.type, severity: risk.severity, scope: risk.scope.type, ruleVersion: risk.ruleVersion,
      })));
      setRiskEventsEmitted(true);
    }
    if (nextView === "CHECKPOINT") {
      const decision = can(role, "checkpoint:read", "checkpoint", { isSelf: role === "IKAMER", isDirectTeam: role === "MANAGER" });
      track(createEvent("permission_decision", role, "checkpoint", "CP-H1-2026", {
        action: "checkpoint:read", allowed: decision.allowed, reason: decision.reason, policyVersion: decision.policyVersion,
      }));
      track(createEvent("checkpoint_opened", role, "checkpoint", "CP-H1-2026", {
        actorScope: decision.scope, allowed: decision.allowed, evidenceRefCount: selectedCheckpointEvidence.length,
      }));
    }
  }

  function refreshActions() {
    setActionLoadState("LOADING");
    window.setTimeout(() => setActionLoadState("READY"), 500);
  }

  function openNotifications() {
    setNotifications((current) => markNotificationsOpened(current));
    setNotificationPanel(true);
  }

  function followNotification(notification: NotificationItem) {
    const result = actionNotification(notifications, notification.id);
    setNotifications(result.items);
    if (result.converted) {
      track(createEvent("notification_actioned", role, "notification", notification.id, {
        triggerId: notification.triggerId, channel: notification.channel, timeToAction: 180,
      }));
    }
    setNotificationPanel(false);
    if (notification.entity.type === "ACTION_ITEM") {
      setView("ACTIONS");
      setActionFilter(notification.entity.id === "ACT-0998" ? "COMPLETED" : "OPEN");
    } else {
      setView("HOME");
      const item = items.find((entry) => entry.id === notification.entity.id);
      if (item) window.setTimeout(() => openItem(item), 0);
    }
  }

  function openRisk(risk: RiskItem) {
    const decision = can(role, "risk:read", "risk", { isDirectTeam: true });
    track(createEvent("permission_decision", role, "risk", risk.id, {
      action: "risk:read", allowed: decision.allowed, reason: decision.reason, policyVersion: decision.policyVersion,
    }));
    if (!decision.allowed) {
      setToast("Vai trò hiện tại không có quyền xem risk.");
      return;
    }
    setSelectedRisk(risk);
    setRiskAssignee(`${risk.assigneeId}|${risk.assigneeName}`);
    setRiskResolution("");
    setRiskError(null);
  }

  function acknowledgeSelectedRisk() {
    if (!selectedRisk) return;
    const decision = can(role, "risk:acknowledge", "risk", { isDirectTeam: true });
    track(createEvent("permission_decision", role, "risk", selectedRisk.id, {
      action: "risk:acknowledge", allowed: decision.allowed, reason: decision.reason, policyVersion: decision.policyVersion,
    }));
    if (!decision.allowed) {
      setRiskError("Chỉ Manager trong direct team được acknowledge risk này.");
      return;
    }
    try {
      const next = acknowledgeRisk(selectedRisk);
      setRisks((current) => current.map((risk) => risk.id === next.id ? next : risk));
      setSelectedRisk(next);
      track(createEvent("risk_acknowledged", role, "risk", next.id, {
        riskType: next.type, severity: next.severity, ruleVersion: next.ruleVersion,
      }));
      setToast("Đã acknowledge risk và nhận trách nhiệm follow-up.");
    } catch {
      setRiskError("Risk đã thay đổi trạng thái. Hãy tải lại.");
    }
  }

  function closeSelectedRisk(mode: "RESOLVE" | "IGNORE") {
    if (!selectedRisk) return;
    const decision = can(role, "risk:resolve", "risk", { isDirectTeam: true });
    if (!decision.allowed) {
      setRiskError("Bạn không có quyền đóng risk này.");
      return;
    }
    try {
      const next = mode === "RESOLVE" ? resolveRisk(selectedRisk, riskResolution) : ignoreRisk(selectedRisk, riskResolution);
      setRisks((current) => current.map((risk) => risk.id === next.id ? next : risk));
      track(createEvent("risk_resolved", role, "risk", next.id, {
        resolutionType: mode, ageHours: 8, ruleVersion: next.ruleVersion,
      }));
      setSelectedRisk(null);
      setToast(mode === "RESOLVE" ? "Đã resolve risk và lưu audit trail." : "Đã ignore risk với lý do.");
    } catch (error) {
      setRiskError(error instanceof Error && error.message === "RESOLUTION_REQUIRED" ? "Bắt buộc nhập kết quả hoặc lý do." : "Transition không hợp lệ.");
    }
  }

  function refreshRisks() {
    setRiskLoadState("LOADING");
    window.setTimeout(() => setRiskLoadState("READY"), 500);
  }

  function assignSelectedRisk() {
    if (!selectedRisk) return;
    const decision = can(role, "risk:assign", "risk");
    track(createEvent("permission_decision", role, "risk", selectedRisk.id, {
      action: "risk:assign", allowed: decision.allowed, reason: decision.reason, policyVersion: decision.policyVersion,
    }));
    if (!decision.allowed) {
      setRiskError("Chỉ BOD được assign owner ở aggregate scope.");
      return;
    }
    const [assigneeId, assigneeName] = riskAssignee.split("|");
    try {
      const next = assignRisk(selectedRisk, assigneeId, assigneeName);
      setRisks((current) => current.map((risk) => risk.id === next.id ? next : risk));
      setSelectedRisk(next);
      track(createEvent("risk_assigned", role, "risk", next.id, {
        severity: next.severity, scope: next.scope.type, assigneeRole: "MANAGER",
      }));
      setToast(`Đã giao risk cho ${assigneeName}.`);
    } catch {
      setRiskError("Không thể assign risk đã đóng.");
    }
  }

  function generateAiReport() {
    const decision = can(role, "ai:report-draft", "report", { isSelf: true });
    track(createEvent("permission_decision", role, "report", "RPT-W28", {
      action: "ai:report-draft", allowed: decision.allowed, reason: decision.reason, policyVersion: decision.policyVersion,
    }));
    if (!decision.allowed) {
      setAiError("AI Report Assistant chỉ khả dụng cho report của chính iKamer.");
      return;
    }
    setAiLoadState("GENERATING");
    setAiError(null);
    window.setTimeout(() => {
      try {
        const result = generateReportDraft({
          period: "W28",
          objective: "Tăng activation rate cho người dùng mới",
          progress: 62,
          previousProgress: 54,
          blocker: "Partner API chậm 2 ngày; team đã có workaround.",
          evidenceRefs: reportEvidence.filter((evidence) => selectedEvidenceIds.includes(evidence.id)),
        });
        setAiDraft(result.draft);
        setAiInteraction(result.interaction);
        setSelectedDraftSections(result.draft.sections.map((section) => section.id));
        setAiLoadState("IDLE");
        track(createEvent("ai_draft_generated", role, "ai_interaction", result.interaction.id, {
          useCase: result.interaction.useCase, promptVersion: result.interaction.promptVersion, contextRefCount: result.interaction.contextRefs.length, latencyMs: result.interaction.latencyMs,
        }));
      } catch {
        setAiLoadState("ERROR");
        setAiError("Cần chọn ít nhất một evidence. Bạn vẫn có thể viết report thủ công.");
      }
    }, 650);
  }

  function acceptAiSections(all: boolean) {
    if (!aiDraft || !aiInteraction) return;
    if (!validateDraftCitations(aiDraft)) {
      setAiError("Citation validation thất bại. Draft không được áp dụng.");
      return;
    }
    try {
      const ids = all ? aiDraft.sections.map((section) => section.id) : selectedDraftSections;
      const accepted = acceptDraftSections(aiDraft, ids);
      setReportContent(accepted.content);
      setAiInteraction(toInteractionOutcome(aiInteraction, "ACCEPTED", accepted.acceptedSectionIds));
      track(createEvent("ai_draft_accepted", role, "ai_interaction", aiInteraction.id, {
        acceptedSectionCount: accepted.acceptedSectionIds.length, evidenceCoverage: aiDraft.evidenceCoverage, editedBeforeSubmit: false,
      }));
      setToast("Đã đưa nội dung AI vào editor. Report chưa được gửi.");
    } catch {
      setAiError("Hãy chọn ít nhất một section để áp dụng.");
    }
  }

  function rejectAiReport() {
    if (aiInteraction) {
      setAiInteraction(toInteractionOutcome(aiInteraction, "REJECTED"));
      track(createEvent("ai_draft_rejected", role, "ai_interaction", aiInteraction.id, { useCase: "REPORT_DRAFT", hadFeedback: false }));
    }
    setAiDraft(null);
    setToast("Đã reject draft. Nội dung thủ công được giữ nguyên.");
  }

  function submitReport() {
    const decision = can(role, "report:update", "report", { isSelf: true });
    if (!decision.allowed || !reportContent.trim()) {
      setAiError(!decision.allowed ? "Bạn không có quyền gửi report này." : "Report cần có nội dung trước khi gửi.");
      return;
    }
    setReportSubmitted(true);
    track(createEvent("report_submitted", role, "report", "RPT-W28", {
      linkedEntityCount: selectedEvidenceIds.length, aiAssisted: aiInteraction?.outcome === "ACCEPTED",
    }));
    setToast("Report đã được gửi sau xác nhận của bạn.");
  }

  function openManagerCopilot(tab: "SUMMARY" | "COMMENTS" | "ONE_ON_ONE" = "SUMMARY") {
    const decision = can(role, "ai:manager-summary", "team", { isDirectTeam: true });
    track(createEvent("permission_decision", role, "team", "TEAM-GROWTH", {
      action: "ai:manager-summary", allowed: decision.allowed, reason: decision.reason, policyVersion: decision.policyVersion,
    }));
    if (!decision.allowed) {
      setToast("AI Manager Assistant chỉ khả dụng cho Manager trong direct team.");
      return;
    }
    setManagerCopilotOpen(true);
    setManagerAiTab(tab);
    setManagerAiError(null);
    if (managerBrief) return;
    setManagerAiState("GENERATING");
    window.setTimeout(() => {
      try {
        const result = generateManagerBrief("TEAM-GROWTH", managerContextRefs);
        setManagerBrief(result.brief);
        setManagerInteraction(result.interaction);
        setManagerAiState("IDLE");
        track(createEvent("ai_manager_brief_generated", role, "ai_interaction", result.interaction.id, {
          promptVersion: result.interaction.promptVersion, contextRefCount: result.interaction.contextRefs.length, latencyMs: result.interaction.latencyMs, evidenceValid: validateManagerBrief(result.brief),
        }));
      } catch {
        setManagerAiState("ERROR");
        setManagerAiError("Không đủ context đã qua permission filter. Workflow review thủ công vẫn hoạt động.");
      }
    }, 650);
  }

  function applySuggestedComment(reviewItemId: string, comment: string) {
    if (!managerInteraction) return;
    const item = items.find((entry) => entry.id === reviewItemId);
    if (!item) return;
    openItem(item);
    setReviewComment(comment);
    setManagerInteraction(acceptManagerSuggestion(managerInteraction, "COMMENT"));
    track(createEvent("ai_manager_suggestion_accepted", role, "ai_interaction", managerInteraction.id, {
      suggestionType: "COMMENT", reviewItemId, contextRefCount: managerInteraction.contextRefs.length,
    }));
    setManagerCopilotOpen(false);
    setToast("Đã đưa gợi ý vào editor. Review chưa được hoàn thành.");
  }

  function saveOneOnOnePrep() {
    if (!managerInteraction) return;
    setOneOnOneSaved(true);
    setManagerInteraction(acceptManagerSuggestion(managerInteraction, "ONE_ON_ONE"));
    track(createEvent("ai_manager_suggestion_accepted", role, "ai_interaction", managerInteraction.id, {
      suggestionType: "ONE_ON_ONE", reviewItemId: selected?.id ?? "NONE", contextRefCount: managerInteraction.contextRefs.length,
    }));
    setToast("Đã lưu 1:1 prep nháp. Chưa tạo lịch hoặc action.");
  }

  function rejectManagerAI() {
    if (managerInteraction) {
      setManagerInteraction(rejectManagerBrief(managerInteraction));
      track(createEvent("ai_manager_brief_rejected", role, "ai_interaction", managerInteraction.id, { useCase: "MANAGER_REVIEW", hadFeedback: false }));
    }
    setManagerCopilotOpen(false);
    setToast("Đã đóng AI brief. Review thủ công không bị thay đổi.");
  }

  function generateCheckpointAi() {
    if (role === "BOD") return;
    const decision = can(role, "ai:checkpoint-draft", "checkpoint", { isSelf: role === "IKAMER", isDirectTeam: role === "MANAGER" });
    track(createEvent("permission_decision", role, "checkpoint", "CP-H1-2026", {
      action: "ai:checkpoint-draft", allowed: decision.allowed, reason: decision.reason, policyVersion: decision.policyVersion,
    }));
    if (!decision.allowed) {
      setCheckpointAiState("ERROR");
      setCheckpointError("Checkpoint này nằm ngoài scope được phép dùng AI.");
      return;
    }
    setCheckpointAiState("GENERATING");
    setCheckpointError(null);
    window.setTimeout(() => {
      try {
        const result = generateCheckpointDraft(
          "CP-H1-2026",
          "H1.2026",
          role,
          checkpointEvidence.filter((evidence) => selectedCheckpointEvidence.includes(evidence.id)),
        );
        setCheckpointDraft(result.draft);
        setCheckpointInteraction(result.interaction);
        setCheckpointActiveSection(result.draft.sections[0].id);
        setCheckpointAiState("IDLE");
        track(createEvent("ai_checkpoint_draft_generated", role, "ai_interaction", result.interaction.id, {
          promptVersion: result.interaction.promptVersion, contextRefCount: result.interaction.contextRefs.length, latencyMs: result.interaction.latencyMs, evidenceCoverage: result.draft.evidenceCoverage,
        }));
      } catch (error) {
        setCheckpointAiState("ERROR");
        setCheckpointError(error instanceof Error && error.message === "UNSAFE_FEEDBACK_CONTEXT" ? "Feedback chưa qua bộ lọc anonymity-safe." : "Cần ít nhất 3 evidence hợp lệ. Editor thủ công vẫn hoạt động.");
      }
    }, 700);
  }

  function applyCheckpointSection() {
    if (!checkpointDraft || !checkpointInteraction) return;
    if (!validateCheckpointDraft(checkpointDraft)) {
      setCheckpointError("Citation validation thất bại. Nội dung AI không được áp dụng.");
      return;
    }
    try {
      const accepted = acceptCheckpointSections(checkpointDraft, checkpointInteraction, [checkpointActiveSection]);
      setCheckpointSectionContent((current) => ({ ...current, ...accepted.sections }));
      setCheckpointInteraction(accepted.interaction);
      setCheckpointSaved(false);
      track(createEvent("ai_checkpoint_section_accepted", role, "ai_interaction", checkpointInteraction.id, {
        sectionId: checkpointActiveSection, contextRefCount: checkpointInteraction.contextRefs.length, evidenceCoverage: checkpointDraft.evidenceCoverage,
      }));
      setToast("Đã đưa section AI vào editor. Checkpoint chưa được lưu.");
    } catch {
      setCheckpointError("Chưa có section hợp lệ để áp dụng.");
    }
  }

  function saveCheckpoint() {
    const decision = can(role, "checkpoint:update", "checkpoint", { isSelf: role === "IKAMER", isDirectTeam: role === "MANAGER" });
    track(createEvent("permission_decision", role, "checkpoint", "CP-H1-2026", {
      action: "checkpoint:update", allowed: decision.allowed, reason: decision.reason, policyVersion: decision.policyVersion,
    }));
    if (!decision.allowed) {
      setCheckpointError("Bạn không có quyền lưu checkpoint này.");
      return;
    }
    try {
      const saved = saveCheckpointDraft("CP-H1-2026", checkpointSectionContent);
      setCheckpointSaved(true);
      track(createEvent("checkpoint_draft_saved", role, "checkpoint", saved.checkpointId, {
        savedSectionCount: saved.savedSectionIds.length, aiAssisted: checkpointInteraction?.outcome === "ACCEPTED", rankingFinalized: false,
      }));
      setToast("Đã lưu checkpoint ở trạng thái Draft. Ranking chưa được xác nhận.");
    } catch {
      setCheckpointError("Hãy viết hoặc áp dụng ít nhất một section trước khi lưu.");
    }
  }

  function rejectCheckpointAi() {
    if (checkpointInteraction) {
      setCheckpointInteraction(rejectCheckpointDraft(checkpointInteraction));
      track(createEvent("ai_checkpoint_draft_rejected", role, "ai_interaction", checkpointInteraction.id, { useCase: "CHECKPOINT_DRAFT", hadFeedback: false }));
    }
    setCheckpointDraft(null);
    setCheckpointAiState("IDLE");
    setToast("Đã reject AI draft. Nội dung editor được giữ nguyên.");
  }

  function reportCheckpointIssue() {
    if (!checkpointInteraction || checkpointIssueReported) return;
    setCheckpointInteraction(rejectCheckpointDraft(checkpointInteraction, "POSSIBLE_HALLUCINATION"));
    setCheckpointIssueReported(true);
    track(createEvent("ai_checkpoint_issue_reported", role, "ai_interaction", checkpointInteraction.id, { reason: "POSSIBLE_HALLUCINATION", contextRefCount: checkpointInteraction.contextRefs.length }));
    setToast("Đã ghi nhận issue mà không lưu nội dung nhạy cảm.");
  }

  const copy = roleCopy[role];
  const reviewed = items.filter((item) => item.status === "REVIEWED").length;
  const checkpointSectionIds: CheckpointSectionId[] = role === "MANAGER" ? ["PERFORMANCE", "MISMATCH", "COACHING"] : ["WHAT", "HOW", "LEVEL_UP"];
  const checkpointSectionLabels: Record<CheckpointSectionId, string> = { WHAT: "WHAT", HOW: "HOW", LEVEL_UP: "LEVEL UP", PERFORMANCE: "Performance", MISMATCH: "Mismatch", COACHING: "Coaching" };
  const checkpointEvidenceSummary = aggregateCheckpointEvidence(checkpointEvidence.filter((evidence) => selectedCheckpointEvidence.includes(evidence.id)));

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">i</span><span>iGoal</span></div>
        <nav aria-label="Điều hướng chính">
          <p className="nav-label">WORKSPACE</p>
          <button className={`nav-item ${view === "HOME" ? "active" : ""}`} aria-current={view === "HOME" ? "page" : undefined} onClick={() => navigate("HOME")}><Icon>⌂</Icon>Tổng quan</button>
          <button className="nav-item" onClick={() => navigate("HOME")}><Icon>✓</Icon>Review Queue<span className="nav-count">4</span></button>
          <a className="nav-item" href="#team"><Icon>◉</Icon>Team của tôi</a>
          <button className={`nav-item ${view === "ACTIONS" ? "active" : ""}`} aria-current={view === "ACTIONS" ? "page" : undefined} onClick={() => navigate("ACTIONS")}><Icon>↗</Icon>Action items<span className="nav-count subtle">{actions.filter((action) => action.status === "OPEN").length}</span></button>
          <button className={`nav-item ${view === "RISKS" ? "active" : ""}`} aria-current={view === "RISKS" ? "page" : undefined} onClick={() => navigate("RISKS")}><Icon>!</Icon>Risk Center<span className="nav-count risk-count">{risks.filter((risk) => risk.status !== "RESOLVED" && risk.status !== "IGNORED").length}</span></button>
          <p className="nav-label space">PERFORMANCE</p>
          <a className="nav-item" href="#okr"><Icon>◎</Icon>OKR & EKS</a>
          <button className={`nav-item ${view === "REPORT" ? "active" : ""}`} onClick={() => navigate("REPORT")}><Icon>▤</Icon>Báo cáo{role === "IKAMER" && <span className="ai-nav-badge">AI</span>}</button>
          <a className="nav-item" href="#feedback"><Icon>◇</Icon>Feedback</a>
          <button className={`nav-item ${view === "CHECKPOINT" ? "active" : ""}`} onClick={() => navigate("CHECKPOINT")}><Icon>◫</Icon>Checkpoint<span className="ai-nav-badge">AI</span></button>
        </nav>
        <div className="sidebar-foot">
          <button onClick={() => setEventPanel(true)} className="debug-link"><span className="live-dot" />Analytics debug</button>
          <div className="profile-card">
            <div className="avatar avatar-dark">TM</div>
            <div><strong>Tom Mac</strong><span>{role === "MANAGER" ? "Manager" : role === "BOD" ? "BOD" : "iKamer"}</span></div>
            <span className="more">•••</span>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark">i</span>iGoal</div>
          <label className="search"><span aria-hidden="true">⌕</span><input aria-label="Tìm kiếm" placeholder="Tìm mục tiêu, thành viên, báo cáo..." /><kbd>⌘ K</kbd></label>
          <div className="top-actions">
            <button className="icon-button" aria-label="Trợ giúp">?</button>
            <button className="icon-button notification" aria-label={`Thông báo, ${notifications.filter((item) => item.state === "DELIVERED").length} chưa đọc`} onClick={openNotifications}>●{notifications.some((item) => item.state === "DELIVERED") && <span />}</button>
            <label className="role-select-label">Vai trò
              <select value={role} onChange={(event) => changeRole(event.target.value as Role)}>
                <option value="MANAGER">Manager</option>
                <option value="BOD">BOD</option>
                <option value="IKAMER">iKamer</option>
              </select>
            </label>
          </div>
        </header>
        <nav className="mobile-tabs" aria-label="Điều hướng mobile">
          <button className={view === "HOME" ? "active" : ""} onClick={() => navigate("HOME")}><span>⌂</span>Tổng quan</button>
          <button className={view === "ACTIONS" ? "active" : ""} onClick={() => navigate("ACTIONS")}><span>↗</span>Action</button>
          {role === "IKAMER" ? <button className={view === "REPORT" ? "active" : ""} onClick={() => navigate("REPORT")}><span>▤</span>Báo cáo</button> : <button className={view === "RISKS" ? "active" : ""} onClick={() => navigate("RISKS")}><span>!</span>Risk</button>}
          <button className={view === "CHECKPOINT" ? "active" : ""} onClick={() => navigate("CHECKPOINT")}><span>◫</span>Checkpoint</button>
        </nav>

        <div className="content" id="overview">
          {view === "HOME" ? (role === "BOD" ? (
            <section className="executive-dashboard" aria-labelledby="executive-title">
              <div className="hero-row executive-hero"><div><p className="eyebrow">S7 · EXECUTIVE INTELLIGENCE</p><h1 id="executive-title">Toàn cảnh tổ chức</h1><p>Exception, xu hướng và owner cần hành động trong tuần 28.</p></div><button className="week-button"><span>‹</span> Tuần 28 · 06–12/07 <span>⌄</span></button></div>
              <section className="executive-metrics" aria-label="Executive summary">
                <article className="north-star-card"><div><span className="metric-icon">✓</span><span className="trend up">↑ 8% WoW</span></div><strong>71<small>%</small></strong><h2>Weekly Managed Team Rate</h2><p>5/7 team đạt đủ data SLA, manager review và risk acknowledgement.</p><div className="progress"><i style={{ width: "71%" }}/></div></article>
                <article><span>Team on track</span><strong>5<small>/7</small></strong><p>2 team cần ưu tiên</p></article>
                <article className="exec-risk"><span>High risk</span><strong>{risks.filter((risk) => risk.severity === "HIGH" && risk.status !== "RESOLVED").length}</strong><p>{risks.filter((risk) => risk.severity === "HIGH" && risk.status === "NEW").length} chưa acknowledge</p></article>
                <article><span>Manager review</span><strong>86<small>%</small></strong><p>6/7 manager đúng SLA</p></article>
              </section>
              <div className="executive-grid">
                <section className="panel org-health-panel">
                  <div className="panel-head"><div><h2>Organizational performance</h2><p>Health score theo BU · 4 tuần gần nhất</p></div><span className="healthy">● Live</span></div>
                  <div className="org-trend" aria-label="Biểu đồ xu hướng hiệu suất"><div className="trend-axis"><span>100</span><span>75</span><span>50</span></div><div className="trend-bars">{[68,72,70,76,74,81,79,84].map((value,index) => <i key={index} style={{ height: `${value}%` }}><span>{index === 7 ? `${value}%` : ""}</span></i>)}</div></div>
                  <div className="bu-list">{[
                    ["Product & Growth", 84, "+6%"], ["Customer Experience", 78, "+2%"], ["Revenue Operations", 66, "−7%"], ["People & Culture", 91, "+4%"],
                  ].map(([name,score,delta]) => <div key={name}><span>{name}</span><div className="bu-bar"><i style={{ width: `${score}%` }}/></div><strong>{score}%</strong><em className={String(delta).startsWith("−") ? "negative" : ""}>{delta}</em></div>)}</div>
                </section>
                <section className="panel executive-risks-panel">
                  <div className="panel-head"><div><h2>Top risks</h2><p>Ưu tiên theo severity và scope</p></div><button className="text-button" onClick={() => navigate("RISKS")}>Mở Risk Center →</button></div>
                  <div className="executive-risk-list">{risks.filter((risk) => risk.status !== "RESOLVED" && risk.status !== "IGNORED").slice(0,4).map((risk) => <button key={risk.id} onClick={() => openRisk(risk)}><span className={`severity-dot ${risk.severity.toLowerCase()}`}/><span><strong>{risk.scope.name}</strong><small>{risk.type.replace("_", " ")} · {risk.evidence[0]}</small></span><span className="risk-owner-chip">{risk.assigneeName}</span><i>→</i></button>)}</div>
                </section>
              </div>
              <section className="panel manager-table-panel">
                <div className="panel-head"><div><h2>Manager effectiveness</h2><p>Review SLA, action follow-up và risk ownership</p></div><span className="table-note">7 managers</span></div>
                <div className="manager-table" role="table" aria-label="Manager effectiveness"><div className="manager-row header" role="row"><span>Manager / Team</span><span>Review SLA</span><span>Open risk</span><span>Action overdue</span><span>Status</span></div>{[
                  ["Tom Mac", "Growth Platform", "93%", "1", "0", "On track"], ["Lan Phạm", "Customer Experience", "81%", "1", "1", "Attention"], ["Hoàng Vũ", "Revenue Operations", "72%", "2", "1", "At risk"], ["Mai Anh", "People Experience", "96%", "1", "0", "On track"],
                ].map(([manager,team,reviewRate,openRisk,overdue,status]) => <div className="manager-row" role="row" key={manager}><span><strong>{manager}</strong><small>{team}</small></span><span>{reviewRate}</span><span>{openRisk}</span><span>{overdue}</span><span className={`manager-status ${String(status).toLowerCase().replace(" ", "-")}`}>{status}</span></div>)}</div>
              </section>
            </section>
          ) : <>
          <div className="hero-row">
            <div><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.sub}</p></div>
            <button className="week-button"><span>‹</span> Tuần 28 · 06–12/07 <span>⌄</span></button>
          </div>

          <section className="metrics" aria-label="Chỉ số team">
            <article className="metric-card primary-card">
              <div className="metric-top"><span className="metric-icon">✓</span><span className="trend up">↑ 12%</span></div>
              <strong>{reviewed + 9}<small>/15</small></strong><p>Review hoàn thành</p>
              <div className="progress"><i style={{ width: `${60 + reviewed * 7}%` }} /></div><span className="metric-note">Mục tiêu tuần: 100%</span>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span className="metric-icon amber-icon">!</span><span className="trend down">2 mới</span></div>
              <strong>4</strong><p>Cần chú ý</p><div className="metric-list"><span><i className="dot critical" />1 quan trọng</span><span><i className="dot warn" />3 cần review</span></div>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span className="metric-icon blue-icon">↗</span><span className="trend up">↑ 4%</span></div>
              <strong>82%</strong><p>Team on track</p><div className="spark-bars" aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span className="metric-icon lilac-icon">◎</span><span className="trend neutral">−1 tuần</span></div>
              <strong>1.8<small> ngày</small></strong><p>Thời gian phản hồi</p><span className="metric-note">Nhanh hơn mục tiêu 2 ngày</span>
            </article>
          </section>

          <div className="main-grid">
            <section className="panel attention-panel" id="review">
              <div className="panel-head">
                <div><h2>Cần bạn chú ý</h2><p>Được xếp hạng theo mức độ và thời hạn</p></div>
                <button onClick={() => setFilter("ALL")} className="text-button">Xem tất cả <span>→</span></button>
              </div>
              <div className="filter-row" role="group" aria-label="Lọc mức ưu tiên">
                {(["ALL", "P0", "P1", "P2"] as const).map((value) => (
                  <button key={value} className={filter === value ? "selected" : ""} onClick={() => setFilter(value)}>
                    {value === "ALL" ? "Tất cả 4" : value}
                  </button>
                ))}
              </div>
              <div className="review-list">
                {visibleItems.map((item) => (
                  <button key={item.id} className={`review-item ${item.status === "REVIEWED" ? "is-reviewed" : ""}`} onClick={() => openItem(item)}>
                    <span className={`priority-line ${item.priority.toLowerCase()}`} />
                    <span className={`avatar ${item.color}`}>{item.initials}</span>
                    <span className="review-copy"><strong>{item.member}<em className={`priority-pill ${item.priority.toLowerCase()}`}>{item.priority}</em></strong><b>{item.status === "REVIEWED" ? "Đã review" : item.title}</b><small>{item.detail}</small><span className="reason">↳ {item.reason}</span></span>
                    <span className={`due ${item.due.includes("Quá") ? "overdue" : ""}`}>{item.due}<i>{item.status === "REVIEWED" ? "✓" : "→"}</i></span>
                  </button>
                ))}
              </div>
            </section>

            <aside className="right-column">
              <section className="panel health-panel" id="team">
                <div className="panel-head compact"><div><h2>Team health</h2><p>Growth Platform · 15 thành viên</p></div><button className="more-button">•••</button></div>
                <div className="health-score"><div className="score-ring"><span>82<small>%</small></span></div><div><strong>Đang hoạt động tốt</strong><p>Tăng 4% so với tuần trước</p><span className="healthy">● Healthy</span></div></div>
                <div className="health-stats"><div><span>Cập nhật đúng hạn</span><strong>13/15</strong></div><div><span>OKR on track</span><strong>82%</strong></div><div><span>Risk chưa xử lý</span><strong className="orange">{risks.filter((risk) => risk.status !== "RESOLVED" && risk.status !== "IGNORED").length}</strong></div></div>
                <button className="full-button">Xem chi tiết team <span>→</span></button>
              </section>
              <section className="panel summary-panel">
                <div className="ai-heading"><span className="ai-mark">✦</span><div><h2>AI weekly summary</h2><p>Cập nhật 10 phút trước</p></div><span className="beta">BETA</span></div>
                <p className="summary-lead"><strong>Team giữ nhịp tốt</strong>, nhưng có 2 điểm cần bạn ưu tiên trong tuần này:</p>
                <ul><li><span>1</span><p><strong>Growth Platform</strong> có blocker API đối tác ảnh hưởng KR2. Minh Anh cần hỗ trợ trước thứ Tư.</p></li><li><span>2</span><p><strong>Revenue Ops</strong> đang thấp hơn forecast 18%, chủ yếu do 2 dependency chậm.</p></li></ul>
                <button className="full-button ai-button" onClick={() => openManagerCopilot("SUMMARY")}>Xem summary có evidence <span>→</span></button>
                <small className="ai-note">✦ AI có thể sai. Hãy kiểm tra dữ liệu nguồn.</small>
              </section>
            </aside>
          </div>
          </>) : view === "ACTIONS" ? (
            <section className="action-center" id="actions" aria-labelledby="actions-title">
              <div className="hero-row action-hero">
                <div><p className="eyebrow">S4 · FOLLOW-UP</p><h1 id="actions-title">Action items</h1><p>Theo dõi owner, SLA và kết quả từ từng review.</p></div>
                <button className="week-button" onClick={refreshActions} disabled={actionLoadState === "LOADING"}><span>↻</span>{actionLoadState === "LOADING" ? "Đang tải..." : "Làm mới"}</button>
              </div>

              {role === "BOD" ? (
                <div className="state-card forbidden-state" role="status">
                  <span className="state-icon">⌁</span><h2>Không có quyền xem action cá nhân</h2>
                  <p>BOD chỉ xem dữ liệu tổng hợp. Hãy mở Executive Dashboard để xem tình trạng follow-up theo team.</p>
                  <button className="secondary-button" onClick={() => navigate("HOME")}>Về tổng quan</button>
                </div>
              ) : actionLoadState === "LOADING" ? (
                <div className="action-loading" aria-label="Đang tải action"><i/><i/><i/></div>
              ) : actionLoadState === "ERROR" ? (
                <div className="state-card error-state" role="alert"><span className="state-icon">!</span><h2>Chưa tải được action</h2><p>Dữ liệu của bạn vẫn an toàn. Hãy thử lại.</p><button className="secondary-button" onClick={refreshActions}>Thử lại</button></div>
              ) : (
                <>
                  <section className="action-stats" aria-label="Tổng quan action">
                    <article><span>Đang mở</span><strong>{scopedActions.filter((action) => action.status === "OPEN").length}</strong><small>Cần follow-up</small></article>
                    <article className="is-overdue"><span>Quá hạn</span><strong>{scopedActions.filter((action) => action.status === "OPEN" && action.dueAt < "2026-07-14").length}</strong><small>Cần xử lý hôm nay</small></article>
                    <article><span>Đã hoàn thành</span><strong>{scopedActions.filter((action) => action.status === "COMPLETED").length}</strong><small>Có kết quả lưu lại</small></article>
                  </section>
                  <section className="panel actions-panel">
                    <div className="panel-head action-panel-head">
                      <div><h2>Follow-up queue</h2><p>Ưu tiên action quá hạn và gần đến SLA</p></div>
                      <div className="filter-row action-filters" role="group" aria-label="Lọc action">
                        {(["OPEN", "OVERDUE", "COMPLETED"] as const).map((value) => <button key={value} className={actionFilter === value ? "selected" : ""} onClick={() => setActionFilter(value)}>{value === "OPEN" ? "Đang mở" : value === "OVERDUE" ? "Quá hạn" : "Đã xong"}</button>)}
                      </div>
                    </div>
                    {visibleActions.length === 0 ? (
                      <div className="empty-state"><span>✓</span><h3>Không có action trong nhóm này</h3><p>{role === "IKAMER" ? "Action được giao cho bạn sẽ xuất hiện tại đây." : "Team đang theo đúng nhịp follow-up."}</p></div>
                    ) : (
                      <div className="action-list">
                        {visibleActions.map((action) => {
                          const overdue = action.status === "OPEN" && action.dueAt < "2026-07-14";
                          return <article className="action-row" key={action.id}>
                            <span className={`avatar ${action.assigneeInitials === "DH" ? "blue" : action.assigneeInitials === "TL" ? "rose" : "mint"}`}>{action.assigneeInitials}</span>
                            <div className="action-copy"><div><strong>{action.title}</strong><span className={`status-pill ${action.status.toLowerCase()}`}>{action.status === "OPEN" ? "Đang mở" : "Đã hoàn thành"}</span></div><p>{action.assigneeName} · Từ review <b>{action.source.id}</b></p>{action.completionNote && <small>✓ {action.completionNote}</small>}</div>
                            <div className={`action-sla ${overdue ? "overdue" : ""}`}><span>{overdue ? "Quá SLA" : action.status === "COMPLETED" ? "Đã đóng" : "SLA"}</span><strong>{new Date(`${action.dueAt}T00:00:00`).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}</strong></div>
                            {action.status === "OPEN" && <button className="complete-action" onClick={() => { setCompletingAction(action); setCompletionNote(""); setActionError(null); }}>Hoàn thành</button>}
                          </article>;
                        })}
                      </div>
                    )}
                  </section>
                </>
              )}
            </section>
          ) : view === "RISKS" ? (
            <section className="risk-center" id="risks" aria-labelledby="risks-title">
              <div className="hero-row action-hero">
                <div><p className="eyebrow">S6 · RISK ENGINE</p><h1 id="risks-title">Risk Center</h1><p>Exception được phát hiện bằng rule deterministic và luôn dẫn tới evidence.</p></div>
                <button className="week-button" onClick={refreshRisks} disabled={riskLoadState === "LOADING"}><span>↻</span>{riskLoadState === "LOADING" ? "Đang chạy rule..." : "Chạy lại engine"}</button>
              </div>

              {role === "IKAMER" ? (
                <div className="state-card forbidden-state" role="status"><span className="state-icon">⌁</span><h2>Không có quyền truy cập Risk Center</h2><p>Risk Center dành cho Manager xử lý direct team và BOD xem dữ liệu tổng hợp.</p><button className="secondary-button" onClick={() => navigate("HOME")}>Về tổng quan</button></div>
              ) : riskLoadState === "LOADING" ? (
                <div className="action-loading" aria-label="Đang chạy risk engine"><i/><i/><i/></div>
              ) : riskLoadState === "ERROR" ? (
                <div className="state-card error-state" role="alert"><span className="state-icon">!</span><h2>Risk engine chưa phản hồi</h2><p>Không có trạng thái risk nào bị thay đổi. Hãy thử chạy lại.</p><button className="secondary-button" onClick={refreshRisks}>Thử lại</button></div>
              ) : (
                <>
                  <section className="engine-summary" aria-label="Kết quả risk engine">
                    <div><span className="engine-mark">⌁</span><p><strong>{initialRiskRun.ruleVersion}</strong><small>{initialRiskRun.evaluatedCount} entity được kiểm tra · 3 rule đang bật</small></p></div>
                    <div className="rule-chips"><span>STALE &gt; 7 ngày</span><span>NO_REPORT quá SLA</span><span>LOW_PROGRESS gap ≥ 15%</span></div>
                  </section>
                  <section className="risk-stats" aria-label="Tổng quan risk">
                    <article><span>Risk đang mở</span><strong>{risks.filter((risk) => risk.status !== "RESOLVED" && risk.status !== "IGNORED").length}</strong></article>
                    <article className="high"><span>High severity</span><strong>{risks.filter((risk) => risk.severity === "HIGH" && risk.status !== "RESOLVED").length}</strong></article>
                    <article><span>Đã acknowledge</span><strong>{risks.filter((risk) => risk.status === "ACKNOWLEDGED" || risk.status === "IN_PROGRESS").length}</strong></article>
                  </section>
                  <section className="panel risk-panel">
                    <div className="panel-head risk-panel-head"><div><h2>Detected risks</h2><p>Xếp hạng theo severity và SLA</p></div><div className="filter-row risk-filters" role="group" aria-label="Lọc risk">{(["ACTIVE", "HIGH", "MEDIUM", "RESOLVED"] as const).map((value) => <button key={value} className={riskFilter === value ? "selected" : ""} onClick={() => setRiskFilter(value)}>{value === "ACTIVE" ? "Đang mở" : value === "RESOLVED" ? "Đã đóng" : value}</button>)}</div></div>
                    {visibleRisks.length === 0 ? <div className="empty-state"><span>✓</span><h3>Không có risk trong nhóm này</h3><p>Engine chưa phát hiện exception vượt threshold.</p></div> : <div className="risk-list">{visibleRisks.map((risk) => <button className="risk-row" key={risk.id} onClick={() => openRisk(risk)}>
                      <span className={`risk-type-icon ${risk.type.toLowerCase()}`}>{risk.type === "STALE" ? "◷" : risk.type === "NO_REPORT" ? "▤" : "↘"}</span>
                      <span className="risk-copy"><span><strong>{risk.type === "STALE" ? "Dữ liệu chưa cập nhật" : risk.type === "NO_REPORT" ? "Thiếu weekly report" : "Progress thấp hơn kế hoạch"}</strong><em className={`severity-pill ${risk.severity.toLowerCase()}`}>{risk.severity}</em></span><b>{role === "BOD" ? risk.scope.name : risk.ownerName}</b><small>{risk.evidence[0]} · {risk.ruleVersion}</small></span>
                      <span className={`risk-status ${risk.status.toLowerCase()}`}>{risk.status === "NEW" ? "Mới" : risk.status === "ACKNOWLEDGED" ? "Đã nhận" : risk.status === "RESOLVED" ? "Đã xử lý" : risk.status === "IGNORED" ? "Đã bỏ qua" : "Đang xử lý"}</span>
                      <span className="risk-arrow">→</span>
                    </button>)}</div>}
                  </section>
                </>
              )}
            </section>
          ) : view === "CHECKPOINT" ? (
            <section className="checkpoint-workspace" id="checkpoint" aria-labelledby="checkpoint-title">
              <div className="hero-row checkpoint-hero"><div><p className="eyebrow">S10 · AI CHECKPOINT ASSISTANT</p><h1 id="checkpoint-title">Checkpoint H1.2026</h1><p>{role === "MANAGER" ? "Review Nguyễn Minh Anh với self-assessment, evidence và Manager notes đặt cạnh nhau." : "Tổng hợp 6 tháng và hoàn thiện self-assessment theo từng section."}</p></div><div className="checkpoint-hero-status"><span className={`report-status ${checkpointSaved ? "submitted" : "draft"}`}>{checkpointSaved ? "Đã lưu Draft" : "Draft"}</span><small>Ranking: Chưa xác nhận</small></div></div>
              {role === "BOD" ? (
                <div className="state-card forbidden-state" role="status"><span className="state-icon">◫</span><h2>Không có quyền xem checkpoint cá nhân</h2><p>BOD chỉ được xem insight tổng hợp. Self-assessment và Manager notes cần grant rõ ràng theo policy.</p><button className="secondary-button" onClick={() => navigate("HOME")}>Về Executive Dashboard</button></div>
              ) : (
                <>
                  <section className="checkpoint-progress" aria-label="Tiến độ checkpoint"><div><span className="done">1</span><p><strong>Thông tin</strong><small>Đã hoàn thành</small></p></div><i/><div><span className="active">2</span><p><strong>{role === "MANAGER" ? "Manager review" : "Self-assessment"}</strong><small>Đang thực hiện</small></p></div><i/><div><span>3</span><p><strong>Evidence check</strong><small>Chưa xác nhận</small></p></div><i/><div><span>4</span><p><strong>Hoàn tất</strong><small>Human approval</small></p></div></section>
                  <div className="checkpoint-layout">
                    <aside className="panel checkpoint-evidence-panel">
                      <div className="panel-head"><div><h2>Evidence · 6 tháng</h2><p>Context đã lọc theo scope</p></div><strong>{checkpointEvidenceSummary.total}/5</strong></div>
                      <div className="checkpoint-coverage"><span><strong>{checkpointEvidenceSummary.coveredMonths}/6</strong> tháng có dữ liệu</span><div><i style={{ width: `${Math.round((checkpointEvidenceSummary.coveredMonths / 6) * 100)}%` }}/></div><small>Feedback chỉ dùng theme anonymity-safe.</small></div>
                      <div className="checkpoint-evidence-list">{checkpointEvidence.map((evidence) => <label key={evidence.id}><input type="checkbox" checked={selectedCheckpointEvidence.includes(evidence.id)} onChange={() => { setSelectedCheckpointEvidence((current) => current.includes(evidence.id) ? current.filter((id) => id !== evidence.id) : [...current, evidence.id]); setCheckpointDraft(null); setCheckpointSaved(false); }}/><span className={`checkpoint-evidence-icon ${evidence.type.toLowerCase()}`}>{evidence.type === "OKR" ? "◎" : evidence.type === "EKS" ? "↗" : evidence.type === "REPORT" ? "▤" : "◇"}</span><span><strong>{evidence.label}</strong><small>{evidence.period} · {evidence.metric}</small><em>{evidence.summary}</em></span><code>{evidence.id}</code></label>)}</div>
                    </aside>
                    <section className="panel checkpoint-editor-panel">
                      <div className="checkpoint-person"><span className="avatar mint">MA</span><div><strong>{role === "MANAGER" ? "Nguyễn Minh Anh" : "Self-assessment của bạn"}</strong><small>Growth Platform · H1.2026</small></div><span>Autosave demo</span></div>
                      <div className="checkpoint-section-tabs" role="tablist" aria-label="Các phần checkpoint">{checkpointSectionIds.map((sectionId, index) => <button key={sectionId} role="tab" aria-selected={checkpointActiveSection === sectionId} className={checkpointActiveSection === sectionId ? "active" : ""} onClick={() => setCheckpointActiveSection(sectionId)}><span>{index + 1}</span>{checkpointSectionLabels[sectionId]}{checkpointSectionContent[sectionId]?.trim() && <i>✓</i>}</button>)}</div>
                      {role === "MANAGER" && <div className="checkpoint-side-by-side"><div><span>Self-assessment</span><p>Em đánh giá đã đạt kết quả chính và chủ động xử lý blocker xuyên team.</p></div><div><span>Evidence signal</span><p>Results aligned · cần xác minh mức chủ động với dependency API.</p></div></div>}
                      <label className="checkpoint-editor-label"><span>{checkpointSectionLabels[checkpointActiveSection]}</span><small>{role === "MANAGER" ? "Viết review dựa trên self-assessment và evidence; ranking được xử lý riêng." : "Mô tả rõ kết quả, hành vi và bài học; dẫn evidence khi có thể."}</small><textarea value={checkpointSectionContent[checkpointActiveSection] ?? ""} onChange={(event) => { setCheckpointSectionContent((current) => ({ ...current, [checkpointActiveSection]: event.target.value })); setCheckpointSaved(false); setCheckpointError(null); }} placeholder={role === "MANAGER" ? "Nhập Manager note..." : "Nhập nội dung self-assessment..."}/></label>
                      {checkpointError && <p className="form-error checkpoint-form-error" role="alert">{checkpointError}</p>}
                      <div className="checkpoint-save-row"><p>AI không thể tự lưu, submit hoặc finalize ranking.</p><button className="primary-button" onClick={saveCheckpoint}>{checkpointSaved ? "Đã lưu Draft" : "Lưu checkpoint Draft"}</button></div>
                    </section>
                    <aside className="panel checkpoint-ai-panel">
                      <div className="ai-report-head"><span className="ai-mark">✦</span><div><h2>AI Checkpoint Copilot</h2><p>{checkpointDraft ? `${checkpointDraft.promptVersion} · ${checkpointDraft.evidenceCoverage}% coverage` : "Draft từng section có citation"}</p></div><span className="beta">BETA</span></div>
                      {checkpointAiState === "GENERATING" ? <div className="ai-generating"><span className="ai-orbit">✦</span><strong>Đang tổng hợp 6 tháng...</strong><p>Chỉ gửi structured context refs.</p><i/><i/><i/></div> : checkpointAiState === "ERROR" ? <div className="ai-fallback"><span>!</span><h3>Không tạo được section</h3><p>{checkpointError} Bạn vẫn có thể tiếp tục viết thủ công.</p><button className="secondary-button" onClick={() => { setCheckpointAiState("IDLE"); setCheckpointError(null); }}>Quay lại editor</button></div> : !checkpointDraft ? selectedCheckpointEvidence.length === 0 ? <div className="ai-empty"><span>∅</span><h3>Chưa chọn evidence</h3><p>Chọn ít nhất 3 evidence ở panel bên trái hoặc tiếp tục viết thủ công.</p></div> : <div className="ai-empty"><span>✦</span><h3>Tạo draft theo section</h3><p>AI tổng hợp 6 tháng cho {role === "MANAGER" ? "Manager review" : "WHAT, HOW và LEVEL UP"}. Không có ranking nào được đề xuất.</p><button className="primary-button" onClick={generateCheckpointAi}>Tạo checkpoint draft</button><small>AI có thể sai · Human review bắt buộc</small></div> : <>
                        <div className="ai-quality"><span><i className={validateCheckpointDraft(checkpointDraft) ? "pass" : "fail"}/>Citation valid</span><span><i className="pass"/>Scope filtered</span><span><i className="pass"/>No auto-ranking</span></div>
                        <div className="checkpoint-ai-section-nav">{checkpointDraft.sections.map((section) => <button key={section.id} className={checkpointActiveSection === section.id ? "active" : ""} onClick={() => setCheckpointActiveSection(section.id)}>{checkpointSectionLabels[section.id]}</button>)}</div>
                        {checkpointDraft.sections.filter((section) => section.id === checkpointActiveSection).map((section) => <article className="checkpoint-ai-draft" key={section.id}><span>AI DRAFT · {Math.round(section.confidence * 100)}% confidence</span><h3>{section.title}</h3><p>{section.content}</p><div>{section.citationIds.map((citationId) => <button className="citation-chip" key={citationId} onClick={() => setToast(`Đã mở evidence ${citationId}.`)}>[{citationId}]</button>)}</div><button className="primary-button" onClick={applyCheckpointSection}>Dùng section này</button></article>)}
                        <div className="checkpoint-ai-footer"><button className="text-button reject-ai" onClick={rejectCheckpointAi}>Reject</button><button className="text-button" onClick={reportCheckpointIssue} disabled={checkpointIssueReported}>{checkpointIssueReported ? "Đã báo issue" : "Báo hallucination"}</button></div>
                      </>}
                    </aside>
                  </div>
                </>
              )}
            </section>
          ) : (
            <section className="report-assistant" id="reports" aria-labelledby="report-title">
              <div className="hero-row action-hero"><div><p className="eyebrow">S8 · AI REPORT ASSISTANT</p><h1 id="report-title">Weekly report · Tuần 28</h1><p>AI hỗ trợ tạo draft từ evidence; bạn luôn là người chỉnh sửa và gửi.</p></div><span className={`report-status ${reportSubmitted ? "submitted" : "draft"}`}>{reportSubmitted ? "Đã gửi" : "Bản nháp"}</span></div>
              {role !== "IKAMER" ? (
                <div className="state-card forbidden-state" role="status"><span className="state-icon">✦</span><h2>Không có quyền tạo report cho người khác</h2><p>AI Report Assistant chỉ xử lý report thuộc scope SELF của iKamer. Manager có workflow review riêng ở S9.</p><button className="secondary-button" onClick={() => navigate("HOME")}>Về tổng quan</button></div>
              ) : (
                <div className="report-layout">
                  <div className="report-main-column">
                    <section className="panel report-editor-panel">
                      <div className="panel-head"><div><h2>Nội dung report</h2><p>Tự viết hoặc áp dụng từng phần từ AI draft</p></div><span className="manual-safe">Manual luôn khả dụng</span></div>
                      <div className="report-context"><div><span>Objective</span><strong>Tăng activation rate cho người dùng mới</strong></div><div><span>Progress hiện tại</span><strong>62%</strong><small>+8% so với tuần trước</small></div></div>
                      <label className="report-textarea-label">Cập nhật trong tuần<textarea value={reportContent} onChange={(event) => { setReportContent(event.target.value); setReportSubmitted(false); }} placeholder="Nêu kết quả, blocker và ưu tiên tuần tới..." /></label>
                      {aiError && <p className="form-error" role="alert">{aiError}</p>}
                      <div className="report-submit-row"><p>AI không thể tự submit hoặc đổi progress.</p><button className="primary-button" onClick={submitReport} disabled={reportSubmitted}>{reportSubmitted ? "Đã gửi report" : "Kiểm tra & gửi report"}</button></div>
                    </section>
                    <section className="panel evidence-panel">
                      <div className="panel-head"><div><h2>Evidence được phép dùng</h2><p>Chỉ context refs đã chọn được đưa vào AI gateway</p></div><strong>{selectedEvidenceIds.length}/3</strong></div>
                      <div className="report-evidence-list">{reportEvidence.map((evidence) => <label key={evidence.id}><input type="checkbox" checked={selectedEvidenceIds.includes(evidence.id)} onChange={() => setSelectedEvidenceIds((current) => current.includes(evidence.id) ? current.filter((id) => id !== evidence.id) : [...current, evidence.id])}/><span className="evidence-symbol">↗</span><span><strong>{evidence.label}</strong><small>{evidence.metric} · {evidence.value}</small></span><code>{evidence.id}</code></label>)}</div>
                    </section>
                  </div>
                  <aside className="panel ai-report-panel">
                    <div className="ai-report-head"><span className="ai-mark">✦</span><div><h2>AI Report Assistant</h2><p>{aiDraft ? `${aiDraft.promptVersion} · ${aiDraft.evidenceCoverage}% evidence coverage` : "Structured draft có citation"}</p></div><span className="beta">BETA</span></div>
                    {aiLoadState === "GENERATING" ? <div className="ai-generating" aria-label="AI đang tạo draft"><span className="ai-orbit">✦</span><strong>Đang tổng hợp evidence...</strong><p>Không gửi raw report content.</p><i/><i/><i/></div> : aiLoadState === "ERROR" ? <div className="ai-fallback"><span>!</span><h3>Không tạo được draft</h3><p>{aiError} Workflow thủ công vẫn hoạt động.</p><button className="secondary-button" onClick={() => { setAiLoadState("IDLE"); setAiError(null); }}>Quay lại editor</button></div> : !aiDraft ? <div className="ai-empty"><span>✦</span><h3>Tạo draft từ evidence</h3><p>AI sẽ đề xuất kết quả, blocker, next steps và progress. Không có thay đổi nào được ghi tự động.</p><button className="primary-button" onClick={generateAiReport}>Tạo report draft</button><small>AI có thể sai · Cần human review</small></div> : <>
                      <div className="ai-quality"><span><i className={validateDraftCitations(aiDraft) ? "pass" : "fail"}/>Citation validation</span><span><i className="pass"/>Permission filtered</span><span><i className="pass"/>No auto-submit</span></div>
                      <div className="rewrite-row"><span>Rewrite</span><button onClick={() => setAiDraft(rewriteReportDraft(aiDraft, "CONCISE"))}>Ngắn gọn</button><button onClick={() => setAiDraft(rewriteReportDraft(aiDraft, "OUTCOME_FOCUSED"))}>Tập trung kết quả</button></div>
                      <div className="ai-draft-sections">{aiDraft.sections.map((section) => <article key={section.id}><label><input type="checkbox" checked={selectedDraftSections.includes(section.id)} onChange={() => setSelectedDraftSections((current) => current.includes(section.id) ? current.filter((id) => id !== section.id) : [...current, section.id])}/><strong>{section.title}</strong></label><p>{section.content}</p><div>{section.citationIds.map((citationId) => <button key={citationId} className="citation-chip" onClick={() => setToast(`Evidence ${citationId} đã được kiểm chứng.`)}>[{citationId}]</button>)}</div></article>)}</div>
                      <div className="progress-suggestion"><span>Progress suggestion</span><strong>{aiDraft.progressSuggestion}%</strong><small>Chỉ là gợi ý · không tự cập nhật OKR</small></div>
                      <div className="ai-draft-actions"><button className="text-button reject-ai" onClick={rejectAiReport}>Reject</button><button className="secondary-button" onClick={() => acceptAiSections(false)}>Accept selected</button><button className="primary-button" onClick={() => acceptAiSections(true)}>Accept all</button></div>
                      <p className="ai-disclaimer">Confidence {Math.round(aiDraft.confidence * 100)}% · Hãy kiểm tra mọi claim trước khi dùng.</p>
                    </>}
                  </aside>
                </div>
              )}
            </section>
          )}
        </div>
      </section>

      {selected && (
        <div className="drawer-backdrop" onMouseDown={() => setSelected(null)}>
          <aside className="detail-drawer" onMouseDown={(event) => event.stopPropagation()} aria-label="Chi tiết review">
            <button className="drawer-close" onClick={() => setSelected(null)} aria-label="Đóng">×</button>
            <span className={`priority-pill ${selected.priority.toLowerCase()}`}>{selected.priority} · {selected.type}</span>
            <div className="drawer-person"><span className={`avatar ${selected.color}`}>{selected.initials}</span><div><h2>{selected.member}</h2><p>{selected.detail}</p></div></div>
            <div className="why-box"><span>Vì sao item này xuất hiện?</span><strong>{selected.reason}</strong></div>
            <h3>Evidence</h3>
            <ul className="evidence-list">{selected.evidence.map((evidence) => <li key={evidence}><span>↗</span>{evidence}</li>)}</ul>
            <div className="comment-heading"><span>Nhận xét của Manager</span><button onClick={() => openManagerCopilot("COMMENTS")}>✦ AI gợi ý</button></div><label className="comment-label"><span className="sr-only">Nhận xét của Manager</span><textarea value={reviewComment} onChange={(event) => setReviewComment(event.target.value)} /></label>
            <div className="drawer-actions"><button className="secondary-button" onClick={() => openActionComposer(selected)}>Tạo action</button><button className="primary-button" onClick={completeReview}>Lưu & hoàn thành review</button></div>
            <p className="policy-note">Policy v1.0 · Review chỉ hoàn thành khi có comment hoặc resolution hợp lệ.</p>
          </aside>
        </div>
      )}

      {actionComposer && (
        <div className="drawer-backdrop" onMouseDown={() => setActionComposer(null)}>
          <aside className="detail-drawer action-composer" onMouseDown={(event) => event.stopPropagation()} aria-label="Tạo follow-up action">
            <button className="drawer-close" onClick={() => setActionComposer(null)} aria-label="Đóng">×</button>
            <p className="eyebrow">FOLLOW-UP TỪ {actionComposer.id}</p><h2>Giao action</h2>
            <div className="source-card"><span className={`avatar ${actionComposer.color}`}>{actionComposer.initials}</span><div><strong>{actionComposer.member}</strong><p>{actionComposer.title}</p></div></div>
            <label className="field-label">Việc cần hoàn thành<input value={actionTitle} onChange={(event) => setActionTitle(event.target.value)} autoFocus /></label>
            <label className="field-label">Người thực hiện<input value={actionComposer.member} disabled /></label>
            <label className="field-label">Hạn hoàn thành<input type="date" min="2026-07-14" value={actionDueAt} onChange={(event) => setActionDueAt(event.target.value)} /></label>
            {actionError && <p className="form-error" role="alert">{actionError}</p>}
            <div className="composer-footer"><p>Action được liên kết với evidence của review. Tạo trùng sẽ bị chặn bằng idempotency key.</p><button className="primary-button" onClick={submitAction}>Giao action</button></div>
          </aside>
        </div>
      )}

      {completingAction && (
        <div className="drawer-backdrop" onMouseDown={() => setCompletingAction(null)}>
          <aside className="detail-drawer completion-drawer" onMouseDown={(event) => event.stopPropagation()} aria-label="Hoàn thành action">
            <button className="drawer-close" onClick={() => setCompletingAction(null)} aria-label="Đóng">×</button>
            <p className="eyebrow">{completingAction.id}</p><h2>Ghi nhận kết quả</h2><p className="completion-title">{completingAction.title}</p>
            <label className="comment-label">Kết quả hoàn thành<textarea value={completionNote} onChange={(event) => { setCompletionNote(event.target.value); setActionError(null); }} placeholder="Nêu kết quả hoặc evidence đã cập nhật..." autoFocus /></label>
            {actionError && <p className="form-error" role="alert">{actionError}</p>}
            <div className="composer-footer"><p>Không thể hoàn thành nếu thiếu kết quả. Nội dung này được lưu trong audit trail.</p><button className="primary-button" onClick={finishAction}>Xác nhận hoàn thành</button></div>
          </aside>
        </div>
      )}

      {notificationPanel && (
        <div className="drawer-backdrop" onMouseDown={() => setNotificationPanel(false)}>
          <aside className="detail-drawer notification-drawer" onMouseDown={(event) => event.stopPropagation()} aria-label="Thông báo">
            <button className="drawer-close" onClick={() => setNotificationPanel(false)} aria-label="Đóng">×</button>
            <p className="eyebrow">S5 · NOTIFICATION</p><h2>Thông báo</h2><p className="notification-intro">Mỗi thông báo dẫn tới một việc có thể xử lý.</p>
            {notifications.filter((item) => item.state !== "SNOOZED").length === 0 ? (
              <div className="empty-state"><span>✓</span><h3>Bạn đã xử lý hết</h3><p>Thông báo mới sẽ xuất hiện tại đây.</p></div>
            ) : (
              <div className="notification-list">
                {notifications.filter((item) => item.state !== "SNOOZED").map((notification) => (
                  <article className={`notification-item ${notification.state === "ACTIONED" ? "is-actioned" : ""}`} key={notification.id}>
                    <span className="notification-mark">{notification.entity.type === "ACTION_ITEM" ? "↗" : "✓"}</span>
                    <div><div className="notification-title"><strong>{notification.title}</strong>{notification.state === "ACTIONED" && <span>Đã xử lý</span>}</div><p>{notification.message}</p><time>{new Date(notification.deliveredAt).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</time><div className="notification-actions"><button className="primary-button" onClick={() => followNotification(notification)}>{notification.cta}</button>{notification.state !== "ACTIONED" && <button className="text-button" onClick={() => setNotifications((current) => snoozeNotification(current, notification.id))}>Nhắc lại sau</button>}</div></div>
                  </article>
                ))}
              </div>
            )}
            <p className="policy-note">Conversion chỉ được ghi một lần; nội dung notification không chứa dữ liệu nhạy cảm.</p>
          </aside>
        </div>
      )}

      {selectedRisk && (
        <div className="drawer-backdrop" onMouseDown={() => setSelectedRisk(null)}>
          <aside className="detail-drawer risk-drawer" onMouseDown={(event) => event.stopPropagation()} aria-label="Chi tiết risk">
            <button className="drawer-close" onClick={() => setSelectedRisk(null)} aria-label="Đóng">×</button>
            <div className="risk-drawer-meta"><span className={`severity-pill ${selectedRisk.severity.toLowerCase()}`}>{selectedRisk.severity}</span><span>{selectedRisk.type}</span><span>{selectedRisk.ruleVersion}</span></div>
            <h2>{selectedRisk.type === "STALE" ? "Dữ liệu chưa cập nhật" : selectedRisk.type === "NO_REPORT" ? "Thiếu weekly report" : "Progress thấp hơn kế hoạch"}</h2>
            <p className="risk-owner">{role === "BOD" ? selectedRisk.scope.name : `${selectedRisk.ownerName} · ${selectedRisk.scope.name}`}</p>
            <div className="why-box"><span>Vì sao risk này xuất hiện?</span><strong>Rule deterministic vượt threshold; không sử dụng AI để quyết định severity.</strong></div>
            <h3>Evidence</h3><ul className="evidence-list">{selectedRisk.evidence.filter((evidence) => role !== "BOD" || !evidence.startsWith("Entity:")).map((evidence) => <li key={evidence}><span>↗</span>{evidence}</li>)}</ul>
            <div className="risk-lifecycle" aria-label="Risk lifecycle"><span className="done">Detected</span><i/><span className={selectedRisk.status !== "NEW" ? "done" : ""}>Acknowledged</span><i/><span className={selectedRisk.status === "RESOLVED" ? "done" : ""}>Resolved</span></div>
            {role === "MANAGER" && selectedRisk.status === "NEW" && <button className="primary-button acknowledge-button" onClick={acknowledgeSelectedRisk}>Acknowledge risk</button>}
            {role === "MANAGER" && selectedRisk.status === "ACKNOWLEDGED" && <>
              <label className="comment-label">Kết quả hoặc lý do<textarea value={riskResolution} onChange={(event) => { setRiskResolution(event.target.value); setRiskError(null); }} placeholder="Nêu action đã thực hiện hoặc lý do false positive..." autoFocus /></label>
              <div className="drawer-actions"><button className="secondary-button" onClick={() => closeSelectedRisk("IGNORE")}>Ignore có lý do</button><button className="primary-button" onClick={() => closeSelectedRisk("RESOLVE")}>Resolve risk</button></div>
            </>}
            {role === "BOD" && <div className="bod-assignment"><p>BOD đang xem aggregate evidence; nội dung cá nhân được ẩn theo policy.</p><label>Risk owner<select value={riskAssignee} onChange={(event) => setRiskAssignee(event.target.value)}><option value="USR-TOM|Tom Mac">Tom Mac · Growth Platform</option><option value="USR-LAN|Lan Phạm">Lan Phạm · Customer Experience</option><option value="USR-HOANG|Hoàng Vũ">Hoàng Vũ · Revenue Operations</option><option value="USR-MAI|Mai Anh">Mai Anh · People Experience</option></select></label><button className="primary-button" onClick={assignSelectedRisk}>Assign owner</button></div>}
            {selectedRisk.resolution && <div className="resolution-box"><span>Kết quả</span><strong>{selectedRisk.resolution}</strong></div>}
            {riskError && <p className="form-error" role="alert">{riskError}</p>}
            <p className="policy-note">Mọi transition risk được policy check và ghi audit event.</p>
          </aside>
        </div>
      )}

      {managerCopilotOpen && (
        <div className="drawer-backdrop" onMouseDown={() => setManagerCopilotOpen(false)}>
          <aside className="detail-drawer manager-copilot-drawer" onMouseDown={(event) => event.stopPropagation()} aria-label="AI Manager Review Assistant">
            <button className="drawer-close" onClick={() => setManagerCopilotOpen(false)} aria-label="Đóng">×</button>
            <div className="manager-ai-title"><span className="ai-mark">✦</span><div><p className="eyebrow">S9 · AI MANAGER REVIEW</p><h2>Manager Copilot</h2><small>Growth Platform · Tuần 28</small></div><span className="beta">BETA</span></div>
            {managerAiState === "GENERATING" ? <div className="ai-generating"><span className="ai-orbit">✦</span><strong>Đang tạo brief có evidence...</strong><p>Chỉ dùng context refs trong direct team.</p><i/><i/><i/></div> : managerAiState === "ERROR" ? <div className="ai-fallback"><span>!</span><h3>Không tạo được Manager brief</h3><p>{managerAiError}</p><button className="secondary-button" onClick={() => setManagerCopilotOpen(false)}>Tiếp tục review thủ công</button></div> : managerBrief ? <>
              <div className="manager-ai-quality"><span><i className={validateManagerBrief(managerBrief) ? "pass" : "fail"}/>Citation valid</span><span><i className="pass"/>Direct team only</span><span><i className="pass"/>No auto-review</span><strong>{Math.round(managerBrief.confidence * 100)}% confidence</strong></div>
              <div className="manager-ai-tabs" role="tablist" aria-label="Manager AI views"><button className={managerAiTab === "SUMMARY" ? "active" : ""} onClick={() => setManagerAiTab("SUMMARY")}>Weekly summary</button><button className={managerAiTab === "COMMENTS" ? "active" : ""} onClick={() => setManagerAiTab("COMMENTS")}>Suggested comments</button><button className={managerAiTab === "ONE_ON_ONE" ? "active" : ""} onClick={() => setManagerAiTab("ONE_ON_ONE")}>1:1 prep</button></div>
              <div className="manager-ai-body">
                {managerAiTab === "SUMMARY" && <>
                  <div className="manager-summary-intro"><strong>Team giữ nhịp tốt</strong><p>Hai exception dưới đây cần Manager xác nhận trước khi đưa vào weekly decision.</p></div>
                  {managerBrief.weeklySummary.map((insight) => <article className="manager-insight" key={insight.id}><span>{insight.id === "INS-1" ? "↗" : "!"}</span><div><p>{insight.text}</p><div>{insight.citationIds.map((id) => <button className="citation-chip" key={id} onClick={() => setToast(`Đã mở evidence ${id}.`)}>[{id}]</button>)}</div><small>{Math.round(insight.confidence * 100)}% confidence</small></div></article>)}
                  <h3>Risk explanation</h3>{managerBrief.riskExplanations.map((insight) => <article className="risk-explanation" key={insight.id}><p>{insight.text}</p><div>{insight.citationIds.map((id) => <button className="citation-chip" key={id} onClick={() => setToast(`Đã mở evidence ${id}.`)}>[{id}]</button>)}</div></article>)}
                </>}
                {managerAiTab === "COMMENTS" && <div className="suggested-comments"><p className="tab-helper">Gợi ý chỉ được đưa vào editor khi bạn chọn. Hãy chỉnh sửa trước khi hoàn thành review.</p>{managerBrief.suggestedComments.map((comment) => { const item = items.find((entry) => entry.id === comment.reviewItemId); return <article key={comment.reviewItemId}><div><span className={`avatar ${item?.color ?? "mint"}`}>{item?.initials ?? "?"}</span><p><strong>{item?.member ?? comment.reviewItemId}</strong><small>{comment.reviewItemId}</small></p></div><blockquote>{comment.text}</blockquote><div className="comment-citations">{comment.citationIds.map((id) => <button className="citation-chip" key={id}>[{id}]</button>)}</div><button className="primary-button" onClick={() => applySuggestedComment(comment.reviewItemId, comment.text)}>Mở review & dùng gợi ý</button></article>; })}</div>}
                {managerAiTab === "ONE_ON_ONE" && <div className="one-on-one-prep">{managerBrief.oneOnOnePrep.map((prep) => <article key={prep.member}><div className="one-on-one-person"><span className="avatar mint">MA</span><div><strong>{prep.member}</strong><small>Đề xuất agenda dựa trên evidence</small></div></div><ol>{prep.questions.map((question) => <li key={question}>{question}</li>)}</ol><div>{prep.citationIds.map((id) => <button className="citation-chip" key={id}>[{id}]</button>)}</div></article>)}<button className="primary-button save-prep" onClick={saveOneOnOnePrep} disabled={oneOnOneSaved}>{oneOnOneSaved ? "Đã lưu prep nháp" : "Lưu vào 1:1 prep"}</button><p className="tab-helper">Không tự tạo lịch, action hoặc performance decision.</p></div>}
              </div>
              <div className="manager-ai-footer"><button className="text-button reject-ai" onClick={rejectManagerAI}>Reject brief</button><span>{managerBrief.promptVersion} · {managerBrief.contextRefs.length} context refs</span><button className="secondary-button" onClick={() => setManagerCopilotOpen(false)}>Đóng</button></div>
            </> : null}
          </aside>
        </div>
      )}

      {eventPanel && (
        <div className="drawer-backdrop" onMouseDown={() => setEventPanel(false)}>
          <aside className="event-drawer" onMouseDown={(event) => event.stopPropagation()}>
            <button className="drawer-close" onClick={() => setEventPanel(false)} aria-label="Đóng">×</button>
            <p className="eyebrow">S0 · Tracking skeleton</p><h2>Analytics debug</h2><p className="event-intro">Event gần nhất trong phiên. Payload không chứa nội dung report hoặc comment thô.</p>
            <div className="event-list">{events.map((event) => <article key={event.eventId}><div><span className="live-dot"/><strong>{event.name}</strong><time>{new Date(event.occurredAt).toLocaleTimeString("vi-VN")}</time></div><code>{JSON.stringify(event, null, 2)}</code></article>)}</div>
          </aside>
        </div>
      )}

      {toast && <div className="toast" role="status"><span>✓</span>{toast}</div>}
    </main>
  );
}
