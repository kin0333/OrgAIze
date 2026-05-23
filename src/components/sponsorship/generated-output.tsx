"use client"

import { useState, useCallback } from "react"
import type { MOAGenerationResult } from "@/types/database"

interface GeneratedOutputProps {
  result: MOAGenerationResult
}

type ActiveTab = "email" | "moa"

export const GeneratedOutput = ({ result }: GeneratedOutputProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("email")
  const [copiedTab, setCopiedTab] = useState<ActiveTab | null>(null)

  const handleCopy = useCallback(async (content: string, tab: ActiveTab) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedTab(tab)
      setTimeout(() => setCopiedTab(null), 2000)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = content
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopiedTab(tab)
      setTimeout(() => setCopiedTab(null), 2000)
    }
  }, [])

  const handleTabKeyDown = useCallback((e: React.KeyboardEvent, tab: ActiveTab) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setActiveTab(tab)
    }
  }, [])

  const currentContent = activeTab === "email" ? result.email : result.moa

  return (
    <div className="glass-card overflow-hidden flex flex-col h-full">
      {/* Tab Header */}
      <div className="flex border-b border-[#b2e0d4]/30">
        {(["email", "moa"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            onKeyDown={(e) => handleTabKeyDown(e, tab)}
            tabIndex={0}
            role="tab"
            aria-selected={activeTab === tab}
            aria-label={`View generated ${tab === "email" ? "outreach email" : "MOA document"}`}
            className={`flex-1 px-6 py-3.5 text-sm font-medium transition-all ${
              activeTab === tab
                ? "border-b-2 border-[#007a33] bg-[#e0f7f1]/30 text-[#004d00]"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            {tab === "email" ? "📧 Outreach Email" : "📄 MOA Document"}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6 scrollbar-thin">
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap break-words rounded-xl bg-[#f8faf9] p-5 text-sm leading-relaxed text-slate-700 font-sans border border-[#e0f7f1]">
            {currentContent}
          </pre>
        </div>
      </div>

      {/* Copy Button Footer */}
      <div className="border-t border-[#b2e0d4]/30 px-6 py-3">
        <button
          type="button"
          onClick={() => handleCopy(currentContent, activeTab)}
          className="flex items-center gap-2 rounded-xl bg-[#e0f7f1] px-4 py-2.5 text-sm font-medium text-[#004d00] transition-all hover:bg-[#b2e0d4] w-full justify-center"
          aria-label={`Copy ${activeTab === "email" ? "email" : "MOA"} to clipboard`}
          tabIndex={0}
        >
          {copiedTab === activeTab ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 12 2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Copy to Clipboard
            </>
          )}
        </button>
      </div>
    </div>
  )
}
