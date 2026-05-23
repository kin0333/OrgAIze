"use client"

import { useCallback, useState } from "react"
import { scanReceipt } from "@/app/actions/scan-receipt"
import { saveLiquidation } from "@/app/actions/liquidation-actions"
import { ReceiptUploadZone } from "@/components/liquidation/receipt-upload-zone"
import { ReceiptReviewForm } from "@/components/liquidation/receipt-review-form"
import { LiquidationHistory } from "@/components/liquidation/liquidation-history"
import type { ReceiptScanResult } from "@/types/database"

type FlowState = "idle" | "scanning" | "review" | "saving" | "saved"

const LiquidationsPage = () => {
  const [flowState, setFlowState] = useState<FlowState>("idle")
  const [scanResult, setScanResult] = useState<ReceiptScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const handleFileSelected = useCallback(async (file: File) => {
    setError(null)
    setSuccessMessage(null)
    setFlowState("scanning")

    const formData = new FormData()
    formData.append("receipt", file)

    const result = await scanReceipt(formData)

    if (!result.success || !result.data) {
      setError(result.error || "Failed to scan receipt")
      setFlowState("idle")
      return
    }

    setScanResult(result.data)
    setFlowState("review")
  }, [])

  const handleApprove = useCallback(async (data: ReceiptScanResult) => {
    setIsSaving(true)
    setError(null)

    const result = await saveLiquidation({
      vendor_name: data.vendor_name,
      date: data.date,
      amount: data.amount,
    })

    if (!result.success) {
      setError(result.error || "Failed to save liquidation")
      setIsSaving(false)
      return
    }

    setIsSaving(false)
    setFlowState("idle")
    setSuccessMessage("Liquidation saved successfully!")
    setScanResult(null)
    setRefreshTrigger((prev) => prev + 1)

    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }, [])

  const handleCancel = useCallback(() => {
    setFlowState("idle")
    setScanResult(null)
    setError(null)
  }, [])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Liquidation Hub
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Upload receipts and let AI extract the details automatically
        </p>
      </div>

      {/* Error Toast */}
      {error && (
        <div
          className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
          role="alert"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" x2="9" y1="9" y2="15" />
            <line x1="9" x2="15" y1="9" y2="15" />
          </svg>
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="ml-auto text-red-400 hover:text-red-600"
            aria-label="Dismiss error"
            tabIndex={0}
          >
            ✕
          </button>
        </div>
      )}

      {/* Success Toast */}
      {successMessage && (
        <div
          className="flex items-center gap-3 rounded-xl border border-[#b2e0d4] bg-[#e0f7f1] px-4 py-3"
          role="status"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007a33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <p className="text-sm font-medium text-[#004d00]">{successMessage}</p>
        </div>
      )}

      {/* Main Content: Two Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column: Upload Zone */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Receipt Upload
          </h2>
          <ReceiptUploadZone
            onFileSelected={handleFileSelected}
            isProcessing={flowState === "scanning"}
          />
        </div>

        {/* Right Column: Review Form or Placeholder */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            AI Extraction Review
          </h2>
          {flowState === "review" && scanResult ? (
            <ReceiptReviewForm
              scanResult={scanResult}
              onApprove={handleApprove}
              onCancel={handleCancel}
              isSaving={isSaving}
            />
          ) : flowState === "scanning" ? (
            <div className="glass-card flex flex-col items-center justify-center p-12">
              <div className="relative h-16 w-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-[#e0f7f1]" />
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#007a33]" />
              </div>
              <p className="text-sm font-medium text-[#004d00]">Analyzing receipt...</p>
              <p className="mt-1 text-xs text-slate-400">Gemini Vision is processing your image</p>
            </div>
          ) : (
            <div className="glass-card flex flex-col items-center justify-center p-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e0f7f1]">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#66b3a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-500">No receipt scanned yet</p>
              <p className="mt-1 text-xs text-slate-400">
                Upload a receipt image to begin AI extraction
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Liquidation History */}
      <LiquidationHistory refreshTrigger={refreshTrigger} />
    </div>
  )
}

export default LiquidationsPage
