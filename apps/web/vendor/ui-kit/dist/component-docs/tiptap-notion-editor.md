# NotionEditor

A full-featured document editor inspired by Notion/Confluence. Supports slash commands, tables, emoji, mentions, drag handles, math, AI menu, embeds, charts, mermaid diagrams, and more. Scaffolded via the `@frontend-team/tiptap-kit` CLI.

```tsx
import { NotionEditor } from "@/tiptap/notion-like-editor"
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
npx tiptap-kit add notion-like
```

Files copied to `src/tiptap/`:
- `notion-like-editor.tsx` — main component
- `notion-like-editor.css` — editor styles
- `notion-like-editor-header.tsx` / `.css` — header (title, actions)
- `notion-like-editor-mobile-toolbar.tsx` — mobile toolbar
- `notion-like-editor-toolbar-floating.tsx` — floating toolbar on text selection
- `notion-like-editor-theme-toggle.tsx` — theme toggle button
- `notion-like-editor-collaboration-users.tsx` — online users display (for collab)
- `data/content.json` — initial sample content

### 3. Import the global stylesheet (once, at app entry point)

```tsx
import "@frontend-team/tiptap-kit/styles.css"
```

---

## Usage

```tsx
import { NotionEditor } from "@/tiptap/notion-like-editor"
import type { JSONContent } from "@tiptap/react"

export default function MyPage() {
  const handleUpdate = (json: JSONContent) => {
    // json is the full Tiptap document — send this to your backend on save
    console.log(json)
  }

  return <NotionEditor room="my-document-id" onUpdate={handleUpdate} />
}
```

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `room` | `string` | — | — | Document identifier (reserved for collaboration — not actively used yet) |
| `placeholder` | `string` | — | `"Start writing..."` | Placeholder text when editor is empty |
| `onUpdate` | `(json: JSONContent) => void` | — | — | Called on every content change with the full Tiptap JSON |

---

## Features

- **Slash commands** — type `/` to open command palette (see full reference below)
- **Drag handle** — reorder blocks by dragging
- **Context menu on drag** — duplicate, delete, move block
- **Full table** — resizable, merge/split cells, add/delete rows & columns
- **Emoji picker** — type `:` or click emoji icon
- **Mention** — type `@` to mention users
- **AI menu** — UI fully wired; ships with a Mistral demo implementation, replace with your own AI backend
- **Floating toolbar** — appears on text selection (bold, italic, link, color, etc.)
- **Mobile toolbar** — dedicated toolbar for touch devices
- **Math (LaTeX)** — inline and block math via `$` and `$$`
- **Anchor link** — copy link to heading
- **Image upload** — drag & drop, max 5MB, max 3 images
- **Video upload** — drag & drop, max 50MB
- **Audio upload** — drag & drop, max 25MB
- **File upload** — PDF (with inline preview), Documents (doc/docx), Spreadsheets (xls/xlsx/csv)
- **Embed** — YouTube, TikTok, Figma, Google Maps, or any HTTPS URL
- **Mermaid diagrams** — flowcharts, mind maps, UML, timelines, sequence diagrams
- **Charts** — Bar chart, Line chart, Donut/Pie chart (with inline data editor)
- **Callout blocks** — customizable emoji + background color
- **Columns layout** — 2, 3, or 4 columns
- **Read/Write mode toggle** — hides all edit UI in read mode
- **Dark / Light mode toggle**

---

## Slash commands reference

Type `/` in the editor to open the command menu. Available commands by group:

| Group | Command | Description |
|-------|---------|-------------|
| **AI** | Continue Writing | AI continues from current position |
| **AI** | Ask AI | Open AI generation prompt |
| **Style** | Text, Heading 1/2/3 | Change block type |
| **Style** | Bullet List, Numbered List, To-do list | List types |
| **Style** | Blockquote, Code Block | Block formatting |
| **Insert** | Mention, Emoji | Inline elements |
| **Insert** | Table | 3×3 table |
| **Insert** | Callout | Highlighted callout block |
| **Insert** | 2/3/4 Columns | Multi-column layout |
| **Insert** | Mermaid | Diagram (flowchart, mind map, UML, timeline) |
| **Insert** | Bar/Line/Donut Chart | Charts with editable data |
| **Insert** | Separator | Horizontal rule |
| **Embed** | Embed | Generic iframe embed |
| **Embed** | YouTube | YouTube video embed |
| **Embed** | TikTok | TikTok video embed |
| **Embed** | Figma | Figma design embed |
| **Embed** | Google Maps | Map location embed |
| **Upload** | Image | Image upload |
| **Upload** | Video | Video file upload |
| **Upload** | Audio | Audio file upload |
| **Upload** | PDF | PDF upload with inline preview |
| **Upload** | Document | Word/text document upload |
| **Upload** | Spreadsheet | Excel/CSV file upload |

