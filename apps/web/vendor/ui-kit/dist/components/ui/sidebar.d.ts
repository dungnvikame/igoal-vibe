import * as React from "react";
export interface SidebarNavItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    href?: string;
    children?: SidebarNavItem[];
    badge?: React.ReactNode;
    dot?: boolean;
    disabled?: boolean;
    /** Only applies when item has children. Open by default (user can still close). */
    defaultOpen?: boolean;
    /** Only applies when item has children. Always open, cannot be collapsed. */
    alwaysOpen?: boolean;
}
export interface SidebarNavGroup {
    id: string;
    label?: string;
    items: SidebarNavItem[];
}
interface SidebarTriggerProps {
    isHideWhenSidebarOpen?: boolean;
    className?: string;
    icon?: React.ReactNode;
}
declare const SidebarTrigger: React.ForwardRefExoticComponent<SidebarTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface SidebarProps extends React.ComponentProps<"aside"> {
    defaultCollapsed?: boolean;
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    collapseMode?: "collapse" | "hide";
}
declare const Sidebar: React.ForwardRefExoticComponent<Omit<SidebarProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface SidebarHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
    logo?: React.ReactNode;
    title?: React.ReactNode;
}
declare const SidebarHeader: React.ForwardRefExoticComponent<Omit<SidebarHeaderProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SidebarContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface SidebarSectionProps extends React.ComponentProps<"div"> {
    label?: string;
    panel?: boolean;
}
declare const SidebarSection: React.ForwardRefExoticComponent<Omit<SidebarSectionProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface SidebarItemProps extends Omit<React.ComponentProps<"button">, "children" | "onClick"> {
    icon?: React.ReactNode;
    label?: string;
    href?: string;
    badge?: React.ReactNode;
    dot?: boolean;
    active?: boolean;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    alwaysOpen?: boolean;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
}
declare const SidebarItem: React.ForwardRefExoticComponent<Omit<SidebarItemProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface SidebarSubItemProps extends Omit<React.ComponentProps<"button">, "onClick"> {
    icon?: React.ReactNode;
    label: string;
    href?: string;
    active?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
}
declare const SidebarSubItem: React.ForwardRefExoticComponent<Omit<SidebarSubItemProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface SidebarFooterProps extends React.ComponentProps<"div"> {
    avatarSrc?: string;
    avatarFallback?: string;
    name?: string;
    role?: string;
}
declare const SidebarFooter: React.ForwardRefExoticComponent<Omit<SidebarFooterProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface BlockSidebarLayoutProps {
    groups: SidebarNavGroup[];
    footerGroups?: SidebarNavGroup[];
    onNavigate?: (id: string, href?: string) => void;
    activeId?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    defaultCollapsed?: boolean;
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    collapseMode?: "collapse" | "hide";
    children?: React.ReactNode;
    className?: string;
    contentClassName?: string;
}
declare const BlockSidebarLayout: React.ForwardRefExoticComponent<BlockSidebarLayoutProps & React.RefAttributes<HTMLDivElement>>;
export { Sidebar, SidebarHeader, SidebarContent, SidebarSection, SidebarItem, SidebarSubItem, SidebarFooter, SidebarTrigger, BlockSidebarLayout, };
