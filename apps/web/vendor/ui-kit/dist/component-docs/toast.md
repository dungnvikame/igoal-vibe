# Toast


```tsx
import { Toaster, toast } from "@frontend-team/ui-kit"
```

**Setup in app root:**

```tsx
// Uses default position ("top-right")
<Toaster />
```

**Toaster Props:**

| Prop | Type | Default |
|------|------|---------|
| `position` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"top-right"` |
| `expand` | `boolean` | — |
| `richColors` | `boolean` | `true` |
| `closeButton` | `boolean` | `true` |
| `duration` | `number` | `4000` |
| `className` | `string` | — |

**Usage:**

```tsx
toast("Message")
toast.success("Saved successfully!")
toast.error("Something went wrong.")
toast.warning("Storage almost full.")
toast.info("New update available.")
toast.loading("Saving...")
toast.promise(saveData(), {
loading: "Saving...",
success: "Saved!",
error: "Failed to save.",
})
```

---
