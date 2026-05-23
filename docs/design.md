# Design Specifications: OrgAIze

## 1. Design Philosophy
The interface must be minimalist, professional, and data-dense without feeling cluttered. It should evoke trust, security, and efficiency. We are strictly utilizing Tailwind classes and Shadcn/ui for accessible, consistent component design.

## 2. Color Palette ("Wealthy Greens")
This palette evokes tranquility, prosperity, and financial security.
*   **Primary Deep Green (Backgrounds/Borders):** `#004d00`
*   **Secondary Green (Primary Buttons/Accents):** `#007a33`
*   **Muted Green (Cards/Secondary Elements):** `#66b3a1`
*   **Light Green (Hover states/Tags):** `#b2e0d4`
*   **Airy Green (Background/Surface Highlights):** `#e0f7f1`
*   **Neutral Text:** Slate-800 to Slate-900.

## 3. Typography
*   **Headers:** Inter or Geist (Clean, modern sans-serif).
*   **Data/Numbers:** JetBrains Mono or a monospaced variant for financial figures to ensure alignment in tables.

## 4. Core Layouts
*   **Sidebar Navigation:** Links to Dashboard, Liquidations, Sponsorships, Settings.
*   **Dashboard View:** Top-level metrics (Total Budget, Pending Liquidations) using simple Shadcn Card components.
*   **Liquidation Modal:** Split view. Left side: Uploaded receipt image preview. Right side: Form inputs pre-filled by Gemini with a prominent `#007a33` "Approve & Save" button.
*   **Sponsorship View:** Text area taking up 70% of the screen for the generated MOA, with a 30% sidebar for inputting the company name and tier to prompt the AI.
