# Capte Design & Web Ops — shared agent contract

This is the canonical repository contract for every agent, including Claude, Codex, and Antigravity. Tool-specific instruction files are thin adapters to this file; they must not maintain competing project policy. Read [docs/agent-workflow.md](docs/agent-workflow.md) for the operating procedure.

## Purpose and ownership

Capte Technologies builds advanced positioning and IoT solutions for transit, vehicles, and industrial infrastructure across the U.S. and Europe. John Hansen owns capte.co and public-facing materials and is the final decision-maker on design, brand, and implementation.

Everything should feel **technically elegant**: clear, precise, restrained, accessible, and robust. This repository holds reusable Webflow embeds. The wider design/web-ops context includes print production in InDesign, technical illustrations and wireframes, and alignment of engineering specifications with marketing and sales copy.

## Authority and working agreement

- **Drive** owns strategy, requirements, and approved decisions.
- **Figma** owns approved design intent, components, and design tokens.
- **GitHub** owns implementation, code history, reviews, and implementation documentation.
- **Webflow** owns the deployed production state; its embeds are deployments of versioned code.
- Authority is scoped to the subject, not determined by the newest timestamp or which agent wrote it. Drafts, chat summaries, local memory, and exported copies are context, not automatic approvals.
- Follow the user's explicit task and existing authorization, subject to platform constraints. This contract governs shared repository policy; the workflow elaborates it, and component documentation supplies local implementation details. Adapters do not override it.
- Resolve mechanical discrepancies from evidence. For incompatible approved requirements or consequential design/production conflicts, document the sources and ask John to decide; continue independent work.
- Never invent access, approvals, source links, test results, or deployment status. Identify unavailable evidence and assumptions.

## Startup and delivery

1. Read this file, the workflow, root README, and relevant component README, changelog, and campaign ledger.
2. Inspect the current branch, commit, pending changes, and relevant PR/handoff before editing. Preserve others' work and coordinate overlapping files.
3. Establish scope, acceptance criteria, source references, and deployment status. Read only the external sources needed for the task; missing unrelated access does not block repository work.
4. Work on a dedicated branch. Keep changes focused and use conventional commits (`feat:`, `fix:`, `docs:`). Submit reviewable PRs against `main`.
5. Validate proportionately and report checks actually performed, remaining limitations, and the next owner/action. Follow the handoff format in the workflow.
6. Merge, tagging a release, and publishing to Webflow are separate actions requiring task authorization. A request to prepare code or open a PR does not authorize production publication. Do not repeat approval requests already satisfied.

## Component architecture

- Use zero-dependency vanilla HTML, CSS, and JavaScript in a self-contained file suitable for a Webflow Custom Code Embed.
- Scope CSS classes and custom properties to the component (for example, `.promo-card_body` and `--promo-*`) to prevent collisions with Webflow styles.
- Degrade gracefully on missing DOM elements or failed dependencies/network calls. Eligibility-gated promotions fail closed: never guess a visitor into eligibility.
- For existing Cloudflare geo-targeting, use same-origin `/cdn-cgi/trace` on production capte.co. Preserve the `?promoDebug=1` QA override; debug display does not prove normal eligibility. See the component README for staging limitations.
- Use semantic HTML, appropriate ARIA labels, keyboard navigation and visible focus, and explicit `prefers-reduced-motion: reduce` overrides.
- Keep code and documentation aligned. Mechanism changes belong in the component changelog with semantic versioning; campaign configuration changes belong in the campaign ledger after actual deployment.

## Brand baseline

These values preserve the repository's existing baseline. Reconcile approved Figma changes through the workflow; do not silently fork the design system.

| Purpose | Value |
| --- | --- |
| Primary brand blue: structure and headers | `#001384` |
| Accent orange: actions and CTAs only | `#E85B28`; hover `#cf4f22` |
| Surface | `#FFFFFF` |
| Muted blue tint: containers, media, badges | `#DCEDFF` |
| Body copy | `#0F0F11` |
| Muted copy / borders | `#7B8491` |
| Typography | Roboto, Arial, sans-serif |
| Inline UI radius | `0.25rem` (4px) |
| Floating surfaces / cards radius | `0.75rem` (12px) |
| Badges / pill buttons radius | `999px` |

## Repository layout

Paths below are relative to the repository root:

```text
components/<component-name>/
  <component-name>.html   # HTML + scoped CSS + JS embed
  README.md               # usage, config, QA checklist
  CHANGELOG.md            # mechanism changes
  campaigns.md            # optional record of actual campaign launches
```

Record repository-level structural changes in the root changelog. For authorized campaign releases, tag the exact deployed code commit as `<component-name>-<campaign-id>` after publishing, then record the launch in the ledger. Do not mark planned launches as deployed.
