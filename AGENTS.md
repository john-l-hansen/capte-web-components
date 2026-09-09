# Capte Design & Web Ops — Canonical Agent Contract

This is the canonical repository contract for all AI agents collaborating on Capte's digital design and web operations (including Claude, ChatGPT / OpenAI Codex, and Google Antigravity). Tool-specific configuration files (such as `CLAUDE.md` and `.agent/rules/`) serve as thin adapters pointing here and must not maintain conflicting policy.

For operational procedures, handoff templates, conflict resolution, and deployment protocols, read [docs/agent-workflow.md](docs/agent-workflow.md).

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
| **Figma** | Visual design intent, UI layouts, interactive states, design tokens. | File/node URL, version/date, breakpoint specs. |
| **GitHub** | Implementation code, version history, PR reviews, technical documentation. | Repo path, commit SHA, branch name, PR link. |
| **Webflow** | Live deployed runtime state, page structures, published embeds. | Site/page URL, domain, embed location, deployed timestamp. |

---

## 3. Brand Tokens & Design System Baseline

These values represent the active brand implementation baseline:

| Token / Purpose | Value | Notes |
| :--- | :--- | :--- |
| **Primary Brand Blue** | `#001384` | Structural elements, headings, brand anchor |
| **Accent Orange** | `#E85B28` | Interactive CTAs only (hover: `#cf4f22`) |
| **Surface (Clean)** | `#FFFFFF` | Primary card and page surface |
| **Muted Surface Tint** | `#DCEDFF` | Subtle containers, media placeholders, badges |
| **Body Text** | `#0F0F11` | Primary readable typography |
| **Muted Text / Borders** | `#7B8491` | Secondary captions, disabled states, borders |
| **Typography** | `Roboto`, Arial, sans-serif | Industrial-modern font stack |
| **Inline Element Radius** | `0.25rem` (4px) | Buttons, inline tags, form fields |
| **Floating Surface Radius** | `0.75rem` (12px) | Floating cards, modals, popovers |
| **Pill / Badge Radius** | `999px` | Badges, dismiss buttons, pill tags |

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
