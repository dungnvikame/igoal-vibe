export type EvidenceRef = { id: string; label: string; metric: string; value: string };
export type ReportContext = {
  period: string;
  objective: string;
  progress: number;
  previousProgress: number;
  evidenceRefs: EvidenceRef[];
  blocker?: string;
};

export type DraftSection = { id: "ACHIEVEMENTS" | "BLOCKERS" | "NEXT_STEPS"; title: string; content: string; citationIds: string[] };
export type AIReportDraft = {
  id: string;
  status: "DRAFT";
  sections: DraftSection[];
  progressSuggestion: number;
  confidence: number;
  evidenceCoverage: number;
  safetyFlags: string[];
  promptVersion: "report-draft-v1.0";
  contextRefs: string[];
};

export type AIInteraction = {
  id: string;
  useCase: "REPORT_DRAFT";
  model: "demo-structured-generator";
  promptVersion: "report-draft-v1.0";
  contextRefs: string[];
  outcome: "GENERATED" | "ACCEPTED" | "REJECTED";
  acceptedSectionIds: string[];
  acceptedDiff: string[];
  feedback: string | null;
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  estimatedCostUsd: number;
};

export function generateReportDraft(context: ReportContext): { draft: AIReportDraft; interaction: AIInteraction } {
  if (context.evidenceRefs.length === 0) throw new Error("EVIDENCE_REQUIRED");
  const refs = context.evidenceRefs.map((evidence) => evidence.id);
  const progressDelta = context.progress - context.previousProgress;
  const primary = context.evidenceRefs[0];
  const secondary = context.evidenceRefs[1] ?? primary;
  const draft: AIReportDraft = {
    id: `AI-RPT-${context.period.replace(/\D/g, "") || "01"}`,
    status: "DRAFT",
    sections: [
      { id: "ACHIEVEMENTS", title: "Kết quả nổi bật", content: `${context.objective} đạt ${context.progress}%, tăng ${progressDelta}% so với kỳ trước. ${primary.label}: ${primary.value}.`, citationIds: [primary.id] },
      { id: "BLOCKERS", title: "Blocker & hỗ trợ", content: context.blocker?.trim() || "Chưa ghi nhận blocker mới trong kỳ báo cáo.", citationIds: context.blocker ? [secondary.id] : [] },
      { id: "NEXT_STEPS", title: "Ưu tiên tuần tới", content: `Tiếp tục theo dõi ${secondary.metric.toLowerCase()} và xác nhận kết quả bằng evidence trước checkpoint tiếp theo.`, citationIds: [secondary.id] },
    ],
    progressSuggestion: context.progress,
    confidence: refs.length >= 2 ? 0.91 : 0.74,
    evidenceCoverage: refs.length >= 2 ? 100 : 67,
    safetyFlags: ["HUMAN_REVIEW_REQUIRED", "NO_AUTO_SUBMIT", "NO_AUTO_PROGRESS_UPDATE"],
    promptVersion: "report-draft-v1.0",
    contextRefs: refs,
  };
  return {
    draft,
    interaction: {
      id: `INT-${draft.id}`,
      useCase: "REPORT_DRAFT",
      model: "demo-structured-generator",
      promptVersion: draft.promptVersion,
      contextRefs: refs,
      outcome: "GENERATED",
      acceptedSectionIds: [],
      acceptedDiff: [],
      feedback: null,
      latencyMs: 620,
      inputTokens: 0,
      outputTokens: 0,
      estimatedCostUsd: 0,
    },
  };
}

export function validateDraftCitations(draft: AIReportDraft): boolean {
  return draft.sections.every((section) => !/\d/.test(section.content) || section.citationIds.length > 0);
}

export function acceptDraftSections(draft: AIReportDraft, sectionIds: DraftSection["id"][]): { content: string; acceptedSectionIds: string[] } {
  const selected = draft.sections.filter((section) => sectionIds.includes(section.id));
  if (selected.length === 0) throw new Error("SECTION_REQUIRED");
  return { content: selected.map((section) => `${section.title}\n${section.content}`).join("\n\n"), acceptedSectionIds: selected.map((section) => section.id) };
}

export function toInteractionOutcome(interaction: AIInteraction, outcome: "ACCEPTED" | "REJECTED", acceptedSectionIds: string[] = []): AIInteraction {
  const accepted = outcome === "ACCEPTED" ? acceptedSectionIds : [];
  return { ...interaction, outcome, acceptedSectionIds: accepted, acceptedDiff: accepted };
}

export function rewriteReportDraft(draft: AIReportDraft, tone: "CONCISE" | "OUTCOME_FOCUSED"): AIReportDraft {
  return {
    ...draft,
    sections: draft.sections.map((section) => ({
      ...section,
      content: tone === "CONCISE"
        ? section.content.replace("Tiếp tục theo dõi", "Theo dõi").replace(" trước checkpoint tiếp theo", "")
        : section.id === "ACHIEVEMENTS" ? `Kết quả: ${section.content}` : section.content,
    })),
  };
}
