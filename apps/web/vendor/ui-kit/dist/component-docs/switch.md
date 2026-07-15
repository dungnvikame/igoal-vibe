# Switch


```tsx
import { Switch } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text |
| `description` | `string` | — | Helper text |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| `labelPosition` | `"left" \| "right"` | `"right"` | Label side |
| `checked` | `boolean` | — | Controlled state |
| `defaultChecked` | `boolean` | — | Uncontrolled default |
| `onCheckedChange` | `(checked: boolean) => void` | — | Change handler |
| `disabled` | `boolean` | — | Disabled state |

**Examples:**

```tsx
<Switch label="Enable notifications" />
<Switch
label="Dark mode"
checked={isDark}
onCheckedChange={setIsDark}
/>
<Switch label="Feature flag" labelPosition="left" />
```

---

