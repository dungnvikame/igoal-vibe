# Segmented Control


```tsx
import { SegmentedControl } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SegmentedControlOption[]` | required | Options list |
| `value` | `string` | — | Controlled value |
| `defaultValue` | `string` | — | Uncontrolled default |
| `onValueChange` | `(value: string) => void` | — | Change handler |
| `size` | `"xs" \| "s" \| "m" \| "l"` | `"m"` | Size |
| `disabled` | `boolean` | `false` | Disables all options |

The DS 1.1 track uses `bg_tertiary`. Active items use `bg_primary` with `shadow_s`.
All sizes use the generated `h_segmented_button` and `px_segmented_button` token utilities
for the 26px item height and 10px horizontal padding.

```tsx
interface SegmentedControlOption {
value: string
label: React.ReactNode
icon?: React.ReactNode
disabled?: boolean
}
```

**Examples:**

```tsx
<SegmentedControl
options={[
{ value: "day", label: "Day" },
{ value: "week", label: "Week" },
{ value: "month", label: "Month" },
]}
defaultValue="week"
onValueChange={(v) => setView(v)}
/>

// With icons
<SegmentedControl
options={[
{ value: "grid", label: "Grid", icon: <LayoutGrid className="h-4 w-4" /> },
{ value: "list", label: "List", icon: <List className="h-4 w-4" /> },
]}
value={layout}
onValueChange={setLayout}
/>
```

---
