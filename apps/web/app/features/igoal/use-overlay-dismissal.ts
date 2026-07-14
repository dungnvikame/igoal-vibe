import { useEffect } from "react";

type OverlayDismissalCallbacks = {
  onDismiss: () => void;
};

/** Applies one consistent Escape behavior to transient UI surfaces. */
export function useOverlayDismissal({ onDismiss }: OverlayDismissalCallbacks) {
  useEffect(() => {
    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onDismiss();
    }

    window.addEventListener("keydown", dismissOnEscape);
    return () => window.removeEventListener("keydown", dismissOnEscape);
  }, [onDismiss]);
}
