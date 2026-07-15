# Select

```tsx
import { Select } from "@frontend-team/ui-kit"
```

**Props:**

| Prop                | Type                                         | Default                          | Description                                                                                         |
| ------------------- | -------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------- |
| `options`           | `SelectOption[]`                             | required                         | List of options                                                                                     |
| `value`             | `string \| string[]`                         | -                                | Controlled value                                                                                    |
| `defaultValue`      | `string \| string[]`                         | -                                | Uncontrolled default                                                                                |
| `onValueChange`     | `(value: string \| string[]) => void`        | -                                | Change handler                                                                                      |
| `multiple`          | `boolean`                                    | `false`                          | Multi-select mode                                                                                   |
| `searchable`        | `boolean`                                    | auto                             | Enables search input; automatically enabled for more than 10 options or when `onSearch` is set      |
| `clearable`         | `boolean`                                    | `false`                          | Shows clear button                                                                                  |
| `required`          | `boolean`                                    | `false`                          | Applies required validation when `name` is provided                                                 |
| `name`              | `string`                                     | -                                | Renders a hidden form input with this name                                                          |
| `placeholder`       | `string`                                     | `"Select..."`                    | Placeholder text                                                                                    |
| `searchPlaceholder` | `string`                                     | `"Search..."`                    | Search input placeholder                                                                            |
| `emptyMessage`      | `string`                                     | `"No options found"`             | Message when no results                                                                             |
| `loadingMessage`    | `string`                                     | `"Loading..."`                   | Message while options are loading                                                                   |
| `preparingMessage`  | `string`                                     | `"Preparing options..."`         | Message while a virtual list is initialized                                                         |
| `size`              | `"xs" \| "s" \| "m" \| "l" \| "xl"`          | `"m"`                            | Size                                                                                                |
| `variant`           | `"light" \| "fill" \| "dim" \| "borderless"` | `"light"`                        | Visual style                                                                                        |
| `validation`        | `"error"`                                    | -                                | Applies error border styling without changing background                                            |
| `disabled`          | `boolean`                                    | `false`                          | Disables the select                                                                                 |
| `loading`           | `boolean`                                    | `false`                          | Shows loading state                                                                                 |
| `portalContainer`   | `HTMLElement \| null`                        | `undefined`                      | Custom portal container for dropdown content (recommended in Drawer/Modal/Popover layered contexts) |
| `groups`            | `SelectGroup[]`                              | -                                | Option groups                                                                                       |
| `maxDisplayedTags`  | `number`                                     | -                                | Max tags shown in multi-select                                                                      |
| `overflowLabel`     | `(count: number) => string`                  | ``(count) => `+${count} more` `` | Label for hidden selected tags                                                                      |
| `onSearch`          | `(query: string) => Promise<SelectOption[]>` | -                                | Async search handler                                                                                |
| `aria-invalid`      | `boolean`                                    | -                                | Marks the trigger as invalid                                                                        |
| `aria-describedby`  | `string`                                     | -                                | Associates supporting or error text with the trigger                                                |
| `id`                | `string`                                     | -                                | Trigger id for label wiring                                                                         |
| `className`         | `string`                                     | -                                | Additional trigger classes                                                                          |

**Size ladder:** XS 32px / S 36px / M 40px / L 48px / XL 56px. Multi-select triggers use the same values as their minimum heights, and virtualized dropdown rows estimate 48px (64px with descriptions).
Focused triggers use `border_accent_secondary_contrast`; `borderless` keeps horizontal padding at 0.

**SelectOption:**

```tsx
interface SelectOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
  group?: string // must match a SelectGroup key
}

interface SelectGroup {
  label: string
  key: string
}
```

**Examples:**

```tsx
// Basic
<Select
options={[
{ value: "react", label: "React" },
{ value: "vue", label: "Vue" },
]}
placeholder="Choose framework"
onValueChange={(val) => console.log(val)}
/>

// Controlled
<Select
options={options}
value={selected}
onValueChange={setSelected}
/>

// Error validation
<Select
options={options}
validation="error"
placeholder="Choose framework"
/>

// Multi-select with search
<Select
options={options}
multiple
searchable
clearable
placeholder="Select tags"
onValueChange={(vals) => console.log(vals)} // string[]
/>

// With groups
<Select
options={[
{ value: "js", label: "JavaScript", group: "frontend" },
{ value: "ts", label: "TypeScript", group: "frontend" },
{ value: "go", label: "Go", group: "backend" },
]}
groups={[
{ key: "frontend", label: "Frontend" },
{ key: "backend", label: "Backend" },
]}
placeholder="Select language"
/>

// Async search
<Select
options={[]}
searchable
onSearch={async (query) => {
const res = await searchUsers(query)
return res.map((u) => ({ value: u.id, label: u.name }))
}}
placeholder="Search users..."
/>

// In Drawer / Modal / Popover: keep dropdown in same layer
const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

<div ref={setPortalContainer}>
<Select
options={userOptions}
searchable
portalContainer={portalContainer}
placeholder="Select user"
/>
</div>
```

> **Layered container note:**
> If `Select` is used inside `Drawer`, `Modal`, or nested `Popover` with scroll-lock/nested scroll areas, pass `portalContainer` to avoid wheel-scroll conflicts when the dropdown is portaled to `document.body`.

---
