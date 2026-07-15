import { Popover as PopoverPrimitive } from 'radix-ui';
import * as React from "react";
export interface PopoverProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    portal?: boolean;
    className?: string;
}
export interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
    portal?: boolean;
}
declare const PopoverContent: React.ForwardRefExoticComponent<PopoverContentProps & React.RefAttributes<HTMLDivElement>>;
declare const Popover: {
    ({ trigger, children, open, onOpenChange, side, align, sideOffset, portal, className, }: PopoverProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverClose: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverCloseProps & React.RefAttributes<HTMLButtonElement>>;
export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
