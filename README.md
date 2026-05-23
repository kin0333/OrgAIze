# OrgAIze: AI Finance & Liquidation Hub

> **Build with AI in Google Hackathon 2026 Submission**
> Eliminating administrative bottlenecks in student organizations through the strategic application of Google Gemini AI.

OrgAIze is a centralized, secure web dashboard designed specifically for student organization officers (Treasurers, Auditors, and Committee Heads). It utilizes Google's Gemini Vision and Pro APIs to automate the most painful parts of running a student org: manual receipt liquidation and sponsorship documentation.

---

## 🏗️ Architecture & Tech Stack

This project is built with a modern, full-stack JavaScript ecosystem, prioritizing fast rendering, secure server-side AI execution, and an accessible minimalist UI ("Wealthy Greens" theme).

*   **Frontend:** Next.js 14 (App Router), React, TypeScript
*   **UI/Styling:** TailwindCSS, Shadcn/ui (Radix Primitives)
*   **AI Engine:** Google Generative AI SDK (`gemini-pro-vision` for OCR, `gemini-pro` for text generation)
*   **Backend / API:** Next.js Server Actions (ensuring API keys remain strictly on the server)
*   **Database & Auth:** Supabase (PostgreSQL)
*   **Deployment:** Vercel

---

## 📑 Tabs in the MVP (Core Features)

The MVP is divided into three primary navigation tabs:

1.  **📊 Dashboard:**
    *   A high-level overview of the organization's financial health.
    *   Displays Total Budget, Pending Liquidations, and Active Sponsorships.
2.  **💸 Liquidation Hub (AI Receipt Scanner):**
    *   Committee heads upload images of physical receipts.
    *   **AI Integration:** Gemini Vision scans the image and automatically extracts the *Vendor Name*, *Date*, and *Total Amount*.
    *   **Security:** Features a "Human-in-the-Loop" workflow where the Treasurer must validate the AI's extraction before it is securely saved to the database.
3.  **🤝 Sponsorship Manager (AI MOA Drafter):**
    *   VPs of External Affairs input a partner company name and select a sponsorship tier (Gold, Silver, Bronze).
    *   **AI Integration:** Gemini Pro instantly generates a customized outreach email and a structured Memorandum of Agreement (MOA), saving hours of drafting time.

---

## 🚀 Quick Start (Local Demo)

Follow these steps to run the OrgAIze demo locally on your laptop. 

### Prerequisites
*   Node.js 18.17 or later installed.
*   A Google AI Studio account (for the Gemini API key).
*   A Supabase project (for database credentials).

### Installation

1. **Clone the repository:**
```bash
   git clone [https://github.com/yourusername/orgaize.git](https://github.com/yourusername/orgaize.git)
   cd orgaize