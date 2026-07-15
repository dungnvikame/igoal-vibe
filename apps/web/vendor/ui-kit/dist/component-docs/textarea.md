# Textarea


Multi-line text input with optional auto-grow.

```tsx
import { Textarea } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"light" \| "fill" \| "dim" \| "borderless"` | `"light"` | Visual style |
| `size` | `"xs" \| "s" \| "m" \| "l" \| "xl"` | `"m"` | Padding/font size |
| `autosize` | `boolean` | `false` | Auto-grows with content |
| `minRows` | `number` | `3` | Minimum visible rows |
| `maxRows` | `number` | — | Maximum rows before scrolling (only with `autosize`) |
| All native `<textarea>` props | — | — | `placeholder`, `disabled`, `value`, `onChange`, etc. |

```tsx
// Static
<Textarea placeholder="Enter your message..." />

// Auto-grow, capped at 6 rows
<Textarea autosize minRows={2} maxRows={6} placeholder="Type here..." />
```

---

