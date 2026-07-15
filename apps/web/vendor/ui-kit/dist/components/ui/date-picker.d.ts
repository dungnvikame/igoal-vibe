import * as React from "react";
export interface DatePickerProps {
    /** "date" shows calendar, "time" shows time columns, "datetime" shows both */
    mode?: "date" | "time" | "datetime";
    value?: Date | null;
    defaultValue?: Date | null;
    onValueChange?: (value: Date | null) => void;
    placeholder?: string;
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: Date[] | ((date: Date) => boolean);
    disabled?: boolean;
    size?: "xs" | "s" | "m" | "l" | "xl";
    variant?: "light" | "fill" | "dim" | "borderless";
    className?: string;
}
declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLButtonElement>>;
export { DatePicker };
