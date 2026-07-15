# Badge


```tsx
import { Badge, NotiBadge } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "primary" \| "success" \| "warning" \| "error" \| "info" \| "outline"` | `"default"` | Semantic style |
| `color` | `"light" \| "white" \| "gray" \| "orange" \| "amber" \| "yellow" \| "lime" \| "green" \| "emerald" \| "teal" \| "cyan" \| "sky" \| "blue" \| "indigo" \| "violet" \| "purple" \| "fuchsia" \| "pink" \| "red"` | - | Color palette (use instead of variant for custom colors). `white` is a deprecated alias for `light`. |
| `size` | `"xs" \| "s" \| "m" \| "l" \| "xl"` | `"m"` | Size |
| `bordered` | `boolean` | `true` | Show border |
| `rounded` | `boolean` | `true` | Full pill shape (radius_round). Set `false` for radius_4 corners at every size. |
| `dot` | `boolean` | `false` | Show dot indicator |
| `iconLeft` | `React.ReactNode` | - | 12px leading icon slot |
| `iconRight` | `React.ReactNode` | - | 12px trailing icon slot |

> Note: `variant` and `color` are mutually exclusive - use one or the other.

**NotiBadge Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"l" \| "m" \| "s"` | `"l"` | Notification badge size: 24px, 16px, or 8px dot |
| `color` | `"red" \| "gray" \| "orange" \| "amber" \| "yellow" \| "lime" \| "green" \| "emerald" \| "teal" \| "cyan" \| "sky" \| "blue" \| "indigo" \| "violet" \| "purple" \| "fuchsia" \| "pink"` | `"red"` | Contrast color token |
| `count` | `number` | - | Count to display for L/M sizes |
| `max` | `number` | `99` | Count overflow threshold |
| `overflowLabel` | `React.ReactNode` | ```${max}+``` | Custom overflow content |

**Examples:**

```tsx
// Semantic variants
<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="info">Info</Badge>

// Color palette
// Rounded (default - pill shape)
<Badge color="light">Light</Badge>
<Badge color="blue">In Progress</Badge>
<Badge color="orange">Review</Badge>

// Square corners
<Badge color="blue" rounded={false}>Tag</Badge>

// With dot
<Badge variant="success" dot>Online</Badge>

// With icon slots
<Badge color="green" iconLeft={<Check />}>Approved</Badge>
<Badge color="red" iconRight={<X />}>Needs review</Badge>

// Sizes
<Badge size="xs">xs</Badge>
<Badge size="l">Large</Badge>

// Notification badge
<NotiBadge count={7} />
<NotiBadge size="m" count={12} />
<NotiBadge size="s" aria-label="Unread notifications" />
<NotiBadge count={128} />
<NotiBadge color="gray" count={9} />
```

---
