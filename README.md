# OrgAIze: AI Finance & Liquidation Hub

> **Build with AI in Google Hackathon 2026 Submission**
> Eliminating administrative bottlenecks in student organizations through the strategic application of Google Gemini AI.

OrgAIze is a centralized, secure web dashboard designed specifically for student organization officers (Treasurers, Auditors, and Committee Heads). It utilizes Google's **Gemini 2.0 Flash** model to automate the most painful parts of running a student org: manual receipt liquidation and sponsorship documentation.

---

## 🏗️ Architecture & Tech Stack

This project is built with a modern, full-stack JavaScript ecosystem, prioritizing fast rendering, secure server-side AI execution, and an accessible minimalist UI ("Wealthy Greens" theme).

```text
OrgAIze/
├── src/
│   ├── app/            Next.js 16 app (pages, API routes, Server Actions)
│   ├── components/     Reusable React components (UI & feature modules)
│   ├── lib/            Core utilities, OpenRouter AI configs, and Mock DB
│   └── types/          Shared TypeScript interfaces and schemas
├── supabase/           Optional: SQL schema migrations for the real backend
├── docs/               Project documentation, PRD, and guidelines
├── public/             Static assets
└── package.json        Project dependencies and scripts
```

*   **Frontend:** Next.js 16 (App Router), React, TypeScript
*   **UI/Styling:** TailwindCSS, Shadcn/ui (Radix Primitives)
*   **AI Engine:** Google Gemini 2.0 Flash (`google/gemini-2.0-flash-001`) via the **OpenRouter API** to ensure robust performance without direct Google API rate limits.
*   **Backend / API:** Next.js Server Actions using the standard `openai` SDK to interface with OpenRouter.
*   **Database & Auth:** Supabase (PostgreSQL) with a **fallback in-memory mock database** to guarantee seamless live hackathon demos even if remote databases are unconfigured.
*   **Deployment:** Vercel

---

## 📑 Core Features

The MVP is divided into three primary navigation tabs:

1.  **📊 Dashboard:**
    *   A high-level overview of the organization's financial health.
    *   Displays Total Budget, Pending Liquidations, and Active Sponsorships with realistic mock demo data.
2.  **💸 Liquidation Hub (AI Receipt Scanner):**
    *   Committee heads upload images of physical receipts.
    *   **AI Integration:** The Gemini 2.0 Vision model scans the image and automatically extracts the *Vendor Name*, *Date*, and *Total Amount*.
    *   **Security:** Features a "Human-in-the-Loop" workflow where the Treasurer must validate the AI's extraction. Admins can click inline **Approve** or **Reject** buttons to finalize transactions.
3.  **🤝 Sponsorship Manager (AI MOA Drafter):**
    *   VPs of External Affairs input a partner company name and select a sponsorship tier (Gold, Silver, Bronze).
    *   **AI Integration:** Gemini 2.0 instantly generates a customized outreach email and a structured Memorandum of Agreement (MOA), saving hours of drafting time.

---

## 🚀 Quick Start (Local Demo)

Follow these steps to run the OrgAIze demo locally on your laptop.

### Prerequisites
*   Node.js 18.17 or later installed.
*   An [OpenRouter](https://openrouter.ai/) account (for the API key to access Gemini).
*   A [Supabase](https://supabase.com/) project (optional, as the app gracefully falls back to an in-memory mock DB).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kin0333/OrgAIze.git
   cd OrgAIze
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your keys:
   ```env
   # OpenRouter AI API (Required)
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   
   # Supabase Database (Optional)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run Database Migrations (If using Supabase):**
   Copy the contents of `supabase/migration.sql` and run it in your Supabase SQL Editor. *(If you skip this, the app will safely fall back to local mock data!)*

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **View the app:**
   Open `http://localhost:3000` in your browser.