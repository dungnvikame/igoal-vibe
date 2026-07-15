import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button-variants';
import * as React from "react";
type ButtonVariantProps = VariantProps<typeof buttonVariants>;
type ButtonSize = NonNullable<ButtonVariantProps["size"]>;
type LegacyButtonSize = "sm" | "default" | "lg" | "icon-sm" | "icon-md" | "icon-lg";
export interface ButtonProps extends React.ComponentProps<"button">, Omit<ButtonVariantProps, "size"> {
    size?: ButtonSize | LegacyButtonSize;
    asChild?: boolean;
    loading?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { Button };
