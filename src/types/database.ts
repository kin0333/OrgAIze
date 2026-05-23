export type LiquidationStatus = "Pending" | "Approved" | "Rejected"

export type SponsorshipTier = "Gold" | "Silver" | "Bronze"

export type SponsorshipStatus = "Draft" | "Sent" | "Accepted" | "Declined"

export type UserRole = "Admin" | "Treasurer" | "Committee Head"

export interface User {
  id: string
  name: string
  role: UserRole
  org_id: string
  email: string
}

export interface Liquidation {
  id: string
  uploaded_by: string
  vendor_name: string
  date: string
  amount: number
  receipt_image_url: string | null
  status: LiquidationStatus
  created_at: string
}

export interface Sponsorship {
  id: string
  company_name: string
  tier: SponsorshipTier
  contact_email: string | null
  generated_email: string | null
  generated_moa_text: string | null
  status: SponsorshipStatus
  created_at: string
}

export interface DashboardMetrics {
  totalBudget: number
  totalExpenses: number
  pendingLiquidations: number
  approvedLiquidations: number
  activeSponsorships: number
  recentLiquidations: Liquidation[]
}

export interface ReceiptScanResult {
  vendor_name: string
  date: string
  amount: number
}

export interface MOAGenerationResult {
  email: string
  moa: string
}
