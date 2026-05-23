# Product Requirements Document (PRD): OrgAIze

## 1. Project Overview
**Name:** OrgAIze (AI Finance & Liquidation Hub)
**Event:** Build with AI in Google Hackathon
**Mission:** To eliminate the administrative bottlenecks of financial compliance, liquidation, and external relations in university student organizations through the strategic application of AI.

## 2. Target Audience
*   **Primary:** Student Organization Treasurers, VPs of Finance, and Auditors.
*   **Secondary:** Committee Heads and VPs of External Affairs.

## 3. Problem Statement
Student organizations face severe operational lag due to:
*   Manual data entry from physical receipts causing budget approval delays.
*   Lost documentation affecting institutional memory during officer turnover.
*   Scattered sponsorship tracking leading to delayed Memorandum of Agreement (MOA) drafting and missed funding opportunities.

## 4. Core Features (MVP Scope)
*   **AI Liquidation Hub:** A dashboard module where users upload receipt images. The system utilizes Google Gemini Vision to extract the Vendor, Date, and Total Amount, bypassing manual entry. Includes a "Human-in-the-Loop" validation step before saving to the ledger.
*   **AI Sponsorship Drafter:** A form-based tool utilizing Google Gemini Pro. Users input partner company details and a sponsorship tier to instantly generate customized outreach emails and structured MOAs.
*   **Centralized Finance Dashboard:** A read/write interface for tracking overall budget vs. actual expenses.

## 5. Success Metrics & Rubric Alignment
*   **Problem Fit (25%):** Directly solves compliance & finance workflows for a specific user (student org officers).
*   **AI Use (30%):** Meaningful integration of Gemini API (Vision for OCR, Text for generation), not just a basic chatbot wrapper.
*   **Working MVP (30%):** Core flow (upload receipt -> extract data -> save) functions flawlessly in the demo.
