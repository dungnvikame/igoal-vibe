export type ManagerContextRef = { id: string; type: "REPORT" | "KR" | "RISK" | "ACTION"; label: string };
export type CitedManagerInsight = { id: string; text: string; citationIds: string[]; confidence: number };

export type ManagerAIBrief = {
  id: string;
  teamId: string;
  weeklySummary: CitedManagerInsight[];
  suggestedComments: Array<{ reviewItemId: string; text: string; citationIds: string[] }>;
  riskExplanations: CitedManagerInsight[];
  oneOnOnePrep: Array<{ member: string; questions: string[]; citationIds: string[] }>;
  contextRefs: string[];
  promptVersion: "manager-review-v1.0";
  safetyFlags: Array<"HUMAN_REVIEW_REQUIRED" | "NO_AUTO_REVIEW" | "NO_AUTO_ACTION">;
  confidence: number;
};

export type ManagerAIInteraction = {
  id: string;
  useCase: "MANAGER_REVIEW";
  model: "demo-structured-generator";
  promptVersion: "manager-review-v1.0";
  contextRefs: string[];
  outcome: "GENERATED" | "ACCEPTED" | "REJECTED";
  acceptedSuggestionType: "COMMENT" | "ONE_ON_ONE" | null;
  acceptedDiff: string[];
  feedback: string | null;
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  estimatedCostUsd: number;
};

export function generateManagerBrief(teamId: string, context: ManagerContextRef[]): { brief: ManagerAIBrief; interaction: ManagerAIInteraction } {
  if (!teamId || context.length < 2) throw new Error("INSUFFICIENT_CONTEXT");
  const contextRefs = context.map((ref) => ref.id);
  const brief: ManagerAIBrief = {
    id: `AI-MGR-${teamId}`,
    teamId,
    weeklySummary: [
      { id: "INS-1", text: "Activation đạt 62%, tăng 8% so với tuần trước; team vẫn giữ nhịp tốt.", citationIds: ["RPT-W28", "KR-GP-02"], confidence: 0.93 },
      { id: "INS-2", text: "Blocker API đối tác đã kéo dài 2 ngày và có thể ảnh hưởng milestone KR2.", citationIds: ["RSK-301", "ACT-1001"], confidence: 0.89 },
    ],
    suggestedComments: [
      { reviewItemId: "RV-1042", text: "Cảm ơn em đã cập nhật. Hãy bổ sung evidence cho KR2 và xác nhận tác động của workaround trước thứ Tư nhé.", citationIds: ["RPT-W28", "KR-GP-02", "RSK-301"] },
      { reviewItemId: "RV-1039", text: "Em cập nhật lại KR3 và ghi rõ nguyên nhân trễ SLA để team chốt phương án follow-up nhé.", citationIds: ["KR-CX-03"] },
    ],
    riskExplanations: [
      { id: "RSK-EXP-1", text: "LOW_PROGRESS được kích hoạt vì actual thấp hơn expected 24 điểm phần trăm.", citationIds: ["KR-GP-02", "RSK-301"], confidence: 0.97 },
    ],
    oneOnOnePrep: [
      { member: "Nguyễn Minh Anh", questions: ["Workaround API đã giảm bao nhiêu tác động tới KR2?", "Em cần quyết định hoặc hỗ trợ nào từ Manager trong tuần này?"], citationIds: ["RPT-W28", "RSK-301", "ACT-1001"] },
    ],
    contextRefs,
    promptVersion: "manager-review-v1.0",
    safetyFlags: ["HUMAN_REVIEW_REQUIRED", "NO_AUTO_REVIEW", "NO_AUTO_ACTION"],
    confidence: 0.91,
  };
  return {
    brief,
    interaction: {
      id: `INT-${brief.id}`,
      useCase: "MANAGER_REVIEW",
      model: "demo-structured-generator",
      promptVersion: brief.promptVersion,
      contextRefs,
      outcome: "GENERATED",
      acceptedSuggestionType: null,
      acceptedDiff: [],
      feedback: null,
      latencyMs: 710,
      inputTokens: 0,
      outputTokens: 0,
      estimatedCostUsd: 0,
    },
  };
}

export function validateManagerBrief(brief: ManagerAIBrief): boolean {
  const insights = [...brief.weeklySummary, ...brief.riskExplanations];
  return insights.every((insight) => !/\d/.test(insight.text) || insight.citationIds.length > 0)
    && brief.suggestedComments.every((comment) => comment.citationIds.length > 0);
}

export function acceptManagerSuggestion(interaction: ManagerAIInteraction, type: "COMMENT" | "ONE_ON_ONE"): ManagerAIInteraction {
  return { ...interaction, outcome: "ACCEPTED", acceptedSuggestionType: type, acceptedDiff: [type] };
}

export function rejectManagerBrief(interaction: ManagerAIInteraction): ManagerAIInteraction {
  return { ...interaction, outcome: "REJECTED", acceptedSuggestionType: null, acceptedDiff: [] };
}
