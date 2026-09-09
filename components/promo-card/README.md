# Promo card component — implementation guide

Capte Technologies · capte.co · Prepared 2026-09-09

## What it is

A lightweight, fixed-position promotional card that appears bottom-right on a page and links straight to a registration page. It only shows to visitors who are (a) in an approved country, based on approximate IP location, and (b) viewing during a defined campaign window. Built as a single self-contained Embed so it's reusable for future region-specific campaigns — launching a new one is a config edit, not a rebuild.

Delivered as one file: `promo-card.html`, meant to be pasted into a Webflow Embed element on the Home page. HTML, CSS, and JS are kept together intentionally, matching Capte's "vanilla custom code" stack for standalone components and integrations.

## Decisions made, and why

**Country detection: Cloudflare's `/cdn-cgi/trace` endpoint, not a third-party API.** I checked capte.co directly — it's served through Cloudflare (Webflow's own hosting layer), which exposes this same-origin endpoint for free, with no API key, no rate limit, and no third-party dependency. It returns a two-letter country code (`loc=US`) derived from the visitor's IP — this is IP-based, not device GPS, so it never triggers a location permission prompt, satisfying that requirement directly. I ruled out a third-party geolocation API (ipapi.co, ipinfo.io, etc.) since it would add an external dependency, potential cost or rate limits at scale, and a cross-origin request, for no benefit given Cloudflare is already in front of this domain.

**Dismiss behavior: session-scoped.** A close (×) button hides the card for the rest of that browser session (`sessionStorage`), keyed to the campaign's `id`. It reappears on a new visit, so a still-eligible visitor who closed it Tuesday doesn't lose the chance to register if they come back Thursday. This was my recommendation in the options I gave you; flag it if you'd rather it stay dismissed for the full campaign instead (that's a one-line change — swap `sessionStorage` for `localStorage` in `wasDismissed` / `markDismissed`).

**Mobile behavior: two-step responsive collapse**, per your steer:
- Desktop (≥768px): full floating card, bottom-right.
- Tablet / small laptop (480–767px): the same floating card, scaled down — smaller padding, smaller image, tighter to the corner.
- Phone (<480px): collapses into a full-width bar pinned to the bottom of the viewport. The description line drops to keep it short and thumb-reachable; heading, eyebrow-free, and the CTA stay.

**Fails closed.** If the country can't be determined for any reason (most commonly: the page is being viewed on a domain that isn't behind Capte's production Cloudflare setup), the card simply doesn't show. It never guesses a visitor into eligibility.

## Config reference

Everything that changes per campaign lives in one `CONFIG` object at the top of the `<script>` block:

| Field | Purpose |
|---|---|
| `id` | Unique per campaign. Change this for every new campaign — it's the key that "remembers" a dismissal, so a new id means someone who dismissed the last campaign will still see this one. |
| `countries` | Array of ISO 3166-1 alpha-2 codes eligible to see the card (e.g. `["US", "CA"]`). Extend this array for a future multi-region event. |
| `startISO` / `endISO` | Campaign window, written in UTC (`Z`) to avoid daylight-saving mistakes. Each has a comment showing the local-time equivalent — double-check that comment matches what you intend before publishing. |
| `href` | Registration page URL. |
| `eyebrow`, `heading`, `description`, `ctaLabel` | Card copy. `description` and `eyebrow` are optional — leaving either empty removes it from layout (they're set to `display: none` when empty). |
| `imageSrc` / `imageAlt` | Optional. Leave `imageSrc` empty to hide the image slot entirely — the card works fine as text + CTA only. |

## Launching a campaign

1. Fill in every `CONFIG` field for this event.
2. Double-check `startISO` / `endISO` against the local-time comments.
3. Paste the whole file into an Embed element on the Home page in Webflow Designer.
4. Publish to the live domain (see limitation below — staging won't show it).
5. Spot-check on the live URL with `?promoDebug=1` appended (see QA below), then without it.

## Retiring / reusing for the next campaign

The card doesn't need to be manually removed at the end of a campaign — once `Date.now()` passes `endISO`, it stops rendering on its own. For the *next* campaign (same region or a new one), duplicate the Embed and edit `CONFIG` only; the HTML, CSS, and detection logic don't need to change. This is what makes it reusable rather than one-off.

## Known limitation: staging vs. production domain

`/cdn-cgi/trace` depends on Cloudflare fronting the domain. That's confirmed true for `capte.co` / `www.capte.co`, but Webflow's own staging preview (`*.webflow.io`) is not guaranteed to be proxied the same way. If the card never appears while testing on a `.webflow.io` link, that's expected, not a bug — test on the published custom domain.

## QA checklist

- [ ] On the **live custom domain**, append `?promoDebug=1` to the Home page URL — the card should appear regardless of your actual location or campaign dates, so you can check layout/copy/links without waiting for the real window or being in an eligible country. (Close/dismiss and the CTA link still behave normally.)
- [ ] Without the debug param, confirm the card is absent outside the campaign window (temporarily test with a past `endISO` if needed, then restore it).
- [ ] Confirm the registration link (`href`) is correct and goes live at the same time the card does.
- [ ] Check all three breakpoints (desktop floating card, tablet smaller floating card, phone bottom bar) on real devices or responsive mode.
- [ ] Check for a z-index conflict with anything else that occupies the bottom-right or bottom of the viewport — a cookie-consent banner or chat widget most likely. The card uses `z-index: 999`; adjust `--promo-z` if something else needs to sit above or below it.
- [ ] Tab through the card with keyboard only: focus should reach the close button and the CTA link, both with a visible focus ring, in a sensible order.
- [ ] Confirm the card never appears on top of / blocks any modal, nav menu, or the cookie banner in a way that traps focus or hides a required control.
- [ ] Verify with a screen reader that the card announces as a labelled region (not silently, not as an alert) when it becomes visible.

## Accessibility and performance notes

- The card is a labelled `role="region"`, not a dialog — it never traps keyboard focus or blocks the rest of the page.
- The close control is a real `<button>` with `aria-label="Dismiss promotion"`; the CTA is a real `<a>` with descriptive visible text ("Register"), not "click here."
- Entry animation (fade/slide-up) is skipped under `prefers-reduced-motion: reduce`.
- The image, if used, is `loading="lazy"` with explicit `width`/`height` to avoid layout shift.
- The only network request this component makes is the same-origin `/cdn-cgi/trace` call, cached in `sessionStorage` for the rest of the visit so it only fires once per session, not once per page.
