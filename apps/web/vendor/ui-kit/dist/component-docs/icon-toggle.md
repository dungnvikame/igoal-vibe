# IconToggle

Icon-only controls for toggled actions, icon-only dropdown menus, and compact comment entry.

```tsx
import { CommentInput, IconDropdown, IconToggle } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"dim" \| "border" \| "borderless" \| "borderlessSubtle"` | `"dim"` | Visual style |
| `size` | `"xs" \| "s" \| "m" \| "l" \| "xl"` | `"m"` | Square Size_Button size |
| `pressed` | `boolean` | - | Controlled pressed state |
| `defaultPressed` | `boolean` | `false` | Initial uncontrolled pressed state |
| `onPressedChange` | `(pressed: boolean) => void` | - | Pressed state callback |
| `disabled` | `boolean` | - | Native disabled |

**IconDropdown Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | required | Trigger icon |
| `children` | `React.ReactNode` | required | Dropdown menu content |
| `variant` | `"dim" \| "border" \| "borderless" \| "borderlessSubtle"` | `"dim"` | Trigger style |
| `size` | `"xs" \| "s" \| "m" \| "l" \| "xl"` | `"m"` | Square Size_Button size |
| `active` | `boolean` | open state | Visual active state |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open state callback |
| `aria-label` | `string` | required | Accessible trigger name |

**CommentInput Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | `""` | Initial uncontrolled value |
| `onValueChange` | `(value: string) => void` | - | Value callback |
| `onSubmit` | `(value, event) => void` | - | Cmd/Ctrl+Enter submit callback |
| `actionIcons` | `React.ReactNode` | - | 28px icon button row slot |
| `avatar` | `React.ReactNode` | - | Optional leading avatar slot |

**Examples:**

```tsx
<IconToggle aria-label="Bold" pressed={bold} onPressedChange={setBold}>
  <Bold />
</IconToggle>

<IconDropdown aria-label="More actions" icon={<MoreHorizontal />} variant="border">
  <DropdownMenuItem>Edit</DropdownMenuItem>
  <DropdownMenuItem>Archive</DropdownMenuItem>
</IconDropdown>

<CommentInput
  value={comment}
  onValueChange={setComment}
  onSubmit={sendComment}
  avatar={<Avatar fallback="NA" size="s" />}
  actionIcons={
    <Button variant="borderlessSubtle" size="icon-s" aria-label="Send">
      <Send />
    </Button>
  }
/>
```

---
