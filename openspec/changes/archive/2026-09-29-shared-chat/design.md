# Design

## Context
See proposal.md. This system was explored against actual template, shared client, backend and Blender assets.

## Goals / Non-Goals
Implement the capability without adding accounts, scores or durable storage.

## Decisions
Render message content with textContent, never HTML. 280-character input and 750ms send cooldown match the server. Server supplies latest 100 messages, including departed authors. Preserve scroll position when reading history; show a jump-to-latest button for arrivals below. Empty/loading/disconnected states are explicit. No durable history or private messaging.

Alternatives considered: durable storage adds accounts/hosting scope; keep clearly labeled session history.

## Risks / Trade-offs
Experimental host may expire sessions; show reconnect status and document transient history. WebGPU availability varies; show an actionable error.

## Migration Plan
Ship the static client against released server v0.3.0; preserve existing drawing and sumo protocols. Revert a client commit and redeploy Pages if necessary.
