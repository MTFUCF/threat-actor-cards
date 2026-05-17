# Manual Testing Guide

Project: **Threat Actor Cards**  
Baseline date: **2026-05-16**

## P0 — must pass before this repo is public
- [ ] The README title, tagline, live demo URL, and author block all match Threat Actor Cards.
- [ ] `index.html` loads from `python -m http.server 8080` with no broken relative links.
- [ ] The shipped page clearly states the project name, renders the theme toggle, and credits Matthew Faber in the footer.
- [ ] No secrets, local-only files, or editor junk appear outside the `.gitignore` baseline.
- [ ] Search, filter chips, and the card grid all render from `data/threat-actors.json`.
- [ ] README wording frames the project as a study aid, not a collectible novelty site.
- [ ] The Pages path supports the static data, CSS, and JavaScript files without broken links.
- [ ] Each card flips with click/tap or keyboard input while still exposing citations and long-form detail on the reverse side.

## P1 — should pass before first feature-complete share
- [ ] The landing page remains readable at 320px, 768px, and 1440px wide.
- [ ] Keyboard focus is visible and the placeholder page has a logical reading order.
- [ ] Chrome and Edge show no console errors on initial load.
- [ ] The README local-run instructions work exactly as written from the project root.
- [ ] The planned card layout can support long aliases and summary text without visual collapse.
- [ ] Copilot instructions explicitly discourage glamorizing threat actors.
- [ ] Placeholder styling hints at strong visual identity without becoming cartoonish.
- [ ] The repo still reads as a serious cybersecurity portfolio artifact.

## P2 — polish and follow-up checks
- [ ] A fresh screenshot can eventually be dropped into `docs/screenshot.png` without changing the README contract.
- [ ] The roadmap still reflects useful next iterations instead of vague wishlist items.
- [ ] The repo still feels intentionally lightweight, with no accidental build tooling added.
- [ ] The placeholder page looks acceptable in both light and dark system themes.
- [ ] Roadmap items focus on comparison and discoverability more than decorative effects.
- [ ] The README has a clean placeholder for a screenshot of the final card grid.
- [ ] Future content additions can stay hand-reviewed and citation-friendly.
- [ ] The shell leaves space for later accessibility checks on card interactions.
