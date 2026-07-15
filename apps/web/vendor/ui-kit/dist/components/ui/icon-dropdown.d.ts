import { VariantProps } from 'class-variance-authority';
import { DropdownMenu } from './dropdown-menu';
import { iconToggleVariants } from './icon-toggle-variants';
import * as React from "react";
type IconDropdownVariantProps = VariantProps<typeof iconToggleVariants>;
export interface IconDropdownProps extends Omit<React.ComponentPropsWithoutRef<typeof DropdownMenu>, "children">, Omit<IconDropdownVariantProps, "active"> {
    icon: React.ReactNode;
    children: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    className?: string;
    contentClassName?: string;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    "aria-label": string;
}
declare const IconDropdown: React.ForwardRefExoticComponent<IconDropdownProps & React.RefAttributes<HTMLButtonElement>>;
export { IconDropdown };
