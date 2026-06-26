# Task: capital-alts — Agent: main

## Summary
Built 3 visually-distinct alternate Capital page layouts for xCelero Labs venture-studio site (Next.js 16, hash-router, Tailwind, framer-motion) as A/B-test candidates against the existing /capital page. Did NOT modify the existing Capital page. Did NOT wire routes/nav (separate task).

## Files created
- src/artemis/pages/CapitalAlt1.tsx — "Flow Visualization" (DARK)
- src/artemis/pages/CapitalAlt2.tsx — "Magazine Editorial" (LIGHT)
- src/artemis/pages/CapitalAlt3.tsx — "Spatial Globe" (DARK)

## Design moves
- Alt1 (Flow, dark): Asymmetrical split hero + animated SVG capital-flow diagram (5 source nodes -> 6 venture verticals, orange gradient curves with flowing particles + pulsing nodes), 6-vehicle deploy-weight bar list, impact stat grid, 2025-2032 milestone bar chart rising to $4B/100%.
- Alt2 (Magazine, light): Full-bleed magazine cover with ISSUE 04 numbering + masthead, giant serif drop-cap standfirst, horizontal 5-milestone timeline (No. 01-05) with spine + year markers, 6-sector allocation grid, two alternating serif drop-cap pull quotes, dark 3-action CTA.
- Alt3 (Globe, dark): Interactive SVG orbital globe (orange core + 3 dashed rings + 9 real venture nodes positioned via polar coords, animated connecting arcs + flowing particles), hover/click reveals a detail card (AnimatePresence), geo distribution stats + mini route-constellation SVG, vertical-spine vehicle thesis list, 9-card portfolio grid decoded from globe nodes.

## Brand adherence
- Accent #FF4D00, dark #0A0A0A, light #FAFAFA/#FFFFFF.
- font-display (Space Grotesk), font-mono + tracking-[0.2em] uppercase mono labels.
- max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 containers.
- framer-motion motion + useInView, easing [0.22, 1, 0.36, 1].
- Link from @/artemis/router, icons from lucide-react.
- "use client" directive; all animations via framer-motion; no external images (CSS/SVG signature moves only).

## Content
Real-ish numbers across all 3 pages: 6 vehicles (The Fund, SPV Syndicates, Thematic Funds, Catalyst Notes, Non-Dilutive Desk, Anchor Mandate), entry from $500, 39 grant markets, 190 route hubs, $4B capital target, 9 real ventures (Helios, Ampere, Ember, Ignis, Nimbus, Ceres, Bounty, Meridian, Manna).

## Quality
- bun run lint — clean, zero errors/warnings.
- Dev server recompiles successfully.
- Each page ~330-450 lines, self-contained, polished, visually distinct from each other and from the existing Capital page.

## Status
Complete. Routes/nav wiring is a separate task per instructions.
