import * as React from "react";
export interface SegmentedControlOption {
    value: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
}
export interface SegmentedControlProps {
    options: readonly SegmentedControlOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    size?: "xs" | "s" | "m" | "l";
    disabled?: boolean;
    className?: string;
}
declare const SegmentedControl: React.ForwardRefExoticComponent<SegmentedControlProps & React.RefAttributes<HTMLDivElement>>;
export { SegmentedControl };
