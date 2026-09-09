# Capte Design & Web Ops — Agent Context & Guidelines

## 1. Role & Operating Context
- **User**: John Hansen — Web/Print Designer at Capte Technologies Inc. (Los Angeles, CA).
- **Authority**: Full end-to-end owner of [capte.co](https://www.capte.co) and all public-facing materials. John is the final decision-maker on design direction, brand aesthetics, and technical implementation.
- **Company**: Capte Technologies builds advanced positioning and IoT solutions for transit, vehicles, and industrial infrastructure across the U.S. and Europe.
- **Scope**:
  - Webflow site management, custom embeds, component architecture, and future rebuilds.
  - Print production in Adobe InDesign (manuals, datasheets, brochures, proposals).
  - Visuals: isometric illustrations, technical schematics, and UI wireframes.
  - Cross-functional alignment between engineering specifications and marketing/sales copy.

---

## 2. Design System Tokens & Brand Standards
- **Colors**:
  - Primary Brand Blue: `#001384` (structure, headers, primary brand identity)
  - Primary Accent Orange: `#E85B28` (action items, CTAs only; hover `#cf4f22`)
  - Surface / Light Background: `#FFFFFF`
  - Muted Blue Tint: `#DCEDFF` (subtle containers, media backgrounds, badges)
  - Body Copy: `#0F0F11`
  - Muted Copy / Borders: `#7B8491`
- **Typography**: `Roboto`, Arial, sans-serif. Clean, industrial-modern typographic hierarchy.
- **Border Radius**: 
  - Standard inline UI: `0.25rem` (4px)
  - Floating surfaces / cards: `0.75rem` (12px)
  - Badges / pill buttons: `999px`

---

## 3. Web Component Architecture (Webflow Embeds)
- **Zero-Dependency Vanilla Code**: HTML, CSS, and JS packaged cleanly inside a single component file intended for direct paste into Webflow Custom Code Embeds.
- **Strict CSS Scoping**: All classes and custom properties prefixed with the component name (e.g., `.promo-card`, `.promo-card_body`, `--promo-*`) to prevent collisions with Webflow base styles.
- **Fail-Closed Robustness**: Components must gracefully degrade or stay hidden if dependencies, network calls (e.g., geo-lookup), or DOM elements fail.
- **Cloudflare Geo-Targeting**: Use same-origin `/cdn-cgi/trace` for country resolution on production `capte.co`. Include debug overrides (`?promoDebug=1`) for staging QA.
- **Accessibility & Motion**: Semantic HTML, proper ARIA labeling, keyboard navigation, and explicit `@media (prefers-reduced-motion: reduce)` overrides.

---

## 4. Repository & Versioning Conventions
- **Structure**:
  ```
  web-components/
    components/
      <component-name>/
        <component-name>.html   → Single-file embed (HTML + scoped CSS + JS)
        README.md                → Usage instructions, config schema, QA checklist
        CHANGELOG.md             → Semantic versioning for mechanism updates
        campaigns.md             → (Optional) Ledger for config/campaign deployments
  ```
- **Git Commits & Tags**:
  - Use clear conventional commit messages (`feat: ...`, `fix: ...`, `docs: ...`).
  - For reusable campaign launches, tag releases: `<component-name>-<campaign-id>` (e.g., `promo-card-fall-2026-na`).
