# Sidebar


```tsx
import {
Sidebar, SidebarHeader, SidebarContent, SidebarSection,
SidebarItem, SidebarSubItem, SidebarFooter,
SidebarTrigger, BlockSidebarLayout,
} from "@frontend-team/ui-kit"
import type { SidebarNavItem, SidebarNavGroup } from "@frontend-team/ui-kit"
```

## Layout Setup

> **Đọc phần này trước khi dùng.** Sidebar cần đúng layout context để fill full viewport và không scroll theo page.

### BlockSidebarLayout (khuyến nghị)

`BlockSidebarLayout` mặc định dùng `h-screen` — tự fill viewport mà **không cần setup parent**. Dùng trực tiếp trong root layout:

```tsx
// ✅ Đúng — dùng trong root layout (Next.js app/layout.tsx, React Router root, v.v.)
export default function RootLayout({ children }) {
  return (
    <BlockSidebarLayout groups={groups} activeId={activeId} onNavigate={handleNavigate}>
      <main className="p-6">{children}</main>
    </BlockSidebarLayout>
  )
}
```

Nếu cần override height (ví dụ nhúng vào một vùng partial):

```tsx
// Override h-screen bằng className
<BlockSidebarLayout className="h-[600px]" groups={groups} ...>
  {children}
</BlockSidebarLayout>
```

### Standalone Sidebar

`Sidebar` standalone dùng `sticky top-0 h-screen`. Pattern đúng: để body scroll tự nhiên, sidebar stick ở top.

## DS 1.1 Layout Tokens

Sidebar uses a 232px expanded width, `bg_sidebar_primary` for the root background, and `border_primary` for the right divider. Use `bg_sidebar_secondary` only for explicit sub-panels such as `SidebarSection panel`. The header row is 44px tall with 20px left padding when expanded and centered content in the 56px collapsed rail.

Sidebar items are 34px tall with `radius_6`, 12px left padding, 6px right padding, 8px icon-label gap, and `body_s` Regular text. Unselected items use `fg_sidebar_secondary` with `hover:state_bg_sidebar_primary_subtle`; selected items use `state_bg_sidebar_primary_soft` with `fg_sidebar_primary`.

The footer/account container is 64px tall and inherits the root `bg_sidebar_primary` background. Expanded footers use 16px horizontal padding, 20px top padding, and 12px bottom padding; collapsed footers center the avatar with symmetric padding and no divider.

`SidebarSection` is transparent by default. Pass `panel` to opt into `bg_sidebar_secondary` + `radius_8` for a secondary sub-panel.

```tsx
// ✅ Đúng — flex layout, body scroll
<div className="flex">
  <Sidebar>
    <SidebarHeader title="App" />
    <SidebarContent>...</SidebarContent>
  </Sidebar>
  <main className="flex-1 p-6">
    {/* content dài — body/page scroll */}
    {children}
  </main>
</div>
```

```tsx
// ✅ Cũng đúng — fixed height wrapper, nội dung scroll bên trong
<div className="flex h-screen overflow-hidden">
  <Sidebar className="h-full"> {/* override h-screen thành h-full */}
    <SidebarHeader title="App" />
    <SidebarContent>...</SidebarContent>
  </Sidebar>
  <main className="flex-1 overflow-auto p-6">
    {children}
  </main>
</div>
```

### Lỗi thường gặp

```tsx
// ❌ Sai — BlockSidebarLayout bên trong div không có height
<div>  {/* h-full của wrapper = 0 */}
  <BlockSidebarLayout groups={groups}>...</BlockSidebarLayout>
</div>

// ❌ Sai — min-h-screen cho phép parent grow theo content
// h-full của wrapper sẽ grow theo → sidebar không cố định
<div className="min-h-screen">
  <BlockSidebarLayout groups={groups}>...</BlockSidebarLayout>
</div>

// ❌ Sai — Sidebar standalone bên trong overflow-hidden parent
// sticky không work khi scroll container là parent overflow-hidden
<div className="overflow-hidden">
  <Sidebar>...</Sidebar>  {/* sticky bị vô hiệu hóa */}
</div>
```

**BlockSidebarLayout — the main layout component:**

```tsx
interface BlockSidebarLayoutProps {
groups: SidebarNavGroup[]
footerGroups?: SidebarNavGroup[]          // pinned groups above the footer
activeId?: string
onNavigate?: (id: string, href?: string) => void
header?: React.ReactNode                  // sidebar top (logo/brand)
footer?: React.ReactNode                  // sidebar bottom (user profile, etc.)
children?: React.ReactNode                // main content area
defaultCollapsed?: boolean
collapsed?: boolean                       // controlled collapsed state
onCollapsedChange?: (collapsed: boolean) => void
collapseMode?: "collapse" | "hide"        // "collapse" → icon-only rail, "hide" → fully hidden
className?: string                        // outer wrapper class
contentClassName?: string                 // main content area class
}
```

**`SidebarTrigger` Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | `ChevronsLeft / ChevronsRight` | Custom icon (overrides default) |
| `isHideWhenSidebarOpen` | `boolean` | `false` | Hide trigger when sidebar is expanded |
| `className` | `string` | — | Additional classes |

