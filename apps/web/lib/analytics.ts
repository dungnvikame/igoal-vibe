import type { Role } from "./permissions";

export type ProductEvent = {
  eventId: string;
  name: string;
  occurredAt: string;
  userId: string;
  role: Role;
  sessionId: string;
  source: "web";
  entityType: string;
  entityId: string;
  schemaVersion: 1;
  properties: Record<string, string | number | boolean>;
};

export function createEvent(
  name: string,
  role: Role,
  entityType: string,
  entityId: string,
  properties: Record<string, string | number | boolean>,
): ProductEvent {
  return {
    eventId: globalThis.crypto?.randomUUID?.() ?? `evt-${Date.now()}`,
    name,
    occurredAt: new Date().toISOString(),
    userId: "USR-TOM",
    role,
    sessionId: "SESSION-DEMO",
    source: "web",
    entityType,
    entityId,
    schemaVersion: 1,
    properties,
  };
}

