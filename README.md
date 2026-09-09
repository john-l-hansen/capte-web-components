# capte-web-components

Reusable custom-code components for capte.co, meant to be pasted into a Webflow Embed element. Each component lives in its own folder under `components/` with the code, a usage README, and (where relevant) a changelog and a campaign/launch ledger.

## Why this repo exists

Capte's site runs on Webflow with vanilla custom code powering standalone components and integrations (per the design/web-ops standard). Those embeds otherwise live only inside Webflow's Designer with no version history, no diffing, and no record of what was live when. This repo is the source of truth and history for that code — Webflow Designer is the deployment target, not the archive.

## Structure

```
capte-web-components/
  components/
    <component-name>/
      <component-name>.html   → the actual embed code (HTML + CSS + JS together)
      README.md                → what it does, how to configure it, QA checklist
      CHANGELOG.md              → changes to the component's mechanism (not per-launch config edits)
      campaigns.md               → present only on components with a recurring "launch" cycle —
                                    a ledger of each time it went live, with what config
```

## Workflow

1. Build or update a component's `.html` file in its folder.
2. Commit mechanism changes with a normal commit message; bump the component's `CHANGELOG.md`.
3. When a component is config-driven and reused across campaigns/events (like `promo-card`), editing the config block for a new launch is its own commit, and gets tagged: `git tag <component-name>-<campaign-id>` right after publishing to Webflow, then logged as a row in that component's `campaigns.md`.
4. Paste the current `.html` file into the Webflow Embed element for the relevant page. Webflow is always the deployment step — this repo is what's authoritative before that.

## Components

- [`promo-card`](components/promo-card/README.md) — region + campaign-gated promotional card, bottom-right on desktop, collapsing to a bottom bar on mobile. First used for the Fall 2026 NA event campaign.
