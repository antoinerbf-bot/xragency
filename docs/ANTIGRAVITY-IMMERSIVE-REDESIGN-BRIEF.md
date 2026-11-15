# XR AGENCY — IMMERSIVE DIGITAL EXPERIENCE
## Master brief for Antigravity implementation

**Objective:** rebuild the public-facing XR Agency website into a complete, premium, immersive digital experience. The visual benchmark is Lusion (lusion.co): study its art direction, pacing, typography, spatial composition, motion language, transitions, interaction quality and project storytelling. The target is a close match in quality and experiential grammar, not a literal copy of proprietary source code, assets, layouts or brand identity.

This is not a request to add a 3D sphere to the existing hero. It is a full website and conversion-journey redesign.

## 1. Non-negotiable business constraints

1. Preserve every existing service, package, price, billing period, commitment, deliverable, CTA destination and legal/commercial condition exactly as currently defined in the source of truth.
2. Do not invent client names, case studies, testimonials, awards, metrics, guarantees, delivery times or performance claims.
3. Do not remove services or hide important offers to simplify the design.
4. Social Media pricing must remain exactly:
   - Présence Essentielle — 349 €/mois — engagement 3 mois.
   - Croissance Active — 499 €/mois — engagement 6 mois — “Le plus choisi”.
   - Domination Sociale — 799 €/mois — engagement 6 mois.
5. Preserve “Ajouter à ma sélection” and the WhatsApp destination https://wa.me/33767566783.
6. Preserve working checkout, quote, CRM, contact, analytics, language and routing integrations. Do not replace working functionality with decorative mock interactions.
7. Do not commit, push, deploy, reset, clean, stash, rebase or rewrite Git history. The working tree contains substantial pre-existing work. Never discard or overwrite it.
8. Work in small, reviewable phases. Do not run destructive Git commands.
9. Keep the existing XR identity (obsidian/black, warm cream, champagne/bronze, refined neutrals). Do not introduce electric blue as the dominant accent.
10. Support the existing language system; do not silently regress translated routes.

## 2. Visual ambition and experience principles

The result should feel like a premium digital studio with a distinctive visual world, not a generic agency template.

- Cinematic full-viewport compositions with deliberate art direction.
- Strong editorial typography, scale contrast, controlled negative space and asymmetrical layouts.
- Rich, art-directed imagery and project showcases; use real project assets where available. Clearly label concept imagery and never represent fictional projects as real clients.
- High-quality motion: scroll choreography, restrained parallax, transitions between scenes, hover states, tactile interactions and meaningful micro-interactions.
- 3D/WebGL only where it strengthens the story. It must be integrated into the composition, not isolated inside a generic bordered card.
- Mobile is a first-class experience: recompose the scenes for touch, do not merely shrink desktop.
- Accessibility: keyboard navigation, visible focus, semantic structure, contrast, reduced-motion support and usable touch targets.
- Performance: lazy-load heavy scenes, cap device pixel ratio, pause offscreen rendering, use responsive asset sizes, provide robust static fallbacks, avoid layout shifts and monitor real performance.

## 3. Website architecture — complete commercial journey

### A. Homepage — brand world and orientation
1. A memorable immersive opening scene with a clear statement of what XR Agency does.
2. Immediate, understandable primary action: start a project / build a brief.
3. A concise presentation of the agency's integrated system: brand, digital product, visibility and acquisition.
4. A visual service discovery section that leads to real service detail pages.
5. A curated work / project section using only verified portfolio material.
6. A clear explanation of the method and how collaboration works.
7. Proof and reassurance based only on verifiable facts.
8. FAQ and a strong closing conversion section.

### B. Services — complete catalogue

Every current service in src/lib/content-services-a.ts, src/lib/content-services-b.ts and src/lib/content.ts must remain discoverable and have a coherent path:
- Website creation, e-commerce and booking.
- Branding and visual identity.
- SEO.
- Google Maps / local visibility.
- Social Media / community management.
- WebCare / maintenance.
- AI, automation, CRM and robotics.
- Website redesign.
- Digital strategy / consulting and any additional service already present in the canonical content.

Use the existing service data as the source of truth. Do not duplicate or hardcode commercial data in new UI components.

### C. Service detail pages — product pages, not brochures

Each page should have:
1. A distinctive visual opening specific to the service.
2. A clear customer problem and outcome.
3. A concrete explanation of scope and deliverables.
4. An immersive but understandable demonstration or visual example.
5. Existing plans and exact prices, with transparent billing terms.
6. Process / delivery stages.
7. FAQs from the existing content.
8. Contextual CTA: add to selection, configure a quote or WhatsApp, as appropriate.
9. Related services and a clear next step.

