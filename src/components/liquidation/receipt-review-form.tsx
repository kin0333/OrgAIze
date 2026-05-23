"use client"

import { useState } from "react"
import type { ReceiptScanResult } from "@/types/database"

interface ReceiptReviewFormProps {
  scanResult: ReceiptScanResult
  onApprove: (data: ReceiptScanResult) => void
  onCancel: () => void
  isSaving: boolean
}

export const ReceiptReviewForm = ({
  scanResult,
  onApprove,
  onCancel,
  isSaving,
}: ReceiptReviewFormProps) => {
  const [vendorName, setVendorName] = useState<string>(scanResult.vendor_name)
  const [date, setDate] = useState<string>(scanResult.date)
  const [amount, setAmount] = useState<string>(String(scanResult.amount))

  const handleApprove = () => {
    onApprove({
      vendor_name: vendorName,
      date: date,
      amount: parseFloat(amount) || 0,
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isSaving) {
      e.preventDefault()
      handleApprove()
    }
  }

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-[#b2e0d4]/30 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e0f7f1]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007a33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-700">AI Extraction Complete</h3>
          <p className="text-xs text-slate-400">Review and correct the data below before saving</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="vendor-name-input"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Vendor Name
          </label>
          <input
            id="vendor-name-input"
            type="text"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-xl border border-[#b2e0d4]/50 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors focus:border-[#007a33] focus:ring-2 focus:ring-[#007a33]/20 focus:outline-none"
            aria-label="Vendor name extracted from receipt"
            tabIndex={0}
          />
        </div>

        <div>
          <label
            htmlFor="date-input"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Transaction Date
          </label>
          <input
            id="date-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-xl border border-[#b2e0d4]/50 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors focus:border-[#007a33] focus:ring-2 focus:ring-[#007a33]/20 focus:outline-none"
            aria-label="Transaction date"
            tabIndex={0}
          />
        </div>

        <div>
          <label
            htmlFor="amount-input"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Total Amount (PHP)
          </label>
          <input
            id="amount-input"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-xl border border-[#b2e0d4]/50 bg-white px-4 py-3 font-mono text-sm font-semibold text-slate-700 transition-colors focus:border-[#007a33] focus:ring-2 focus:ring-[#007a33]/20 focus:outline-none"
            aria-label="Total amount in Philippine Pesos"
            tabIndex={0}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="flex-1 rounded-xl border border-[#b2e0d4] px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
          aria-label="Cancel and discard this receipt"
          tabIndex={0}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleApprove}
          disabled={isSaving || !vendorName.trim() || !date || !amount}
          className="flex-[2] rounded-xl bg-[#007a33] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#004d00] hover:shadow-lg hover:shadow-[#007a33]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Approve and save this liquidation"
          tabIndex={0}
        >
          {isSaving ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving...
            </span>
          ) : (
            "Approve & Save"
          )}
        </button>
      </div>
    </div>
  )
}
