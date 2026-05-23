"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Liquidation } from "@/types/database"
import { mockDb, isMissingTableError } from "@/lib/mock-db"

export const saveLiquidation = async (data: {
  vendor_name: string
  date: string
  amount: number
  receipt_image_url?: string
}): Promise<{ success: boolean; data?: Liquidation; error?: string }> => {
  try {
    const supabase = createServerSupabaseClient()

    const { data: liquidation, error } = await supabase
      .from("liquidations")
      .insert({
        vendor_name: data.vendor_name,
        date: data.date,
        amount: data.amount,
        receipt_image_url: data.receipt_image_url || null,
        status: "Pending",
        uploaded_by: "demo-user",
      })
      .select()
      .single()

    if (error) {
      if (isMissingTableError(error)) {
        const mock: Liquidation = {
          id: crypto.randomUUID(),
          vendor_name: data.vendor_name,
          date: data.date,
          amount: data.amount,
          receipt_image_url: data.receipt_image_url || null,
          status: "Pending",
          uploaded_by: "demo-user",
          created_at: new Date().toISOString()
        }
        mockDb.liquidations.unshift(mock)
        return { success: true, data: mock }
      }
      
      console.error("Supabase insert error:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: liquidation }
  } catch (error) {
    console.error("Save liquidation error:", error)
    const message = error instanceof Error ? error.message : "Failed to save liquidation"
    return { success: false, error: message }
  }
}

export const approveLiquidation = async (
  id: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase
      .from("liquidations")
      .update({ status: "Approved" })
      .eq("id", id)

    if (error) {
      if (isMissingTableError(error)) {
        const index = mockDb.liquidations.findIndex(l => l.id === id)
        if (index !== -1) {
          mockDb.liquidations[index].status = "Approved"
        }
        return { success: true }
      }
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve liquidation"
    return { success: false, error: message }
  }
}

export const rejectLiquidation = async (
  id: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase
      .from("liquidations")
      .update({ status: "Rejected" })
      .eq("id", id)

    if (error) {
      if (isMissingTableError(error)) {
        const index = mockDb.liquidations.findIndex((l) => l.id === id)
        if (index !== -1) {
          mockDb.liquidations[index].status = "Rejected"
        }
        return { success: true }
      }
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to reject liquidation"
    return { success: false, error: message }
  }
}

export const getLiquidations = async (): Promise<{
  success: boolean
  data?: Liquidation[]
  error?: string
}> => {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("liquidations")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      if (isMissingTableError(error)) {
        return { success: true, data: mockDb.liquidations }
      }
      return { success: false, error: error.message }
    }

    return { success: true, data: [...mockDb.liquidations, ...(data || [])] }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch liquidations"
    return { success: false, error: message }
  }
}
