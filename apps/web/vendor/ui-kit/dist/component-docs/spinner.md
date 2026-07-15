# Spinner


```tsx
import { Spinner } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | — | Size |
| `variant` | `"default" \| "inherit"` | — | `inherit` uses parent text color |
| `label` | `string` | `"Loading"` | aria-label |

**Examples:**

```tsx
<Spinner />
<Spinner size="lg" />
<Spinner variant="inherit" size="sm" />  // used inside Button
```

---

