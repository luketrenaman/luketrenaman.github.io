# Automated Build & Publishing System

## Overview

An automated CI/CD pipeline that builds games from their individual repos, updates
the portfolio site, deploys to GitHub Pages, and publishes selected games to itch.io.

**Games to publish to itch.io:** Tips for Shrimps, Brain Food, Lunar Lock, Snake Maze

---

## Key Design Decision: Submodules vs Build Artifacts

Games fall into two categories that require different handling:

| Category | Examples | How it works |
|----------|----------|-------------|
| **Web-native** (JS/HTML source = deployable code) | Snake Maze | Keep as **git submodules** — source is the output |
| **Engine-exported** (Godot, Unity, etc.) | Tips for Shrimps, Lunar Lock, Brain Food | Game repo CI **exports for web**, publishes as a **GitHub Release**. Portfolio repo **downloads** the release artifact at build time — NOT a submodule |

Engine games should never be submodules because:
- The source project (Godot scenes, Unity assets) is not what gets served
- Web exports produce large `.wasm`/`.pck` files that shouldn't live in git
- The build step (Godot/Unity export) must happen in CI, not be committed

---

## Architecture

```
ENGINE GAME REPOS (Godot/Unity)          WEB GAME REPOS (JS/HTML)
┌───────────────────────┐                ┌───────────────────────┐
│  e.g. tips-for-shrimps│                │  e.g. snakemaze       │
│                       │                │                       │
│  on push:             │                │  on push:             │
│  1. Export for web    │                │  1. Build (webpack)   │
│  2. Create GH Release│                │  2. Dispatch to       │
│  3. Upload to itch.io │                │     portfolio repo    │
│  4. Dispatch to       │                └───────────┬───────────┘
│     portfolio repo    │                            │
└───────────┬───────────┘                            │
            │         repository_dispatch            │
            └──────────────┬─────────────────────────┘
                           ▼
              ┌─────────────────────────────┐
              │  luketrenaman.github.io     │
              │                             │
              │  1. Update submodules       │
              │  2. Download engine game    │
              │     releases → public/      │
              │  3. Commit & push           │
              │  4. Astro build             │
              │  5. Deploy to GitHub Pages  │
              └─────────────────────────────┘
```

---

## Phase 1: Organize Game Repos

### Current state

| Game             | Type          | In portfolio repo?        | Source repo                              |
|------------------|---------------|---------------------------|------------------------------------------|
| Snake Maze       | Web-native    | Submodule                 | `luketrenaman/snakemaze`                 |
| Tips for Shrimps | Godot export  | Committed build artifacts | Needs repo creation                      |
| Brain Food       | TBD           | No (external link)        | `brainfoodgame/brainfoodgame.github.io`? |
| Lunar Lock       | TBD           | No (itch.io only)         | Needs identification                     |

### Actions

1. **Tips for Shrimps** — Create a repo `luketrenaman/tips-for-shrimps` with the
   Godot source project. Remove the committed build artifacts from
   `public/projects/tips-for-shrimps/` (the ~95MB of `.wasm`/`.pck` files currently
   checked in). These will instead be downloaded from GitHub Releases at build time.

2. **Brain Food** — Determine the source repo. If under the `brainfoodgame` org,
   set up CI there with cross-org `repository_dispatch` using a PAT.

3. **Lunar Lock** — Identify the source repo and engine. Set up CI accordingly.

4. **Snake Maze** — Already a submodule. No structural changes needed.

---

## Phase 2: Game Repo CI/CD Workflows

### Engine game repos (Godot/Unity) — `.github/workflows/build.yml`

