# Input

```tsx
import { Input } from "@frontend-team/ui-kit"
```

**Props:**

| Prop                       | Type                                         | Default   | Description                                                   |
| -------------------------- | -------------------------------------------- | --------- | ------------------------------------------------------------- |
| `variant`                  | `"light" \| "fill" \| "dim" \| "borderless"` | `"light"` | Visual style                                                  |
| `size`                     | `"xs" \| "s" \| "m" \| "l" \| "xl"`          | `"m"`     | Size                                                          |
| `validation`               | `"error" \| "success"`                       | -         | Applies validation border styling without changing background |
| `leftIcon`                 | `React.ReactNode`                            | -         | Leading icon slot                                             |
| `rightIcon`                | `React.ReactNode`                            | -         | Trailing icon slot                                            |
| `unit`                     | `React.ReactNode`                            | -         | Suffix unit text or node                                      |
| All native `<input>` props | -                                            | -         | type, placeholder, value, onChange, etc.                      |

**Size ladder:** XS 32px / S 36px / M 40px / L 48px / XL 56px. Horizontal padding is 10px / 12px / 16px / 16px / 20px.
Focused inputs use `border_accent_secondary_contrast`; `borderless` keeps horizontal padding at 0.

**Examples:**

```tsx
<Input placeholder="Search..." />
<Input variant="fill" size="l" placeholder="Enter email" type="email" />
<Input validation="error" placeholder="Enter email" />
<Input validation="success" defaultValue="you@example.com" />
<Input leftIcon={<Search />} unit="@ikameglobal.com" placeholder="username" />
<Input
value={value}
onChange={(e) => setValue(e.target.value)}
placeholder="Enter name"
/>
```

---
