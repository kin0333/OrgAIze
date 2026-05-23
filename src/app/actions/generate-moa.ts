"use server"

import { getTextModel } from "@/lib/gemini"
import type { MOAGenerationResult, SponsorshipTier } from "@/types/database"

interface GenerateMOAInput {
  companyName: string
  tier: SponsorshipTier
  orgName: string
  eventName?: string
  eventDetails?: string
}

const buildMOAPrompt = (input: GenerateMOAInput): string => {
  const tierBenefits: Record<SponsorshipTier, string> = {
    Gold: "Logo on all event materials (banners, tarpaulins, social media), reserved VIP table, 5-minute speaking slot during the event, product booth space, mention in all press releases, and first right of refusal for future events",
    Silver: "Logo on event banners and social media posts, reserved seating for 4 guests, product booth space, and mention in press releases",
    Bronze: "Logo on event tarpaulin, mention on social media posts, and 2 complimentary event tickets",
  }

  return `You are a professional communications officer for a university student organization.

Generate TWO documents based on the following details:

Organization Name: ${input.orgName}
Partner Company: ${input.companyName}
Sponsorship Tier: ${input.tier}
${input.eventName ? `Event Name: ${input.eventName}` : ""}
${input.eventDetails ? `Event Details: ${input.eventDetails}` : ""}

Tier Benefits for ${input.tier}: ${tierBenefits[input.tier]}

---

DOCUMENT 1 - OUTREACH EMAIL:
Write a professional, warm, and persuasive sponsorship outreach email. The email should:
- Have a clear subject line
- Address the company professionally
- Briefly introduce the student organization
- Explain the event and its relevance to the company's audience
- Present the ${input.tier} tier benefits
- Include a clear call-to-action
- Be between 200-350 words

DOCUMENT 2 - MEMORANDUM OF AGREEMENT (MOA):
Write a structured MOA document that includes:
- Title: "MEMORANDUM OF AGREEMENT"
- Parties involved (the student organization and the company)
- Purpose and scope of the partnership
- Obligations of each party
- ${input.tier} tier deliverables and benefits
- Duration of the agreement
- Standard termination and amendment clauses
- Signature blocks for both parties

---

Return your response in the following JSON format ONLY (no markdown code blocks):
{
  "email": "The complete outreach email text",
  "moa": "The complete MOA document text"
}`
}

export const generateMOA = async (input: GenerateMOAInput): Promise<{
  success: boolean
  data?: MOAGenerationResult
  error?: string
}> => {
  try {
    if (!input.companyName.trim()) {
      return { success: false, error: "Company name is required" }
    }

    if (!input.orgName.trim()) {
      return { success: false, error: "Organization name is required" }
    }

    const model = getTextModel()
    const prompt = buildMOAPrompt(input)

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    const cleanedText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim()

    const parsed: MOAGenerationResult = JSON.parse(cleanedText)

    return {
      success: true,
      data: {
        email: parsed.email || "Failed to generate email content",
        moa: parsed.moa || "Failed to generate MOA content",
      },
    }
  } catch (error) {
    console.error("MOA generation error:", error)
    const message = error instanceof Error ? error.message : "Failed to generate sponsorship documents"
    return { success: false, error: message }
  }
}
