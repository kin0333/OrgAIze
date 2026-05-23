"use client"

import { useCallback, useState } from "react"

interface ReceiptUploadZoneProps {
  onFileSelected: (file: File) => void
  isProcessing: boolean
}

export const ReceiptUploadZone = ({ onFileSelected, isProcessing }: ReceiptUploadZoneProps) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const file = e.dataTransfer.files[0]
    if (!file) return

    if (!file.type.startsWith("image/")) return

    setPreviewUrl(URL.createObjectURL(file))
    onFileSelected(file)
  }, [onFileSelected])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setPreviewUrl(URL.createObjectURL(file))
    onFileSelected(file)
  }, [onFileSelected])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      const input = document.getElementById("receipt-upload-input") as HTMLInputElement
      input?.click()
    }
  }, [])

  if (previewUrl && !isProcessing) {
    return (
      <div className="space-y-4">
        <div className="glass-card overflow-hidden">
          <div className="relative aspect-[4/3] w-full">
            <img
              src={previewUrl}
              alt="Uploaded receipt preview"
              className="h-full w-full object-contain bg-slate-50 p-4"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setPreviewUrl(null)
          }}
          className="w-full rounded-xl border border-[#b2e0d4] px-4 py-2.5 text-sm font-medium text-[#004d00] transition-colors hover:bg-[#e0f7f1]"
          aria-label="Upload a different receipt"
          tabIndex={0}
        >
          Upload Different Receipt
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        onClick={() => document.getElementById("receipt-upload-input")?.click()}
        tabIndex={0}
        role="button"
        aria-label="Upload receipt image. Drag and drop or click to browse"
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all duration-300 ${
          isDragOver
            ? "border-[#007a33] bg-[#e0f7f1]/50 scale-[1.02]"
            : "border-[#b2e0d4] bg-[#e0f7f1]/20 hover:border-[#66b3a1] hover:bg-[#e0f7f1]/40"
        } ${isProcessing ? "pointer-events-none opacity-50" : ""}`}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-[#e0f7f1]" />
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#007a33]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#004d00]">Scanning receipt with AI...</p>
              <p className="mt-1 text-xs text-slate-400">Gemini is extracting vendor, date, and amount</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e0f7f1]">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#007a33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-700">
              Drop your receipt here, or{" "}
              <span className="text-[#007a33] underline underline-offset-2">browse</span>
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Supports JPEG, PNG, WebP — Max 10MB
            </p>
          </>
        )}
      </div>
      <input
        id="receipt-upload-input"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileInput}
        className="hidden"
        aria-hidden="true"
      />
    </div>
  )
}
