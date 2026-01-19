# ADR: Rebranding to Safe Valley - SVE

## Status
Proposed

## Context
The project was originally developed under the brand name "Kolth" (fictional aerospace/defense identity). The user has requested a strategic rebranding to "Safe Valley - SVE" to better align with a new project direction or identity.

## Decision
We will systematically replace all instances of "Kolth" and "KOLTH" (case-insensitive) with "Safe Valley - SVE" across the entire codebase. This includes:
- UI components (Command Bar, HUD, Pages)
- SEO metadata (Titles, Descriptions, Schema.org)
- Deployment assets (manifest.json, robots.txt)
- Documentation (README.md, Technical Debt logs)

The 3-blade toroidal icon will be retained for now as the user did not specify an icon change, and it serves as a "SVE" (Safe Valley Engineering) motif.

## Consequences
- The brand identity will be shifted globally.
- Search engine results will eventually reflect the new name after re-indexing.
- Internal identifiers (variable names, foldernames) will remain "kolth" where technical naming is strictly internal and non-visible to users, to avoid deep breaking changes, but user-facing "mentions" will be fully updated.
