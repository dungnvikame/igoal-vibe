import * as React from "react";
export interface DateRange {
    from?: Date;
    to?: Date;
}
export type DayDecoratorRule = {
    type: "range";
    from: Date;
    to: Date;
    icon?: React.ReactNode;
    backgroundClass?: string;
    display?: "below" | "background";
} | {
    type: "weekly";
    weekdays: number[];
    icon?: React.ReactNode;
    backgroundClass?: string;
    display?: "below" | "background";
} | {
    type: "yearly";
    month: number;
    day: number;
    icon?: React.ReactNode;
    backgroundClass?: string;
    display?: "below" | "background";
};
interface CalendarBaseProps {
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: Date[] | ((date: Date) => boolean);
    dayDecorators?: DayDecoratorRule[];
    weekDayLabels?: [string, string, string, string, string, string, string];
    className?: string;
}
interface CalendarSingleProps extends CalendarBaseProps {
    mode?: "single";
    value?: Date;
    defaultValue?: Date;
    onValueChange?: (date: Date) => void;
}
interface CalendarRangeProps extends CalendarBaseProps {
    mode: "range";
    value?: DateRange;
    defaultValue?: DateRange;
    onValueChange?: (range: DateRange) => void;
}
export type CalendarProps = CalendarSingleProps | CalendarRangeProps;
declare const Calendar: React.ForwardRefExoticComponent<CalendarProps & React.RefAttributes<HTMLDivElement>>;
export { Calendar };
