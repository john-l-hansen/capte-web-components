# Capte Design System

Canonical design tokens, styles, and component specifications synced directly from the **[Capte Figma Design System](https://www.figma.com/design/oFZw7IVtiURZG2x5XhAKyD/Capte-%E2%80%94-Design-System?node-id=826-5425&t=dLQ3wZ6taQyM5qSf-1)**.

---

## 🎨 Source of Truth & Metrics

- **Figma File**: [Capte — Design System (Node `826:5425`)](https://www.figma.com/design/oFZw7IVtiURZG2x5XhAKyD/Capte-%E2%80%94-Design-System?node-id=826-5425&t=dLQ3wZ6taQyM5qSf-1)
- **Token Coverage**: 217 Variables across 13 Collections (114 Color, 103 Float)
- **Typography**: 30 Text Styles built on `Roboto` (with `Roboto Mono` for technical labels)
- **Components**: 22 Component sets / standalone UI elements (Buttons, Inputs, Cards, Nav, Footers)

---

## 📁 Design System Files

```text
design-system/
├── README.md         # This overview, source links, and audit reference
├── tokens.css        # Canonical CSS custom properties for Webflow embeds
└── tokens.json       # W3C / DTCG standard JSON design tokens for tooling & agents
```

---

## 🌈 Token Architecture Overview

### 1. Color Primitives
- **Primary Ramp (Blue)**: 10-step ramp from `#F2F4FC` (50) down to `#000C38` (900). Serves as the brand anchor. Brand blue is `#093AEC` / `#001384`.
- **Secondary Ramp (Orange-Red)**: 11-step ramp from `#FDF4F1` (50) to `#280A01` (950). Primary action / CTA is `secondary/500` (`#FC5522` / `#E85B28`).
- **Neutral Ramp (Cool Gray)**: 11-step ramp from `#F2F3F6` (50) to `#111523` (950), plus pure white and black.

### 2. Semantic Color Layer
Tokens map to functional roles rather than raw hex values:
- `text/primary` (`#111523`), `text/secondary` (`#5C6475`), `text/accent` (`#FC5522`), `text/inverse` (`#FFFFFF`).
- `background/page` (`#F2F3F6`), `background/surface` (`#FFFFFF`), `background/subtle` (`#E6E8EC`), `background/brand` (`#093AEC`).
- `border/subtle` (`#E6E8EC`), `border/default` (`#D0D2D9`), `border/focus` (`#093AEC` — 2px visible focus ring).
- `interactive/action-primary` (`#FC5522`), hover (`#DD3603`), pressed (`#A62903`).

### 3. Spatial & Radius Scales
- **Spacing Scale (4px base)**: 0px, 2px (`half`), 4px (`1`), 8px (`2`), 12px (`3`), 16px (`4`), 20px (`5`), 24px (`6`), 28px (`7`), 32px (`8`), 40px (`10`), 48px (`12`), 64px (`16`), 80px (`20`), 96px (`24`), 128px (`32`), 192px (`48`).
- **Border Radius**: `0px` (`none`), `2px` (`xs`), `4px` (`sm` — standard inline), `8px` (`md`), `12px` (`lg` — floating cards/modals), `16px` (`xl`), `24px` (`2xl`), `9999px` (`full` — pill buttons).

---

## 💻 Consuming Tokens in Web Components

When writing custom code embeds for Webflow, reference the canonical token variables in your component's CSS block with fallback defaults:

```css
.my-component {
  background: var(--capte-bg-surface, #FFFFFF);
  color: var(--capte-text-primary, #111523);
  border-radius: var(--capte-radius-lg, 0.75rem);
  padding: var(--capte-space-4, 1rem);
  box-shadow: var(--capte-shadow-lg, 0 12px 32px rgba(0, 19, 132, 0.16));
}

.my-component_cta {
  background: var(--capte-action-primary, #FC5522);
  color: var(--capte-action-foreground, #FFFFFF);
}

.my-component_cta:hover {
  background: var(--capte-action-primary-hover, #DD3603);
}
```

---

## 🤖 Automated Cloud Sync (Figma ⇄ GitHub Actions)

To prevent design-to-code drift without requiring local daemon processes, this repository features an automated cloud pipeline:

```
┌────────────────────────┐      ┌─────────────────────────┐      ┌─────────────────────────┐
│  Figma Design System   │ ───> │  GitHub Actions (Daily) │ ───> │  Automated Pull Request │
│  (Edits / Token Bumps) │      │  (.github/workflows/)   │      │  (figma-sync/daily-upd) │
└────────────────────────┘      └─────────────────────────┘      └─────────────────────────┘
```

1. **Daily Cloud Execution**: Every day at 9:00 AM UTC, GitHub Actions runs [`.github/workflows/figma-sync.yml`](../.github/workflows/figma-sync.yml).
2. **REST API State Inspection**: The runner executes [`scripts/figma-sync.js`](../scripts/figma-sync.js), authenticated via the encrypted repository secret `FIGMA_ACCESS_TOKEN`.
3. **Change Detection**: It queries the Figma REST API for file `oFZw7IVtiURZG2x5XhAKyD`, comparing the file's `lastModified` timestamp and `version` against `design-system/.figma-sync.json`.
4. **Automated Pull Request**: If changes are detected in Figma:
   - The workflow updates the sync metadata.
   - It automatically cuts a branch (`figma-sync/daily-update`) and opens a Pull Request for John Hansen with a clear diff.
   - You can review and merge the token updates with a single click.
5. **Manual Trigger**: You can also trigger the sync on demand at any time from GitHub's **Actions** tab by selecting **Figma Design System Daily Sync → Run workflow**.
