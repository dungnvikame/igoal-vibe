export interface PaginationProps {
    total: number;
    pageSize: number;
    pageIndex: number;
    onPageChange: (index: number) => void;
    onPageSizeChange?: (size: number) => void;
    pageSizeSuffix?: string;
    pageSizeOptions?: number[];
    showSizeSelector?: boolean;
    showTotal?: boolean;
    siblingCount?: number;
    renderTotal?: (start: number, end: number, total: number) => React.ReactNode;
    className?: string;
}
declare const Pagination: {
    ({ total, pageSize, pageIndex, onPageChange, onPageSizeChange, pageSizeSuffix, pageSizeOptions, showSizeSelector, showTotal, siblingCount, renderTotal, className, }: PaginationProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { Pagination };
