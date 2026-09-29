# Explore findings

Inspected template layout/workflows, Babylon Lite installed source/API, shared server rooms/client/tests and Blender scene/export. User authorized explore and apply for every major system.

## multiplayer-session

Reuse MultiplayerClient 0.3.0 from its exact release tarball. Server is authoritative at 20Hz. Inputs expire after 300ms. Pause affects only local input; leave disconnects; rejoin creates a fresh identity. No offline simulation. Server work predates this change and is reviewed as an existing dependency, not claimed as newly applied.

Alternatives considered: client-authoritative positions would permit invalid movement; reuse authoritative shared room.

## garden-world

Babylon Lite WebGPU loads the original Blender GLB. An orthographic portrait world sits beside chat on desktop and above it on phones. Runtime gardeners use colored clothes and straw hats. Send normalized WASD/arrows/touch axes at 20Hz; interpolate received positions. Clear held input on blur, cancellation, pause and chat focus. Use explicit GPU/init error UI.

Alternatives considered: blocking decorations contradict the brief; keep all props outside the fence.

## shared-chat

Render message content with textContent, never HTML. 280-character input and 750ms send cooldown match the server. Server supplies latest 100 messages, including departed authors. Preserve scroll position when reading history; show a jump-to-latest button for arrivals below. Empty/loading/disconnected states are explicit. No durable history or private messaging.

Alternatives considered: durable storage adds accounts/hosting scope; keep clearly labeled session history.

## public-delivery

Keep template corner roles and version.txt patch release policy. Preserve template app root despite conflicting checklist rename instruction; GitHub template flow is authoritative. Import shared skills as real files; retain conflicting template baselines outside skill discovery. Release workflow installs, tests, builds, tags and explicitly dispatches Pages. Verify the actual public build and synchronize release commit.

Alternatives considered: a renderer replacement conflicts with Babylon Lite; keep the requested stack and template flow.