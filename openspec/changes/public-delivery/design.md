# Design

## Context
See proposal.md. This system was explored against actual template, shared client, backend and Blender assets.

## Goals / Non-Goals
Implement the capability without adding accounts, scores or durable storage.

## Decisions
Keep template corner roles and version.txt patch release policy. Preserve template app root despite conflicting checklist rename instruction; GitHub template flow is authoritative. Import shared skills as real files; retain conflicting template baselines outside skill discovery. Release workflow installs, tests, builds, tags and explicitly dispatches Pages. Verify the actual public build and synchronize release commit.

Alternatives considered: a renderer replacement conflicts with Babylon Lite; keep the requested stack and template flow.

## Risks / Trade-offs
Experimental host may expire sessions; show reconnect status and document transient history. WebGPU availability varies; show an actionable error.

## Migration Plan
Ship the static client against released server v0.3.0; preserve existing drawing and sumo protocols. Revert a client commit and redeploy Pages if necessary.