Do not force every service into the same identical layout. Share a design system, but give each discipline a tailored visual narrative.

### D. Conversion funnel — one continuous journey

Connect the entire site into a coherent journey:
**Discover → understand → select service(s) → qualify project → receive recommendation → request quote / contact → follow-up.**

Audit the existing quote configurators, cart/selection, CTA links, WhatsApp prefill, contact forms and CRM handoff before changing them. Preserve working behavior and repair dead ends. Make the next action obvious at every stage. Provide a persistent but discreet conversion entry point on desktop and mobile.

### E. Work / portfolio

Use verified portfolio entries only. Each case study should explain the context, work delivered and outcome only where documented. Do not fabricate client proof to fill a visual grid. When there are too few verified cases, create clearly labelled studio explorations / concept work instead.

## 4. Design system

Create a consistent system for:
- Typography (display, editorial body, labels, data).
- Layout grid and responsive spacing.
- Color tokens based on existing XR palette.
- Buttons, links, navigation, cards, accordions, forms and progress indicators.
- Scene transitions and motion timing.
- Image and video treatments.
- Light/dark surfaces where appropriate.
- Reduced-motion and low-power variants.

Avoid overusing rounded cards, floating panels, pill badges and generic gradients. The interface should feel art-directed and spacious.

## 5. Technical and repository rules

- Stack: TanStack Start, React 19, Tailwind CSS v4, Vite, Three.js, React Three Fiber and Drei (already installed).
- First inspect the existing architecture and all dirty changes. Do not assume files are clean.
- Existing public routes and service data are valuable; evolve them rather than replacing the app wholesale.
- Keep route URLs stable unless a migration and redirects are explicitly justified.
- Preserve SSR/hydration correctness.
- Add robust WebGL fallback and reduced-motion behavior.
- Use pointer/touch input, not mouse-only interactions.
- Do not claim 60 FPS or any other performance target without measuring it on representative devices.
- Keep heavy effects off low-power/mobile devices when necessary while preserving a designed mobile experience.
- No fake loading screens or nonfunctional buttons.
- Add tests for key conversion flows and verify all route targets.
- Run typecheck, lint where practical, production build and manual route checks.

## 6. Execution plan — mandatory staged workflow

### Phase 0 — Audit only
- Map current routes, shared components, data sources, design tokens, assets and all conversion paths.
- Identify what is already working and what is broken.
- Review the current Git diff before editing; do not overwrite other in-progress work.
- Produce a short audit and proposed route/component plan.
- Do not start a broad redesign before the audit is complete.

### Phase 1 — Art direction prototype
- Create a high-fidelity homepage prototype, not just a 3D object.
- Include the navigation, hero, one immersive transition, a service discovery scene, a project showcase and the first conversion CTA.
- Show both desktop and mobile.
- Use the Lusion reference to guide the quality bar and motion language.
- Do not alter pricing or commercial content.
- Run locally and capture screenshots / short screen recording for review.

### Phase 2 — Design system and homepage
- Once the prototype direction is approved, build reusable tokens, typography, navigation, transitions and the complete homepage.
- Ensure every CTA works.

### Phase 3 — Services and conversion
- Redesign the catalogue and every service detail page.
- Connect selection/cart, quote configurator, contact, WhatsApp and CRM.
- Verify the Social Media offers exactly against the non-negotiable pricing above.

### Phase 4 — QA and optimization
- Test desktop and mobile widths, keyboard, touch, reduced motion, WebGL fallback, forms, links, translations and SSR.
- Run typecheck, lint and production build.
- Capture before/after screenshots and report remaining issues.

### Phase 5 — Review and release
- Present the local result for explicit approval.
- Do not commit, push or deploy until the owner explicitly approves the exact release.

## 7. Definition of done

The work is not done when a shader looks attractive. It is done when:
- The homepage and service pages feel like one coherent, premium, immersive digital world.
- The overall quality bar is genuinely comparable to the Lusion reference.
- All existing services and offers remain accessible and accurate.
- A visitor can move naturally from discovery to a qualified inquiry.
- The complete journey works on desktop and mobile.
- Interactions are real, responsive and accessible.
- Performance and fallback behavior are tested.
- No existing user work, commercial data or production integration has been lost.

**Instruction:** begin with Phase 0. Do not jump directly to implementation. Report findings and the proposed prototype direction before making broad changes.

