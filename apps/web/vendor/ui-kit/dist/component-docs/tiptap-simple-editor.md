# SimpleEditor

A lightweight rich text editor for forms, comment boxes, and short content inputs. Scaffolded via the `@frontend-team/tiptap-kit` CLI.

```tsx
import { SimpleEditor } from "@/tiptap/simple-editor"
```

> **Before using:** The template file must be scaffolded into the project first.
> See setup steps below.

---

## Setup

### 1. Install the package

```bash
npm install @frontend-team/tiptap-kit
```

### 2. Scaffold the template

```bash
npx tiptap-kit add simple
```

Files copied to `src/tiptap/`:
- `simple-editor.tsx` — main component (freely editable)
- `simple-editor.css` — editor styles
- `theme-toggle.tsx` — dark/light mode toggle
- `data/content.json` — initial sample content

### 3. Import the global stylesheet (once, at app entry point)

```tsx
import "@frontend-team/tiptap-kit/styles.css"
```

---

## Usage

```tsx
import { SimpleEditor } from "@/tiptap/simple-editor"

export default function MyPage() {
  return <SimpleEditor />
}
```

`SimpleEditor` accepts no props — all configuration lives inside the scaffolded file.

---

## Features

- Fixed top toolbar (collapses on mobile)
- Heading H1–H4 (dropdown)
- Bold, Italic, Underline, Strikethrough, Code, Superscript, Subscript
- Color highlight, Text align
- Bullet list, Ordered list, Task list
- Blockquote, Code block
- Link popover
- Image upload (drag & drop or click, max 5 MB, max 3 images)
- Undo / Redo
- Dark / Light mode toggle

---

## Customization

### Change initial content

Open `src/tiptap/simple-editor.tsx`, find the import at the top:

```tsx
import content from "./data/content.json"
```

Replace with your own JSON (Tiptap JSON format) or an HTML string:

```tsx
const editor = useEditor({
  content: "<p>Hello world</p>",
  // ...
})
```

### Add or remove extensions

Open `src/tiptap/simple-editor.tsx`, find the `extensions` array inside `useEditor({...})`:

```tsx
const editor = useEditor({
  extensions: [
    StarterKit,
    TextAlign,
    Highlight,
    // add more here
  ],
})
```

### Image upload to a real server

Find `ImageUploadNode.configure({...})` in the template and replace the `upload` function:

```tsx
import { MAX_FILE_SIZE } from "@frontend-team/tiptap-kit/lib/tiptap-utils"

ImageUploadNode.configure({
  accept: "image/*",
  maxSize: MAX_FILE_SIZE,
  limit: 3,
  upload: async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/upload", { method: "POST", body: formData })
    const data = await res.json()
    return data.url // must return a URL string
  },
})
```

### Override CSS variables

```css
:root {
  --tt-primary: #2563eb;
  --tt-border: #e3e5e8;
  --tt-bg: #ffffff;
  --tt-surface: #f7f9fb;
  --tt-text: #111827;
  --tt-muted: #6b7280;
  --tt-radius: 10px;
}

[data-theme="dark"] {
  --tt-bg: #1a1a1a;
  --tt-surface: #2a2a2a;
  --tt-text: #f1f5f9;
  --tt-border: #374151;
  --tt-muted: #9ca3af;
}
```

---

## Read / Set content programmatically

```tsx
// Read content
const json = editor.getJSON()
const html = editor.getHTML()

// Set content
editor.commands.setContent(newContent)

// Listen for changes — add to useEditor({ onUpdate })
onUpdate: ({ editor }) => {
  const json = editor.getJSON()
  onContentChange?.(json)
}
```

---

## Next.js (SSR)

```tsx
import dynamic from "next/dynamic"

const SimpleEditor = dynamic(
  () => import("@/tiptap/simple-editor").then(m => m.SimpleEditor),
  { ssr: false }
)
```

---

## Extensions used

```
StarterKit, HorizontalRule, TextAlign, TaskList, TaskItem,
Highlight, Image, Typography, Superscript, Subscript,
Selection, ImageUploadNode
```
