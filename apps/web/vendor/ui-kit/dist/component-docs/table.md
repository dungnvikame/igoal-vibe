# DataTable

Full-featured table component. No need to install `@tanstack/react-table` — it is bundled internally.

Supports: sorting, filtering, row selection, expandable rows, tree rows, column pinning, pagination, virtualization, grouped headers, summary row, column resize.

```tsx
import { DataTable, type DataTableColumnDef } from "@frontend-team/ui-kit"
```

---

**`DataTableColumnDef<T>` — column definition:**

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Required unique column id |
| `header` | `string \| ReactNode \| ((ctx) => ReactNode)` | Header label or renderer |
| `accessorKey` | `keyof T` | Auto-read this key from row data |
| `cell` | `(row: T, meta: DataTableCellMeta<T>) => ReactNode` | Custom cell renderer |
| `width` | `number` | Column width in px |
| `minWidth` | `number` | Min width in px |
| `maxWidth` | `number` | Max width in px |
| `align` | `"left" \| "center" \| "right"` | Cell alignment (default `"left"`) |
| `pin` | `"left" \| "right"` | Pin (sticky) column to left or right edge |
| `sortable` | `boolean` | Enable click-to-sort |
| `filterable` | `boolean` | Enable filter dropdown in header |
| `filterType` | `"text" \| "select"` | Filter input type (default `"text"`) |
| `filters` | `{ label: string; value: string }[]` | Options for `filterType: "select"` |
| `expandTrigger` | `boolean` | Render expand toggle + depth indent in this column |
| `groupBorder` | `boolean` | Add right border to visually separate column groups |
| `resizable` | `boolean` | Allow user to drag-resize this column |
| `columns` | `DataTableColumnDef<T>[]` | Nested columns — creates grouped multi-level header |

**`DataTableCellMeta<T>` — second argument of `cell` renderer:**

```tsx
{
  value: unknown        // raw value from accessorKey
  row: T               // original row data object
  depth: number        // nesting depth (0 = root row)
  isExpanded: boolean
  canExpand: boolean
  toggleExpand: () => void
  rowIndex: number
}
```

---

**`DataTableProps<T>`:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | required | Row data |
| `columns` | `DataTableColumnDef<T>[]` | required | Column definitions |
| `getRowKey` | `(row: T, index: number) => string` | — | Custom row key (uses index by default) |
| `loading` | `boolean` | `false` | Show skeleton rows |
| `emptyMessage` | `string \| ReactNode` | `"No data"` | Empty state content |
| `bordered` | `boolean` | `false` | Border + radius around table |
| `striped` | `boolean` | `false` | Alternating row background |
| `size` | `"default" \| "compact"` | `"default"` | Row density |
| `stickyHeader` | `boolean` | `false` | Sticky `<thead>` |
| `scroll` | `{ x?: number \| string; y?: number \| string }` | — | Horizontal / vertical scroll. `y` required for `virtual` |
| `className` | `string` | — | Wrapper class |
| `defaultSort` | `{ key: string; direction: "asc" \| "desc" }` | — | Initial sort (uncontrolled) |
| `sort` | `{ key: string; direction: "asc" \| "desc" } \| null` | — | Controlled sort state |
| `onSortChange` | `(sort \| null) => void` | — | Sort change callback |
| `multiSort` | `boolean` | `false` | Allow sorting by multiple columns (Shift+click) |
| `onMultiSortChange` | `(sorts: Array<{ key: string; direction: "asc" \| "desc" }>) => void` | — | Multi-sort callback |
| `onFilterChange` | `(filters: Record<string, unknown>) => void` | — | Filter change callback |
| `rowSelection` | `DataTableRowSelectionConfig<T>` | — | Row selection config (see below) |
| `expandable` | `DataTableExpandableConfig<T>` | — | Custom expandable row config (see below) |
| `getSubRows` | `(row: T) => T[] \| undefined` | — | Enable tree rows |
| `defaultExpanded` | `boolean` | `false` | Start with all rows expanded |
| `defaultExpandedRowIds` | `string[]` | — | Start with specific row ids expanded |
| `pagination` | `DataTablePaginationConfig \| false` | — | Pagination config (see below) |
| `columnVisibility` | `Record<string, boolean>` | — | Controlled column visibility |
| `onColumnVisibilityChange` | `(visibility: Record<string, boolean>) => void` | — | Column visibility callback |
| `summary` | `(data: T[]) => ReactNode` | — | Summary row in `<tfoot>`. Return an array for per-cell content. |
| `onRow` | `(row: T) => HTMLAttributes` | — | Row event handlers (`onClick`, `onDoubleClick`, etc.) |
| `virtual` | `boolean` | `false` | Virtual scrolling for large lists (requires `scroll.y`) |

