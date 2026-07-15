# Card


```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@frontend-team/ui-kit"
```

**Card Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shadow` | `"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"xs"` | Shadow depth |
| `hoverable` | `boolean` | `false` | Adds hover shadow transition |

**Examples:**

```tsx
<Card>
<CardHeader>
<CardTitle>Project Overview</CardTitle>
<CardDescription>Summary of current sprint</CardDescription>
</CardHeader>
<CardContent>
<p>Content goes here</p>
</CardContent>
<CardFooter>
<Button variant="border">Cancel</Button>
<Button>Save</Button>
</CardFooter>
</Card>

// Hoverable card
<Card hoverable shadow="md">
<CardContent>Hover me</CardContent>
</Card>
```

---

