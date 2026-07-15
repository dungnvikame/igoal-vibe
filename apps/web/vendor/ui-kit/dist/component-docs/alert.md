# Alert


```tsx
import { Alert } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "success" \| "warning" \| "error" \| "info"` | `"default"` | Alert type (also determines icon) |
| `title` | `string` | — | Bold title |
| `description` | `string` | — | Description text |
| `icon` | `React.ReactNode` | — | Custom icon (overrides default) |
| `onClose` | `() => void` | — | Shows X button when provided |
| `action` | `React.ReactNode` | — | Action element (shown below description) |
| `children` | `React.ReactNode` | — | Additional custom content |

**Examples:**

```tsx
<Alert variant="success" title="Saved!" description="Your changes have been saved." />
<Alert variant="error" title="Error" description="Failed to save. Try again." onClose={() => setVisible(false)} />
<Alert
variant="warning"
title="Storage almost full"
description="You've used 90% of your storage."
action={<Button size="s" variant="border">Upgrade</Button>}
/>
```

---

