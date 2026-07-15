# Radio Group


```tsx
import { RadioGroup, RadioGroupItem } from "@frontend-team/ui-kit"
```

**RadioGroup Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Layout direction |
| `value` | `string` | — | Controlled value |
| `defaultValue` | `string` | — | Uncontrolled default |
| `onValueChange` | `(value: string) => void` | — | Change handler |

**RadioGroupItem Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Item value |
| `label` | `string` | — | Label text |
| `description` | `string` | — | Helper text |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| `disabled` | `boolean` | — | Disabled state |

**Examples:**

```tsx
<RadioGroup value={plan} onValueChange={setPlan}>
<RadioGroupItem value="free" label="Free" description="Up to 3 projects" />
<RadioGroupItem value="pro" label="Pro" description="Unlimited projects" />
<RadioGroupItem value="enterprise" label="Enterprise" disabled />
</RadioGroup>

// Horizontal layout
<RadioGroup orientation="horizontal" defaultValue="card">
<RadioGroupItem value="card" label="Card" />
<RadioGroupItem value="list" label="List" />
</RadioGroup>
```

---

