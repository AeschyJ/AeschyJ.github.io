"""
tests/e2e/spec_fixture.py
-------------------------
Generates an in-memory, fully-compliant DOMTree and workspace file fixtures
based on the exact specifications from ORIGINAL_REQUEST.md and spec_miner_survey_2/handoff.md.
Used by the test suite for oracle self-verification and test assertion validation.
"""

from tests.e2e.dom_engine import parse_html
from tests.e2e import oracle

def generate_compliant_portal_html() -> str:
    """Generates a complete portal HTML that satisfies all requirements (R1-R5)."""
    return f"""<!DOCTYPE html>
<html lang="zh-TW" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AESCHY | From Research to Wanderlust</title>
  <link rel="manifest" href="manifest.json">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'></svg>">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-[#09090B] text-[#F4F4F5] font-sans antialiased overflow-hidden">

  <!-- HUD NAVBAR -->
  <header class="fixed top-3 md:top-4 inset-x-0 z-50 flex justify-center px-3 pointer-events-none">
    <nav class="pointer-events-auto relative flex items-center justify-between gap-1.5 p-1.5 rounded-3xl bg-white/[0.06] backdrop-blur-2xl ring-1 ring-white/[0.15] max-w-full overflow-x-auto no-scrollbar">
      <a href="#hero" class="px-3.5 py-1.5 rounded-2xl text-xs font-serif tracking-[0.2em] text-white font-semibold hover:bg-white/[0.08] shrink-0">AESCHY</a>
      <div class="h-3.5 w-px bg-white/10 shrink-0 hidden sm:block"></div>
      <div class="flex items-center gap-0.5 shrink-0">
        <a href="#exp" class="nav-pill px-2.5 py-1.5 rounded-2xl text-xs text-zinc-300 font-normal hover:text-white flex items-center gap-1">
          <span class="font-mono tabular-nums text-[10px] text-zinc-500">01</span><span>碩論科研</span>
        </a>
        <a href="#osk" class="nav-pill px-2.5 py-1.5 rounded-2xl text-xs text-zinc-300 font-normal hover:text-white flex items-center gap-1">
          <span class="font-mono tabular-nums text-[10px] text-zinc-500">02</span><span>關西旅誌</span>
        </a>
        <a href="#show" class="nav-pill px-2.5 py-1.5 rounded-2xl text-xs text-zinc-300 font-normal hover:text-white flex items-center gap-1">
          <span class="font-mono tabular-nums text-[10px] text-zinc-500">03</span><span>虛實典藏</span>
        </a>
        <a href="#ops" class="nav-pill px-2.5 py-1.5 rounded-2xl text-xs text-zinc-300 font-normal hover:text-white flex items-center gap-1">
          <span class="font-mono tabular-nums text-[10px] text-zinc-500">04</span><span>自動腳本</span>
        </a>
        <a href="#ai" class="nav-pill px-2.5 py-1.5 rounded-2xl text-xs text-zinc-300 font-normal hover:text-white flex items-center gap-1">
          <span class="font-mono tabular-nums text-[10px] text-zinc-500">05</span><span>本地智算</span>
        </a>
      </div>
      <div class="h-3.5 w-px bg-white/10 shrink-0"></div>
      <button onclick="toggleDrawer(true)" class="px-2.5 py-1.5 rounded-2xl text-xs text-zinc-300 hover:text-white flex items-center gap-1 shrink-0" aria-label="展館目錄">
        <i data-lucide="compass" class="w-3.5 h-3.5"></i>
        <span class="hidden md:inline font-mono tabular-nums text-[10px]">INDEX</span>
      </button>
    </nav>
  </header>

  <!-- Right Snap Indicator Dots -->
  <aside class="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2.5">
    <a href="#hero" data-dot="hero" class="snap-dot w-1.5 h-6 rounded-full bg-white transition-all duration-300"></a>
    <a href="#exp" data-dot="exp" class="snap-dot w-1.5 h-1.5 rounded-full bg-white/25 hover:bg-white/60 transition-all duration-300"></a>
    <a href="#osk" data-dot="osk" class="snap-dot w-1.5 h-1.5 rounded-full bg-white/25 hover:bg-white/60 transition-all duration-300"></a>
    <a href="#show" data-dot="show" class="snap-dot w-1.5 h-1.5 rounded-full bg-white/25 hover:bg-white/60 transition-all duration-300"></a>
    <a href="#ops" data-dot="ops" class="snap-dot w-1.5 h-1.5 rounded-full bg-white/25 hover:bg-white/60 transition-all duration-300"></a>
    <a href="#ai" data-dot="ai" class="snap-dot w-1.5 h-1.5 rounded-full bg-white/25 hover:bg-white/60 transition-all duration-300"></a>
  </aside>

  <!-- MAIN SCROLL-SNAP CONTAINER -->
  <main id="snap-container" class="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">

    <!-- 00 HERO -->
    <section id="hero" class="snap-section min-h-[100dvh] w-full relative flex items-center justify-center p-6">
      <div class="text-center max-w-2xl">
        <h1 class="text-4xl md:text-6xl font-serif text-white tracking-tight">AESCHY</h1>
        <p class="mt-4 text-zinc-400 text-sm md:text-base">研析成文，行旅作卷。個人工程與藝文展館門戶。</p>
      </div>
    </section>

    <!-- 01 EXP -->
    <section id="exp" class="snap-section min-h-[100dvh] w-full relative flex items-center justify-center p-6 bg-[#0B0F17]">
      <div class="max-w-4xl w-full">
        <span class="text-xs font-mono text-cyan-400">01 // RESEARCH</span>
        <h2 class="text-xl md:text-2xl font-bold text-white mt-1">{oracle.EXPECTED_EXP_DATA['thesis_title']}</h2>
        <p class="text-xs font-mono text-zinc-400 mt-1">{oracle.EXPECTED_EXP_DATA['institution']}</p>
        <div class="grid grid-cols-3 gap-3 mt-4 text-xs font-mono">
          <div class="p-3 bg-white/[0.04] rounded-xl">
            <span class="text-zinc-500">CSR Memory</span>
            <div class="text-white font-bold">{oracle.EXPECTED_EXP_DATA['csr_memory']}</div>
          </div>
          <div class="p-3 bg-white/[0.04] rounded-xl">
            <span class="text-zinc-500">Reduction</span>
            <div class="text-emerald-400 font-bold">{oracle.EXPECTED_EXP_DATA['csr_reduction']}</div>
          </div>
          <div class="p-3 bg-white/[0.04] rounded-xl">
            <span class="text-zinc-500">Graph Speed</span>
            <div class="text-cyan-400 font-bold">{oracle.EXPECTED_EXP_DATA['csr_speedup']}</div>
          </div>
        </div>
        <div class="mt-3 flex gap-4 text-xs font-mono">
          <span>{oracle.EXPECTED_EXP_DATA['csr_complexity']}</span>
          <span>Fidelity+ {oracle.EXPECTED_EXP_DATA['fidelity_pos']}</span>
          <a href="{oracle.EXPECTED_EXP_DATA['github_url']}" target="_blank" class="text-cyan-400 underline">GitHub 開源</a>
        </div>
        <!-- XAI Buttons -->
        <div class="mt-4 flex gap-2">
          <button id="xai-btn-1" onclick="switchXaiPath(1)" class="px-2.5 py-1 text-[11px] font-mono bg-white/10 text-white rounded-[2px]">Path α</button>
          <button id="xai-btn-2" onclick="switchXaiPath(2)" class="px-2.5 py-1 text-[11px] font-mono text-[#8C867E] rounded-[2px]">Path β</button>
        </div>
      </div>
    </section>

    <!-- 02 OSK -->
    <section id="osk" class="snap-section min-h-[100dvh] w-full relative flex items-center justify-center p-6 bg-[#0E0D0C]">
      <div class="max-w-4xl w-full">
        <span class="text-xs font-mono text-[#C5A880]">02 // TRAVEL</span>
        <h2 class="text-xl md:text-2xl font-serif text-white mt-1">{oracle.EXPECTED_OSK_DATA['title']}</h2>
        <p class="text-xs font-mono text-zinc-400 mt-1">{oracle.EXPECTED_OSK_DATA['season']} · {oracle.EXPECTED_OSK_DATA['edition']} · {oracle.EXPECTED_OSK_DATA['coordinates']}</p>
        <div class="mt-4">
          <img src="{oracle.EXPECTED_OSK_DATA['local_photo_path']}" alt="清水寺" class="w-full max-w-md rounded-xl" />
        </div>
        <div class="mt-4 flex gap-4 text-xs font-mono">
          <a href="{oracle.EXPECTED_OSK_DATA['link_emaki']}" class="text-[#C5A880] underline">百景繪卷</a>
          <a href="{oracle.EXPECTED_OSK_DATA['link_magazine']}" class="text-[#C5A880] underline">和風繪卷</a>
        </div>
      </div>
    </section>

    <!-- 03 SHOW -->
    <section id="show" class="snap-section min-h-[100dvh] w-full relative flex items-center justify-center p-6 bg-[#11100F] transition-colors duration-500">
      <div class="max-w-4xl w-full">
        <div class="flex justify-between items-center">
          <span class="text-xs font-mono text-zinc-400">03 // SHOWCASE</span>
          <div class="flex gap-2">
            <button id="btn-show-phys" onclick="switchShowcase('physical')" class="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#C5A880] text-[#11100F] font-medium">實體藝廊</button>
            <button id="btn-show-maple" onclick="switchShowcase('maple')" class="px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-white">數位圖鑑</button>
          </div>
        </div>

        <!-- Physical Container -->
        <div id="showcase-physical" class="mt-6 md:grid md:grid-cols-2 gap-4">
          <div class="p-4 rounded-2xl bg-white/[0.04]">
            <h3 class="font-serif text-white font-semibold">沙龍香氛</h3>
            <p class="text-xs text-zinc-400 mt-2">{oracle.EXPECTED_PHYSICAL_SHOWCASE['perfume_1']}、{oracle.EXPECTED_PHYSICAL_SHOWCASE['perfume_2']}</p>
          </div>
          <div class="p-4 rounded-2xl bg-white/[0.04]">
            <h3 class="font-serif text-white font-semibold">聲學設備</h3>
            <p class="text-xs text-zinc-400 mt-2">{oracle.EXPECTED_PHYSICAL_SHOWCASE['headphone']}</p>
            <a href="{oracle.EXPECTED_PHYSICAL_SHOWCASE['link']}" class="text-xs text-[#C5A880] underline mt-3 inline-block">藝廊直通</a>
          </div>
        </div>

        <!-- Maple Container (Inline hidden initially) -->
        <div id="showcase-maple" style="display: none;" class="mt-6">
          <div class="flex gap-4 text-xs font-mono text-zinc-300">
            <span>戰力 {oracle.EXPECTED_MAPLE_TELEMETRY['combat_power']}</span>
            <span>戰地 {oracle.EXPECTED_MAPLE_TELEMETRY['legion']}</span>
            <span>{oracle.EXPECTED_MAPLE_TELEMETRY['star_force']}</span>
            <span>{oracle.EXPECTED_MAPLE_TELEMETRY['genesis_liberated']}</span>
            <span>{oracle.EXPECTED_MAPLE_TELEMETRY['symbols']}</span>
          </div>
          <!-- 5x6 Equipment Grid -->
          <div id="maple-grid" class="grid grid-cols-6 gap-1.5 mt-4 max-w-sm">
            <!-- 30 cells populated via JS/mock -->
          </div>
          <div class="mt-4 flex gap-4 items-center">
            <button onclick="toggleMapleSpotlight()" class="px-3 py-1.5 rounded-lg text-xs font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">
              <span id="maple-spotlight-text">啟動抓漏聚光燈</span>
            </button>
            <div class="text-xs font-mono text-zinc-400">
              <span>{oracle.EXPECTED_MAPLE_TELEMETRY['spotlight_slots'][0]}</span>
              <span>{oracle.EXPECTED_MAPLE_TELEMETRY['spotlight_slots'][1]}</span>
              <span>{oracle.EXPECTED_MAPLE_TELEMETRY['spotlight_slots'][2]}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 04 OPS -->
    <section id="ops" class="snap-section min-h-[100dvh] w-full relative flex items-center justify-center p-6 bg-[#090B0E]">
      <div class="max-w-4xl w-full">
        <span class="text-xs font-mono text-yellow-400">04 // OPS & ARCHIVE</span>
        <!-- Ticket & DAG toggles -->
        <div class="mt-4 flex gap-2">
          <button id="btn-ops-ticket" onclick="switchOps('ticket')" class="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#FACC15] text-[#09090B] font-bold">票務獵手</button>
          <button id="btn-ops-dag" onclick="switchOps('dag')" class="px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-400">封裝管線</button>
        </div>
        <div id="ops-ticket" class="mt-4 text-xs font-mono text-zinc-400">
          <p>Tixplus: {oracle.EXPECTED_OPS_DATA['tix_target']} ({oracle.EXPECTED_OPS_DATA['tix_relay']})</p>
          <p>推播管道: {', '.join(oracle.EXPECTED_OPS_DATA['tix_channels'])}</p>
          <div id="tic-bar" style="width: 33%;"></div>
          <div id="tic-desc">01. 場次與連號鎖定</div>
        </div>
        <div id="ops-dag" class="mt-4 grid grid-cols-3 gap-3">
          <div class="flex flex-col gap-2">
            <button id="dag-btn-mkv" onclick="routeDag('mkv')" class="w-full p-2.5 bg-[#0B0F17] border border-cyan-400/50 text-left text-xs font-mono text-cyan-300">[A] 影片封裝 {oracle.EXPECTED_OPS_DATA['drivestore_mkv']}</button>
            <button id="dag-btn-cbz" onclick="routeDag('cbz')" class="w-full p-2.5 bg-[#0B0F17] border border-white/15 text-left text-xs font-mono text-zinc-300">[B] 漫畫圖集 {oracle.EXPECTED_OPS_DATA['drivestore_cbz']}</button>
            <button id="dag-btn-sha" onclick="routeDag('sha')" class="w-full p-2.5 bg-[#0B0F17] border border-white/15 text-left text-xs font-mono text-zinc-300">[C] 7-Zip {oracle.EXPECTED_OPS_DATA['drivestore_7zip']} ({oracle.EXPECTED_OPS_DATA['drivestore_header_enc']}) {oracle.EXPECTED_OPS_DATA['drivestore_split']}</button>
          </div>
          <div class="flex flex-col gap-2">
            <div id="node-mux" class="p-2 bg-[#0B0F17] border border-cyan-400 text-xs font-mono tabular-nums flex justify-between"><span>NODE_01 MUX</span><span class="text-cyan-400">ACTIVE</span></div>
            <div id="node-cbz" class="p-2 bg-[#0B0F17] border border-white/10 opacity-20 text-xs font-mono tabular-nums flex justify-between"><span>NODE_02 CBZ</span><span>IDLE</span></div>
            <div id="node-sha" class="p-2 bg-[#0B0F17] border border-cyan-400 text-xs font-mono tabular-nums flex justify-between"><span>NODE_03 SHA256</span><span class="text-cyan-400">ACTIVE</span></div>
            <div id="node-rclone" class="p-2 bg-[#0B0F17] border border-cyan-400 text-xs font-mono tabular-nums flex justify-between"><span>NODE_04 RCLONE {oracle.EXPECTED_OPS_DATA['drivestore_rclone_drive']}</span><span class="text-cyan-400">ACTIVE</span></div>
          </div>
          <div id="dag-terminal" class="p-3 bg-black rounded-xl font-mono text-[11px] text-zinc-300">
            <div class="text-cyan-400">$ archiver --mode=mkv-stream</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 05 AI -->
    <section id="ai" class="snap-section min-h-[100dvh] w-full relative flex items-center justify-center p-6 bg-[#09090B]">
      <div class="max-w-4xl w-full">
        <span class="text-xs font-mono text-sky-400">05 // LOCAL AI</span>
        <h2 class="text-xl md:text-2xl font-bold text-white mt-1">極速雙軌同傳工作站</h2>
        <div class="mt-3 flex gap-4 text-xs font-mono text-zinc-400">
          <span>{oracle.EXPECTED_AI_DATA['cpu']}</span>
          <span>{oracle.EXPECTED_AI_DATA['ram']}</span>
          <span>{oracle.EXPECTED_AI_DATA['gpu']}</span>
          <span>{oracle.EXPECTED_AI_DATA['capture']}</span>
        </div>
        <div class="mt-2 text-xs font-mono text-zinc-300">
          <span>{oracle.EXPECTED_AI_DATA['asr_engines'][0]} ({oracle.EXPECTED_AI_DATA['asr_latency']})</span>
          <span>{oracle.EXPECTED_AI_DATA['llm_target']} + {oracle.EXPECTED_AI_DATA['llm_draft']} ({oracle.EXPECTED_AI_DATA['llm_decoding']}, {oracle.EXPECTED_AI_DATA['llm_throughput']} t/s)</span>
          <span>{oracle.EXPECTED_AI_DATA['opencc']}</span>
        </div>
        <!-- Waveform Spectrum with mouseleave reset -->
        <div id="ai-waveform" onmouseleave="highlightAiWave(-1, -1)" class="mt-4 h-9 flex items-center gap-1"></div>
        <div class="mt-3 divide-y divide-white/[0.06] text-xs">
          <div onmouseenter="highlightAiWave(0, 10)" onmouseleave="highlightAiWave(-1, -1)" class="py-2.5 px-3">
            <span class="font-mono text-sky-400">{oracle.EXPECTED_AI_DATA['sentence_pair_1']['timestamp']}</span>
            <span class="text-zinc-300">{oracle.EXPECTED_AI_DATA['sentence_pair_1']['source']}</span>
            <span class="text-zinc-100 font-medium">{oracle.EXPECTED_AI_DATA['sentence_pair_1']['target']}</span>
          </div>
          <div onmouseenter="highlightAiWave(11, 23)" onmouseleave="highlightAiWave(-1, -1)" class="py-2.5 px-3">
            <span class="font-mono text-sky-400">{oracle.EXPECTED_AI_DATA['sentence_pair_2']['timestamp']}</span>
            <span class="text-zinc-300">{oracle.EXPECTED_AI_DATA['sentence_pair_2']['source']}</span>
            <span class="text-zinc-100 font-medium">{oracle.EXPECTED_AI_DATA['sentence_pair_2']['target']}</span>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- DIRECTORY DRAWER (contains all 6 sections including #hero) -->
  <div id="directory-drawer" class="fixed inset-0 z-50 hidden bg-black/60 flex items-center justify-center">
    <div class="p-6 bg-zinc-900 rounded-3xl max-w-lg w-full">
      <div class="flex justify-between items-center">
        <span class="text-xs font-mono text-zinc-300">PAVILION DIRECTORY</span>
        <button onclick="toggleDrawer(false)">Close</button>
      </div>
      <div class="mt-4 grid grid-cols-1 gap-2 text-xs font-mono">
        <a href="#hero" onclick="toggleDrawer(false)">00. 門戶核心 #hero</a>
        <a href="#exp" onclick="toggleDrawer(false)">01. 碩論科研 #exp</a>
        <a href="#osk" onclick="toggleDrawer(false)">02. 關西旅誌 #osk</a>
        <a href="#show" onclick="toggleDrawer(false)">03. 虛實典藏 #show</a>
        <a href="#ops" onclick="toggleDrawer(false)">04. 自動腳本 #ops</a>
        <a href="#ai" onclick="toggleDrawer(false)">05. 本地智算 #ai</a>
      </div>
    </div>
  </div>

  <script>
    // Embedded script logic
  </script>
</body>
</html>
"""

def generate_compliant_sw_js() -> str:
    """Generates a compliant Service Worker script."""
    return """const CACHE_NAME = 'hub-portal-cache-v3';
const PORTAL_ASSETS = [
  './index.html',
  './manifest.json',
  './sw.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PORTAL_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key.startsWith('hub-portal-cache-') && key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return Promise.resolve();
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('./index.html'))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
"""

def generate_compliant_push_bat() -> bytes:
    """Generates ASCII-safe run.bat thin entrypoint without unescaped parentheses."""
    content = """@echo off
cd /d "%~dp0"
if "%PORT%"=="" set "PORT=5173"
set "PS_EXE=powershell"
pwsh -v >nul 2>&1 && set "PS_EXE=pwsh"
%PS_EXE% -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\\ctl.ps1" %*
"""
    return content.encode("ascii")
