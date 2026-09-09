# Changelog — promo-card

Mechanism changes only. Campaign launches (config edits) are logged in `campaigns.md`, not here.

## [Unreleased]

## [1.0.0] - 2026-09-09
### Added
- Initial version: Cloudflare `/cdn-cgi/trace` country detection (no permission prompt, same-origin, no API key), campaign start/end window check, session-scoped dismiss via `sessionStorage`, `?promoDebug=1` QA bypass.
- Responsive behavior: full floating card (desktop) → smaller floating card (tablet, <768px) → full-width bottom bar (phone, <480px).
