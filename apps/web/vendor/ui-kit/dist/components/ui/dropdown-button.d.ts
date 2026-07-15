import { ButtonProps } from './button';
import { DropdownMenu } from './dropdown-menu';
import * as React from "react";
export type DropdownButtonVariant = "primary1" | "primary2" | "secondary1" | "secondary2" | "outline" | "border";
export interface DropdownButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof DropdownMenu>, "children"> {
    label: React.ReactNode;
    children: React.ReactNode;
    variant?: DropdownButtonVariant;
    size?: ButtonProps["size"];
    disabled?: boolean;
    className?: string;
    contentClassName?: string;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}
declare const DropdownButton: React.ForwardRefExoticComponent<DropdownButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { DropdownButton };
