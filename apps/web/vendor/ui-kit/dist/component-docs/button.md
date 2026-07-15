# Button


```tsx
import { Button, DropdownButton, DropdownMenuItem } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "primary2" \| "secondary" \| "secondary2" \| "dim" \| "border" \| "subtle" \| "borderlessSubtle" \| "danger"` | `"primary"` | Visual style. `subtle` maps to DS Borderless. |
| `size` | `"xs" \| "s" \| "m" \| "l" \| "xl" \| "icon-xs" \| "icon-s" \| "icon-m" \| "icon-l" \| "icon-xl" \| "icon-mini-m" \| "icon-mini-s"` | `"m"` | Size |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction |
| `asChild` | `boolean` | `false` | Renders as child element (Radix Slot) |
| `disabled` | `boolean` | - | Native disabled |

**DS 1.1 styling:** `primary`, `primary2`, `secondary`, `secondary2`, and `danger` use SemiBold text. `dim`, `border`, `subtle`, and `borderlessSubtle` remain Regular. Button radius is adaptive per size through `Size_Button_Border_Radius`: XS 4px / S 6px / M 6px / L 8px / XL 8px.

**DropdownButton Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `React.ReactNode` | required | Trigger label |
| `children` | `React.ReactNode` | required | Dropdown menu content |
| `variant` | `"primary1" \| "primary2" \| "secondary1" \| "secondary2" \| "outline" \| "border"` | `"primary1"` | Dropdown button style |
| `size` | `ButtonProps["size"]` | `"m"` | Trigger size |
| `disabled` | `boolean` | - | Disables the trigger |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open state callback |

**Examples:**

```tsx
// Basic
<Button>Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="primary2">Create</Button>
<Button variant="secondary2">Filter</Button>
<Button variant="danger">Delete</Button>

// With loading
<Button loading>Saving...</Button>

// Icon-only (MUST have aria-label)
<Button size="icon-m" aria-label="Close">
<X />
</Button>
<Button size="icon-mini-m" variant="borderlessSubtle" aria-label="Remove">
<X />
</Button>

// With icon + text
<Button variant="secondary">
<Plus /> Add Item
</Button>

// As link (asChild)
<Button asChild variant="subtle">
<a href="/settings">Settings</a>
</Button>

// Dropdown button
<DropdownButton label="Actions" variant="secondary2">
<DropdownMenuItem>Edit</DropdownMenuItem>
<DropdownMenuItem>Archive</DropdownMenuItem>
</DropdownButton>
```

---
