# Chip

Compact labels, selectable filters, tab chips, info chips, and input chips.

```tsx
import {
  Chip,
  FilterChipRadioGroup,
  InfoChip,
  InputChip,
  TabChip,
  type ChipOption,
} from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"tag" \| "selector" \| "check"` | `"tag"` | Chip behavior |
| `size` | `"xs" \| "s" \| "m" \| "l" \| "xl"` | `"m"` | Size |
| `color` | `"transparent" \| "white" \| "gray" \| "orange" \| "amber" \| "yellow" \| "lime" \| "green" \| "emerald" \| "teal" \| "cyan" \| "sky" \| "blue" \| "indigo" \| "violet" \| "purple" \| "fuchsia" \| "pink" \| "red"` | - | Palette for `tag` mode |
| `chipType` | `"borderFill" \| "borderLight" \| "borderless"` | `"borderFill"` | Filter-style visual type for `check` and `selector` modes |
| `bordered` | `boolean` | `true` | Show border, including selected accent border |
| `selected` | `boolean` | `false` | Selection state for `check` mode |
| `options` | `ChipOption[]` | - | Options for `selector` mode |
| `value` | `string` | - | Selected option value |
| `onValueChange` | `(value: string) => void` | - | Selection callback |
| `searchable` | `boolean` | `false` | Add option search |
| `clearable` | `boolean` | `false` | Expose clear action on hover when selected |
| `labelMode` | `"replace" \| "append"` | `"replace"` | Show selected label alone or after placeholder |
| `placeholder` | `string` | `"Select..."` | Empty/label prefix text |
| `icon` | `React.ReactNode` | - | Leading icon |
| `onRemove` | `() => void` | - | Append a remove action |
| `pill` | `boolean` | `false` | Radius chip shape by default for tag/selector chips. Set `true` for round chips. |

**DS 1.1 tokens:** filter-style inactive `borderFill` chips use `bg_interactive_secondary` and `text_secondary`; `borderLight` and `borderless` use `bg_interactive_primary` and `text_secondary`. Active filter chips use `bg_accent_secondary_subtle`, `border_accent_secondary_contrast`, and `fg_accent_secondary` for every type. Leading icons render at 20px. Icon/action sides use `Size_Chip_Padding_Icon`.

```tsx
interface ChipOption {
  label: string
  value: string
}
```

**Examples:**

```tsx
<Chip color="blue">In Progress</Chip>
<Chip variant="check" selected={active} onClick={() => setActive(!active)}>
  My Tasks
</Chip>
<Chip
  variant="selector"
  options={assignees}
  value={assignee}
  onValueChange={setAssignee}
  chipType="borderLight"
  labelMode="append"
  clearable
  searchable
  placeholder="Assignee"
/>
```

**FilterChipRadioGroup Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `FilterChipRadioOption[]` | required | Radio chip options |
| `value` | `string` | - | Controlled selected value |
| `defaultValue` | `string` | first enabled option | Initial selected value |
| `onValueChange` | `(value: string) => void` | - | Selection callback |
| `size` | `"xs" \| "s" \| "m" \| "l" \| "xl"` | `"m"` | Size |
| `bordered` | `boolean` | `true` | Show border |
| `chipType` | `"borderFill" \| "borderLight" \| "borderless"` | `"borderFill"` | Visual type |

**TabChip Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | `false` | Active state, exposed as `aria-pressed` because TabChip is a standalone toggle-like chip, not the full Tabs tablist/tabpanel component. |
| `display` | `"full" \| "iconOnly"` | `"full"` | Text+icon or icon-only display |
| `color` | `"subtle" \| "fill"` | `"subtle"` | Inactive color treatment |
| `pill` | `boolean` | `true` | Round or radius shape |
| `icon` | `React.ReactNode` | - | Leading icon |

**InfoChip Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"fill" \| "light"` | `"fill"` | Visual style |
| `icon` | `React.ReactNode` | - | Leading icon |
| `showClose` | `boolean` | `Boolean(onClose)` | Shows Icon Button Mini close action |
| `closeAriaLabel` | `string` | `"Close"` | Accessible close button label |
| `onClose` | `() => void` | - | Close callback |

**InputChip Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"value" \| "avatar"` | `"value"` | Value chip or avatar chip |
| `icon` | `React.ReactNode` | - | Leading icon for value type |
| `avatar` | `React.ReactNode` | - | Custom avatar slot |
| `avatarProps` | `AvatarProps` | - | Props for the built-in avatar |
| `showClose` | `boolean` | `Boolean(onRemove)` | Shows Icon Button Mini remove action |
| `closeAriaLabel` | `string` | `"Remove"` | Accessible remove button label |
| `onRemove` | `() => void` | - | Remove callback |

**Milestone 7 examples:**

```tsx
<FilterChipRadioGroup
  aria-label="Status"
  options={[
    { label: "All", value: "all" },
    { label: "Open", value: "open" },
  ]}
  value={status}
  onValueChange={setStatus}
/>

<TabChip active={view === "overview"} onClick={() => setView("overview")}>
  Overview
</TabChip>

<InfoChip onClose={() => setVisible(false)}>Synced</InfoChip>

<InputChip type="avatar" avatarProps={{ fallback: "NP" }} onRemove={remove}>
  Nguyen Phuong Anh
</InputChip>
```
