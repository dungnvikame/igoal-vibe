# Popover


```tsx
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "@frontend-team/ui-kit"
```

**Popover (compound) Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `React.ReactNode` | required | Trigger element |
| `children` | `React.ReactNode` | required | Popover content |
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Open state handler |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Preferred side |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Alignment |
| `sideOffset` | `number` | `8` | Gap from trigger |
| `portal` | `boolean` | `true` | Render content through a portal. Set to `false` inside Drawer/Modal when the popover content needs wheel/touch scrolling within the dialog layer. |

**Examples:**

```tsx
// Simple popover
<Popover
trigger={<Button variant="border">Options</Button>}
side="bottom"
align="start"
>
<div className="flex flex-col gap-2">
<Button variant="subtle">Edit</Button>
<Button variant="subtle">Duplicate</Button>
<Button variant="danger">Delete</Button>
</div>
</Popover>

// Primitive usage (more control)
<PopoverPrimitive.Root>
<PopoverTrigger asChild>
<Button>Open</Button>
</PopoverTrigger>
<PopoverContent>
<p>Custom content</p>
<PopoverClose asChild>
<Button size="s">Close</Button>
</PopoverClose>
</PopoverContent>
</PopoverPrimitive.Root>

// Inside Drawer / Modal: keep content in the dialog layer for wheel scroll
<Popover
trigger={<Button variant="border">Assign user</Button>}
portal={false}
>
<div className="max-h-64 overflow-y-auto">
{users.map((user) => (
<button key={user.id} type="button" className="block w-full text-left">
{user.name}
</button>
))}
</div>
</Popover>
```

---