```yaml
name: Build, Release, and Publish

on:
  push:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: write  # needed to create releases

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # === GODOT EXAMPLE (Tips for Shrimps) ===
      - name: Setup Godot
        uses: chickensoft-games/setup-godot@v2
        with:
          version: 4.x  # adjust to match your project
          include-templates: true

      - name: Export for web
        run: |
          mkdir -p build
          godot --headless --export-release "HTML5" build/index.html

      # === UNITY EXAMPLE ===
      # - uses: game-ci/unity-builder@v4
      #   with:
      #     targetPlatform: WebGL
      #     buildsPath: build
      # ========================

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          tag_name: build-${{ github.run_number }}
          name: Web Build #${{ github.run_number }}
          files: build/**
          # Or zip it first:
          # files: build.zip

      - name: Upload to itch.io
        uses: robpc/itchio-upload-action@v1
        with:
          path: ./build
          project: luketrenaman/<game-name>
          channel: html5
          api-key: ${{ secrets.BUTLER_API_KEY }}

      - name: Trigger portfolio site update
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.PORTFOLIO_DISPATCH_TOKEN }}
          repository: luketrenaman/luketrenaman.github.io
          event-type: game-updated
          client-payload: >-
            {
              "game": "<game-name>",
              "type": "engine",
              "repo": "luketrenaman/<game-name>"
            }
```

### Web-native game repos (JS/HTML) — `.github/workflows/build.yml`

```yaml
name: Build and Publish

on:
  push:
    branches: [main, master]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build
        run: npm ci && npx gulp  # or npm run build, etc.

      - name: Trigger portfolio site update
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.PORTFOLIO_DISPATCH_TOKEN }}
          repository: luketrenaman/luketrenaman.github.io
          event-type: game-updated
          client-payload: >-
            {
              "game": "snakemaze",
              "type": "submodule"
            }
```

### Secrets needed per game repo

| Secret                     | Description                                                    |
|----------------------------|----------------------------------------------------------------|
| `BUTLER_API_KEY`           | itch.io API key (engine repos only)                            |
| `PORTFOLIO_DISPATCH_TOKEN` | GitHub PAT with `repo` scope on `luketrenaman.github.io`       |

---

## Phase 3: Portfolio Site — Receive Updates

New workflow that handles both submodule updates (web-native games) and release
artifact downloads (engine games).

### New file: `.github/workflows/update-game.yml`

```yaml
name: Update Game

on:
  repository_dispatch:
    types: [game-updated]

permissions:
  contents: write

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
          token: ${{ secrets.GITHUB_TOKEN }}

      # --- For web-native games: update the submodule ---
      - name: Update submodule
        if: github.event.client_payload.type == 'submodule'
        run: |
          GAME="${{ github.event.client_payload.game }}"
          cd "public/projects/${GAME}"
          git pull origin master
          cd "$GITHUB_WORKSPACE"
          git add "public/projects/${GAME}"

      # --- For engine games: download the latest release ---
      - name: Download latest release
        if: github.event.client_payload.type == 'engine'
        env:
          GH_TOKEN: ${{ secrets.PORTFOLIO_DISPATCH_TOKEN }}
        run: |
          GAME="${{ github.event.client_payload.game }}"
          REPO="${{ github.event.client_payload.repo }}"
          DEST="public/projects/${GAME}"

          # Clear old build artifacts
          rm -rf "${DEST}"
          mkdir -p "${DEST}"

          # Download and extract latest release assets
          gh release download --repo "${REPO}" --pattern '*.zip' --dir /tmp
          unzip /tmp/*.zip -d "${DEST}"
          # Or if assets are individual files:
          # gh release download --repo "${REPO}" --dir "${DEST}"

          git add "${DEST}"

      - name: Commit and push
        run: |
          GAME="${{ github.event.client_payload.game }}"
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git diff --cached --quiet && exit 0  # skip if no changes
          git commit -m "Update ${GAME} to latest build"
          git push

      # The push to master triggers the existing deploy.yml automatically
```

### Modify existing `deploy.yml`

Add submodule checkout for web-native games:

```yaml
steps:
  - name: Checkout your repository using git
    uses: actions/checkout@v4
    with:
      submodules: recursive  # <-- ADD THIS
  - name: Install, build, and upload your site
    uses: withastro/action@v3
```

---

