import { VariantProps } from 'class-variance-authority';
import { badgeVariants } from './badge-variants';
import * as React from "react";
type BadgeVariantProps = VariantProps<typeof badgeVariants>;
type BadgeSize = NonNullable<BadgeVariantProps["size"]>;
type LegacyBadgeSize = "sm" | "md" | "lg";
export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">, Omit<BadgeVariantProps, "size" | "rounded"> {
    size?: BadgeSize | LegacyBadgeSize;
    rounded?: boolean;
    dot?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
export { Badge };
