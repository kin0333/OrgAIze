"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { DashboardMetrics } from "@/types/database"
import { mockDb, isMissingTableError } from "@/lib/mock-db"

const FALLBACK_BUDGET = 150000

const getEmptyMetrics = (): DashboardMetrics => {
  const allLiquidations = mockDb.liquidations
  
  const totalExpenses = allLiquidations
    .filter((l) => l.status === "Approved")
    .reduce((sum: number, l) => sum + (l.amount || 0), 0)

  const pendingLiquidations = allLiquidations.filter(
    (l) => l.status === "Pending"
  ).length

  const approvedLiquidations = allLiquidations.filter(
    (l) => l.status === "Approved"
  ).length

  return {
    totalBudget: FALLBACK_BUDGET,
    totalExpenses,
    pendingLiquidations,
    approvedLiquidations,
    activeSponsorships: mockDb.sponsorships.length,
    recentLiquidations: allLiquidations.slice(0, 5),
  }
}

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  try {
    const supabase = createServerSupabaseClient()

    const { data: liquidations, error: liqError } = await supabase
      .from("liquidations")
      .select("*")
      .order("created_at", { ascending: false })

    if (liqError) {
      if (!isMissingTableError(liqError)) {
        console.warn("Liquidations query failed:", liqError.message)
      }
      return getEmptyMetrics()
    }

    const allLiquidations = liquidations || []

    const totalExpenses = allLiquidations
      .filter((l) => l.status === "Approved")
      .reduce((sum: number, l) => sum + (l.amount || 0), 0)

    const pendingLiquidations = allLiquidations.filter(
      (l) => l.status === "Pending"
    ).length

    const approvedLiquidations = allLiquidations.filter(
      (l) => l.status === "Approved"
    ).length

    const { count: sponsorshipCount, error: spError } = await supabase
      .from("sponsorships")
      .select("*", { count: "exact", head: true })

    return {
      totalBudget: FALLBACK_BUDGET,
      totalExpenses,
      pendingLiquidations,
      approvedLiquidations,
      activeSponsorships: spError ? 0 : (sponsorshipCount || 0),
      recentLiquidations: allLiquidations.slice(0, 5),
    }
  } catch (error) {
    console.error("Dashboard metrics error:", error)
    return getEmptyMetrics()
  }
}
