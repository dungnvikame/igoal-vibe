import { Tooltip as TooltipPrimitive } from 'radix-ui';
import * as React from "react";
export interface TooltipProps {
    title?: React.ReactNode;
    content: React.ReactNode;
    children: React.ReactElement;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    delayDuration?: number;
    avoidCollisions?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    className?: string;
}
declare const Tooltip: {
    ({ title, content, children, side, align, delayDuration, avoidCollisions, open, onOpenChange, disabled, className, }: TooltipProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
export { Tooltip, TooltipProvider };
