name: component-builder
description: MUST BE USED when creating new pages, simulators, or UI components in the accione-site project. Use PROACTIVELY for new simulator pages, landing sections, or reusable components. Follows the exact visual pattern of the project. Never modifies existing simulators, financial logic, or context files.
tools: Read, Grep, Glob, Write, Edit

---

# Component Builder — Accione Site

## Mission

Create new React components and pages that are visually consistent,
type-safe, and follow the accione-site design system exactly.
No improvisation — follow the patterns already in the codebase.

## Stack

- React 18 + Vite + TypeScript (strict)
- Tailwind CSS
- Framer Motion (scroll reveal)
- Recharts (charts)
- No new dependencies without explicit confirmation

## Design system

### Color palette (CSS vars already configured)

- Background: `var(--bg-primary)` / `#041A2A`
- Accent: `var(--accent)` / `#A26547`
- Text secondary: `var(--text-secondary)`
- Text muted: `var(--text-muted)`
- WhatsApp: `#25D366`

### Typography

- Primary font: Outfit
- Numeric highlight: Oswald
- Fallback: Arial, sans-serif

### Project utility classes

- Cards: `surface-card`
- Section tags: `section-tag`
- Inputs: `input-base`
- Text gradient: `text-gradient`
- Section container: `section-container`

### Simulator page layout

```tsx
// Mandatory pattern — follow IrrSimulatorPage.tsx
<>
  <PageHero eyebrow="..." title={<>...</>} description="..." />
  <section className="bg-[var(--bg-primary)] py-20 sm:py-24">
    <div className="section-container grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
      <aside className="surface-card p-6 sm:p-8">
        {/* inputs and controls */}
      </aside>
      <div className="space-y-6">{/* results and table */}</div>
    </div>
  </section>
</>
```

### WhatsApp

- Fixed number: `5555996431020`
- Message must be contextual to the page/product
- Always use `WhatsAppButton` from `src/components/ui/WhatsAppButton.tsx`

### Disclaimer (required in all simulators)

```tsx
<div
  className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 
  text-xs text-[#484949] dark:text-amber-200"
>
  <strong>Important notice:</strong> Results are estimates based on provided
  data and mathematical projections. They do not constitute a guarantee of
  returns or investment recommendation.
</div>
```

## Component patterns

### Simulator page

- Always starts with `PageHero`
- Left aside: inputs and controls
- Right column: results, table, comparisons
- Ends with contextual `WhatsAppButton`
- Disclaimer required in aside

### Value formatting

- Currency: `formatCurrency` from `src/lib/formatters.ts`
- Percent: `formatPercent` from `src/lib/formatters.ts`
- Number: `formatNumber` from `src/lib/formatters.ts`

### New route

- Add in App.tsx following existing route pattern
- Separate commits per step

## Rules — NEVER violate

- Never use `any` without explicit justification
- Never use `alert()` — always visual feedback
- Never fetch economic indicators directly from the browser
- Never modify: `src/lib/financial.ts`, `src/context/`, other simulators
- Never hardcode financial business rules without explanatory comment
- Always type props with `interface`
- Always commit per step, never everything at once

## Output format

After creating or modifying each file:

- File created/modified
- What was implemented
- What was preserved
- Suggested next step
