import * as React from "react";
export interface FileEntry {
    id: string;
    name: string;
    /** File size in bytes */
    size: number;
    /** Upload progress 0-100; omit or set to 100 when complete */
    progress?: number;
    status?: "uploading" | "error" | "done";
    /** Preview URL (data URL or object URL); auto-set for images when using internal state */
    preview?: string;
    /** Error message shown when status="error" */
    error?: string;
}
export interface FileUploadProps {
    /** Accepted MIME types e.g. "image/*" or ".pdf,.docx" */
    accept?: string;
    multiple?: boolean;
    /** Max file size in bytes */
    maxSize?: number;
    /** Max number of files (only applied in uncontrolled mode) */
    maxFiles?: number;
    /** Controlled file list */
    files?: FileEntry[];
    /** Fires when files list changes (uncontrolled mode) */
    onFilesChange?: (files: FileEntry[]) => void;
    /** Fires when new valid File objects are added — use this to start uploads */
    onFileAdd?: (files: File[]) => void;
    /** Fires when a file is removed */
    onFileRemove?: (id: string) => void;
    /** Drop zone heading text */
    placeholder?: string;
    /** Drop zone sub-text */
    description?: string;
    disabled?: boolean;
    className?: string;
}
declare const FileUpload: React.ForwardRefExoticComponent<FileUploadProps & React.RefAttributes<HTMLDivElement>>;
export { FileUpload };
