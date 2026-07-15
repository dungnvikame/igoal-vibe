# Date Range Picker


```tsx
import { DateRangePicker } from "@frontend-team/ui-kit"
import type { DateRangePreset } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `DateRange` | — | Controlled range |
| `defaultValue` | `DateRange` | — | Uncontrolled default |
| `onValueChange` | `(range: DateRange) => void` | — | Change handler |
| `presets` | `DateRangePreset[]` | — | Quick-select preset ranges |
| `showPresets` | `boolean` | `true` | Show/hide preset panel |
| `minDate` | `Date` | — | Earliest selectable |
| `maxDate` | `Date` | — | Latest selectable |
| `disabledDates` | `Date[] \| ((date: Date) => boolean)` | — | Disabled dates |

**Examples:**

```tsx
<DateRangePicker
value={range}
onValueChange={setRange}
presets={[
{ label: "Last 7 days", range: { from: subDays(new Date(), 7), to: new Date() } },
{ label: "Last 30 days", range: { from: subDays(new Date(), 30), to: new Date() } },
]}
/>
```

---

