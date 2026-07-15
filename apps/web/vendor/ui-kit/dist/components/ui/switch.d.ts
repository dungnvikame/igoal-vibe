import { Switch as SwitchPrimitive } from 'radix-ui';
import * as React from "react";
export interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "asChild"> {
    label?: string;
    description?: string;
    size?: "sm" | "md" | "lg";
    labelPosition?: "left" | "right";
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;
export { Switch };