---

## Exported components

```tsx
import {
  NotionEditor,          // ← use this — full component with all providers
  EditorProvider,        // Editor + context only (no UserProvider/AppProvider)
  EditorContentArea,     // Editor content area only
  LoadingSpinner,        // Spinner shown during initialization
  NotionEditorContent,   // Internal wrapper
} from "@/tiptap/notion-like-editor"
```

In most cases, use `NotionEditor` directly.

---

## File Upload — Configuration

The template supports 4 upload types, all using `ImageUploadNode` with different configurations. The default uses `handleImageUpload` which creates a local blob URL for demo purposes. **In production, replace the `upload` function with your own server upload logic.**

Open `notion-like-editor.tsx`, find the `ImageUploadNode` configurations, and replace the `upload` function:

```tsx
import { MAX_FILE_SIZE } from "@frontend-team/tiptap-kit/lib/tiptap-utils"

// Your upload function — must return a permanent URL string
const myUpload = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)
  const res = await fetch("/api/upload", { method: "POST", body: formData })
  const data = await res.json()
  return data.url  // Must return a URL string
}
```

### Upload configurations

| Upload type | Node name | `accept` | `maxSize` | `limit` | Description |
|-------------|-----------|----------|-----------|---------|-------------|
| Image | `imageUpload` | `image/*` | 5MB | 3 | Resizable image with caption |
| Video | `videoUpload` | `video/*` | 50MB | 1 | Video player with controls |
| Audio | `audioUpload` | `audio/*` | 25MB | 1 | Audio player with controls |
| File | `fileUpload` | `.pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx` | 50MB | 1 | File card with PDF inline preview |

### File node preview behavior

- **PDF files**: Rendered inline with browser PDF viewer (full-page preview)
- **Office files** (docx, xlsx, pptx): Preview via Microsoft Office Online viewer (requires public URL; blob URLs show a fallback card)
- **Other files**: Download link with file info card

### Important for production

The `handleImageUpload` demo function uses `URL.createObjectURL(file)` — this creates temporary blob URLs that only work in the current browser session. In production:
1. Replace `upload` with a function that uploads to your storage (S3, Cloudinary, etc.) and returns a permanent URL
2. Office file preview requires the URL to be publicly accessible for the Microsoft viewer to fetch it

---

## Read / Write Mode

The template includes a read/write toggle button in the header. In **read mode**:
- All edit UI is hidden (slash menu, drag handles, embed controls, chart data editors, mermaid code editor, callout pickers)
- Content is displayed cleanly for viewing only
- The editor is set to `editor.setEditable(false)`

To toggle programmatically:

```tsx
// Switch to read mode
editor.setEditable(false)

// Switch to write mode
editor.setEditable(true)
```

When building custom node views that need to react to read/write mode changes, use the `useEditorEditable` hook:

```tsx
import { useEditorEditable } from "@frontend-team/tiptap-kit/hooks/use-editor-editable"

function MyNodeView({ editor }) {
  const editable = useEditorEditable(editor)

  return (
    <div>
      {editable && <button>Edit</button>}
      <div>Content always visible</div>
    </div>
  )
}
```

> **Important:** Do NOT use `editor.isEditable` directly in React node views — it is not reactive. Always use the `useEditorEditable` hook instead, which uses `useEditorState` from `@tiptap/react` to properly subscribe to state changes.

---

## Embed Configuration

The embed extension supports these providers out of the box:

