import { VariantProps } from 'class-variance-authority';
import { textareaVariants } from './textarea-variants';
import * as React from "react";
export interface TextareaProps extends Omit<React.ComponentPropsWithoutRef<"textarea">, "size">, VariantProps<typeof textareaVariants> {
    /** Auto-grow height with content */
    autosize?: boolean;
    /** Minimum number of visible rows (default: 3) */
    minRows?: number;
    /** Maximum number of rows before scrolling */
    maxRows?: number;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea };
