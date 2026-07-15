# Checkbox


```tsx
import { Checkbox } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text (auto-linked via id) |
| `description` | `string` | — | Helper text below label |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| `checked` | `boolean \| "indeterminate"` | — | Controlled state |
| `defaultChecked` | `boolean` | — | Uncontrolled default |
| `onCheckedChange` | `(checked: boolean \| "indeterminate") => void` | — | Change handler |
| `disabled` | `boolean` | — | Disabled state |

**Examples:**

```tsx
<Checkbox label="Remember me" />
<Checkbox
label="Accept terms"
description="You must accept to continue"
checked={accepted}
onCheckedChange={setAccepted}
/>
<Checkbox label="Disabled" disabled />
```

---

