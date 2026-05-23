"use server"

import { openai, GEMINI_MODEL } from "@/lib/gemini"
import type { ReceiptScanResult } from "@/types/database"

const RECEIPT_SCAN_PROMPT = `You are a financial document analyzer for a student organization's treasury system.

Analyze this receipt image and extract the following information in JSON format:
{
  "vendor_name": "The name of the store, restaurant, or vendor",
  "date": "The date of the transaction in YYYY-MM-DD format",
  "amount": 0.00
}

Rules:
- vendor_name: Extract the business name exactly as shown on the receipt header
- date: Convert any date format to YYYY-MM-DD. If the year is unclear, use the current year (2026)
- amount: Extract the TOTAL amount (including tax if shown). Return as a number, not a string. Use the final total, not subtotals
- If any field cannot be determined, use "Unknown" for strings and 0 for amount
- Return ONLY valid JSON, no markdown code blocks, no explanations`

export const scanReceipt = async (formData: FormData): Promise<{
  success: boolean
  data?: ReceiptScanResult
  error?: string
}> => {
  try {
    const file = formData.get("receipt") as File

    if (!file) {
      return { success: false, error: "No file provided" }
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!validTypes.includes(file.type)) {
      return { success: false, error: "Invalid file type. Please upload a JPEG, PNG, or WebP image." }
    }

    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return { success: false, error: "File too large. Maximum size is 10MB." }
    }

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")

    const result = await openai.chat.completions.create({
      model: GEMINI_MODEL,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: RECEIPT_SCAN_PROMPT },
            {
              type: "image_url",
              image_url: {
                url: `data:${file.type};base64,${base64}`,
              },
            },
          ],
        },
      ],
    })

    const text = result.choices[0]?.message?.content || ""

    const cleanedText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim()

    const parsed: ReceiptScanResult = JSON.parse(cleanedText)

    return {
      success: true,
      data: {
        vendor_name: parsed.vendor_name || "Unknown",
        date: parsed.date || new Date().toISOString().split("T")[0],
        amount: typeof parsed.amount === "number" ? parsed.amount : parseFloat(String(parsed.amount)) || 0,
      },
    }
  } catch (error) {
    console.error("Receipt scan error:", error)
    const message = error instanceof Error ? error.message : "Failed to scan receipt"
    return { success: false, error: message }
  }
}
