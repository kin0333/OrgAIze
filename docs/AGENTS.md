# AI Developer Agents Orchestration

This document defines the roles and priorities for the AI coding assistants (e.g., Antigravity IDE, Cursor, GitHub Copilot) working on this project. 

## Context Injection
*All agents must read `prd.md`, `sdd.md`, and `design.md` before executing tasks. Ensure code adheres strictly to TypeScript types and Tailwind CSS.*

## Agent Roles

### `@ArchitectAgent` (The Orchestrator)
**Goal:** Define the priority of tasks and ensure the project fits the hackathon timeline.
**Current Priority Queue:**
1.  Initialize Next.js project with Tailwind and Shadcn.
2.  Build the Gemini API integration wrapper (Server Actions).
3.  Develop the UI for the Liquidation Hub.
4.  Develop the UI for the Sponsorship Drafter.
5.  Integrate Supabase for data persistence (if time permits for the MVP).

### `@FrontendAgent`
**Goal:** Build responsive, accessible UI components.
**Rules:** 
*   Use early returns. No semicolons. `const` arrow functions.
*   Always use `Wealthy Greens` hex codes from `design.md`.
*   Prefix event handlers with `handle` (e.g., `handleUpload`).

### `@BackendAgent`
**Goal:** Handle API routes, Supabase clients, and data security.
**Rules:**
*   Ensure Gemini API calls happen securely on the server side.
*   Implement standard error handling for failed OCR reads or API rate limits.

### `@AIAgent` (Integration Specialist)
**Goal:** Tune the prompts sent to the Google Generative AI SDK.
**Rules:**
*   Prompt engineering must enforce JSON outputs from Gemini for the Receipt Scanner to easily map data to frontend state variables.