## Phase 4: itch.io Publishing

itch.io uploads happen **in each game repo's CI** (Phase 2), not in the portfolio
repo. This is the right place because:

- The game repo has the freshly-built artifacts
- Each game publishes independently without waiting for the portfolio pipeline
- itch.io and the portfolio site are separate deployment targets

For **web-native games** (Snake Maze) that also need itch.io publishing, add the
butler upload step to their repo workflow too:

```yaml
      - name: Upload to itch.io
        uses: robpc/itchio-upload-action@v1
        with:
          path: ./snakemaze  # built output dir
          project: luketrenaman/snakemaze
          channel: html5
          api-key: ${{ secrets.BUTLER_API_KEY }}
```

---

## Phase 5: Setup Checklist

### One-time setup

- [ ] Create an itch.io API key at https://itch.io/user/settings/api-keys
- [ ] Create a GitHub PAT (classic) with `repo` scope for cross-repo dispatch
- [ ] Add `BUTLER_API_KEY` as a secret to each game repo (or as an account-level secret)
- [ ] Add `PORTFOLIO_DISPATCH_TOKEN` as a secret to each game repo
- [ ] Create itch.io project pages for any games not yet listed

### Per engine-game repo (Tips for Shrimps, Brain Food, Lunar Lock)

- [ ] Create the repo with game source (if it doesn't exist)
- [ ] Add `.github/workflows/build.yml` with the appropriate export step
- [ ] Remove committed build artifacts from portfolio repo's `public/projects/`
- [ ] Test the GitHub Release creation end-to-end

### Per web-native game repo (Snake Maze)

- [ ] Add `.github/workflows/build.yml` with build + dispatch
- [ ] Add butler upload step if publishing to itch.io

### Portfolio repo

- [ ] Add `.github/workflows/update-game.yml`
- [ ] Update `deploy.yml` with `submodules: recursive`
- [ ] Add `.gitignore` entries for engine game build directories if needed
- [ ] Test the full pipeline: game push → release → dispatch → download → deploy

---

## Flow Summary

```
Developer pushes to game repo
  │
  ├─ Engine game (Godot/Unity)?
  │   │
  │   ▼
  │   Game repo CI
  │   ├─► Exports for web (Godot/Unity CLI)
  │   ├─► Creates GitHub Release with build artifacts
  │   ├─► Uploads to itch.io via butler
  │   └─► Sends repository_dispatch to portfolio repo
  │         │
  │         ▼
  │       Portfolio repo downloads latest release
  │       into public/projects/<game>/
  │
  ├─ Web-native game (JS/HTML)?
  │   │
  │   ▼
  │   Game repo CI
  │   ├─► Builds (webpack, etc.)
  │   ├─► Uploads to itch.io via butler (optional)
  │   └─► Sends repository_dispatch to portfolio repo
  │         │
  │         ▼
  │       Portfolio repo updates submodule ref
  │
  └─► Either way:
        Portfolio repo commits & pushes
          │
          ▼
        Existing deploy.yml triggers
          ├─► Astro builds the portfolio site
          └─► Deploys to GitHub Pages (luketrenaman.com)
```

---

## Open Questions

1. **Brain Food source repo** — Where does the source live? Is it under the
   `brainfoodgame` org on GitHub? Do you have push access to set up CI there?

2. **Lunar Lock source repo** — Where is the project source? Which engine
   (Godot, Unity, other)?

3. **Godot version** — Which Godot version do Tips for Shrimps and (possibly)
   Lunar Lock use? (3.x vs 4.x changes the export CLI flags and CI setup)

4. **itch.io project slugs** — Confirm the itch.io URL slugs for each game:
   - `luketrenaman/tips-for-shrimps` ?
   - `luketrenaman/brain-food` ?
   - `luketrenaman/snakemaze` ?
   - `luketrenaman/lunar-lock` (already exists)

5. **Release format** — Should engine game releases be zipped archives or
   individual files? Zipped is simpler for download/extraction in CI.
