"use client";

import { type ReactNode, useState } from "react";

/* ---- Progress tracker (application lifecycle stages) ---- */
export interface ProgressStage {
  label: string;
  detail?: string;
  icon?: ReactNode;
}

export interface ProgressTrackProps {
  stages: ProgressStage[];
  currentStage?: number;
  className?: string;
  showLabels?: boolean;
}

export const ProgressTrack = ({
  stages,
  currentStage = 0,
  className = "",
  showLabels = true,
}: ProgressTrackProps) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center gap-2">
        {stages.map((stage, i) => {
          const step = i + 1;
          const status: "completed" | "active" | "pending" =
            step < currentStage ? "completed" : step === currentStage ? "active" : "pending";
          return (
            <div key={stage.label} className="flex items-center gap-2 flex-1 min-w-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  status === "completed"
                    ? "bg-teal text-white"
                    : status === "active"
                    ? "bg-royal text-white ring-2 ring-royal/30"
                    : "bg-surface text-text-secondary border border-divider"
                }`}
              >
                {status === "completed" ? (
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l4 4 8-8" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              {showLabels && (
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs font-semibold truncate ${
                      status === "completed" ? "text-teal-700" : status === "active" ? "text-royal" : "text-text-secondary"
                    }`}
                  >
                    {stage.label}
                  </p>
                  {stage.detail && (
                    <p
                      className={`text-xs truncate ${
                        status === "completed" ? "text-teal-600" : "text-text-secondary"
                      }`}
                    >
                      {stage.detail}
                    </p>
                  )}
                </div>
              )}
              {step < stages.length && (
                <div
                  className={`w-8 h-[2px] mx-1 rounded ${
                    status === "completed" ? "bg-teal" : "bg-divider"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ---- Empty state ---- */
export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    {icon && <div className="mb-4 text-text-secondary/60">{icon}</div>}
    <h3 className="text-sm font-semibold text-text">{title}</h3>
    {description && <p className="text-sm text-text-secondary mt-1 max-w-sm">{description}</p>}
    {action}
  </div>
);

/* ---- Skeleton (loading state) ---- */
export interface SkeletonProps {
  className?: string;
  animated?: boolean;
}

export const Skeleton = ({ className = "", animated = true }: SkeletonProps) => (
  <div
    className={`animate-pulse rounded-md bg-primary-200/60 ${className}`}
    style={animated ? { animationDuration: "1s" } : undefined}
  />
);

/* ---- File uploader with progress ---- */
export interface FileItem {
  id: string;
  name: string;
  size: number;
  category: string;
  status: "pending" | "uploading" | "done" | "error";
  progress: number;
}

export interface FileUploaderProps {
  acceptedTypes?: string[];
  maxSizeMb?: number;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  files: FileItem[];
  className?: string;
  allowReplace?: boolean;
  allowDelete?: boolean;
}

export const FileUploader = ({
  acceptedTypes = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"],
  maxSizeMb = 10,
  multiple = true,
  onFilesSelected,
  files,
  className = "",
  allowReplace = false,
  allowDelete = true,
}: FileUploaderProps) => {
  const [dragOver, setDragOver] = useState(false);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFilesSelected([file]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFilesSelected([file]);
  };

  return (
    <div className={`bg-surface rounded-xl border border-divider shadow-sm p-5 ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
          dragOver
            ? "border-teal bg-teal-50/50"
            : "border-divider hover:border-royal hover:bg-primary-50/30"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          multiple={multiple}
          accept={acceptedTypes.join(",")}
          onChange={handleInputChange}
          className="hidden"
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <svg
            className="w-8 h-8 text-text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 16v-4m0 0l-4 4m4-4l4 4m-2-10V4m0 0l4 4m-4-4l-4 4m14-8H4m0 0l4 4m-4-4l-4 4"
            />
          </svg>
          <p className="text-sm font-medium text-text">
            {dragOver ? "Drop files here" : "Drag & drop files here or click to browse"}
          </p>
          <p className="text-xs text-text-secondary">
            Supports PDF, JPG, PNG, DOC, DOCX. Max {maxSizeMb} MB per file.
          </p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                file.status === "error"
                  ? "border-red-200 bg-red-50/50"
                  : "border-divider bg-primary-50/30"
              }`}
            >
              <div
                className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                  file.status === "done"
                    ? "bg-teal/10 text-teal"
                    : file.status === "uploading"
                    ? "bg-royal/10 text-royal"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {file.status === "done" ? (
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l4 4 8-8" />
                  </svg>
                ) : file.status === "uploading" ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C4.477 0 0 4.477 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">{file.name}</p>
                <p className="text-xs text-text-secondary">{formatSize(file.size)}</p>
              </div>
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded ${
                  file.status === "done"
                    ? "bg-teal-100 text-teal-700"
                    : file.status === "uploading"
                    ? "bg-royal-100 text-royal-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {file.status === "uploading" ? `${file.progress}%` : file.status}
              </span>
              {allowDelete && file.status === "done" && (
                <button
                  type="button"
                  className="text-text-secondary hover:text-error transition-colors p-1"
                  aria-label="Delete file"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
