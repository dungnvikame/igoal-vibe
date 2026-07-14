import type { ReactNode } from "react";

/** Shared decorative icon wrapper for the workspace navigation. */
export function NavigationIcon({ children }: { children: ReactNode }) {
  return <span className="nav-icon" aria-hidden="true">{children}</span>;
}
