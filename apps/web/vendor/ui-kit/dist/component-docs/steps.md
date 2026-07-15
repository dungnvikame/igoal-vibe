# Steps


```tsx
import { Steps, type Step } from "@frontend-team/ui-kit"
```

**`Step` interface:**

| Field | Type | Description |
|-------|------|-------------|
| `content` | `ReactNode` | Primary content - below indicator (horizontal) or right (vertical) |
| `secondaryContent` | `ReactNode` | Secondary content - above indicator (horizontal) or left (vertical) |
| `icon` | `ReactNode` | Custom icon - only rendered when `variant="icon"` |

**`StepsProps`:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `Step[]` | required | Array of step data |
| `currentStep` | `number` | required | Zero-based index of the active step |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction |
| `variant` | `"number" \| "dot" \| "icon"` | `"number"` | Indicator style |
| `className` | `string` | — | Additional classes |

**Examples:**

```tsx
// Number variant (default)
<Steps
steps={[
{ content: <p className="text-sm font-medium text_primary">Details</p> },
{ content: <p className="text-sm font-medium text_primary">Review</p> },
{ content: <p className="text-sm font-medium text_primary">Publish</p> },
]}
currentStep={1}
/>

// Dot variant - vertical pipeline
<Steps
steps={[
{ content: <p className="text-sm text_primary">HR Screen</p> },
{ content: <p className="text-sm text_primary">Tech Screen</p> },
{ content: <p className="text-sm text_primary">Offer</p> },
]}
currentStep={1}
variant="dot"
orientation="vertical"
/>

// Icon variant - with secondary content (timeline)
<Steps
steps={[
{
icon: <Mail className="h-4 w-4" />,
secondaryContent: <span className="text-xs text_tertiary">21:54</span>,
content: (
<div>
<p className="text-sm font-medium text_primary">Email updated</p>
<p className="text-xs text_tertiary">By Nguyen Phuong Anh</p>
</div>
),
},
]}
currentStep={0}
variant="icon"
orientation="vertical"
/>
```

---
