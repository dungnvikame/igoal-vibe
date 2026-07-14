export type CheckpointActorRole = "IKAMER" | "MANAGER";
export type CheckpointEvidenceType = "OKR" | "EKS" | "REPORT" | "FEEDBACK";

export type CheckpointEvidenceRef = {
  id: string;
  type: CheckpointEvidenceType;
  label: string;
  period: string;
  summary: string;
  metric?: string;
  anonymitySafe?: boolean;
};

export type CheckpointSectionId = "WHAT" | "HOW" | "LEVEL_UP" | "PERFORMANCE" | "MISMATCH" | "COACHING";

export type CheckpointDraftSection = {
  id: CheckpointSectionId;
  title: string;
  content: string;
  citationIds: string[];
  confidence: number;
};

export type CheckpointAIDraft = {
  id: string;
  checkpointId: string;
  actorRole: CheckpointActorRole;
  period: string;
  sections: CheckpointDraftSection[];
  contextRefs: string[];
  evidenceCoverage: number;
  promptVersion: "checkpoint-draft-v1.0";
  safetyFlags: Array<"HUMAN_REVIEW_REQUIRED" | "NO_AUTO_SAVE" | "NO_AUTO_RANKING">;
};

export type CheckpointAIInteraction = {
  id: string;
  useCase: "CHECKPOINT_DRAFT";
  model: "demo-structured-generator";
  promptVersion: "checkpoint-draft-v1.0";
  contextRefs: string[];
  outcome: "GENERATED" | "ACCEPTED" | "REJECTED";
  acceptedSectionIds: CheckpointSectionId[];
  acceptedDiff: string[];
  feedback: string | null;
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  estimatedCostUsd: number;
};

export type CheckpointEvidenceSummary = {
  total: number;
  byType: Record<CheckpointEvidenceType, number>;
  coveredMonths: number;
};

export function aggregateCheckpointEvidence(evidenceRefs: CheckpointEvidenceRef[]): CheckpointEvidenceSummary {
  const byType: Record<CheckpointEvidenceType, number> = { OKR: 0, EKS: 0, REPORT: 0, FEEDBACK: 0 };
  evidenceRefs.forEach((evidence) => { byType[evidence.type] += 1; });
  return { total: evidenceRefs.length, byType, coveredMonths: new Set(evidenceRefs.map((evidence) => evidence.period)).size };
}

