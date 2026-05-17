# Copilot instructions for Threat Actor Cards

Threat Actor Cards is a focused cybersecurity portfolio project owned by Matthew Faber. The goal is straightforward: A static card-based interface for presenting threat actor profile summaries, common aliases, typical targeting patterns, and memorable differentiators in a format that feels approachable without being unserious. Deployment target is GitHub Pages. The stack is HTML5, CSS3, Vanilla JavaScript, GitHub Pages. Keep the repo easy to review, easy to explain in an interview, and easy to deploy from a clean branch.

When helping here, bias toward the smallest useful implementation. Preserve the deliberate no-build-step approach for the frontend. If the project uses Azure Functions, keep Node tooling isolated to `api/` and do not introduce root-level package management. Prefer plain HTML, CSS, and vanilla JavaScript that a recruiter can understand quickly by opening the repo.

What Copilot should help with:
- Build a card layout that feels polished but still serious and readable.
- Keep profile data structured so human review stays straightforward.
- Support compare-and-scan use cases without turning the project into a game.

Domain guardrail: The tone should be educational and professional: memorable card UX is fine, but the project must not romanticize real-world adversaries. Treat copy, labels, and examples as reviewable cybersecurity content, not filler text.

What to avoid:
- Do not glamorize threat actors or slip into edgy visual clichés.
- Do not invent unsupported threat intel details for the sake of fuller cards.
- Do not add a build step for what should remain a curated static showcase.

Keep README examples, testing steps, and placeholder UI text aligned whenever scope changes. This project has no secret-bearing runtime configuration in-repo. If you add data files later, keep them human-readable and stable so Matthew or another reviewer can audit the content without reverse engineering generated output.