| Provider | URL patterns | Aspect ratio |
|----------|-------------|--------------|
| YouTube | `youtube.com`, `youtu.be`, `youtube-nocookie.com` | 16/9 |
| TikTok | `tiktok.com`, `vm.tiktok.com` | 9/16 (max-width 480px) |
| Figma | `figma.com` | 16/9 |
| Google Maps | `google.com/maps`, `maps.google.com` | 4/3 |
| Google Sheets | `docs.google.com/spreadsheets/` | 16/9 |
| Google Docs | `docs.google.com/document/`, `/presentation/` | 8.5/11 |
| PDF | Any URL ending in `.pdf` | 8.5/11 |
| Generic | Any HTTPS URL | 16/9 |

To insert an embed programmatically:

```tsx
// Generic embed
editor.chain().focus().setEmbed().run()

// Provider-specific embed
editor.chain().focus().setEmbed({ provider: "youtube" }).run()
editor.chain().focus().setEmbed({ provider: "tiktok" }).run()
editor.chain().focus().setEmbed({ provider: "figma" }).run()
editor.chain().focus().setEmbed({ provider: "google-maps" }).run()
```

---

## Customization

### Change initial content

Open `src/tiptap/notion-like-editor.tsx`, find the import near the top:

```tsx
import initialContent from "./data/content.json"
```

Replace with your own Tiptap JSON or pass content dynamically.

### Connect the AI menu

The template includes a `mistral-ai-extension.ts` **as a demo** to show how the AI menu works end-to-end. In your project, replace it with any AI provider you prefer — Claude, Gemini, OpenAI Codex, or a call to your own backend that handles AI internally.

**AI commands exposed by the menu:**

| Command | Description |
|---------|-------------|
| Ask AI / Continue Writing | Free-form prompt, inserts rich Tiptap JSON content |
| Extend | Expand selected text |
| Shorten | Condense selected text |
| Fix Spelling & Grammar | Correct errors in selection |
| Simplify | Rewrite with simpler language |
| Rephrase | Improve writing quality |
| Emojify | Add relevant emojis |
| Complete | Continue writing from cursor |
| Summarize | Insert a summary |
| Translate | Translate selection to a target language |
| Adjust Tone | Rewrite with a specified tone |

**How to wire your own AI:**

Open `src/tiptap/mistral-ai-extension.ts`. The extension is a standard Tiptap `Extension` — find the `callMistral` function and replace it with a call to your AI provider or backend API:

```ts
// Replace this with your own AI call
async function callAi(prompt: string): Promise<string> {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  })
  const data = await res.json()
  return data.text // must return a string
}
```

The extension commands (`aiTextPrompt`, `aiExtend`, `aiShorten`, etc.) and the storage schema (`editor.storage.ai`) must remain compatible with `<AiMenu />` — only the API call itself needs to change.

> **Demo only:** The scaffolded file calls Mistral directly from the browser and requires `VITE_MISTRAL_API_KEY`. Remove or replace this before shipping to production.

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
// Read
const json = editor.getJSON()
const html = editor.getHTML()

// Set
editor.commands.setContent(newContent)

// Listen for changes — add onUpdate to useEditor in EditorProvider
onUpdate: ({ editor }) => {
  const json = editor.getJSON()
  onContentChange?.(json)
}
```

---

## Eject a primitive component for deep customization

```bash
npx tiptap-kit eject button
npx tiptap-kit eject toolbar
npx tiptap-kit eject popover
npx tiptap-kit eject dropdown-menu
# see full list: npx tiptap-kit list
```

After ejecting, the CLI rewrites imports in template files to point to the local copy.

---

## Next.js (SSR)

```tsx
import dynamic from "next/dynamic"

const NotionEditor = dynamic(
  () => import("@/tiptap/notion-like-editor").then(m => m.NotionEditor),
  { ssr: false }
)

export default function Page() {
  return <NotionEditor room="my-doc" />
}
```

---

## Extensions used

```
StarterKit, CodeBlockLowlight, HorizontalRule, TextAlign, Placeholder, Mention,
Emoji, TableKit, NodeBackground, NodeAlignment, TextStyle,
Mathematics, Superscript, Subscript, Color, TaskList, TaskItem,
Highlight, Selection, Image, TableHandleExtension,
ListNormalizationExtension, ImageUploadNode (+ videoUpload, audioUpload, fileUpload),
UniqueID, Typography, UiState, MistralAiExtension,
Callout, Embed, Columns, Column, Mermaid,
BarChart, LineChart, DonutChart, Video, Audio, FileNode
```
