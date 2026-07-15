# Breadcrumb


```tsx
import { Breadcrumb } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | required | Array of breadcrumb items |
| `separator` | `React.ReactNode` | `ChevronRight` | Custom separator |
| `maxItems` | `number` | — | Collapses middle items into a popover |
| `className` | `string` | — | Additional classes |

**DS 1.1 states:** navigation items stay `text_tertiary` on hover and add a `state_neutral_max` overlay. The current item is `text_primary` with regular `body_s` weight. Ellipsis uses `icon_tertiary`.

```tsx
interface BreadcrumbItem {
label: string
href?: string       // makes item a link
icon?: React.ReactNode
}
```

**Examples:**

```tsx
<Breadcrumb
items={[
{ label: "Home", href: "/" },
{ label: "Projects", href: "/projects" },
{ label: "My Project" },
]}
/>

// With icons
<Breadcrumb
items={[
{ label: "Dashboard", href: "/", icon: <Home className="h-3.5 w-3.5" /> },
{ label: "Users", href: "/users" },
{ label: "John Doe" },
]}
/>

// Collapse long paths
<Breadcrumb items={manyItems} maxItems={3} />
```

---
