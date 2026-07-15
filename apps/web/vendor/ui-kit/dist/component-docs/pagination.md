# Pagination


```tsx
import { Pagination } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `total` | `number` | required | Total number of items |
| `pageSize` | `number` | required | Items per page |
| `pageIndex` | `number` | required | Current page (0-indexed) |
| `onPageChange` | `(index: number) => void` | required | Page change handler |
| `onPageSizeChange` | `(size: number) => void` | — | Enables page size selector |
| `pageSizeSuffix` | `string` | `""` | Suffix appended to each page size option label (e.g., "/ trang" -> "20 / trang") |
| `pageSizeOptions` | `number[]` | `[10, 20, 50, 100]` | Size options |
| `showSizeSelector` | `boolean` | — | Force show/hide size selector |
| `showTotal` | `boolean` | `true` | Shows "Showing X-Y of Z" |
| `siblingCount` | `number` | `1` | Pages shown around current page |
| `renderTotal` | `(start: number, end: number, total: number) => React.ReactNode` | — | Custom total summary renderer |
| `className` | `string` | — | Additional wrapper classes |

**Examples:**

```tsx
<Pagination
total={230}
pageSize={pageSize}
pageIndex={pageIndex}
onPageChange={setPageIndex}
onPageSizeChange={setPageSize}
showTotal
/>
```

---
