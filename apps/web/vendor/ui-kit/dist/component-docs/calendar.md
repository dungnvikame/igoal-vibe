# Calendar


```tsx
import { Calendar } from "@frontend-team/ui-kit"
import type { DateRange } from "@frontend-team/ui-kit"
```

**Props (single mode):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"single"` | `"single"` | Single date selection |
| `value` | `Date` | — | Controlled date |
| `defaultValue` | `Date` | — | Uncontrolled default |
| `onValueChange` | `(date: Date) => void` | — | Change handler |
| `minDate` | `Date` | — | Earliest selectable date |
| `maxDate` | `Date` | — | Latest selectable date |
| `disabledDates` | `Date[] \| ((date: Date) => boolean)` | — | Disabled dates |
| `dayDecorators` | `DayDecoratorRule[]` | — | Optional recurring/scheduled day markers (below icon row or background). |
| `weekDayLabels` | `[string, string, string, string, string, string, string]` | `["Mon", ..., "Sun"]` | Custom labels for weekdays |

**Props (range mode):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"range"` | required | Range selection |
| `value` | `DateRange` | — | `{ from?: Date, to?: Date }` |
| `defaultValue` | `DateRange` | — | Uncontrolled default range |
| `onValueChange` | `(range: DateRange) => void` | — | Change handler |
| `dayDecorators` | `DayDecoratorRule[]` | — | Optional recurring/scheduled day markers (below icon row or background). |

**`DayDecoratorRule`:**

```tsx
type DayDecoratorRule =
| {
type: "range"
from: Date
to: Date
icon?: React.ReactNode
backgroundClass?: string
display?: "below" | "background" // default: "below"
}
| {
type: "weekly"
weekdays: number[] // 0=Sun ... 6=Sat
icon?: React.ReactNode
backgroundClass?: string
display?: "below" | "background" // default: "below"
}
| {
type: "yearly"
month: number // 0=Jan ... 11=Dec
day: number
icon?: React.ReactNode
backgroundClass?: string
display?: "below" | "background" // default: "below"
}
```

**Examples:**

```tsx
// Single date
<Calendar
value={date}
onValueChange={setDate}
/>

// Date range
<Calendar
mode="range"
value={range}
onValueChange={setRange}
/>

// With constraints
<Calendar
minDate={new Date()}
maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
disabledDates={(date) => date.getDay() === 0} // disable Sundays
/>

// Decorators: mark weekends every week
const weekendDecorators = [
{
type: "weekly",
weekdays: [0, 6],
icon: <span className="h-1.5 w-1.5 radius_round bg_accent_secondary" />,
},
] satisfies DayDecoratorRule[]

<Calendar dayDecorators={weekendDecorators} />

// Decorators: mark yearly fixed holidays
const holidayDecorators = [
{ type: "yearly", month: 0, day: 1, icon: <Flag className="h-2.5 w-2.5 fg_warning" /> },
{ type: "yearly", month: 3, day: 30, icon: <Flag className="h-2.5 w-2.5 fg_warning" /> },
{ type: "yearly", month: 4, day: 1, icon: <Flag className="h-2.5 w-2.5 fg_warning" /> },
{ type: "yearly", month: 8, day: 2, icon: <Flag className="h-2.5 w-2.5 fg_warning" /> },
] satisfies DayDecoratorRule[]

<Calendar dayDecorators={holidayDecorators} />
```

---
