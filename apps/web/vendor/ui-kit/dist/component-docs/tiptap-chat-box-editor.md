# ChatBoxEditor

A lightweight chat/comment input with emoji, image upload, mention, and an optional formatting toolbar. Scaffolded via the `@frontend-team/tiptap-kit` CLI.

```tsx
import { ChatBoxEditor } from "@/tiptap/chat-box-editor"
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
npx tiptap-kit add chat-box
```

Files copied to `src/tiptap/`:
- `chat-box-editor.tsx` - main component (freely editable)
- `chat-box-editor.css` - editor styles
- `data/content.json` - initial empty content

### 3. Import the global stylesheet (once, at app entry point)

```tsx
import "@frontend-team/tiptap-kit/styles.css"
```

---

## Usage

### Minimal chat (comment box)

```tsx
<ChatBoxEditor
  placeholder="Write a comment..."
  onSend={(content) => postComment(content.json)}
/>
```

### Slack-style with formatting toolbar

```tsx
<ChatBoxEditor
  placeholder="Message #general"
  onSend={(content) => sendMessage(content.json)}
  toolbar={true}
  emoji={true}
  imageUpload={true}
  mention={true}
/>
```

### Plain text only

```tsx
<ChatBoxEditor
  placeholder="Reply..."
  onSend={(content) => reply(content.text)}
  emoji={false}
  imageUpload={false}
  mention={true}
/>
```

---

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `placeholder` | `string` | - | `"Type a message..."` | Placeholder text when the editor is empty |
| `onSend` | `(content: { json: JSONContent; html: string; text: string }) => void` | - | - | Called when the user sends the current message |
| `toolbar` | `boolean` | - | `false` | Shows the optional formatting toolbar |
| `emoji` | `boolean` | - | `true` | Shows the emoji button and `:` picker support |
| `imageUpload` | `boolean` | - | `true` | Shows the image upload button |
| `mention` | `boolean` | - | `true` | Enables `@mention` support |

---

## Features

- Collapsed / expanded state
- Enter to send, Shift+Enter for a new line
- Mention with `@`
- Emoji picker with `:`
- Image upload
- Optional formatting toolbar
- Dark / Light mode support via CSS variables
- Send button with active and disabled states

---

## Behavior

| Action | Result |
|--------|--------|
| Click or focus editor | Expands from collapsed to full view |
| Blur when empty | Collapses back to single-line |
| Blur when content exists | Stays expanded |
| `Enter` | Calls `onSend`, clears the editor, and collapses |
| `Shift+Enter` | Inserts a new line |
| `Enter` while mention or emoji menu is open | Selects the menu item instead of sending |
| Click Send button | Same as `Enter`: calls `onSend`, clears the editor, and collapses |
| Send button disabled state | Disabled and gray when empty; active and colored when content exists |

---

## Customization

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
  onError: (error) => console.error("Upload failed:", error),
})
```

### Override CSS variables

```css
:root {
  --tt-chat-box-bg: #ffffff;
  --tt-chat-box-border: #e3e5e8;
  --tt-chat-box-radius: 10px;
  --tt-chat-box-send-active-bg: #f97316;
  --tt-chat-box-send-active-color: #ffffff;
  --tt-chat-box-toolbar-border: #f3f4f6;
  --tt-chat-box-placeholder: #9ca3af;
}
```
---

## Next.js (SSR)

```tsx
import dynamic from "next/dynamic"

const ChatBoxEditor = dynamic(
  () => import("@/tiptap/chat-box-editor").then(m => m.ChatBoxEditor),
  { ssr: false }
)

export default function Page() {
  return <ChatBoxEditor onSend={(content) => console.log(content)} />
}
```

---

## Extensions used

```
StarterKit (minimal), Placeholder, Mention, Emoji, Selection,
Highlight, Image, ImageUploadNode
```
