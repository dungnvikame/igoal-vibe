import { VariantProps } from 'class-variance-authority';
import { iconToggleVariants } from './icon-toggle-variants';
import * as React from "react";
type IconToggleVariantProps = VariantProps<typeof iconToggleVariants>;
export interface IconToggleProps extends Omit<React.ComponentProps<"button">, "onChange">, Omit<IconToggleVariantProps, "active"> {
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
}
declare const IconToggle: React.ForwardRefExoticComponent<Omit<IconToggleProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { IconToggle };
