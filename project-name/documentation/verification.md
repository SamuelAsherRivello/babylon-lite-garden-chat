# Verification evidence

2026-09-29:

- Shared backend v0.3.0 release/deploy workflow 36608510527: passed. Six tests include Garden two-client movement, bumping, bounds, invalid payloads, chat history, late join, drop, reconnect, capacity/retry and Drawing/Sumo regressions. Live verification passed after deployment.
- Exact shared client release tarball installed with committed lockfile. Local server checkout synchronized to release commit.
- npm test: 3 input tests passed. npm run build: production build passed.
- Chromium with WebGPU: two independent browser contexts passed keyboard movement, collision push, arrows, local pause, focus isolation, chat relay and literal HTML rendering.
- Emulated phone: 390x844, no page overflow, touch movement, late chat history, desktop peer synchronization. Physical touch hardware unverified.
- Chat: scroll preservation and jump-to-latest passed with 14+ real messages. Leave, fresh rejoin and blur input release passed. Unsupported GPU recovery text passed.
- Browser console/runtime errors: none on supported tested pages. Default headless shell lacked WebGPU; full Chromium worked. Three simultaneous WebGPU test contexts stalled initialization, so the suite uses at most two and replaces one for mobile coverage.
- Art: genuine Blender preview reviewed against generated target; roof, color and flat lawn corrected. Runtime screenshots visually inspected on desktop and phone.
- OpenSpec: four changes validated strictly. First three implementation systems verified; public delivery is completed after release/public checks.

Public release verification will be recorded below after deployment.

## Public release verified

- Game release: v0.0.3, tag commit 48f1ef6, release workflow 36611172946 passed; Pages workflow 36611202705 passed.
- Public URL: https://samuelasherrivello.github.io/babylon-lite-garden-chat/
- Public version.txt returned version=0.0.3 and browser screenshot shows v0.0.3.
- Full browser suite repeated successfully against that public URL: two independent sessions, rendering/assets, keyboard, collision, pause, focus safety, chat relay/plain-text rendering, late history, mobile touch emulation/layout, scroll preservation, leave/rejoin, blur release and unsupported GPU message. No supported-page runtime errors.
- Shared service was independently extended by concurrent work to v0.5.0 during delivery. Public verification passed against live v0.5.0 while Garden Chat remains pinned to the compatible released v0.3.0 client. The Garden extension's own v0.3.0 release/deployment remains independently verified.
- All 41 imported shared-library files and 37 Blender-package files match their source bytes.
- Clean npm ci succeeded after stopping the local Vite processes that held Windows native module locks.
- Canonical README screenshot refreshed from the actual public v0.0.3 game. Browser evidence: public-browser-verification.json.
- Physical mobile hardware and long-lived production scaling remain unverified; experimental hosting and session-only history are documented.
