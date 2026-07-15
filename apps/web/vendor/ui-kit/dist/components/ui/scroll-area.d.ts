import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';
import * as React from "react";
export interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
    orientation?: "vertical" | "horizontal" | "both";
    viewportClassName?: string;
}
declare const ScrollArea: React.ForwardRefExoticComponent<ScrollAreaProps & React.RefAttributes<HTMLDivElement>>;
export { ScrollArea };
