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
