# Drawer


```tsx
import {
Drawer, DrawerTrigger, DrawerClose,
DrawerContent, DrawerHeader, DrawerTitle,
DrawerDescription, DrawerBody, DrawerFooter,
} from "@frontend-team/ui-kit"
```

**DrawerContent Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `"left" \| "right"` | `"left"` | Slide-in direction |
| `size` | `"s" \| "m" \| "l"` | `"m"` | Drawer width. On mobile (`< 640px`): always full-width. On `sm:` and above: `s` = 320px, `m` = 1/3 viewport (min 320px), `l` = 1/2 viewport (min 320px). |

**Examples:**

```tsx
<Drawer>
<DrawerTrigger asChild>
<Button>Open Drawer</Button>
</DrawerTrigger>
<DrawerContent side="right" size="m">
<DrawerHeader>
<DrawerTitle>Settings</DrawerTitle>
<DrawerClose asChild>
<Button variant="subtle" size="icon-s" aria-label="Close">
<X />
</Button>
</DrawerClose>
</DrawerHeader>
<DrawerBody>
<p>Drawer content here</p>
</DrawerBody>
<DrawerFooter>
<DrawerClose asChild>
<Button variant="border">Cancel</Button>
</DrawerClose>
<Button>Save</Button>
</DrawerFooter>
</DrawerContent>
</Drawer>
```

---

