# Design

## Context
See proposal.md. This system was explored against actual template, shared client, backend and Blender assets.

## Goals / Non-Goals
Implement the capability without adding accounts, scores or durable storage.

## Decisions
Babylon Lite WebGPU loads the original Blender GLB. An orthographic portrait world sits beside chat on desktop and above it on phones. Runtime gardeners use colored clothes and straw hats. Send normalized WASD/arrows/touch axes at 20Hz; interpolate received positions. Clear held input on blur, cancellation, pause and chat focus. Use explicit GPU/init error UI.

Alternatives considered: blocking decorations contradict the brief; keep all props outside the fence.

## Risks / Trade-offs
Experimental host may expire sessions; show reconnect status and document transient history. WebGPU availability varies; show an actionable error.

## Migration Plan
Ship the static client against released server v0.3.0; preserve existing drawing and sumo protocols. Revert a client commit and redeploy Pages if necessary.
