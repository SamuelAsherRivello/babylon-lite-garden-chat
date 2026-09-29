# Design

## Context
See proposal.md. This system was explored against actual template, shared client, backend and Blender assets.

## Goals / Non-Goals
Implement the capability without adding accounts, scores or durable storage.

## Decisions
Reuse MultiplayerClient 0.3.0 from its exact release tarball. Server is authoritative at 20Hz. Inputs expire after 300ms. Pause affects only local input; leave disconnects; rejoin creates a fresh identity. No offline simulation. Server work predates this change and is reviewed as an existing dependency, not claimed as newly applied.

Alternatives considered: client-authoritative positions would permit invalid movement; reuse authoritative shared room.

## Risks / Trade-offs
Experimental host may expire sessions; show reconnect status and document transient history. WebGPU availability varies; show an actionable error.

## Migration Plan
Ship the static client against released server v0.3.0; preserve existing drawing and sumo protocols. Revert a client commit and redeploy Pages if necessary.
