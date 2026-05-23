"use client"

import { useEffect, useState } from "react"
import { getLiquidations } from "@/app/actions/liquidation-actions"
import type { Liquidation } from "@/types/database"
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils"

interface LiquidationHistoryProps {
  refreshTrigger: number
}

export const LiquidationHistory = ({ refreshTrigger }: LiquidationHistoryProps) => {
  const [liquidations, setLiquidations] = useState<Liquidation[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchLiquidations = async () => {
      setIsLoading(true)
      const result = await getLiquidations()
      if (result.success && result.data) {
        setLiquidations(result.data)
      }
      setIsLoading(false)
    }

    fetchLiquidations()
  }, [refreshTrigger])

  if (isLoading) {
    return (
      <div className="glass-card p-6 space-y-4">
        <div className="h-5 w-40 shimmer rounded-lg" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-10 w-10 shimmer rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 shimmer rounded" />
              <div className="h-3 w-20 shimmer rounded" />
            </div>
            <div className="h-4 w-20 shimmer rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (liquidations.length === 0) {
    return null
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-[#b2e0d4]/20 px-6 py-4">
        <h3 className="text-sm font-semibold text-slate-700">
          Liquidation History
          <span className="ml-2 inline-flex items-center rounded-full bg-[#e0f7f1] px-2 py-0.5 text-xs font-medium text-[#004d00]">
            {liquidations.length}
          </span>
        </h3>
      </div>
      <div className="divide-y divide-[#e0f7f1]/50">
        {liquidations.map((liquidation) => (
          <div
            key={liquidation.id}
            className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-[#e0f7f1]/10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e0f7f1] text-sm font-bold text-[#004d00]">
              {liquidation.vendor_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">
                {liquidation.vendor_name}
              </p>
              <p className="text-xs text-slate-400">{formatDate(liquidation.date)}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm font-semibold text-slate-700">
                {formatCurrency(liquidation.amount)}
              </p>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getStatusColor(liquidation.status)}`}
              >
                {liquidation.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
