"use client"

import { useState } from "react"
import { formatCurrency } from "@/lib/utils"
import { updateTotalBudget } from "@/app/actions/dashboard-actions"

interface EditableBudgetCardProps {
  initialBudget: number
  icon: React.ReactNode
  accentColor?: string
}

export const EditableBudgetCard = ({
  initialBudget,
  icon,
  accentColor = "#007a33",
}: EditableBudgetCardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [budget, setBudget] = useState(initialBudget.toString())
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    const numBudget = parseFloat(budget.replace(/,/g, ""))
    if (!isNaN(numBudget) && numBudget >= 0) {
      setIsSaving(true)
      await updateTotalBudget(numBudget)
      setIsSaving(false)
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave()
    if (e.key === "Escape") {
      setBudget(initialBudget.toString())
      setIsEditing(false)
    }
  }

  return (
    <div
      className="glass-card glass-card-hover p-6"
      role="region"
      aria-label={`Total Budget: ${formatCurrency(initialBudget)}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1 min-w-0 mr-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Total Budget
            </p>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-slate-400 hover:text-[#007a33] transition-colors"
                title="Edit Budget"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="flex items-baseline gap-2 h-[36px]">
            {isEditing ? (
              <div className="flex items-center gap-2 w-full">
                <span className="text-xl font-bold text-slate-800 font-mono">₱</span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="text-xl font-bold tracking-tight text-slate-800 font-mono bg-white/50 border border-[#007a33]/30 rounded-md px-2 py-1 w-[140px] outline-none focus:ring-2 focus:ring-[#007a33]/50"
                  autoFocus
                  disabled={isSaving}
                />
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="rounded bg-[#007a33] p-1.5 text-white hover:bg-[#004d00] disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <p className="text-3xl font-bold tracking-tight text-slate-800 font-mono">
                {formatCurrency(initialBudget)}
              </p>
            )}
          </div>
          <p className="text-xs text-slate-400">Semester allocation</p>
        </div>
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
