import { VariantProps } from 'class-variance-authority';
import { inputPinCodeContainerVariants, inputPinCodeSlotVariants } from './input-pin-code-variants';
import * as React from "react";
export interface InputPinCodeProps extends Omit<React.ComponentPropsWithoutRef<"input">, "autoComplete" | "defaultValue" | "inputMode" | "maxLength" | "onChange" | "pattern" | "placeholder" | "size" | "type" | "value">, VariantProps<typeof inputPinCodeSlotVariants>, VariantProps<typeof inputPinCodeContainerVariants> {
    length?: number;
    value?: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    numericOnly?: boolean;
    mask?: boolean;
    placeholder?: string;
    separatorAfter?: number[];
}
declare const InputPinCode: React.ForwardRefExoticComponent<InputPinCodeProps & React.RefAttributes<HTMLInputElement>>;
export { InputPinCode };
