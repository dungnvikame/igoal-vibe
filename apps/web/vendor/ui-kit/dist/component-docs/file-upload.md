# File Upload


Drag-and-drop or click-to-browse file input with thumbnail preview and progress.

```tsx
import { FileUpload, type FileEntry } from "@frontend-team/ui-kit"
```

**`FileEntry` interface:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `name` | `string` | File name |
| `size` | `number` | Size in bytes |
| `progress` | `number` (0–100) | Upload progress; omit or 100 = complete |
| `status` | `"uploading" \| "error" \| "done"` | Current state |
| `preview` | `string` | Preview URL (auto-set for images in uncontrolled mode) |
| `error` | `string` | Error message when `status="error"` |

**`FileUploadProps`:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | — | MIME filter e.g. `"image/*"` |
| `multiple` | `boolean` | `false` | Allow multiple files |
| `maxSize` | `number` | — | Max size per file in bytes |
| `maxFiles` | `number` | — | Max total files (uncontrolled mode) |
| `files` | `FileEntry[]` | — | Controlled file list |
| `onFilesChange` | `(files: FileEntry[]) => void` | — | Called when list changes |
| `onFileAdd` | `(files: File[]) => void` | — | Called with new `File` objects — start upload here |
| `onFileRemove` | `(id: string) => void` | — | Called when user removes a file |
| `placeholder` | `string` | `"Upload a file"` | Drop zone heading |
| `description` | `string` | — | Drop zone sub-text |
| `disabled` | `boolean` | `false` | Disables interaction |

```tsx
// Basic uncontrolled
<FileUpload
accept="image/*"
multiple
maxSize={4 * 1024 * 1024}
placeholder="Upload a project image"
description="or, click to browse (4MB max)"
onFileAdd={(files) => {
// start upload, then update controlled state with progress
}}
/>

// Controlled with progress
<FileUpload
files={files}
onFileRemove={(id) => setFiles(prev => prev.filter(f => f.id !== id))}
/>
```

---

