# SimpleSidebar

```tsx
import { SimpleSidebar } from "@frontend-team/ui-kit"
import type {
  SimpleSidebarGroup,
  SimpleSidebarItem,
  SimpleSidebarProps,
} from "@frontend-team/ui-kit"
```

```tsx
interface SimpleSidebarItem {
  id: string
  label: string
  icon: React.ReactNode
  activeIcon?: React.ReactNode
  href?: string
  disabled?: boolean
}

interface SimpleSidebarGroup {
  id: string
  items: SimpleSidebarItem[]
}

interface SimpleSidebarProps extends React.ComponentProps<"aside"> {
  groups: SimpleSidebarGroup[]
  activeId?: string
  onNavigate?: (id: string, href?: string) => void
  header?: React.ReactNode
  footer?: React.ReactNode
  alwaysExpanded?: boolean
  expandedWidth?: number
  collapsedWidth?: number
}
```

**`SimpleSidebarItem` props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique item identifier |
| `label` | `string` | — | Item label text |
| `icon` | `ReactNode` | — | Icon shown for the item |
| `activeIcon` | `ReactNode` | — | Icon displayed when item is active (e.g. filled variant) |
| `href` | `string` | — | Optional href value passed to `onNavigate` |
| `disabled` | `boolean` | `false` | Disables the item button |

**Basic usage:**

```tsx
import { Home, Settings, User } from "lucide-react"

const groups: SimpleSidebarGroup[] = [
  {
    id: "main",
    items: [
      { id: "home", label: "Home", icon: <Home />, href: "/" },
      { id: "settings", label: "Settings", icon: <Settings />, href: "/settings" },
    ],
  },
  {
    id: "account",
    items: [{ id: "profile", label: "Profile", icon: <User />, href: "/profile" }],
  },
]

<SimpleSidebar
  groups={groups}
  activeId="home"
  onNavigate={(id, href) => href && router.push(href)}
/>
```

**With custom header and footer:**

```tsx
<SimpleSidebar
  groups={groups}
  activeId={activeId}
  alwaysExpanded
  header={<LogoMark className="w-5 h-5" />}
  footer={<Avatar fallback="IK" size="s" />}
  onNavigate={(id, href) => {
    if (href) router.push(href)
  }}
/>
```

**Notes:**

- `icon` is required for every item.
- `SimpleSidebar` defaults to collapsed and expands on hover.
- Pass `alwaysExpanded` to keep the sidebar open without requiring hover.
- The sidebar container background is transparent by default.
- `title` is applied automatically in collapsed mode so icon-only items still expose their labels.
- Nested sub-items, badges, and dots are not supported.
- The sidebar uses a short debounce (100ms) before collapsing on mouse leave for smoother interactions.