**`DataTableRowSelectionConfig<T>`:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"checkbox" \| "radio"` | `"checkbox"` | Selection mode |
| `selectedRowKeys` | `string[]` | — | Controlled selected keys |
| `defaultSelectedRowKeys` | `string[]` | — | Initial selected keys (uncontrolled) |
| `onChange` | `(keys: string[], rows: T[]) => void` | — | Selection change callback |
| `getCheckboxProps` | `(row: T) => { disabled?: boolean }` | — | Disable specific rows |
| `columnWidth` | `number` | `48` | Selection column width |

**`DataTableExpandableConfig<T>`:**

| Prop | Type | Description |
|------|------|-------------|
| `expandedRowRender` | `(row: T, depth: number) => ReactNode` | Render expanded content below the row |
| `rowExpandable` | `(row: T) => boolean` | Control which rows can expand |
| `expandedRowKeys` | `string[]` | Controlled expanded keys |
| `defaultExpandedRowKeys` | `string[]` | Initial expanded keys (uncontrolled) |
| `onExpandedRowsChange` | `(keys: string[]) => void` | Expand/collapse callback |
| `expandColumnWidth` | `number` | Width of the auto-generated expand toggle column |

**`DataTablePaginationConfig`:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pageIndex` | `number` | required | Current page (0-indexed) |
| `pageSize` | `number` | required | Rows per page |
| `total` | `number` | required | Total row count |
| `onChange` | `(pageIndex: number, pageSize: number) => void` | required | Page/size change handler |
| `pageSizeOptions` | `number[]` | `[10, 20, 50, 100]` | Page size options |
| `showSizeSelector` | `boolean` | — | Show page size selector |
| `showTotal` | `boolean` | — | Show "X–Y of Z" label |
| `position` | `"bottom" \| "top" \| "both"` | `"bottom"` | Pagination placement |
| `manual` | `boolean` | — | Force server-side mode. Auto-detected when `total > data.length`. |

---

**Examples:**

