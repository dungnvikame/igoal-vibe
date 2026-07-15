import * as React from "react";
export interface SelectOption {
    value: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    group?: string;
}
export interface SelectGroup {
    label: string;
    key: string;
}
export interface SelectProps {
    options: SelectOption[];
    groups?: SelectGroup[];
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    multiple?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    loadingMessage?: string;
    preparingMessage?: string;
    onSearch?: (query: string) => Promise<SelectOption[]>;
    maxDisplayedTags?: number;
    loading?: boolean;
    overflowLabel?: (count: number) => string;
    size?: "xs" | "s" | "m" | "l" | "xl";
    variant?: "light" | "fill" | "dim" | "borderless";
    validation?: "error";
    portalContainer?: HTMLElement | null;
    id?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: React.AriaAttributes["aria-invalid"];
    className?: string;
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLDivElement>>;
export { Select };
