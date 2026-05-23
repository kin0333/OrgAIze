# System Design Document (SDD): OrgAIze

## 1. Architecture Overview
OrgAIze follows a modern Client-Server architecture utilizing a full-stack Next.js environment. The application heavily prioritizes fast rendering and secure API routes to protect financial data and organizational records.

## 2. Technology Stack
*   **Frontend:** Next.js 14 (App Router), React, TypeScript.
*   **Styling:** TailwindCSS, Shadcn/ui (Radix primitives).
*   **Backend:** Next.js Server Actions & API Routes.
*   **Database:** Supabase (PostgreSQL).
*   **Authentication:** Supabase Auth or NextAuth.
*   **AI Engine:** Google Generative AI SDK (`@google/generative-ai`).
*   **Deployment:** Vercel.

## 3. Data Models (Supabase)
*   **`Users` Table:** `id`, `name`, `role` (Admin, Treasurer, Committee Head), `org_id`.
*   **`Liquidations` Table:** `id`, `uploaded_by`, `vendor_name`, `date`, `amount`, `receipt_image_url`, `status` (Pending, Approved), `created_at`.
*   **`Sponsorships` Table:** `id`, `company_name`, `tier` (Gold, Silver, Bronze), `generated_moa_text`, `status`.

## 4. Security & Compliance Requirements
Applying strict information and network security protocols is critical for handling treasury data:
*   **Zero-Trust Uploads:** All uploaded receipts must be sanitized and stored securely in Supabase Storage with strict row-level security (RLS) policies.
*   **Role-Based Access Control (RBAC):** Committee heads can only view their own liquidations; only Treasurers can approve or edit the master ledger.
*   **Environment Security:** Gemini API keys and Supabase credentials must remain strictly server-side.

## 5. API Integration Flow (Gemini Vision)
1. Client uploads image -> Next.js Server Action.
2. Server Action converts image to base64.
3. Server Action calls `gemini-pro-vision` with prompt: "Extract vendor, date, and total amount in JSON format."
4. JSON payload returned to client for Treasurer validation.
