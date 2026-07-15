# Date Picker


Single date, time, or datetime picker.

```tsx
import { DatePicker } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"date" \| "time" \| "datetime"` | `"date"` | Calendar for date; scroll columns for time; calendar + scroll columns for datetime |
| `value` | `Date \| null` | — | Controlled value |
| `defaultValue` | `Date \| null` | — | Uncontrolled initial value |
| `onValueChange` | `(value: Date \| null) => void` | — | Change callback |
| `placeholder` | `string` | `"Select date"` / `"Select time"` / `"Select date & time"` | Trigger placeholder text |
| `minDate` | `Date` | — | Minimum selectable date (date mode only) |
| `maxDate` | `Date` | — | Maximum selectable date (date mode only) |
| `disabledDates` | `Date[] \| (date: Date) => boolean` | — | Disabled dates (date mode only) |
| `disabled` | `boolean` | `false` | Disables interaction |
| `size` | `"xs" \| "s" \| "m" \| "l" \| "xl"` | `"m"` | Trigger size |
| `variant` | `"light" \| "fill" \| "dim" \| "borderless"` | `"light"` | Trigger visual style |

```tsx
// Date picker
<DatePicker value={date} onValueChange={setDate} />

// Time picker
<DatePicker mode="time" value={time} onValueChange={setTime} />

// Date + Time in one picker
<DatePicker mode="datetime" value={datetime} onValueChange={setDatetime} />

// Side by side
<div className="flex gap-3">
<DatePicker placeholder="Select date" value={date} onValueChange={setDate} />
<DatePicker mode="time" placeholder="Select time" value={time} onValueChange={setTime} />
</div>
```

---