export function generateCheckpointDraft(
  checkpointId: string,
  period: string,
  actorRole: CheckpointActorRole,
  evidenceRefs: CheckpointEvidenceRef[],
): { draft: CheckpointAIDraft; interaction: CheckpointAIInteraction } {
  if (!checkpointId || !period || evidenceRefs.length < 3) throw new Error("INSUFFICIENT_EVIDENCE");
  if (evidenceRefs.some((evidence) => evidence.type === "FEEDBACK" && evidence.anonymitySafe !== true)) {
    throw new Error("UNSAFE_FEEDBACK_CONTEXT");
  }
  const contextRefs = evidenceRefs.map((evidence) => evidence.id);
  const summary = aggregateCheckpointEvidence(evidenceRefs);
  const firstOfType = (type: CheckpointEvidenceType) => evidenceRefs.find((evidence) => evidence.type === type);
  const okr = firstOfType("OKR");
  const report = [...evidenceRefs].reverse().find((evidence) => evidence.type === "REPORT");
  const eks = firstOfType("EKS");
  const feedback = firstOfType("FEEDBACK");
  const cited = (...refs: Array<CheckpointEvidenceRef | undefined>) => {
    const ids = refs.filter((ref): ref is CheckpointEvidenceRef => Boolean(ref)).map((ref) => ref.id);
    return ids.length > 0 ? ids : contextRefs.slice(0, 1);
  };
  const sections: CheckpointDraftSection[] = actorRole === "IKAMER" ? [
    { id: "WHAT", title: "WHAT · Kết quả", content: `Trong H1, ${okr?.summary ?? "mục tiêu chính có tiến triển được ghi nhận"}. ${report?.summary ?? "Các báo cáo định kỳ cho thấy kết quả được duy trì"}. Kết quả cần được đối chiếu lại trước khi lưu checkpoint.`, citationIds: cited(okr, report), confidence: 0.93 },
    { id: "HOW", title: "HOW · Cách làm", content: `Cách làm nổi bật là duy trì cập nhật và phối hợp xử lý dependency. ${feedback?.summary ?? report?.summary ?? "Evidence hiện có chưa phản ánh đầy đủ hành vi phối hợp"}.`, citationIds: cited(report, feedback), confidence: 0.88 },
    { id: "LEVEL_UP", title: "LEVEL UP · Phát triển", content: `Trọng tâm phát triển tiếp theo: ${eks?.summary ?? "xác định một năng lực cần nâng cấp"}. Cần chuyển bài học thành tín hiệu cảnh báo sớm và playbook có thể chia sẻ.`, citationIds: cited(eks, feedback), confidence: 0.84 },
  ] : [
    { id: "PERFORMANCE", title: "Performance summary", content: `Kết quả H1 cho thấy tiến bộ có evidence: ${okr?.summary ?? "mục tiêu chính đã được cập nhật"}; ${report?.summary ?? "cadence báo cáo được duy trì"}.`, citationIds: cited(okr, report), confidence: 0.92 },
    { id: "MISMATCH", title: "Self vs evidence mismatch", content: `Chưa thấy chênh lệch lớn về kết quả. Điểm cần Manager xác minh thêm là ${feedback?.summary ?? report?.summary ?? "mức độ chủ động quản trị dependency"}.`, citationIds: cited(report, feedback), confidence: 0.81 },
    { id: "COACHING", title: "Coaching note", content: `Coaching tiếp theo nên tập trung vào ${eks?.summary ?? "năng lực phát triển đã chọn"}, cảnh báo sớm và lượng hóa impact.`, citationIds: cited(eks, feedback), confidence: 0.86 },
  ];
  const draft: CheckpointAIDraft = {
    id: `AI-${checkpointId}-${actorRole}`,
    checkpointId,
    actorRole,
    period,
    sections,
    contextRefs,
    evidenceCoverage: Math.min(100, Math.round((summary.coveredMonths / 6) * 100)),
    promptVersion: "checkpoint-draft-v1.0",
    safetyFlags: ["HUMAN_REVIEW_REQUIRED", "NO_AUTO_SAVE", "NO_AUTO_RANKING"],
  };
  return {
    draft,
    interaction: {
      id: `INT-${draft.id}`,
      useCase: "CHECKPOINT_DRAFT",
      model: "demo-structured-generator",
      promptVersion: draft.promptVersion,
      contextRefs,
      outcome: "GENERATED",
      acceptedSectionIds: [],
      acceptedDiff: [],
      feedback: null,
      latencyMs: 780,
      inputTokens: 0,
      outputTokens: 0,
      estimatedCostUsd: 0,
    },
  };
}

export function validateCheckpointDraft(draft: CheckpointAIDraft): boolean {
  const allowedRefs = new Set(draft.contextRefs);
  return draft.sections.every((section) => section.citationIds.length > 0
    && section.citationIds.every((citationId) => allowedRefs.has(citationId))
    && (!/\d/.test(section.content) || section.citationIds.length > 0));
}

export function acceptCheckpointSections(
  draft: CheckpointAIDraft,
  interaction: CheckpointAIInteraction,
  sectionIds: CheckpointSectionId[],
): { sections: Partial<Record<CheckpointSectionId, string>>; interaction: CheckpointAIInteraction } {
  const selected = draft.sections.filter((section) => sectionIds.includes(section.id));
  if (selected.length === 0) throw new Error("SECTION_REQUIRED");
  const acceptedSectionIds = selected.map((section) => section.id);
  return {
    sections: Object.fromEntries(selected.map((section) => [section.id, section.content])),
    interaction: { ...interaction, outcome: "ACCEPTED", acceptedSectionIds, acceptedDiff: acceptedSectionIds },
  };
}

export function rejectCheckpointDraft(interaction: CheckpointAIInteraction, feedback: string | null = null): CheckpointAIInteraction {
  return { ...interaction, outcome: "REJECTED", acceptedSectionIds: [], acceptedDiff: [], feedback };
}

export function saveCheckpointDraft(
  checkpointId: string,
  sections: Partial<Record<CheckpointSectionId, string>>,
): { checkpointId: string; status: "DRAFT"; savedSectionIds: CheckpointSectionId[]; ranking: null } {
  const savedSectionIds = Object.entries(sections)
    .filter(([, content]) => content?.trim())
    .map(([id]) => id as CheckpointSectionId);
  if (savedSectionIds.length === 0) throw new Error("CONTENT_REQUIRED");
  return { checkpointId, status: "DRAFT", savedSectionIds, ranking: null };
}
