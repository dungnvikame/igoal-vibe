import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import * as React from "react";
export interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "asChild"> {
    label?: string;
    description?: string;
    size?: "sm" | "md" | "lg";
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>;
export { Checkbox };
