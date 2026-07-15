# Field

Primitive form wrapper for a label, one control, and supporting or error text.

```tsx
import { Field, Input } from "@frontend-team/ui-kit"
```

**Props:**

| Prop             | Type                 | Default   | Description                                                      |
| ---------------- | -------------------- | --------- | ---------------------------------------------------------------- |
| `label`          | `React.ReactNode`    | -         | Label rendered above the control                                 |
| `required`       | `boolean`            | `false`   | Shows the required marker and forwards `required` to the control |
| `supportingText` | `React.ReactNode`    | -         | Helper text rendered below the control                           |
| `error`          | `string`             | -         | Error message; forwards `aria-invalid` and uses error styling    |
| `disabled`       | `boolean`            | `false`   | Forwards `disabled` to the control and dims the field            |
| `htmlFor`        | `string`             | generated | Control id used by the label                                     |
| `children`       | `React.ReactElement` | required  | Input, Select, Textarea, or another focusable control            |

**Examples:**

```tsx
<Field label="Email" required supportingText="Use your work email.">
  <Input type="email" placeholder="you@example.com" />
</Field>

<Field label="Username" error="Username can only contain letters and numbers.">
  <Input defaultValue="bad user!" />
</Field>
```

---
