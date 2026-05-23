"use client"

import { useCallback, useState } from "react"
import { generateMOA } from "@/app/actions/generate-moa"
import { SponsorshipForm } from "@/components/sponsorship/sponsorship-form"
import { GeneratedOutput } from "@/components/sponsorship/generated-output"
import type { MOAGenerationResult, SponsorshipTier } from "@/types/database"

const SponsorshipsPage = () => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [result, setResult] = useState<MOAGenerationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = useCallback(async (data: {
    companyName: string
    tier: SponsorshipTier
    orgName: string
    eventName: string
    eventDetails: string
  }) => {
    setIsGenerating(true)
    setError(null)

    const response = await generateMOA({
      companyName: data.companyName,
      tier: data.tier,
      orgName: data.orgName,
      eventName: data.eventName || undefined,
      eventDetails: data.eventDetails || undefined,
    })

    if (!response.success || !response.data) {
      setError(response.error || "Failed to generate documents")
      setIsGenerating(false)
      return
    }

    setResult(response.data)
    setIsGenerating(false)
  }, [])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Sponsorship Manager
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Generate professional outreach emails and MOA drafts with AI
        </p>
      </div>

      {/* Error Toast */}
      {error && (
        <div
          className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
          role="alert"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" x2="9" y1="9" y2="15" />
            <line x1="9" x2="15" y1="9" y2="15" />
          </svg>
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="ml-auto text-red-400 hover:text-red-600"
            aria-label="Dismiss error"
            tabIndex={0}
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content: Two Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
        {/* Left Column: Form (30%) */}
        <div>
          <SponsorshipForm
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>

        {/* Right Column: Generated Output (70%) */}
        <div className="min-h-[500px]">
          {result ? (
            <GeneratedOutput result={result} />
          ) : (
            <div className="glass-card flex flex-col items-center justify-center p-16 text-center h-full">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="relative h-20 w-20">
                    <div className="absolute inset-0 rounded-full border-4 border-[#e0f7f1]" />
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#007a33]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#004d00]">Generating documents...</p>
                    <p className="mt-1 text-xs text-slate-400">Gemini AI is crafting your email and MOA</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#e0f7f1]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#66b3a1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="m10 13-2 2 2 2" />
                      <path d="m14 17 2-2-2-2" />
                    </svg>
                  </div>
                  <p className="text-base font-medium text-slate-500">
                    Ready to draft
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-slate-400">
                    Fill in the partnership details and click generate to create a professional outreach email and MOA
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SponsorshipsPage
