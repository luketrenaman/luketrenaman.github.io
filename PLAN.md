# Automated Build & Publishing System

## Overview

An automated CI/CD pipeline that builds games from their individual repos, updates the portfolio site, deploys to GitHub Pages, and publishes selected games to itch.io.

**Games to publish to itch.io:** Tips for Shrimps, Brain Food, Lunar Lock, Snake Maze

---

## Architecture

```
┌──────────────────┐     repository_dispatch     ┌─────────────────────────────┐
│  Game Repo (e.g. │ ──────────────────────────► │  luketrenaman.github.io     │
│  snakemaze)      │                             │                             │
│                  │                             │  1. Update submodule        │
│  on push:        │                             │  2. Commit & push           │
│  1. Build game   │                             │  3. Astro build             │
│  2. Push to      │                             │  4. Deploy to GitHub Pages  │
│     build branch │                             │  5. Upload to itch.io       │
│  3. Dispatch     │                             │     via butler              │
└──────────────────┘                             └─────────────────────────────┘
```

---

## Phase 1: Standardize Game Repos as Submodules

### Current state

| Game             | In this repo?       | Submodule? | Source repo                              |
|------------------|---------------------|------------|------------------------------------------|
| Snake Maze       | Yes (submodule)     | Yes        | `luketrenaman/snakemaze`                 |
| Tips for Shrimps | Yes (committed)     | No         | Needs repo creation                      |
| Brain Food       | No (external link)  | No         | `brainfoodgame/brainfoodgame.github.io`? |
| Lunar Lock       | No (itch.io only)   | No         | Needs identification                     |

### Actions

1. **Tips for Shrimps** - Create a repo `luketrenaman/tips-for-shrimps`, move the
   Godot project source there, and replace the committed build artifacts in
   `public/projects/tips-for-shrimps/` with a git submodule pointing to a `build`
   branch of the new repo.

2. **Brain Food** - Determine the source repo location. If it lives under the
   `brainfoodgame` GitHub org, set up cross-org `repository_dispatch` using a PAT,
   or add a submodule pointing to its deployment repo. If the source lives
   elsewhere, create a repo for it.

3. **Lunar Lock** - Identify where the source/build artifacts live. If there's an
   existing repo, add it as a submodule. If not, create one.

4. **Snake Maze** - Already a submodule. No changes needed to the structure.

---

## Phase 2: Game Repo CI/CD Workflows

Each game repo gets a GitHub Actions workflow. The exact build command varies per
game engine, but the structure is the same.

### Template: `.github/workflows/build.yml` (in each game repo)

```yaml
name: Build and Publish

on:
  push:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: write  # needed to push to build branch

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # === BUILD STEP (varies per game) ===

      # Snake Maze (webpack/gulp):
      # - run: npm ci && npx gulp

      # Tips for Shrimps (Godot):
      # - uses: chickensoft-games/setup-godot@v2
      #   with:
      #     version: 4.x
      # - run: godot --headless --export-release "HTML5" build/index.html

      # Brain Food (if JS-based):
      # - run: npm ci && npm run build

      # === END BUILD STEP ===

      - name: Push built artifacts to build branch
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build  # adjust per game
          publish_branch: build

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
          event-type: submodule-update
          client-payload: '{"game": "<game-name>", "ref": "${{ github.sha }}"}'
```

### Secrets needed per game repo

