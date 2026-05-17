# Threat Actor Cards

Trading-card style profiles that make threat actor attributes easier to study and compare.

## What it is

A static card-based interface for presenting threat actor profile summaries, common aliases, typical targeting patterns, and memorable differentiators in a format that feels approachable without being unserious. This stays buildless on purpose so the repo reads clearly and deploys cleanly to GitHub Pages.

## What it demonstrates

- Transforming threat intel profile data into a structured visual study format
- CSS-driven card layout and comparison patterns in a static site
- Scope discipline around reviewable, human-curated content

## Live demo

https://matthewfaber.github.io/threat-actor-cards/

## Screenshot

![Placeholder screenshot](docs/screenshot.png)

## How to run locally

```bash
cd projects/threat-actor-cards
python -m http.server 8080
```

## Push to GitHub

This project ships as its own standalone repo. To push it to a GitHub account (e.g., a separate cybersecurity-portfolio account), follow these steps.

### 1) Authenticate with the target account

Preferred: use GitHub CLI multi-account auth.

```bash
gh auth login
gh auth switch
gh auth status
```

Per-repo git config keeps commits under the right identity even if your global git config points at another account:

```bash
git config user.name "Matthew Faber"
git config user.email "<your-github-username>@users.noreply.github.com"
```

The noreply email keeps your personal email private. Replace `<your-github-username>` with the target account username.

### 2) Initialize, commit, and push

From the workspace root:

```bash
cd projects/threat-actor-cards
git init -b main
git config user.name "Matthew Faber"
git config user.email "<your-github-username>@users.noreply.github.com"
git add .
git commit -m "Initial commit"
gh repo create <your-github-username>/threat-actor-cards --public --source=. --remote=origin --push --description "Trading-card style profiles that make threat actor attributes easier to study and compare."
```

### 3) Enable GitHub Pages

- Go to repo **Settings → Pages**.
- Under **Build and deployment**, set **Source** to **GitHub Actions** (not **Deploy from a branch**).
- The first push triggers `.github/workflows/deploy-pages.yml`; wait about 30 seconds, then visit `https://<your-github-username>.github.io/threat-actor-cards/`.

### 4) Updating later

```bash
git add . && git commit -m "Describe the change" && git push
```

## Deploy your own

This repo includes `.github/workflows/deploy-pages.yml` for the modern GitHub-native Pages flow.

1. Push the repo to GitHub.
2. Open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. Push to `main` or run the workflow manually with **workflow_dispatch**.
4. After the workflow finishes, open `https://<your-github-username>.github.io/threat-actor-cards/`.

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages

## Project structure

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── copilot-instructions.md
├── data/
│   └── threat-actors.json
├── src/
│   └── app.js
├── styles/
│   └── main.css
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── TESTING.md
└── index.html
```

## Roadmap

- Add filters for region, motivation, or victim sector tags
- Support flip-card or detail-panel interactions while keeping content accessible
- Capture a screenshot once the first card set is designed

## Author

**Matthew Faber**  
Matthew Faber builds hands-on cybersecurity portfolio projects that turn study material into recruiter-friendly demos.


