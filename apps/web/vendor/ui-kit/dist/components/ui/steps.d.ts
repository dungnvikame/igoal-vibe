import * as React from "react";
export interface Step {
    /** Primary content: displayed below the indicator (horizontal) or to the right (vertical) */
    content?: React.ReactNode;
    /** Secondary content: displayed above the indicator (horizontal) or to the left (vertical) */
    secondaryContent?: React.ReactNode;
    /** Custom icon node — used only when Steps variant="icon" */
    icon?: React.ReactNode;
}
export interface StepsProps {
    steps: Step[];
    currentStep: number;
    orientation?: "horizontal" | "vertical";
    /** "number" = numbered circles (default), "dot" = small dots, "icon" = custom icon per step */
    variant?: "number" | "dot" | "icon";
    className?: string;
}
declare const Steps: React.ForwardRefExoticComponent<StepsProps & React.RefAttributes<HTMLDivElement>>;
export { Steps };