| Secret                   | Description                                                         |
|--------------------------|---------------------------------------------------------------------|
| `BUTLER_API_KEY`         | itch.io API key (from https://itch.io/user/settings/api-keys)       |
| `PORTFOLIO_DISPATCH_TOKEN` | GitHub PAT with `repo` scope on `luketrenaman.github.io`          |

> **Tip:** Both secrets can be set as **organization-level secrets** if your repos
> are under the same GitHub account, avoiding duplication.

### Per-game build commands

| Game             | Engine/Tooling | Build command                                               | Output dir   |
|------------------|----------------|-------------------------------------------------------------|-------------|
| Snake Maze       | Webpack + Gulp | `npm ci && npx gulp`                                        | `snakemaze/` |
| Tips for Shrimps | Godot 4.x      | `godot --headless --export-release "HTML5" build/index.html` | `build/`     |
| Brain Food       | TBD            | TBD - needs source repo inspection                          | TBD          |
| Lunar Lock       | TBD            | TBD - needs source repo inspection                          | TBD          |

---

## Phase 3: Portfolio Site - Receive Submodule Updates

Add a new workflow (or extend `deploy.yml`) to handle incoming `repository_dispatch`
events from game repos.

### New file: `.github/workflows/update-submodule.yml`

```yaml
name: Update Game Submodule

on:
  repository_dispatch:
    types: [submodule-update]

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Update submodule
        run: |
          GAME="${{ github.event.client_payload.game }}"
          SUBMODULE_PATH="public/projects/${GAME}"

          cd "$SUBMODULE_PATH"
          git fetch origin build
          git checkout origin/build
          cd "$GITHUB_WORKSPACE"

          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add "$SUBMODULE_PATH"
          git commit -m "Update ${GAME} submodule to latest build"
          git push

      # The push to master triggers the existing deploy.yml automatically
```

### Modify existing `deploy.yml`

Add submodule checkout to the existing workflow so it picks up submodule content:

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

## Phase 4: itch.io Publishing (Alternative Centralized Approach)

If you prefer to publish to itch.io from the portfolio repo instead of from each
game repo, add a butler upload job to `deploy.yml`:

```yaml
  publish-itch:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Install butler
        run: |
          curl -L -o butler.zip https://broth.itch.zone/butler/linux-amd64/LATEST/archive/default
          unzip butler.zip
          chmod +x butler
          ./butler -V

      - name: Upload games to itch.io
        env:
          BUTLER_API_KEY: ${{ secrets.BUTLER_API_KEY }}
        run: |
          ./butler push public/projects/snakemaze/snakemaze luketrenaman/snakemaze:html5
          ./butler push public/projects/tips-for-shrimps luketrenaman/tips-for-shrimps:html5
          # Add more games as needed
```

> **Recommendation:** Publish from the game repos (Phase 2) rather than
> centralized. This way each game publishes to itch.io immediately when it's
> updated, without waiting for the portfolio site pipeline.

---

## Phase 5: Setup Checklist

### One-time setup

- [ ] Create an itch.io API key at https://itch.io/user/settings/api-keys
- [ ] Create a GitHub PAT (classic) with `repo` scope for cross-repo dispatch
- [ ] Add `BUTLER_API_KEY` as a secret to each game repo (or as an account-level secret)
- [ ] Add `PORTFOLIO_DISPATCH_TOKEN` as a secret to each game repo
- [ ] Create itch.io project pages for any games not yet listed
- [ ] Convert Tips for Shrimps to a submodule (create repo, move source)
- [ ] Identify/create repos for Brain Food and Lunar Lock

### Per-game repo setup

- [ ] Add `.github/workflows/build.yml` with the appropriate build step
- [ ] Verify the build output directory matches the butler push path
- [ ] Test the workflow end-to-end on a feature branch first

### Portfolio repo setup

- [ ] Add `.github/workflows/update-submodule.yml`
- [ ] Update `deploy.yml` to check out submodules recursively
- [ ] Add `BUTLER_API_KEY` secret (if using centralized itch.io publishing)

---

## Flow Summary

```
Developer pushes to game repo (e.g., snakemaze)
  │
  ▼
Game repo CI runs
  ├─► Builds the game (webpack, Godot, etc.)
  ├─► Pushes built artifacts to `build` branch
  ├─► Uploads to itch.io via butler
  └─► Sends repository_dispatch to portfolio repo
        │
        ▼
      Portfolio repo CI runs
        ├─► Updates git submodule reference
        ├─► Commits & pushes to master
        │     │
        │     ▼
        │   Existing deploy.yml triggers
        │     ├─► Astro builds the portfolio site
        │     └─► Deploys to GitHub Pages (luketrenaman.com)
        └─► Done
```

---

## Open Questions

1. **Brain Food source repo** - Where does the source live? Is it under the
   `brainfoodgame` org on GitHub? Do you have push access to set up CI there?

2. **Lunar Lock source repo** - Where is the project source? Is it a Godot project,
   Unity, or something else?

3. **Godot version** - Which Godot version do Tips for Shrimps and Lunar Lock use?
   (Godot 3.x vs 4.x changes the export CLI flags)

4. **itch.io project slugs** - Confirm the itch.io URL slugs for each game:
   - `luketrenaman/tips-for-shrimps` ?
   - `luketrenaman/brain-food` ?
   - `luketrenaman/snakemaze` ?
   - `luketrenaman/lunar-lock` (already exists)
