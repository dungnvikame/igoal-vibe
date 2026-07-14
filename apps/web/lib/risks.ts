export type RiskType = "STALE" | "NO_REPORT" | "LOW_PROGRESS";
export type RiskSeverity = "HIGH" | "MEDIUM" | "LOW";
export type RiskStatus = "NEW" | "ACKNOWLEDGED" | "IN_PROGRESS" | "RESOLVED" | "IGNORED";

export type PerformanceSnapshot = {
  entityId: string;
  memberId: string;
  memberName: string;
  memberInitials: string;
  teamId: string;
  teamName: string;
  daysSinceUpdate: number;
  reportSubmitted: boolean;
  reportOverdueDays: number;
  progress: number;
  expectedProgress: number;
  impact: "TEAM" | "PROJECT";
};

export type RiskItem = {
  id: string;
  type: RiskType;
  severity: RiskSeverity;
  scope: { type: "TEAM"; id: string; name: string };
  ownerId: string;
  ownerName: string;
  ownerInitials: string;
  assigneeId: string;
  assigneeName: string;
  status: RiskStatus;
  detectedAt: string;
  slaDueAt: string;
  evidence: string[];
  resolution: string | null;
  ruleVersion: "risk-v1.0";
  dedupeKey: string;
};

export type RiskEngineResult = { risks: RiskItem[]; evaluatedCount: number; ruleVersion: "risk-v1.0" };

function severityFor(type: RiskType, snapshot: PerformanceSnapshot): RiskSeverity {
  if (type === "STALE") return snapshot.daysSinceUpdate >= 10 ? "HIGH" : "MEDIUM";
  if (type === "NO_REPORT") return snapshot.reportOverdueDays >= 2 ? "HIGH" : "MEDIUM";
  const gap = snapshot.expectedProgress - snapshot.progress;
  return gap >= 25 ? "HIGH" : gap >= 15 ? "MEDIUM" : "LOW";
}

export function runRiskEngine(snapshots: PerformanceSnapshot[], now = new Date("2026-07-14T02:00:00.000Z")): RiskEngineResult {
  const risks: RiskItem[] = [];
  const add = (snapshot: PerformanceSnapshot, type: RiskType, evidence: string[]) => {
    const sequence = risks.length + 301;
    risks.push({
      id: `RSK-${sequence}`,
      type,
      severity: severityFor(type, snapshot),
      scope: { type: "TEAM", id: snapshot.teamId, name: snapshot.teamName },
      ownerId: snapshot.memberId,
      ownerName: snapshot.memberName,
      ownerInitials: snapshot.memberInitials,
      assigneeId: "USR-TOM",
      assigneeName: "Tom Mac",
      status: "NEW",
      detectedAt: now.toISOString(),
      slaDueAt: new Date(now.getTime() + (type === "NO_REPORT" ? 24 : 48) * 60 * 60 * 1000).toISOString(),
      evidence,
      resolution: null,
      ruleVersion: "risk-v1.0",
      dedupeKey: `${type}:${snapshot.entityId}:risk-v1.0`,
    });
  };

  for (const snapshot of snapshots) {
    if (snapshot.daysSinceUpdate > 7) {
      add(snapshot, "STALE", [`${snapshot.daysSinceUpdate} ngày chưa cập nhật`, "SLA cập nhật: 7 ngày", `Entity: ${snapshot.entityId}`]);
    }
    if (!snapshot.reportSubmitted && snapshot.reportOverdueDays > 0) {
      add(snapshot, "NO_REPORT", [`Report quá hạn ${snapshot.reportOverdueDays} ngày`, "Không có submission hợp lệ", `Entity: ${snapshot.entityId}`]);
    }
    const gap = snapshot.expectedProgress - snapshot.progress;
    if (gap >= 15) {
      add(snapshot, "LOW_PROGRESS", [`Actual: ${snapshot.progress}%`, `Expected: ${snapshot.expectedProgress}%`, `Gap: ${gap}%`]);
    }
  }

  return { risks, evaluatedCount: snapshots.length, ruleVersion: "risk-v1.0" };
}

export function acknowledgeRisk(risk: RiskItem): RiskItem {
  if (risk.status !== "NEW") throw new Error("INVALID_RISK_TRANSITION");
  return { ...risk, status: "ACKNOWLEDGED" };
}

export function resolveRisk(risk: RiskItem, resolution: string): RiskItem {
  if (risk.status !== "ACKNOWLEDGED" && risk.status !== "IN_PROGRESS") throw new Error("INVALID_RISK_TRANSITION");
  if (!resolution.trim()) throw new Error("RESOLUTION_REQUIRED");
  return { ...risk, status: "RESOLVED", resolution: resolution.trim() };
}

export function ignoreRisk(risk: RiskItem, reason: string): RiskItem {
  if (risk.status !== "NEW" && risk.status !== "ACKNOWLEDGED") throw new Error("INVALID_RISK_TRANSITION");
  if (!reason.trim()) throw new Error("RESOLUTION_REQUIRED");
  return { ...risk, status: "IGNORED", resolution: reason.trim() };
}

export function assignRisk(risk: RiskItem, assigneeId: string, assigneeName: string): RiskItem {
  if (risk.status === "RESOLVED" || risk.status === "IGNORED") throw new Error("INVALID_RISK_TRANSITION");
  if (!assigneeId || !assigneeName.trim()) throw new Error("ASSIGNEE_REQUIRED");
  return { ...risk, assigneeId, assigneeName: assigneeName.trim() };
}
