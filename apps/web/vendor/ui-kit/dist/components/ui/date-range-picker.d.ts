import { DateRange } from './calendar';
import * as React from "react";
export interface DateRangePreset {
    label: string;
    range: DateRange;
}
export interface DateRangePickerProps {
    value?: DateRange;
    defaultValue?: DateRange;
    onValueChange?: (range: DateRange) => void;
    presets?: DateRangePreset[];
    showPresets?: boolean;
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: Date[] | ((date: Date) => boolean);
    className?: string;
}
declare const DateRangePicker: React.ForwardRefExoticComponent<DateRangePickerProps & React.RefAttributes<HTMLDivElement>>;
export { DateRangePicker };
