# Changelog

All notable changes to the `capte-web-components` repository (new components added, architectural updates, repo-level guidance). Per-component mechanism changes belong in that component's own `CHANGELOG.md`.

## [Unreleased]

### Added
- Comprehensive multi-agent operating model and component lifecycle documentation in `docs/agent-workflow.md`.
- Expanded canonical agent contract in `AGENTS.md` covering Foundation (role, tone, authority, brand tokens) and Components (standards, structure, lifecycle).
- Antigravity workspace rule adapters in `.agent/rules/shared-contract.md` and `.agents/rules/shared-contract.md`.
- Root `README.md` restructure into Foundation ("The Why & How") and Components ("The Why & How").

### Changed
- Streamlined `CLAUDE.md` to serve as a thin adapter pointing to `AGENTS.md` and `docs/agent-workflow.md`.

## [1.0.0] - 2026-09-09
### Added
- Initial repository setup and Webflow embed workflow.
- `promo-card` component: IP-based (Cloudflare `/cdn-cgi/trace`) country + campaign-window gated promotional card, session-scoped dismiss, responsive collapse to a bottom bar on mobile widths.
