# InputPinCode

```tsx
import { InputPinCode } from "@frontend-team/ui-kit"
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | `number` | `6` | Number of pin slots |
| `value` | `string` | - | Controlled value |
| `onChange` | `(value: string) => void` | - | Called when the value changes |
| `onComplete` | `(value: string) => void` | - | Called when all slots are filled |
| `numericOnly` | `boolean` | `true` | Restrict input to digits only |
| `mask` | `boolean` | `false` | Mask characters |
| `placeholder` | `string` | `"-"` | Character shown in empty slots |
| `separatorAfter` | `number[]` | - | Insert `-` after these slots (1-based) |
| `variant` | `"light" \| "fill" \| "dim"` | `"light"` | Visual style |
| `size` | `"s" \| "m" \| "l"` | `"m"` | Slot size |
| `disabled` | `boolean` | `false` | Disables the input |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |
| `aria-invalid` | `boolean` | - | Shows invalid styling |
| `aria-label` | `string` | `"Pin code input"` | Accessible label |

**Examples:**

```tsx
const [pin, setPin] = useState("")

<InputPinCode value={pin} onChange={setPin} onComplete={verifyOtp} />
<InputPinCode length={4} mask />
<InputPinCode separatorAfter={[3]} />
<InputPinCode numericOnly={false} length={8} placeholder="_" />
```

`separatorAfter={[3]}` places a separator between the third and fourth slot.
