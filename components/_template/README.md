# Component Guide — [Component Name]

Capte Technologies · capte.co · Prepared [Date]

---

## What It Is
A brief 2–3 sentence summary of what this component is, what user problem it solves, and where it is intended to live on [capte.co](https://www.capte.co).

Delivered as a single self-contained embed: `[component-name].html`.

---

## Architectural Decisions
- **Styling**: Uses BEM classes scoped to `.c-[component-name]` with fallbacks to `design-system/tokens.css`.
- **Accessibility**: Semantic HTML, visible focus ring, keyboard accessible, `prefers-reduced-motion` safety.
- **Fail-Closed**: Gracefully stays hidden if dependencies or required DOM elements are absent.

---

## Configuration Reference
All campaign or instance-specific options live inside the top `CONFIG` object in the `<script>` block:

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique instance identifier. |
| `eyebrow` | `string` | Optional uppercase badge / category label. |
| `heading` | `string` | Primary headline. |
| `description` | `string` | Secondary descriptive text. |
| `ctaLabel` | `string` | Call-to-action button label. |
| `href` | `string` | Destination URL. |

---

## Deployment to Webflow
1. Fill out the `CONFIG` object for your page or campaign.
2. In Webflow Designer, add an **Embed Element** on the target page.
3. Paste the entire `[component-name].html` into the embed and save.
4. Publish to staging and run the QA checklist below.

---

## QA Checklist
- [ ] Responsive states verified (Desktop ≥768px, Tablet 480–767px, Mobile <480px).
- [ ] Keyboard navigation: Tab reaches close button and CTA link with visible focus rings.
- [ ] Screen reader announces region title accurately.
- [ ] No visual collisions with Webflow base styles, headers, or cookie banners.
- [ ] Click-through link navigates to the correct destination URL.
