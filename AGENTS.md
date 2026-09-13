# Capte Design & Web Ops — Canonical Agent Contract

This is the canonical repository contract for all AI agents collaborating on Capte's digital design and web operations (including Claude, ChatGPT / OpenAI Codex, Google Antigravity, and Cursor). All operational workflows and adapters are governed by the supreme laws established in **[CONSTITUTION.md](CONSTITUTION.md)**.

For detailed operational procedures, handoff templates, conflict resolution, and deployment protocols, read [docs/agent-workflow.md](docs/agent-workflow.md). For Client-First styling rules and design tokens, read [DESIGN.md](DESIGN.md).

---

## 1. Role, Ownership & Principles

- **Owner & Final Authority**: John Hansen — Web/Print Designer & Digital Design / Web Operations lead at Capte Technologies Inc. (Los Angeles, CA). John owns [capte.co](https://www.capte.co) end-to-end and makes all final decisions regarding design direction, brand standards, and technical implementation.
- **Company**: Capte Technologies engineers industrial IoT, smart telemetry, and precision positioning systems for transit agencies, vehicle fleets, and industrial infrastructure across the U.S. and Europe.
- **Tone & Aesthetic ("Technically Elegant")**: Every design and component must be clear, precise, restrained, accessible, and robust. We prioritize industrial clarity and clean ergonomics over decorative noise.
- **Operational Reality**: Webflow Designer is our deployment target, but GitHub is our version-controlled source of truth.

---

## 2. Cross-Platform Source Authority

Authority is strictly scoped to domain functions. Timestamp recency does not automatically supersede approved documentation.

| Domain | Authoritative Scope | What to Carry into a Task |
| :--- | :--- | :--- |
| **Google Drive** | Business requirements, sales specs, strategic decisions, approved copy. | Doc URL, section, approval date, decision owner. |
| **Figma** | Visual design intent, UI layouts, interactive states, design tokens. | [Capte Design System](https://www.figma.com/design/oFZw7IVtiURZG2x5XhAKyD/Capte-%E2%80%94-Design-System?node-id=826-5425&t=dLQ3wZ6taQyM5qSf-1) file/node URL, version/date, breakpoint specs. |
| **GitHub** | Implementation code, version history, PR reviews, technical documentation. | Repo path, commit SHA, branch name, PR link. |
| **Webflow** | Live deployed runtime state, page structures, published embeds. | Site/page URL, domain, embed location, deployed timestamp. |

---

## 3. Brand Tokens & Design System Baseline

The full codified design system with 217 variables is housed in **[`design-system/`](design-system/README.md)** (CSS custom properties in [`design-system/tokens.css`](design-system/tokens.css) and JSON in [`design-system/tokens.json`](design-system/tokens.json)).

Key baseline highlights:

| Token / Purpose | Value | Notes |
| :--- | :--- | :--- |
| **Primary Brand Blue** | `#001384` / `#093AEC` | Structural elements, headings, brand anchor |
| **Accent Orange** | `#FC5522` / `#E85B28` | Interactive CTAs only (hover: `#DD3603` / `#cf4f22`) |
| **Surface (Clean)** | `#FFFFFF` | Primary card and page surface |
| **Muted Surface Tint** | `#DCEDFF` / `#F2F4FC` | Subtle containers, media placeholders, badges |
| **Body Text** | `#111523` / `#0F0F11` | Primary readable typography |
| **Muted Text / Borders** | `#7B8491` / `#B0B6BF` | Secondary captions, disabled states, borders |
| **Typography** | `Roboto`, Arial, sans-serif | Industrial-modern font stack (`Roboto Mono` for technical labels) |
| **Inline Element Radius** | `0.25rem` (4px) | Buttons, inline tags, form fields (`--capte-radius-sm`) |
| **Floating Surface Radius** | `0.75rem` (12px) | Floating cards, modals, popovers (`--capte-radius-lg`) |
| **Pill / Badge Radius** | `9999px` | Badges, dismiss buttons, pill tags (`--capte-radius-full`) |

---

## 4. Web Component Architecture Standards

Every component built for Webflow embeds must adhere to these standards:

1. **Self-Contained Vanilla Payload**: Single-file `.html` containing semantic HTML, scoped CSS, and zero-dependency vanilla JavaScript.
2. **Strict CSS Scoping**: All classes and custom properties must be prefixed with the component name (e.g. `.promo-card`, `.promo-card_body`, `--promo-*`) to eliminate side effects on Webflow global styles.
3. **Fail-Closed Robustness**: When external conditions (e.g. network calls, geo-detection, DOM elements) fail or cannot be determined, components must fail closed (remain hidden gracefully) rather than render broken states.
4. **Cloudflare Geo-Targeting**: Leverage same-origin `/cdn-cgi/trace` on production `capte.co` to avoid third-party geolocation APIs, rate limits, and browser GPS prompts. Always support `?promoDebug=1` for staging QA.
5. **Accessibility (a11y)**: Semantic HTML landmarks, clear ARIA labeling, full keyboard navigability with visible focus indicators, and `@media (prefers-reduced-motion: reduce)` transitions disabled.

---

## 5. Repository Structure & Versioning Conventions

```text
web-components/
├── AGENTS.md                  # Canonical shared contract (this file)
├── CLAUDE.md                  # Claude adapter
├── README.md                  # Repository overview & quick start
├── CHANGELOG.md               # Repo-level and guidance changes
├── docs/
│   └── agent-workflow.md      # Multi-agent operating model & handoffs
├── .agent/rules/
│   └── shared-contract.md     # Antigravity workspace rule adapter
└── components/
    └── <component-name>/
        ├── <component-name>.html  # Production Webflow embed code
        ├── README.md              # Component documentation & QA checklist
        ├── CHANGELOG.md           # Mechanism versioning (SemVer)
        └── campaigns.md           # (Optional) Ledger of live campaign launches
```

### Release & Campaign Tagging
- **Mechanism Updates**: Bumps the component version in `components/<name>/CHANGELOG.md` (e.g. `v1.1.0`).
- **Campaign Configuration Releases**: Editing the `CONFIG` block for a specific event or campaign is tagged upon Webflow publication:
  ```bash
  git tag <component-name>-<campaign-id>  # e.g. promo-card-apta-2026-expo
  git push origin --tags
  ```
- The deployment is then recorded as an entry in the component's `campaigns.md`.
