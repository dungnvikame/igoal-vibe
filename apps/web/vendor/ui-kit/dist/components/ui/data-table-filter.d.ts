interface DataTableFilterOption {
    label: string;
    value: string;
}
interface DataTableFilterDropdownProps {
    columnId: string;
    filterType?: "text" | "select";
    options?: DataTableFilterOption[];
    value: unknown;
    onApply: (value: string | string[]) => void;
    onReset: () => void;
}
declare function DataTableFilterDropdown({ columnId, filterType, options, value, onApply, onReset, }: DataTableFilterDropdownProps): import("react/jsx-runtime").JSX.Element;
export { DataTableFilterDropdown };
