# XR Agency — Collaboration brief for Antigravity

## Mission
Work with ChatGPT on the existing XR Agency repository to evolve the site toward a distinctive, high-end, immersive digital experience. Use Lusion.co as a quality/reference benchmark for motion, depth, interaction and craft only. Do not copy its source code, proprietary assets, layouts, or branding.

## Working agreement
- Repository: `/Users/rousseauantoine/xragency`
- Current branch at handoff: `feat/xr-immersive-3d-redesign`
- ChatGPT can inspect, edit and test this same working tree. Avoid simultaneous edits: Antigravity implements one agreed task at a time; ChatGPT then reviews and tests before the next task.
- The working tree already contains extensive user work, including modified and untracked files. Treat all of it as intentional and valuable.
- NEVER run destructive Git commands (`reset`, `clean`, checkout/discard, stash, forced checkout), overwrite unrelated changes, or rewrite published history.
- Do not commit, push, merge, rebase, or change remotes without explicit user approval.
- Do not expose credentials or tokens. Do not use any credential embedded in a Git remote URL.
- Before editing, inspect the current state and identify the exact files to change. Keep changes narrow and reversible.

## Non-negotiable commercial constraints
Do not change existing services, scope, prices, commitments, CTAs, checkout behavior, or WhatsApp destinations unless explicitly authorized.
Social Media offers must remain exactly:
- Présence Essentielle — 349 €/mois — engagement 3 mois
- Croissance Active — 499 €/mois — engagement 6 mois — label « Le plus choisi »
- Domination Sociale — 799 €/mois — engagement 6 mois
Preserve « Ajouter à ma sélection » and WhatsApp URL `https://wa.me/33767566783`.
Do not invent performance metrics, client results, guarantees, or service deliverables.
Maintain the existing XR visual identity: premium, editorial, obsidian/black, cream/champagne and restrained bronze accents. Do not impose electric-blue styling.

## Phase 1 — Audit only (do not edit production code yet)
1. Inspect the existing homepage, navigation, shared design tokens/styles, service pages, responsive behavior, and current Three.js experience.
2. Trace how `src/components/site/LusionInteractiveCanvas.tsx` is mounted through `Hero.tsx` and the homepage route.
3. Assess the existing implementation for:
   - pointer, touch and keyboard interaction;
   - reduced-motion support;
   - WebGL failure fallback;
   - responsive sizing and mobile GPU/performance cost;
   - animation lifecycle, off-screen pause and tab visibility;
   - accessibility, contrast, semantic structure and loading behavior;
   - consistency across homepage and service pages.
4. Identify concrete defects and opportunities. Distinguish verified issues from hypotheses.
5. Recommend a staged implementation plan with priorities, exact target files, risks and validation criteria.
6. Do not make broad redesigns or modify files during this audit phase. Return the audit to the user/ChatGPT for review first.

## Phase 2 — Implementation (only after the audit is approved)
- Implement in small, reviewable slices, starting with the homepage hero and shared interaction foundations.
- Preserve the site's existing content, routes, language support (FR/EN/VI), pricing, service definitions, forms, analytics and conversion paths.
- Prefer progressive enhancement: the site must remain usable without WebGL, on low-power phones, and with reduced motion enabled.
- Use pointer events for mouse/touch/pen where appropriate; avoid falsely advertising touch support if it is not implemented.
- Use ResizeObserver where container-based sizing is needed; pause rendering when off-screen or the document is hidden; avoid unnecessary React state updates in animation loops.
- Add a robust static/2D fallback for unsupported or failed WebGL contexts.
- Set device-aware renderer quality and pixel-ratio limits; measure rather than promise a frame rate.
- Avoid adding dependencies unless there is a clear technical need.
- Do not turn every section into a heavy 3D scene. Use motion and depth selectively to strengthen hierarchy and storytelling.
- Keep mobile-first behavior and test narrow screens, touch interaction and reduced motion.

## Validation required for each implementation slice
Run the relevant checks, preferably:
- `bun run typecheck`
- `bun run lint` (if practical; report pre-existing failures separately)
- `bun run build`
Also inspect the changed-file list and diff. Report exactly what changed, what was tested, results, known limitations and any follow-up required. Do not claim tests passed unless they were run successfully.

## Current authorization and handoff
The user has explicitly approved continuing through Phase 2 until the local XR Agency experience reaches the intended Lusion-level benchmark. Phase 2 is authorized; preserve all commercial constraints above.

ChatGPT has already made a first implementation pass in these files:
- `src/components/site/Hero.tsx`: desktop editorial split composition, left-side text hierarchy, restrained champagne CTA and dark gradient for legibility.
- `src/components/site/LusionInteractiveCanvas.tsx`: scaled/decentered real-time sculpture, darker obsidian/champagne shader, pearl preset, fine wire shell, denser particles, WebGL fallback element, visibility resume and pointer-cancel cleanup.
- `src/components/site/SignatureWorks.tsx`: pointer-follow project preview updated without React state on every pointer movement; removed external studio reference from visible copy.

A local Vite preview is running at `http://localhost:5173/`. Do not stop it. The local production build and TypeScript check passed after the first visual pass; run them again after any further edits. Targeted ESLint currently reports existing Prettier formatting violations and one pre-existing explicit `any`; do not mass-format unrelated work.

Next actions:
1. Inspect the current working tree and the three files above before editing. Do not overwrite or revert ChatGPT's changes.
2. Continue refining the experience beyond a single hero: cohesive scroll storytelling, responsive section transitions, interactive project/service moments, and polished motion. Keep the XR obsidian/cream/champagne/bronze identity; no electric-blue theme.
3. Ensure the 3D scene remains a progressive enhancement: reduced-motion support, mobile GPU limits, visible fallback, and clean pause/resume lifecycle.
4. Verify the 7 service modules, project matrix, quote funnel, and all existing navigation paths still work. Do not change offers, prices, scopes, commitments, checkout, WhatsApp, or service content.
5. Capture and inspect desktop and mobile local renders. Iterate until the visual hierarchy, motion, and interactions are coherent and production-ready.
6. Report concrete changes and test results. Do not commit or push until the user confirms the final local render and the correct Git destination/authentication are resolved.


## Latest implementation update (2026-11-13)
- The XR hero composition is now editorial and asymmetrical, with a smaller obsidian/champagne WebGL sculpture placed to the right on desktop and recomposed for mobile.
- The 3D scene is lazy-loaded behind a branded fallback to keep the main entry bundle lighter; the WebGL chunk is ~548 kB minified / ~138 kB gzip and is loaded separately.
- Mobile top-level 3D controls are hidden to avoid overlapping the location line; touch interaction remains available on the canvas.
- The project preview follows the pointer using direct DOM transforms rather than React state updates on every pointer event.
- Unverified portfolio names, fake domains, and performance/result claims in the showcase have been replaced with clearly labelled studio concepts. Google Maps Top 3 is consistently framed as an objective, never a guaranteed rank.
- Removed unverified 4K cinema-master, sub-second PageSpeed, 7-day penalty and 7/7 account-manager claims from the studio film section. Website delivery windows now reflect the canonical 7/14/21-day FAQ by plan.
- The bespoke inquiry form now checks the API response before showing success, displays a useful error on failure, and includes the supplied phone number in the contact email.
- Validation after this pass: TypeScript and production build pass; targeted ESLint passes with one existing Fast Refresh warning in HomeServices. The production build still reports a 548 kB lazy WebGL chunk warning; the chunk is separate and 138 kB gzip.
- Local preview remains at http://localhost:5173/. Do not stop it.
- No commit, push, deployment, reset, stash, rebase or destructive Git operation has been performed.
