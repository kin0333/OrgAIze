import type { Liquidation } from "@/types/database"
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils"

interface RecentLiquidationsTableProps {
  liquidations: Liquidation[]
}

export const RecentLiquidationsTable = ({ liquidations }: RecentLiquidationsTableProps) => {
  if (liquidations.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e0f7f1]">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#66b3a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
            <path d="M14 8H8" />
            <path d="M16 12H8" />
            <path d="M13 16H8" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-500">No liquidations yet</p>
        <p className="mt-1 text-xs text-slate-400">Upload a receipt to get started</p>
      </div>
    )
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-[#b2e0d4]/20 px-6 py-4">
        <h3 className="text-sm font-semibold text-slate-700">Recent Liquidations</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full" role="table" aria-label="Recent liquidations">
          <thead>
            <tr className="border-b border-[#e0f7f1]">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Vendor
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                Amount
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0f7f1]/50">
            {liquidations.map((liquidation) => (
              <tr
                key={liquidation.id}
                className="transition-colors hover:bg-[#e0f7f1]/20"
              >
                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                  {liquidation.vendor_name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {formatDate(liquidation.date)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-sm font-semibold text-slate-700">
                  {formatCurrency(liquidation.amount)}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(liquidation.status)}`}
                  >
                    {liquidation.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
