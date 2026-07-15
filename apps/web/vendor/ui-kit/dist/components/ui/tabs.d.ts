import { Tabs as TabsPrimitive } from 'radix-ui';
import { TabsColor, TabsVariant } from './tabs-variants';
import * as React from "react";
export interface TabsItem {
    value: string;
    label: React.ReactNode;
    content?: React.ReactNode;
    disabled?: boolean;
    triggerClassName?: string;
    contentClassName?: string;
}
export interface TabsProps extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, "children"> {
    items: readonly TabsItem[];
    variant?: TabsVariant;
    color?: TabsColor;
    tabHeight?: number | string;
    tabsListClassName?: string;
    triggerClassName?: string;
    contentClassName?: string;
}
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
export { Tabs };
