import { VariantProps } from 'class-variance-authority';
import { avatarVariants } from './avatar-variants';
import * as React from "react";
export type AvatarType = "image" | "icon" | "text";
export type AvatarSize = "xxs" | "xs" | "s" | "m" | "l" | "xl";
export interface AvatarProps extends Omit<React.ComponentProps<"span">, "children">, VariantProps<typeof avatarVariants> {
    asChild?: boolean;
    src?: string;
    alt?: string;
    fallback?: string;
    icon?: React.ReactNode;
    imageProps?: React.ComponentProps<"img">;
}
declare const Avatar: React.ForwardRefExoticComponent<Omit<AvatarProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;
export { Avatar };
