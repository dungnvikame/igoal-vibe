# Tabs


```tsx
import { Tabs } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabsItem[]` | required | Tab data source |
| `variant` | `"default" \| "underline" \| "borderless"` | `"default"` | Tab style |
| `color` | `"orange" \| "primary"` | `"orange"` | Active text + underline color |
| `tabHeight` | `number \| string` | — | Trigger height (`36` or `"36px"`) |
| `value` | `string` | — | Controlled active tab |
| `defaultValue` | `string` | first enabled item | Uncontrolled initial value |
| `onValueChange` | `(value: string) => void` | — | Change handler |
| `tabsListClassName` | `string` | — | Extra classes on the tab list (`<TabsList>`) |
| `triggerClassName` | `string` | — | Extra classes on every trigger (global) |
| `contentClassName` | `string` | — | Extra classes on every content panel (global) |

Default tabs use a `bg_tertiary` track. The active thumb uses `bg_primary`, `text_primary`,
and `shadow_s`.

**Examples:**

```tsx
const items = [
{ value: "overview", label: "Overview", content: "Overview content" },
{ value: "analytics", label: "Analytics", content: "Analytics content" },
{ value: "settings", label: "Settings", content: "Settings content" },
]

// Default
<Tabs defaultValue="overview" items={items} />

// Borderless + custom color + custom height
<Tabs
defaultValue="overview"
variant="borderless"
color="primary"
tabHeight={36}
items={items}
/>

// Controlled
<Tabs value={activeTab} onValueChange={setActiveTab} items={items} />
```

---
