import * as React from "react";
export interface VirtualListProps<T> {
    items: T[];
    estimateSize: number | ((index: number) => number);
    renderItem: (item: T, index: number) => React.ReactNode;
    overscan?: number;
    className?: string;
    getItemKey?: (item: T, index: number) => string | number;
}
declare function VirtualList<T>({ items, estimateSize, renderItem, overscan, className, getItemKey, }: VirtualListProps<T>): import("react/jsx-runtime").JSX.Element;
declare namespace VirtualList {
    var displayName: string;
}
export { VirtualList };
