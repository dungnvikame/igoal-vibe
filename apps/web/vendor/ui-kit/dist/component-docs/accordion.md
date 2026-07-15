# Accordion


```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@frontend-team/ui-kit"
```

**Accordion Props (extends Radix):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"single" \| "multiple"` | required | Single or multiple open |
| `variant` | `"default" \| "card"` | `"default"` | Visual style |
| `collapsible` | `boolean` | — | Allow closing all (type=single) |
| `value` | `string \| string[]` | — | Controlled value |
| `defaultValue` | `string \| string[]` | — | Uncontrolled default |

**Examples:**

```tsx
// Single open
<Accordion type="single" collapsible>
<AccordionItem value="item-1">
<AccordionTrigger>What is this?</AccordionTrigger>
<AccordionContent>This is an explanation.</AccordionContent>
</AccordionItem>
<AccordionItem value="item-2">
<AccordionTrigger>How does it work?</AccordionTrigger>
<AccordionContent>It works like this...</AccordionContent>
</AccordionItem>
</Accordion>

// Multiple open, card style
<Accordion type="multiple" variant="card">
<AccordionItem value="section-1">
<AccordionTrigger>Section 1</AccordionTrigger>
<AccordionContent>Content 1</AccordionContent>
</AccordionItem>
</Accordion>
```

---

