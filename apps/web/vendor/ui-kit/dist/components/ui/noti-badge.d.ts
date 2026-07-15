import { VariantProps } from 'class-variance-authority';
import { notiBadgeVariants } from './noti-badge-variants';
import * as React from "react";
type NotiBadgeVariantProps = VariantProps<typeof notiBadgeVariants>;
export interface NotiBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color" | "children">, NotiBadgeVariantProps {
    count?: number;
    max?: number;
    overflowLabel?: React.ReactNode;
    children?: React.ReactNode;
}
declare const NotiBadge: React.ForwardRefExoticComponent<NotiBadgeProps & React.RefAttributes<HTMLSpanElement>>;
export { NotiBadge };