```tsx
interface SidebarNavItem {
id: string
label: string
icon?: React.ReactNode
href?: string
children?: SidebarNavItem[]   // nested items (sub-menu)
badge?: React.ReactNode
dot?: boolean
disabled?: boolean
defaultOpen?: boolean         // open by default, user can still collapse (requires children)
alwaysOpen?: boolean          // always expanded, cannot be collapsed, hides chevron (requires children)
}

interface SidebarNavGroup {
id: string
label?: string                // group header label
items: SidebarNavItem[]
}
```

> **Active state with children:** When a child item is active, the parent item also receives the active style automatically.

**Examples:**

```tsx
const groups: SidebarNavGroup[] = [
{
id: "main",
items: [
{ id: "dashboard", label: "Dashboard", icon: <Home />, href: "/" },
{ id: "projects", label: "Projects", icon: <Folder />, href: "/projects" },
],
},
{
id: "reports",
label: "Reports",
items: [
// Collapsible sub-menu (default closed)
{
id: "analytics",
label: "Analytics",
icon: <BarChart />,
children: [
{ id: "overview", label: "Overview" },
{ id: "detail", label: "Detail" },
],
},
// Always expanded sub-menu (no chevron, cannot collapse)
{
id: "settings",
label: "Settings",
icon: <Settings />,
alwaysOpen: true,
children: [
{ id: "profile", label: "Profile" },
{ id: "billing", label: "Billing" },
],
},
],
},
]

<BlockSidebarLayout
groups={groups}
activeId="dashboard"
onNavigate={(id, href) => href && router.push(href)}
header={<Logo />}
footer={<UserProfile />}
>
<main className="p-6">{children}</main>
</BlockSidebarLayout>

// With footer groups (pinned above footer)
<BlockSidebarLayout
groups={groups}
footerGroups={[{ id: "help", items: [{ id: "docs", label: "Documentation", icon: <BookOpen /> }] }]}
activeId={activeId}
onNavigate={handleNavigate}
>
{children}
</BlockSidebarLayout>

// Controlled collapse + custom trigger icon
<BlockSidebarLayout
groups={groups}
collapsed={isCollapsed}
onCollapsedChange={setIsCollapsed}
collapseMode="hide"
>
{children}
</BlockSidebarLayout>

// Custom trigger icon
<SidebarTrigger icon={<PanelLeft className="w-4 h-4" />} />
```

## Overlay Panel (Notion-style)

Khi một sidebar item cần mở panel kế bên sidebar (giống Notion Inbox), panel **đè lên nội dung** — không đẩy content vào trong, không có backdrop. Content phía sau vẫn full width.

**Layout thực tế:**
```
[Sidebar] [Panel absolute, overlay lên content]
          [Main content — luôn full width phía dưới]
```

**Cách hoạt động:**
- Content wrapper dùng `relative overflow-hidden` để làm positioning context và clip panel khi slide ra ngoài
- Panel dùng `absolute left-0 top-0 h-full z-20` để overlay lên content
- Animate bằng `transition-transform`: `translate-x-0` (mở) ↔ `-translate-x-full` (đóng) — hardware accelerated, không gây layout shift
- **Click outside để đóng**: thêm một `div` transparent `absolute inset-0 z-10` (dưới panel z-20) khi panel mở — click bất kỳ đâu ngoài panel sẽ đóng lại, không cần `useEffect` hay ref
- `activeId` bind với `panelId` để item giữ active style khi panel đang mở
- Click cùng item lần 2 → đóng panel (toggle)

```tsx
import { X } from "lucide-react"
import { useState } from "react"

const PANEL_IDS = new Set(["inbox", "filters"])

const groups: SidebarNavGroup[] = [
  {
    id: "main",
    items: [
      { id: "inbox",     label: "Inbox",     icon: <Inbox size={16} /> },
      { id: "filters",   label: "Filters",   icon: <Filter size={16} /> },
      { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
    ],
  },
]

export function AppLayout({ children }) {
  const [panelId, setPanelId] = useState<string | null>(null)

  return (
    <BlockSidebarLayout
      groups={groups}
      activeId={panelId ?? undefined}
      onNavigate={(id, href) => {
        if (PANEL_IDS.has(id)) {
          setPanelId((prev) => (prev === id ? null : id))
        } else {
          if (href) router.push(href)
        }
      }}
    >
      <div className="relative h-full overflow-hidden">
        {/* Transparent backdrop: z-10, click ngoài panel để đóng — không cần useEffect/ref */}
        {panelId && (
          <div className="absolute inset-0 z-10" onClick={() => setPanelId(null)} />
        )}

        {/* Panel: z-20 (trên backdrop), slide in/out bằng translateX */}
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-60 z-20 flex flex-col",
            "border-r border_secondary bg_canvas_secondary shadow-lg",
            "transition-transform duration-200",
            panelId ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border_secondary">
            <p className="text_primary text-sm font-semibold capitalize">{panelId}</p>
            <button
              onClick={() => setPanelId(null)}
              className="w-6 h-6 flex items-center justify-center radius_6 text_tertiary hover:text_primary hover:state_bg_button_tertiary_soft"
            >
              <X size={14} />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-3">
            {panelId === "inbox" && <InboxPanelContent />}
            {panelId === "filters" && <FiltersPanelContent />}
          </div>
        </div>

        {/* Main content: luôn full width, panel đè lên trên */}
        <div className="h-full overflow-auto p-6">
          {children}
        </div>
      </div>
    </BlockSidebarLayout>
  )
}
```

---
