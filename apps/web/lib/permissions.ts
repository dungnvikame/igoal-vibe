export type Role = "MANAGER" | "BOD" | "IKAMER";
export type PolicyAction =
  | "review:read"
  | "review:complete"
  | "action:read"
  | "action:create"
  | "action:complete"
  | "risk:read"
  | "risk:acknowledge"
  | "risk:resolve"
  | "risk:assign"
  | "ai:report-draft"
  | "ai:manager-summary"
  | "checkpoint:read"
  | "checkpoint:update"
  | "ai:checkpoint-draft"
  | "report:update";
export type ResourceType = "review_item" | "action_item" | "risk" | "report" | "team" | "checkpoint";

export type OrganizationContext = {
  isSelf?: boolean;
  isDirectTeam?: boolean;
};

export type PolicyDecision = {
  allowed: boolean;
  reason: string;
  policyVersion: "1.0";
  scope: "SELF" | "DIRECT_TEAM" | "AGGREGATE";
};

const permissions: Record<Role, Partial<Record<PolicyAction, ResourceType[]>>> = {
  MANAGER: {
    "review:read": ["review_item"],
    "review:complete": ["review_item"],
    "action:read": ["action_item"],
    "action:create": ["action_item"],
    "action:complete": ["action_item"],
    "risk:read": ["risk"],
    "risk:acknowledge": ["risk"],
    "risk:resolve": ["risk"],
    "ai:manager-summary": ["team"],
    "checkpoint:read": ["checkpoint"],
    "checkpoint:update": ["checkpoint"],
    "ai:checkpoint-draft": ["checkpoint"],
  },
  BOD: {
    "risk:read": ["risk"],
    "risk:assign": ["risk"],
  },
  IKAMER: {
    "report:update": ["report"],
    "ai:report-draft": ["report"],
    "checkpoint:read": ["checkpoint"],
    "checkpoint:update": ["checkpoint"],
    "ai:checkpoint-draft": ["checkpoint"],
    "action:read": ["action_item"],
    "action:complete": ["action_item"],
  },
};

const scopes: Record<Role, PolicyDecision["scope"]> = {
  MANAGER: "DIRECT_TEAM",
  BOD: "AGGREGATE",
  IKAMER: "SELF",
};

export function can(
  role: Role,
  action: PolicyAction,
  resource: ResourceType,
  organizationContext: OrganizationContext = {},
): PolicyDecision {
  const granted = permissions[role][action]?.includes(resource) ?? false;
  const inScope = role === "MANAGER"
    ? organizationContext.isDirectTeam === true
    : role === "IKAMER"
      ? organizationContext.isSelf === true
      : true;
  const allowed = granted && inScope;
  return {
    allowed,
    reason: allowed ? "ROLE_SCOPE_MATCH" : granted ? "RESOURCE_OUT_OF_SCOPE" : "ACTION_NOT_GRANTED",
    policyVersion: "1.0",
    scope: scopes[role],
  };
}
