# Tooltip


```tsx
import { Tooltip, TooltipProvider } from "@frontend-team/ui-kit"
```

> `TooltipProvider` must wrap your app (or the section using tooltips).

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `React.ReactNode` | required | Tooltip content |
| `title` | `React.ReactNode` | — | Optional bold title above content |
| `children` | `React.ReactElement` | required | Trigger element |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | Preferred side |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment |
| `delayDuration` | `number` | `400` | Hover delay in ms |
| `avoidCollisions` | `boolean` | `false` | Enable Radix collision-aware repositioning |
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Open state handler |
| `disabled` | `boolean` | `false` | If true, renders children only |
| `className` | `string` | — | Additional classes on tooltip content |

**Examples:**

```tsx
// Simple
<Tooltip content="Click to save">
<Button>Save</Button>
</Tooltip>

// With title
<Tooltip title="Keyboard shortcut" content="Press Ctrl+S to save">
<Button size="icon-m" aria-label="Save">
<Save />
</Button>
</Tooltip>

// Side/align
<Tooltip content="More options" side="right" align="start">
<Button variant="subtle" size="icon-m" aria-label="More">
<MoreHorizontal />
</Button>
</Tooltip>
```

---
