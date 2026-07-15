# Modal


```tsx
import { Modal, ModalTrigger } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Open state handler |
| `trigger` | `React.ReactNode` | — | Element that opens the modal |
| `title` | `string` | — | Modal title |
| `description` | `string` | — | Modal description |
| `children` | `React.ReactNode` | required | Modal body content |
| `footer` | `React.ReactNode` | — | Footer content (right-aligned) |
| `variant` | `"default" \| "spotlight"` | `"default"` | Modal style — `spotlight` removes the overlay and positions from top |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "full"` | `"md"` | Modal width |
| `showCloseButton` | `boolean` | `true` | Show X close button |
| `closeOnOverlayClick` | `boolean` | `true` | Close on backdrop click |
| `className` | `string` | — | Additional classes on modal content |
| `bodyClassName` | `string` | — | Additional classes on modal body |

**Examples:**

```tsx
// With trigger
<Modal
trigger={<Button>Open Modal</Button>}
title="Confirm Delete"
description="This action cannot be undone."
footer={
<>
<Button variant="border" onClick={() => setOpen(false)}>Cancel</Button>
<Button variant="danger" onClick={handleDelete}>Delete</Button>
</>
}
>
<p>Are you sure you want to delete this item?</p>
</Modal>

// Controlled
<Modal
open={open}
onOpenChange={setOpen}
title="Edit Profile"
size="lg"
>
<form>...</form>
</Modal>

// Spotlight modal — no overlay (command palette, global search, quick jump)
// - variant="spotlight": removes backdrop, anchors to top
// - size="2xl": 62vw wide, recommended for spotlight
// - bodyClassName="h-full flex flex-col": required for sticky footer layout
<Modal
variant="spotlight"
open={open}
onOpenChange={setOpen}
size="2xl"
showCloseButton={false}
bodyClassName="h-full flex flex-col"
>
  {/* Search bar — fixed at top */}
  <div className="flex items-center gap-3 px-4 py-3 border-b border_secondary">
    <input
      className="flex-1 bg-transparent outline-none text_primary placeholder:text_tertiary text-sm"
      placeholder="Search..."
      autoFocus
    />
  </div>

  {/* Results — scrollable, fills remaining height */}
  <div className="flex-1 overflow-y-auto py-2">
    {results.map((item) => (
      <div key={item.id} className="flex items-center gap-3 px-4 py-2 hover:bg_surface cursor-pointer">
        <span className="text-sm text_primary">{item.label}</span>
      </div>
    ))}
  </div>

  {/* Footer hint — pinned at bottom */}
  <div className="border-t border_secondary px-4 py-2 flex items-center gap-2">
    <span className="text-xs text_tertiary">Open</span>
    <kbd className="text-xs text_tertiary border border_secondary radius_4 px-1.5 py-0.5">↵</kbd>
  </div>
</Modal>
```

---
