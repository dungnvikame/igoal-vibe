import { Column } from '@tanstack/react-table';
import * as React from "react";
export type DataTableSortDirection = "asc" | "desc";
export type DataTableSortValue = {
    key: string;
    direction: DataTableSortDirection;
};
export interface DataTableColumnDef<T> {
    id: string;
    header: string | React.ReactNode | ((ctx: {
        column: Column<T, unknown>;
    }) => React.ReactNode);
    accessorKey?: keyof T & string;
    cell?: (row: T, meta: DataTableCellMeta<T>) => React.ReactNode;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    align?: "left" | "center" | "right";
    pin?: "left" | "right";
    sortable?: boolean;
    filterable?: boolean;
    filterType?: "text" | "select";
    filters?: Array<{
        label: string;
        value: string;
    }>;
    expandTrigger?: boolean;
    groupBorder?: boolean;
    resizable?: boolean;
    columns?: DataTableColumnDef<T>[];
}
export interface DataTableCellMeta<T> {
    value: unknown;
    row: T;
    depth: number;
    isExpanded: boolean;
    canExpand: boolean;
    toggleExpand: () => void;
    rowIndex: number;
}
export interface DataTableRowSelectionConfig<T> {
    type?: "checkbox" | "radio";
    selectedRowKeys?: string[];
    defaultSelectedRowKeys?: string[];
    onChange?: (keys: string[], rows: T[]) => void;
    getCheckboxProps?: (row: T) => {
        disabled?: boolean;
    };
    columnWidth?: number;
}
export interface DataTableExpandableConfig<T> {
    expandedRowRender?: (row: T, depth: number) => React.ReactNode;
    rowExpandable?: (row: T) => boolean;
    expandedRowKeys?: string[];
    defaultExpandedRowKeys?: string[];
    onExpandedRowsChange?: (keys: string[]) => void;
    expandColumnWidth?: number;
}
export interface DataTablePaginationConfig {
    pageIndex: number;
    pageSize: number;
    total: number;
    onChange: (pageIndex: number, pageSize: number) => void;
    pageSizeOptions?: number[];
    showSizeSelector?: boolean;
    showTotal?: boolean;
    position?: "bottom" | "top" | "both";
    /** Set to true for server-side pagination (data is already paginated) */
    manual?: boolean;
}
export interface DataTableProps<T extends object> {
    data: T[];
    columns: DataTableColumnDef<T>[];
    getRowKey?: (row: T, index: number) => string;
    loading?: boolean;
    emptyMessage?: string | React.ReactNode;
    bordered?: boolean;
    striped?: boolean;
    size?: "default" | "compact";
    stickyHeader?: boolean;
    scroll?: {
        x?: number | string;
        y?: number | string;
    };
    className?: string;
    defaultSort?: DataTableSortValue;
    sort?: DataTableSortValue | null;
    onSortChange?: (sort: DataTableSortValue | null) => void;
    multiSort?: boolean;
    onFilterChange?: (filters: Record<string, unknown>) => void;
    rowSelection?: DataTableRowSelectionConfig<T>;
    expandable?: DataTableExpandableConfig<T>;
    getSubRows?: (row: T) => T[] | undefined;
    defaultExpanded?: boolean;
    defaultExpandedRowIds?: string[];
    pagination?: DataTablePaginationConfig | false;
    columnVisibility?: Record<string, boolean>;
    onColumnVisibilityChange?: (visibility: Record<string, boolean>) => void;
    summary?: (data: T[]) => React.ReactNode;
    onRow?: (row: T) => Pick<React.HTMLAttributes<HTMLTableRowElement>, "onClick" | "onDoubleClick" | "onMouseEnter" | "onMouseLeave" | "onContextMenu">;
    virtual?: boolean;
    onMultiSortChange?: (sorts: DataTableSortValue[]) => void;
}
export interface DataTableColumnMeta {
    align?: "left" | "center" | "right";
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    pin?: "left" | "right";
    groupBorder?: boolean;
    resizable?: boolean;
}
