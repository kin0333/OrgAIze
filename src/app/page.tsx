import { getDashboardMetrics } from "@/app/actions/dashboard-actions"
import { MetricCard } from "@/components/dashboard/metric-card"
import { EditableBudgetCard } from "@/components/dashboard/editable-budget-card"
import { RecentLiquidationsTable } from "@/components/dashboard/recent-liquidations-table"
import { formatCurrency } from "@/lib/utils"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your organization's financial health, pending liquidations, and active sponsorships.",
}

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  </svg>
)

const TrendingDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const DashboardPage = async () => {
  const metrics = await getDashboardMetrics()

  const budgetUsedPercent = metrics.totalBudget > 0
    ? Math.round((metrics.totalExpenses / metrics.totalBudget) * 100)
    : 0

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Financial overview for your student organization
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <EditableBudgetCard
          initialBudget={metrics.totalBudget}
          icon={<WalletIcon />}
          accentColor="#007a33"
        />
        <MetricCard
          label="Total Expenses"
          value={formatCurrency(metrics.totalExpenses)}
          subtitle={`${budgetUsedPercent}% of budget used`}
          icon={<TrendingDownIcon />}
          trend="down"
          accentColor="#004d00"
        />
        <MetricCard
          label="Pending Review"
          value={String(metrics.pendingLiquidations)}
          subtitle={`${metrics.approvedLiquidations} approved`}
          icon={<ClockIcon />}
          accentColor="#66b3a1"
        />
        <MetricCard
          label="Sponsorships"
          value={String(metrics.activeSponsorships)}
          subtitle="Active partnerships"
          icon={<UsersIcon />}
          accentColor="#007a33"
        />
      </div>

      {/* Budget Progress Bar */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-700">Budget Utilization</h3>
          <span className="text-sm font-mono font-semibold text-[#004d00]">{budgetUsedPercent}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[#e0f7f1]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#007a33] to-[#66b3a1] transition-all duration-700 ease-out"
            style={{ width: `${Math.min(budgetUsedPercent, 100)}%` }}
            role="progressbar"
            aria-valuenow={budgetUsedPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Budget utilization: ${budgetUsedPercent}%`}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>{formatCurrency(metrics.totalExpenses)} spent</span>
          <span>{formatCurrency(metrics.totalBudget - metrics.totalExpenses)} remaining</span>
        </div>
      </div>

      {/* Recent Liquidations Table */}
      <RecentLiquidationsTable liquidations={metrics.recentLiquidations} />
    </div>
  )
}

export default DashboardPage