```tsx
// ── Basic flat table ───────────────────────────────────────────────────────
type User = { id: string; name: string; role: string; status: string }

const columns: DataTableColumnDef<User>[] = [
  { id: "name",   header: "Name",   accessorKey: "name" },
  { id: "role",   header: "Role",   accessorKey: "role" },
  { id: "status", header: "Status", accessorKey: "status",
    cell: (row) => <Badge variant={row.status === "active" ? "success" : "default"}>{row.status}</Badge>
  },
]

<DataTable data={users} columns={columns} bordered />


// ── Sorting + filtering ────────────────────────────────────────────────────
const columns: DataTableColumnDef<User>[] = [
  { id: "name", header: "Name", accessorKey: "name", sortable: true, filterable: true },
  { id: "role", header: "Role", accessorKey: "role",
    filterable: true, filterType: "select",
    filters: [{ label: "Admin", value: "admin" }, { label: "Editor", value: "editor" }],
  },
]

<DataTable
  data={users}
  columns={columns}
  defaultSort={{ key: "name", direction: "asc" }}
  onFilterChange={(filters) => console.log(filters)}
  bordered
/>


// ── Server-side sort + pagination ──────────────────────────────────────────
const [sort, setSort] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
const [pageIndex, setPageIndex] = useState(0)
const [pageSize, setPageSize] = useState(20)

<DataTable
  data={data}
  columns={columns}
  sort={sort}
  onSortChange={setSort}
  pagination={{
    pageIndex,
    pageSize,
    total: 530,
    onChange: (page, size) => { setPageIndex(page); setPageSize(size) },
    showTotal: true,
    showSizeSelector: true,
  }}
  bordered
/>


// ── Row selection ──────────────────────────────────────────────────────────
const [selectedKeys, setSelectedKeys] = useState<string[]>([])

<DataTable
  data={users}
  columns={columns}
  getRowKey={(row) => row.id}
  rowSelection={{
    selectedRowKeys: selectedKeys,
    onChange: (keys) => setSelectedKeys(keys),
    getCheckboxProps: (row) => ({ disabled: row.role === "admin" }),
  }}
  bordered
/>


// ── Expandable rows (custom content below row) ─────────────────────────────
<DataTable
  data={orders}
  columns={columns}
  getRowKey={(row) => row.id}
  expandable={{
    rowExpandable: (row) => row.items.length > 0,
    expandedRowRender: (row) => (
      <div className="p-4">
        <p className="text_secondary">{row.items.length} items</p>
      </div>
    ),
  }}
  bordered
/>


// ── Tree rows (nested subRows) ─────────────────────────────────────────────
type OrgRow = { id: string; name: string; headcount: number; subRows?: OrgRow[] }

const columns: DataTableColumnDef<OrgRow>[] = [
  {
    id: "name",
    header: "Department",
    accessorKey: "name",
    expandTrigger: true,   // renders expand button + depth indent automatically
  },
  { id: "headcount", header: "Headcount", accessorKey: "headcount", align: "center" },
]

<DataTable
  data={orgData}
  columns={columns}
  getSubRows={(row) => row.subRows}
  getRowKey={(row) => row.id}
  defaultExpanded
  bordered
/>


// ── Grouped (multi-level) headers + pinned columns ─────────────────────────
type HiringRow = {
  id: string
  position: string
  t1_target: number; t1_actual: number; t1_need: number
  t2_target: number; t2_actual: number; t2_need: number
  subRows?: HiringRow[]
}

const columns: DataTableColumnDef<HiringRow>[] = [
  {
    id: "position",
    header: "Position",
    accessorKey: "position",
    width: 220,
    pin: "left",          // sticky to left edge, offset calculated automatically
    expandTrigger: true,
  },
  {
    id: "t1",
    header: "Month 1",    // group header — spans sub-columns
    columns: [
      { id: "t1_target", header: "Target", accessorKey: "t1_target", width: 90, align: "center" },
      { id: "t1_actual", header: "Actual", accessorKey: "t1_actual", width: 90, align: "center" },
      { id: "t1_need",   header: "Need",   accessorKey: "t1_need",   width: 90, align: "center", groupBorder: true },
    ],
  },
  {
    id: "t2",
    header: "Month 2",
    columns: [
      { id: "t2_target", header: "Target", accessorKey: "t2_target", width: 90, align: "center" },
      { id: "t2_actual", header: "Actual", accessorKey: "t2_actual", width: 90, align: "center" },
      { id: "t2_need",   header: "Need",   accessorKey: "t2_need",   width: 90, align: "center" },
    ],
  },
]

<DataTable
  data={hiringData}
  columns={columns}
  getSubRows={(row) => row.subRows}
  getRowKey={(row) => row.id}
  bordered
  stickyHeader
  defaultExpanded
/>


// ── Summary row ────────────────────────────────────────────────────────────
<DataTable
  data={data}
  columns={columns}
  summary={(rows) => [
    <span className="font-semibold">Total</span>,
    rows.reduce((sum, r) => sum + r.target, 0),
    rows.reduce((sum, r) => sum + r.actual, 0),
  ]}
  bordered
/>


// ── Virtual scrolling (large datasets) ────────────────────────────────────
<DataTable
  data={tenThousandRows}
  columns={columns}
  virtual
  scroll={{ y: 600 }}
  bordered
/>


// ── Row click handler ──────────────────────────────────────────────────────
<DataTable
  data={data}
  columns={columns}
  onRow={(row) => ({
    onClick: () => router.push(`/detail/${row.id}`),
  })}
  bordered
/>
```

---
