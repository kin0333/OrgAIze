"use client"

import { useState } from "react"
import type { SponsorshipTier } from "@/types/database"

interface SponsorshipFormProps {
  onGenerate: (data: {
    companyName: string
    tier: SponsorshipTier
    orgName: string
    eventName: string
    eventDetails: string
  }) => void
  isGenerating: boolean
}

const tierOptions: { value: SponsorshipTier; label: string; description: string; color: string }[] = [
  {
    value: "Gold",
    label: "🥇 Gold",
    description: "Premium visibility, speaking slot, VIP table",
    color: "border-amber-300 bg-amber-50",
  },
  {
    value: "Silver",
    label: "🥈 Silver",
    description: "Banner placement, reserved seating, booth space",
    color: "border-slate-300 bg-slate-50",
  },
  {
    value: "Bronze",
    label: "🥉 Bronze",
    description: "Tarpaulin logo, social media mention",
    color: "border-orange-300 bg-orange-50",
  },
]

export const SponsorshipForm = ({ onGenerate, isGenerating }: SponsorshipFormProps) => {
  const [companyName, setCompanyName] = useState<string>("")
  const [tier, setTier] = useState<SponsorshipTier>("Gold")
  const [orgName, setOrgName] = useState<string>("")
  const [eventName, setEventName] = useState<string>("")
  const [eventDetails, setEventDetails] = useState<string>("")

  const handleSubmit = () => {
    if (!companyName.trim() || !orgName.trim()) return

    onGenerate({
      companyName: companyName.trim(),
      tier,
      orgName: orgName.trim(),
      eventName: eventName.trim(),
      eventDetails: eventDetails.trim(),
    })
  }

  const isValid = companyName.trim().length > 0 && orgName.trim().length > 0

  return (
    <div className="glass-card p-6 space-y-5">
      <div className="border-b border-[#b2e0d4]/30 pb-4">
        <h3 className="text-sm font-semibold text-slate-700">Partnership Details</h3>
        <p className="mt-1 text-xs text-slate-400">Fill in the details to generate documents</p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="org-name-input"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Organization Name *
          </label>
          <input
            id="org-name-input"
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="e.g., UP Computer Science Society"
            className="w-full rounded-xl border border-[#b2e0d4]/50 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 transition-colors focus:border-[#007a33] focus:ring-2 focus:ring-[#007a33]/20 focus:outline-none"
            aria-label="Your organization name"
            tabIndex={0}
          />
        </div>

        <div>
          <label
            htmlFor="company-name-input"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Partner Company *
          </label>
          <input
            id="company-name-input"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g., Globe Telecom"
            className="w-full rounded-xl border border-[#b2e0d4]/50 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 transition-colors focus:border-[#007a33] focus:ring-2 focus:ring-[#007a33]/20 focus:outline-none"
            aria-label="Partner company name"
            tabIndex={0}
          />
        </div>

        <div>
          <label
            htmlFor="event-name-input"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Event Name
          </label>
          <input
            id="event-name-input"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="e.g., TechFest 2026"
            className="w-full rounded-xl border border-[#b2e0d4]/50 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 transition-colors focus:border-[#007a33] focus:ring-2 focus:ring-[#007a33]/20 focus:outline-none"
            aria-label="Event name"
            tabIndex={0}
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Sponsorship Tier *
          </label>
          <div className="grid grid-cols-1 gap-2">
            {tierOptions.map((option) => {
              const isSelected = tier === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTier(option.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setTier(option.value)
                    }
                  }}
                  aria-label={`Select ${option.value} tier`}
                  aria-pressed={isSelected}
                  tabIndex={0}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                    isSelected
                      ? "border-[#007a33] bg-[#e0f7f1]/50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-[#b2e0d4]"
                  }`}
                >
                  <span className="text-lg">{option.label.split(" ")[0]}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {option.value}
                    </p>
                    <p className="text-xs text-slate-400">{option.description}</p>
                  </div>
                  {isSelected && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-[#007a33]" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label
            htmlFor="event-details-input"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Additional Details
          </label>
          <textarea
            id="event-details-input"
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
            placeholder="Expected attendance, venue, date, special notes..."
            rows={3}
            className="w-full resize-none rounded-xl border border-[#b2e0d4]/50 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 transition-colors focus:border-[#007a33] focus:ring-2 focus:ring-[#007a33]/20 focus:outline-none"
            aria-label="Additional event details for the AI to include"
            tabIndex={0}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isValid || isGenerating}
        className="w-full rounded-xl bg-[#007a33] px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#004d00] hover:shadow-lg hover:shadow-[#007a33]/20 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Generate sponsorship email and MOA"
        tabIndex={0}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Generating with Gemini AI...
          </span>
        ) : (
          "✨ Generate Documents"
        )}
      </button>
    </div>
  )
}
