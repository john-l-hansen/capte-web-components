# Multi-agent operating workflow

[AGENTS.md](../AGENTS.md) is the canonical shared contract. This document explains how to apply it across tools and sessions. Claude, Codex, and Antigravity are peers: tasks are assigned by scope and available capabilities, with no tool acting as a permanent authority over another.

## Source authority

| System | Authoritative for | What to carry into a task |
| --- | --- | --- |
| Drive | Strategy, business requirements, approved decisions, rationale | Document link, section, revision/date, approval status and decision owner |
| Figma | Approved visual design, interaction intent, components and tokens | File/node link, version/date and relevant state or breakpoint |
| GitHub | Implemented code, version history, PR review, implementation documentation | Repository path, commit SHA, branch and PR |
| Webflow | Actual deployed production state, page configuration and publication | Site/page or embed location, domain, observed/published time and deployed code reference when known |

These are complementary domains, not a global ranking. A newer Webflow edit does not automatically supersede approved Figma design or become the implementation archive. An approved Figma change describes intended design until implemented and deployed. A merged PR does not prove production was updated.

Use direct links and version identifiers where available. Mark drafts and unverified copies explicitly. Do not fabricate missing Drive/Figma URLs or treat conversation memory as a durable decision record. The brand values in AGENTS.md are the existing implementation baseline, pending any evidenced and approved design update.

## Startup protocol

1. Read AGENTS.md, this workflow, the root README, and documentation for the affected component. Check for applicable local instructions.
2. Confirm the repository, branch and base SHA, local pending changes, and relevant open PR or previous handoff. Do not reset, overwrite, or absorb another contributor's unrelated work.
3. Restate the requested outcome and acceptance criteria. Identify which authority domains are relevant and inspect those sources. Repository-only documentation work does not require unrelated Drive, Figma, or Webflow access.
4. Record assumptions, unavailable evidence, and known mismatches. If a missing source determines the result, request the specific missing information and continue work that does not depend on it.
5. Create or use the task's dedicated branch from the intended base. If resuming an existing branch, inspect its changes first. Coordinate ownership before editing files another agent is changing.
6. Confirm what is authorized: preparation, external source edits, PR creation, merge, or publication. Carry prior explicit authorization forward without asking again.

A chat handoff can accelerate startup, but the receiving agent verifies it against repository and source state.

## Conflict resolution

1. Identify the exact disputed fact or behavior and its domain. Capture both sources, versions, approval status, and practical impact.
2. Check whether one source is stale, a draft, a local override, or an unrecorded production change. Resolve straightforward implementation drift within the authorized task, preserving evidence.
3. When approved sources are incompatible, or a choice changes requirements, brand, or production behavior beyond the task, propose options and a recommendation to John. Hold only the dependent change; do not silently choose the newest artifact.
4. Record the accepted decision in Drive for strategy/requirements, update approved design in Figma where applicable, and link the decision in the implementing PR. If external writes are unavailable or not authorized, hand off that update explicitly.
5. Reconcile implementation and production through the normal reviewed change and deployment process. Record remaining drift until verified.

Examples: a Figma token differing from code calls for checking design approval and implementing the approved value; an emergency Webflow edit calls for capturing the live code and reconciling it into GitHub before a later deployment overwrites it. A PR discussion can hold a pending decision, but should link the durable record once approved.

## Implementation and verification

Use small, focused commits and PRs against main. A PR should explain the problem, resulting behavior, affected sources, validation evidence, and any outstanding decisions or deployment steps.

- For documentation-only work, inspect the full diff, check relative links and adapter references, and verify that shared policy is not duplicated or contradicted.
- For component changes, follow the component README's QA checklist. Check responsive states, keyboard/focus behavior, semantic labeling, reduced motion, and relevant failure paths.
- For promo-card behavior, also check campaign boundaries, country eligibility, session dismissal, and both debug and normal behavior. Staging may not expose the production Cloudflare endpoint; report this limitation.
- Update the relevant README and mechanism changelog when behavior changes. Update the root changelog for repository-level structure or guidance changes.
- Run existing automated checks when applicable. If none exist, report manual validation and its limits; do not imply that tests passed.

No concurrent agent should edit the same files without a coordinated handoff. Use separate branches or worktrees for independent work; the integrating agent reviews the combined diff and resolves overlaps before presenting it for review.

## Handoffs

Leave a concise record in the PR description or an authorized issue/comment. If external posting is not authorized, provide it in the task response for the next agent. Do not depend on private tool memory.

```text
Outcome and scope:
Status: in progress / ready for review / blocked / merged / deployed
Owner and next action:
Repository, branch, base SHA, latest commit, PR:
Changed files and behavior:
Sources: Drive decisions; Figma nodes/version; GitHub refs; Webflow page/domain
Decisions and assumptions:
Validation performed and results:
Known limitations, conflicts, or blockers:
Remaining work:
Authorization: what is already approved; any action still requiring approval
Deployment: not deployed, or exact deployed revision/location/time
Rollback reference (when applicable):
```

Include only relevant source domains, explicitly marking required but unavailable sources. Separate completed work from proposed next steps. On receipt, inspect the referenced commit and changes, confirm ownership, and update the handoff when work progresses.

## Production and release records

Webflow is a separate deployment step. Obtain or verify task authorization before publishing; neither a PR nor a merge grants it by itself. Component README launch instructions describe mechanics, not standing permission to publish.

Before an authorized deployment, identify the reviewed code revision, target page/embed and domain, and a recoverable previous version. Deploy that exact component, verify the live result, and record the publication evidence. For recurring campaigns, tag the deployed code commit as `<component-name>-<campaign-id>` after publication and add the actual launch/configuration to `campaigns.md`. Keep mechanism version history in the component changelog.

If verification fails, report the failure and use the authorized rollback plan; do not mark the release successful. If production differs from GitHub, capture the difference and reconcile it rather than blindly overwriting either side.

## Governance and adapters

John is the final decision-maker. Propose shared contract changes through a dedicated PR with rationale, impact, and any migration steps; a tool-specific memory edit is not a policy change. Review and merge authority remain with John or a maintainer he designates.

Keep responsibilities separated:

- AGENTS.md: canonical shared expectations and repository baseline.
- This workflow: operational detail and handoff procedure.
- Component documentation: implementation-specific configuration, QA and release history.
- CLAUDE.md and .agents/rules/shared-contract.md: thin tool entry points only.

When shared guidance changes, check both adapters and affected documentation in the same PR. If an adapter or component document contradicts the shared contract, surface and repair the inconsistency. Task-specific exceptions do not silently become permanent policy; record durable changes through review.

### Antigravity mechanism

The repository had no Antigravity instruction files when inspected on 2026-09-09. Google's [workspace Rules documentation](https://antigravity.google/docs/rules-workflows/) identifies `.agents/rules` as the default location, supports Always On activation, and documents relative file references. The older `.agent/rules` location remains supported, but is not duplicated here.

The adapter at [.agents/rules/shared-contract.md](../.agents/rules/shared-contract.md) uses Always On activation and references the root contract and this workflow relative to its own directory. It adds no separate project policy. Google's [CLI best practices](https://antigravity.google/docs/cli/best-practices/) also support root AGENTS.md; no additional GEMINI.md is needed for this repository.

On first use in Antigravity, confirm that the workspace rule is recognized as Always On and that both references load. If the installed client does not expand them, explicitly read the root files as the adapter directs. Documentation and path validation do not substitute for an actual client smoke test.
