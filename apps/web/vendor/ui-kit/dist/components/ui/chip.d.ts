import { VariantProps } from 'class-variance-authority';
import { AvatarProps } from './avatar';
import { chipVariants } from './chip-variants';
import * as React from "react";
type ChipVariantProps = VariantProps<typeof chipVariants>;
type ChipSize = NonNullable<ChipVariantProps["size"]>;
type ChipType = NonNullable<ChipVariantProps["chipType"]>;
export interface ChipOption {
    label: string;
    value: string;
}
export interface ChipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">, Omit<ChipVariantProps, "selected" | "pill"> {
    size?: ChipSize;
    selected?: boolean;
    pill?: boolean;
    options?: ChipOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    searchable?: boolean;
    clearable?: boolean;
    labelMode?: "replace" | "append";
    placeholder?: string;
    icon?: React.ReactNode;
    onRemove?: () => void;
}
declare const Chip: React.ForwardRefExoticComponent<ChipProps & React.RefAttributes<HTMLSpanElement>>;
export interface FilterChipRadioOption {
    label: React.ReactNode;
    value: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}
export interface FilterChipRadioProps extends Omit<React.ComponentProps<"button">, "value" | "onChange"> {
    value: string;
    selected?: boolean;
    size?: ChipSize;
    bordered?: boolean;
    chipType?: ChipType;
    icon?: React.ReactNode;
}
declare const FilterChipRadio: React.ForwardRefExoticComponent<Omit<FilterChipRadioProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export interface FilterChipRadioGroupProps extends Omit<React.ComponentProps<"div">, "onChange"> {
    options: readonly FilterChipRadioOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    size?: ChipSize;
    bordered?: boolean;
    chipType?: ChipType;
}
declare const FilterChipRadioGroup: React.ForwardRefExoticComponent<Omit<FilterChipRadioGroupProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface TabChipProps extends Omit<React.ComponentProps<"button">, "color"> {
    active?: boolean;
    display?: "full" | "iconOnly";
    color?: "subtle" | "fill";
    size?: ChipSize;
    pill?: boolean;
    icon?: React.ReactNode;
}
declare const TabChip: React.ForwardRefExoticComponent<Omit<TabChipProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export interface InfoChipProps extends Omit<React.ComponentProps<"div">, "color"> {
    variant?: "fill" | "light";
    size?: ChipSize;
    icon?: React.ReactNode;
    showClose?: boolean;
    closeAriaLabel?: string;
    onClose?: () => void;
}
declare const InfoChip: React.ForwardRefExoticComponent<Omit<InfoChipProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface InputChipProps extends Omit<React.ComponentProps<"div">, "color"> {
    type?: "value" | "avatar";
    size?: ChipSize;
    icon?: React.ReactNode;
    avatar?: React.ReactNode;
    avatarProps?: AvatarProps;
    showClose?: boolean;
    closeAriaLabel?: string;
    onRemove?: () => void;
}
declare const InputChip: React.ForwardRefExoticComponent<Omit<InputChipProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Chip, FilterChipRadio, FilterChipRadioGroup, InfoChip, InputChip, TabChip };
