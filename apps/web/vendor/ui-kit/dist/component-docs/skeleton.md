# Skeleton


```tsx
import { Skeleton } from "@frontend-team/ui-kit"
```

A simple animated placeholder for loading states. Accepts all standard `<div>` HTML attributes.

**Examples:**

```tsx
// Text lines
<div className="space-y-2">
<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-4/5" />
<Skeleton className="h-4 w-2/3" />
</div>

// Card (avatar + lines)
<div className="flex items-center gap-3">
<Skeleton className="h-10 w-10 radius_round" />
<div className="flex-1 space-y-2">
<Skeleton className="h-4 w-1/2" />
<Skeleton className="h-3 w-1/3" />
</div>
</div>

// Button placeholder
<Skeleton className="h-8 w-24" />

// Table rows
<div className="space-y-3">
<div className="grid grid-cols-4 gap-3">
<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-full" />
</div>
</div>
```

---

