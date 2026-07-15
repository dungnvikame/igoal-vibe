# VirtualList


```tsx
import { VirtualList } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `T[]` | required | Data array |
| `estimateSize` | `number \| ((index: number) => number)` | required | Estimated row height in px |
| `renderItem` | `(item: T, index: number) => React.ReactNode` | required | Row renderer |
| `overscan` | `number` | `5` | Extra rows to render outside viewport |
| `getItemKey` | `(item: T, index: number) => string \| number` | — | Key extractor |
| `className` | `string` | — | Container class (must set height) |

**Examples:**

```tsx
<VirtualList
items={users}
estimateSize={48}
className="h-96"
getItemKey={(user) => user.id}
renderItem={(user) => (
<div className="flex items-center gap-2 px-4 py-2">
<Avatar src={user.avatar} alt={user.name} size="s" />
<span>{user.name}</span>
</div>
)}
/>
```

---

