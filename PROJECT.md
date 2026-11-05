# Project: GitHub Pages Redesign & Portal Migration

## Architecture
- Single Page Application (SPA) with 100dvh full-bleed Scroll-Snap architecture (`#snap-container`, `.snap-section`).
- UI Stack: Tailwind CSS CDN, Lucide Icons, Google Fonts, PWA Service Worker (`sw.js`).
- 6 Key Sections:
  - `#hero` (00 // 門戶核心)
  - `#exp` (01 // 碩論科研: GNN / CSR / XAI)
  - `#osk` (02 // 關西旅誌: 日本紀行寫真與雜誌跳轉)
  - `#show` (03 // 虛實典藏: 實體沙龍香氛聲學 ⇄ 數位匿名頂級裝備模擬)
  - `#ops` (04 // 自動腳本: Tixplus 票務獵手 ⇄ DriveStore 雲端封裝加密管線)
  - `#ai` (05 // 本地智算: WASAPI + SenseVoice/Faster-Whisper + Gemma 4 MTP)
- Service Worker: `hub-portal-cache-v3` namespace with network-first navigation and stale-while-revalidate static caching.
- Tooling: PowerShell 7 / Windows batch dual-mode one-click scripts, zero port 8000 conflicts (default 5173 / `$env:PORT`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Legacy Index Backup | Backup existing `Github Page/index.html` to `Github Page/index_legacy.html` | M1 | Survey R1 |
| 2 | New Portal Migration | Migrate `Github Page/ai_studio_code.html` structure & design to `Github Page/index.html` | M1 | Survey R1 |
| 3 | Service Worker Cache Upgrade | Update cache name in `Github Page/sw.js` to `hub-portal-cache-v3` with cache purge | M1 | Survey R1 |
| 4 | HUD Navbar & Scroll Observer | Fix `IntersectionObserver` to track `.nav-pill` active highlights and smooth scroll | M2 | Survey R2 |
| 5 | Showcase Desktop Display Conflict | Use inline `style.display` to eliminate `.hidden` vs `md:grid` specificity conflict | M2 | Survey R2 |
| 6 | Compression DAG State Machine | Refactor `routeDag` to clear MKV active highlights on CBZ/SHA and update node state | M2 | Survey R2 |
| 7 | Additional UI Edge Fixes | Fix `opacity-15` class, audio waveform `onmouseleave`, directory drawer `#hero` entry | M2 | Survey R2 |
| 8 | 01 Research (EXP) Content Backfill | Backfill NTU ESOE GNN thesis, CSR metrics (56.74MB, 92.8%, 190.82ms), Fidelity, GitHub repo | M3 | Survey R3 |
| 9 | 02 Travel (OSK) Content Backfill | Backfill Kansai travel journal, 11-day trip, 305 photos, Kinkaku-ji local photo, `./osaka/` links | M3 | Survey R3 |
| 10 | 03 Physical Showcase Backfill | Backfill Le Labo Santal 33, Guerlain, Beyerdynamic DT 770 Pro, `./showcase/` link | M3 | Survey R3 |
| 11 | 03 MapleStory Privacy Telemetry | Display anonymous simulation stats (1.25 億, 9000, 302★, 創世解放), zero real IGN / face | M3 | Survey R3 |
| 12 | 04 Ops Pipeline Content Backfill | Backfill Tixplus bot (30s / CF Worker / millisecond push) & DriveStore HEVC/CBZ/7-Zip/Rclone | M3 | Survey R3 |
| 13 | 05 AI Live Workstation Backfill | Backfill SenseVoice (50ms) + Gemma 4 MTP (80-110 tok/s), WASAPI Loopback, real sentence pairs | M3 | Survey R3 |
| 14 | External README & CHANGELOG | Update README.md (preview guide on 5173) and CHANGELOG.md (Keep a Changelog format) | M4 | Survey R4 |
| 15 | Internal HANDOVER Snapshot | Create high-density `HANDOVER.md` snapshot and exclude via `.gitignore` | M4 | Survey R4 |
| 16 | Local Preview Script Port Fix | Update `啟動預覽.bat` to avoid port 8000 and bind to 5173 / `$env:PORT` | M4 | Survey R4 |
| 17 | Static Security & Path Scan | Verify zero hardcoded personal paths, zero private keys, zero forbidden IGN leaks | M5 | Survey R5 |
| 18 | Safe Git Push Script & Remote Push | Create ASCII `push_to_github.bat`, commit sanitized changes, and push to remote | M5 | Survey R5 |
| 19 | E2E Testing Suite & Runner | Test suite covering Tiers 1-4 and publish `TEST_READY.md` | E2E-Track | Dual Track |
| 20 | Final E2E Test Pass & Hardening | Pass 100% of E2E tests and Tier 5 adversarial verification | M6 | Final Milestone |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Design test runner & test cases (Tiers 1-4), publish TEST_READY.md | none | DONE |
| M1 | File Migration & Cache Upgrade | Backup `index.html` to `index_legacy.html`, copy `ai_studio_code.html` to `index.html`, update `sw.js` cache to `hub-portal-cache-v3` | none | DONE |
| M2 | Interactive Frontend Bug Fixes | Fix HUD navbar observer, Showcase inline display toggle, routeDag state machine, UI edge cases | M1 | DONE |
| M3 | Project Data & Privacy Backfill | Backfill all 5 projects data, remove all 29 `[TODO:` tags, enforce MapleStory anonymous simulation | M2 | DONE |
| M4 | Dual-Track Docs & Preview Script | Update `README.md`, `CHANGELOG.md`, create `HANDOVER.md`, `.gitignore`, fix preview port | M3 | DONE |
| M5 | Security Scan & Git Push | Run `git grep` security sweeps, create `push_to_github.bat`, commit & push to remote | M4 | DONE |
| M6 | Final E2E Test & Hardening | Pass 100% E2E test suite (Tiers 1-4) and Tier 5 adversarial hardening | M5, E2E | DONE |


## Interface Contracts
### `sw.js` ↔ `index.html`
- Cache identifier: `hub-portal-cache-v3`
- Navigation fallback: `./index.html`
- Cache purge rule: Clear keys matching `hub-portal-cache-*` except `hub-portal-cache-v3`; protect other namespaces (`tabisync-*`, `museum-showcase-*`, `cyber-routine-cache-*`).

### HUD Navbar ↔ Sections
- Scroll container: `#snap-container` (Root of IntersectionObserver)
- Observed sections: `.snap-section` (`#hero`, `#exp`, `#osk`, `#show`, `#ops`, `#ai`)
- Pills: `.nav-pill` with `href="#..."`
- Active pill styling: `bg-white/15 text-white ring-1 ring-white/20 font-medium`
- Inactive pill styling: `text-zinc-300 font-normal hover:text-white hover:bg-white/[0.06]`

### Showcase Toggle
- Function: `switchShowcase(mode)` ('physical' | 'maple')
- Physical container: `#showcase-physical` (set `style.display = isPhys ? '' : 'none'`)
- Maple container: `#showcase-maple` (set `style.display = isPhys ? 'none' : ''`)
- Buttons: `#btn-show-phys`, `#btn-show-maple` with distinct highlight classes

### Pipeline DAG
- Function: `routeDag(mode)` ('mkv' | 'cbz' | 'sha')
- Buttons: `dag-btn-mkv`, `dag-btn-cbz`, `dag-btn-sha`
- Nodes: `node-mux`, `node-cbz`, `node-sha`, `node-rclone`
- Active node class: border-cyan-400 with `<span class="text-cyan-400">ACTIVE</span>`
- Idle node class: border-white/10 opacity-20 with `<span>IDLE</span>`

## Code Layout
- `Github Page/index.html` — Target production portal (owned by M1 -> M2 -> M3)
- `Github Page/index_legacy.html` — Legacy portal backup (owned by M1)
- `Github Page/sw.js` — Service worker cache controller (owned by M1)
- `Github Page/README.md` — Public project documentation (owned by M4)
- `Github Page/CHANGELOG.md` — Public change log (owned by M4)
- `Github Page/HANDOVER.md` — Internal confidential handover snapshot (owned by M4, ignored by Git)
- `Github Page/.gitignore` — Git exclusion rules (owned by M4)
- `Github Page/啟動預覽.bat` — Local preview launcher (owned by M4)
- `Github Page/push_to_github.bat` — Safe git push automation script (owned by M5)
- `tests/e2e/` — E2E test scripts and assertions (owned by E2E Testing Track)
