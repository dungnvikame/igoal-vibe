# Avatar


```tsx
import { Avatar } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL |
| `alt` | `string` | — | Alt text (also used as fallback initials) |
| `fallback` | `string` | — | Explicit fallback text (max 2 chars shown) |
| `icon` | `React.ReactNode` | — | Icon to show as fallback |
| `size` | `"xxs" \| "xs" \| "s" \| "m" \| "l" \| "xl"` | `"m"` | Size |
| `type` | `"image" \| "icon" \| "text"` | `"image"` | Hint (auto-resolved) |
| `asChild` | `boolean` | `false` | Renders as child element |
| `onClick` | `function` | — | Makes avatar interactive (button role) |

**Examples:**

```tsx
// Image avatar (falls back to initials on error)
<Avatar src={user.avatarUrl} alt={user.name} />

// Text fallback
<Avatar alt="John Doe" /> // shows "Jo"
<Avatar fallback="JD" />  // shows "JD"

// Icon fallback
<Avatar icon={<UserIcon />} />

// Sizes
<Avatar src={url} alt="User" size="xs" />
<Avatar src={url} alt="User" size="xl" />

// Clickable
<Avatar src={url} alt="Profile" onClick={() => openProfile()} />
```

---

