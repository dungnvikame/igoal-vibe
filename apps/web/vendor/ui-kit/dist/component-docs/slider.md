# Slider


```tsx
import { Slider } from "@frontend-team/ui-kit"
```

Wraps Radix UI Slider. Accepts all Radix Slider props.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number[]` | — | Controlled value(s) |
| `defaultValue` | `number[]` | — | Uncontrolled default |
| `onValueChange` | `(value: number[]) => void` | — | Change handler |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `disabled` | `boolean` | — | Disabled state |

**Examples:**

```tsx
// Single thumb
<Slider
defaultValue={[50]}
max={100}
step={1}
onValueChange={([v]) => setVolume(v)}
/>

// Range (two thumbs)
<Slider
defaultValue={[20, 80]}
min={0}
max={100}
onValueChange={([min, max]) => setRange({ min, max })}
/>
```

---

