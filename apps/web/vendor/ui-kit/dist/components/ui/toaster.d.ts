export interface ToasterProps {
    position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
    expand?: boolean;
    richColors?: boolean;
    closeButton?: boolean;
    duration?: number;
    className?: string;
}
/**
 * Toast provider for applications using ui-kit.
 *
 * Usage:
 * 1) In app root: `<Toaster />`
 * 2) Anywhere: `toast.success("Saved!")`, `toast.error("Failed!")`, `toast("Hello")`
 */
export declare function Toaster({ position, expand, richColors, closeButton, duration, className, }: ToasterProps): import("react/jsx-runtime").JSX.Element;
