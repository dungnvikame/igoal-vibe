import { VariantProps } from 'class-variance-authority';
import { inputVariants } from './input-variants';
import * as React from "react";
export type InputVariant = "light" | "fill" | "dim" | "borderless";
export interface InputProps extends Omit<React.ComponentProps<"input">, "size">, VariantProps<typeof inputVariants> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    unit?: React.ReactNode;
}
declare const Input: React.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export { Input };
