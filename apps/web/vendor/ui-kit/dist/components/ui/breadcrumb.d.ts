import * as React from "react";
interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
}
interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    className?: string;
    maxItems?: number;
}
declare const Breadcrumb: React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<HTMLElement>>;
export { Breadcrumb };
export type { BreadcrumbItem, BreadcrumbProps };
