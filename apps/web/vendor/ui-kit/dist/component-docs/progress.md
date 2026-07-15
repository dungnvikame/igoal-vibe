# Progress


```tsx
import { Progress } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current value (0–max) |
| `max` | `number` | `100` | Maximum value |
| `indeterminate` | `boolean` | `false` | Animated indeterminate state |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Bar height |
| `variant` | `"default" \| "success" \| "warning" \| "error"` | `"default"` | Color |
| `showLabel` | `boolean` | `false` | Shows percentage label |
| `label` | `string` | — | Custom label (overrides auto %) |

**Examples:**

```tsx
<Progress value={75} />
<Progress value={45} variant="success" showLabel />
<Progress value={90} variant="warning" max={100} />
<Progress indeterminate />
<Progress value={30} size="lg" showLabel label="3/10 tasks" />
```

---

