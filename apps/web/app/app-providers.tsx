"use client";

import { Toaster, TooltipProvider } from "@frontend-team/ui-kit";
import type { ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
};

/** Provides the shared UI Kit infrastructure once for the full application. */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <TooltipProvider>
      {children}
      <Toaster />
    </TooltipProvider>
  );
}
