import type { Liquidation, SponsorshipTier } from "@/types/database"

const initialLiquidations: Liquidation[] = [
  {
    id: "1e4a5d8f-1234-4a5b-8c9d-1a2b3c4d5e6f",
    vendor_name: "National Book Store",
    date: "2026-05-20",
    amount: 4500.00,
    receipt_image_url: null,
    status: "Approved",
    uploaded_by: "demo-user",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2a3b4c5d-6e7f-8a9b-0c1d-2e3f4a5b6c7d",
    vendor_name: "Jollibee Food Corp",
    date: "2026-05-22",
    amount: 1250.50,
    receipt_image_url: null,
    status: "Approved",
    uploaded_by: "demo-user",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4c5d6e7f-8a9b-0c1d-2e3f-4a5b6c7d8e9f",
    vendor_name: "Canva Pro Subscription",
    date: "2026-05-15",
    amount: 599.00,
    receipt_image_url: null,
    status: "Approved",
    uploaded_by: "demo-user",
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3b4c5d6e-7f8a-9b0c-1d2e-3f4a5b6c7d8e",
    vendor_name: "Grab Philippines",
    date: "2026-05-23",
    amount: 850.00,
    receipt_image_url: null,
    status: "Pending",
    uploaded_by: "demo-user",
    created_at: new Date().toISOString(),
  },
  {
    id: "5d6e7f8a-9b0c-1d2e-3f4a-5b6c7d8e9f0a",
    vendor_name: "Office Warehouse",
    date: "2026-05-22",
    amount: 1200.00,
    receipt_image_url: null,
    status: "Pending",
    uploaded_by: "demo-user",
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6e7f8a9b-0c1d-2e3f-4a5b-6c7d8e9f0a1b",
    vendor_name: "SM Department Store",
    date: "2026-05-18",
    amount: 850.25,
    receipt_image_url: null,
    status: "Rejected",
    uploaded_by: "demo-user",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  }
]

const initialSponsorships = [
  { id: "s1", status: "Accepted" },
  { id: "s2", status: "Accepted" },
  { id: "s3", status: "Sent" }
]

const globalForMockDb = globalThis as unknown as {
  mockLiquidations: Liquidation[]
  mockSponsorships: any[]
  mockBudget: number
}

export const mockDb = {
  liquidations: globalForMockDb.mockLiquidations || (globalForMockDb.mockLiquidations = initialLiquidations),
  sponsorships: globalForMockDb.mockSponsorships || (globalForMockDb.mockSponsorships = initialSponsorships),
  budget: globalForMockDb.mockBudget || (globalForMockDb.mockBudget = 150000),
}

export const isMissingTableError = (error: any) => {
  if (!error) return false
  const msg = typeof error === 'string' ? error : error.message || ''
  const code = error.code || ''
  return msg.includes('schema cache') || msg.includes('relation') || code === '42P01' || msg.includes('does not exist')
}
