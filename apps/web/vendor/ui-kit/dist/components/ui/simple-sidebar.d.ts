import * as React from "react";
export interface SimpleSidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    activeIcon?: React.ReactNode;
    href?: string;
    disabled?: boolean;
}
export interface SimpleSidebarGroup {
    id: string;
    items: SimpleSidebarItem[];
}
export interface SimpleSidebarProps extends React.ComponentProps<"aside"> {
    groups: SimpleSidebarGroup[];
    activeId?: string;
    onNavigate?: (id: string, href?: string) => void;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    alwaysExpanded?: boolean;
    expandedWidth?: number;
    collapsedWidth?: number;
}
declare const SimpleSidebar: React.ForwardRefExoticComponent<Omit<SimpleSidebarProps, "ref"> & React.RefAttributes<HTMLElement>>;
export { SimpleSidebar };
