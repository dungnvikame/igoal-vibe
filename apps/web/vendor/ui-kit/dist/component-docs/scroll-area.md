# ScrollArea


```tsx
import { ScrollArea } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"vertical" \| "horizontal" \| "both"` | `"vertical"` | Scrollbar direction |
| `viewportClassName` | `string` | — | Class for inner viewport |
| All Radix ScrollArea.Root props | — | — | — |

**Examples:**

```tsx
// Vertical scroll (most common)
<ScrollArea className="h-64">
{items.map((item) => <div key={item.id}>{item.name}</div>)}
</ScrollArea>

// Both axes
<ScrollArea className="h-64 w-full" orientation="both">
<div className="w-[1200px]">Wide content</div>
</ScrollArea>
```

---

