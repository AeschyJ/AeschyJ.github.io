# 📝 更新日誌 (Changelog)

本專案的所有重要變更均將記錄於此檔案中。  
本更新日誌嚴格遵循 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/) 格式，並採用 [語意化版本 (Semantic Versioning)](https://semver.org/lang/zh-TW/) 規範。

## [3.2.0] - 2026-11-05

### Added
- **OSK 館資產同步**：納入 `emaki.html`（百景繪卷）與 `itinerary.html`（巡行手帖），掛載 `portal-pill.js` 懸浮回航膠囊。

### Changed
- **02 展館跳轉重構**：跳轉連結重構為 `進入 百景繪卷 | 和風繪卷`，字體深度呈現主次；副標題統一為 `水墨百景 · 諸相全錄`；首頁封面切換為清水寺全景寫真。

### Fixed
- **繪卷非相片媒體過濾修復**：`emaki.html` 過濾非靜態圖片 MP4 資源避免破圖，修正公開署名為 `AESCHY`。

### Security
- **全庫靜態安全掃描**：全庫靜態安全掃描通過（零絕對路徑、零私有 IGN 洩漏）。

### Cache
- **Service Worker 快取識別碼升級**：升級至 `hub-portal-cache-v3.2` 與 `tabisync-v5.0.0`。

---

## [3.1.0] - 2026-11-04

### Changed
- **章節標題小字純英文化**：移除 01 至 05 展館標題小字之中文後綴（保留 `01 // ACADEMIC RESEARCH`、`02 // KANSAI CHRONICLE`、`03 // CURATED SHOWCASE`、`04 // AUTOMATION & SCRIPTS`、`05 // LOCAL AI & ACOUSTIC COMPUTING`）。
- **碩論科研標題純英文化**：主標題更新為英文 `Performance Evaluation and Explainibility Study of Knowledge Graph Attention Network for Recipe Recommendation`，並精簡機構資訊為 `NTU ESOE`。
- **XAI 面板文案精煉**：移除推理路徑聚光燈中文說明，僅保留純粹英文標示 `XAI ATTENTION PATH`。
- **Service Worker 快取版本推進**：升級為 `hub-portal-cache-v3.1`，確保客戶端即時載入最新佈局。

### Fixed
- **展館 03 與 04 頁中切換垂直跳動修復**：將 `#show`（虛實典藏）與 `#ops`（自動腳本）展館外層容器由垂直置中 (`justify-center`) 改為頂部錨定佈局 (`justify-start pt-16 md:pt-20 lg:pt-24`)，徹底解決切換不同高低內容面板時標題列與切換列上下位移跳動問題。

---

## [3.0.0] - 2026-11-04

### Added
- **00-05 六大主題展館拓撲架構**：整合 00 // HERO（門戶核心）、01 // EXP（碩論科研）、02 // OSK（關西旅誌）、03 // SHOW（虛實典藏）、04 // OPS（自動腳本）、05 // AI（本地智算）。
- **滿版滾動吸附佈局**：採用 `100dvh` 視窗高度與 CSS 原生 `scroll-snap-type: y mandatory` (`#snap-container`, `.snap-section`)，搭配右側全景指示條 (`.snap-dot`)。
- **流體毛玻璃 HUD 導航列**：頂部導航藥丸 (`.nav-pill`) 搭配 `IntersectionObserver` 進行即時滾動定位與平滑定位跳轉。
- **虛實典藏雙軌展示面板**：支援實體藝廊（沙龍香氛與監聽耳機）與數位圖鑑（匿名模擬裝備 1.25 億戰力、302★）行內切換。
- **自動化管線動態 DAG 狀態機**：提供 MKV / CBZ / SHA-256 三種模式切換，動態驅動節點活躍狀態。
- **本地預覽連接埠彈性配置**：啟動腳本支援預設 5173 連接埠與 `%PORT%` 動態環境變數。

### Changed
- **入口檔案遷移**：將新版入口結構遷移至 `index.html`，既有舊版安全封存為 `index_legacy.html`。
- **Service Worker 快取命名空間升級**：升級快取版本識別為 `hub-portal-cache-v3`，具備前綴隔離與舊版快取清理機制。
- **碩論科研數據更新**：回填臺大生機所食譜推薦研究指標（CSR 記憶體 56.74 MB、92.8% 精省、190.82 ms 建圖、Fidelity+ 94.2%）與開源儲存庫連結。
- **關西行旅展示更新**：整合 11 日行程、305 幀高解析度紀行寫真與專題手帳導航。
- **自動腳本管線更新**：整合 Tixplus 票務即時推送與 DriveStore HEVC/CBZ/7-Zip/Rclone 封裝加密串流。
- **本地智算展示更新**：呈現 WASAPI Loopback 採集、SenseVoice 50ms 辨識與 Gemma 4 MTP 80~110 tokens/s 推測解碼展示。

### Fixed
- **導航狀態同步延遲**：修正頂部 HUD navbar 藥丸高光在快速滾動時的狀態更新延遲。
- **桌機斷點樣式權重衝突**：桌機視窗（`>=768px`）下以行內 `style.display` 支配實體藝廊與數位圖鑑顯示狀態，修復 Tailwind `md:grid` 與 `.hidden` 之樣式層疊衝突。
- **壓縮腳本狀態機按鈕高光殘留**：重構 `routeDag` 狀態機，切換模式時清除 MKV 按鈕邊框與高光樣式，確保狀態精準轉移。

---

## [2.1.0] - 2026-09-05

### 💎 品牌躍升與視覺哲思重塑 (Brand Evolution & Philosophy)
- **品牌更名為「AESCHY」**：
  - 捨棄原先略顯技術導向之命名，升級為極簡大氣的精品黑標風格 **`AESCHY`**，副標題設定為簡潔有力的 `Works & Archive`。
  - 全面注入 `white-space: nowrap` 與 `flex-shrink: 0` 佈局防線，根除桌面端詞間空格折行溢出頂欄問題。
- **Hero 內文詩性精煉**：
  - 核心標題設定為 `From Research to Wanderlust`。
  - 撰寫純粹文人副標：*「研析成文，行旅作卷；當代造物，日用常行。」*。
- **頁尾停泊列與雙軌訪客計數器**：
  - 頁尾文案精緻化：`AESCHY • From Research to Wanderlust • Since 2026 • 2,418 Visitors`。
  - 實作「本地持久化記憶（以 2,418 為基準累加）+ Hits.sh 即時動態訊標（綠色呼吸燈）」雙軌計數器，離線/連線皆有最佳視覺反饋。

### 📱 全站與子頁面雙向原生 RWD 適配 (Native Dual-Orientation Everywhere)
- **主展館頂部導航欄 (Hub Header)**：
  - 手機橫屏（`max-height: 520px`）自適應切換為純 SVG 向量圖示膠囊模式，隱藏文字標籤，寬度壓縮至 480px 以內，根除爆版折行。
  - 補齊音效開關按鈕缺失之閉合標籤。
- **主展館 Slide 5 頁尾排版 (Footer Dock)**：
  - 解除 Flex 預設 row 排版將 `#slot-cyb` 與頁尾左右對分的 Bug，強制改為垂直 column 排版，頁尾 100% 貼附底端。
- **OSAKA 繪卷 (`magazine.html`)**：
  - 頂端列直屏切換為極簡圖示膠囊（📜/📖、🎐/💮），根除文字直立折行。
  - 橫屏採用 `100dvh` 精準控制與題頭欄內部觸控捲動（`-webkit-overflow-scrolling: touch`），杜絕上下裁切。
  - 軸棒與導航列安全邊界（`safe-area-inset`）雙向注入，修復御朱印蓋章按鈕與里程碑圓點 44px 觸控熱區。
- **TabiSync 助手 (`osaka/index.html`)**：
  - 手機橫屏解鎖「雙欄駕駛艙儀表板 (Cockpit Split View)」，行程清單與地圖/詳情並列呈現。
  - 新增天數與景點 ID 之 `localStorage` 本地記憶，旋轉或重新整理保持當前閱讀進度。
- **賽博日常 (`cyber-routine`)**：
  - PWA Manifest 解鎖 `orientation: any` 自由旋轉。
  - 修復全域 `.cyber-btn` 污染，重構彈窗垂直置中（`margin: auto 0`）杜絕負座標截斷。
  - 手機橫屏專屬 3 欄緊湊統計，補齊通關慶祝金色粒子遮罩。
  - 微縮回航膠囊在滾動中主動保持 `.is-idle` 微縮狀態，避免遮擋卡片操作按鈕。
- **當代收藏品藝廊 (`showcase`)**：
  - Viewport 宣告 `viewport-fit=cover` 支援全螢幕延展。
  - 小卡片模式重構為 `minmax(150px, 1fr)`，直屏手機恢復雙欄小卡。
  - 橫屏矮螢幕壓縮首屏 Hero 邊距，確保首屏直接可見展品。
  - 展品詳情 Modal 橫屏雙欄獨立捲動，關閉按鈕增大至 44px 且支援 sticky/fixed，Z-Index 提升至頂層。

### 🎫 搶票機器人模擬雷達與 Ping 值重疊修復 (Ticket Pavilion HUD)
- 將原先以絕對定位（`position: absolute; top: 14px; right: 14px;`）浮動的旋轉雷達盤，收納進 `.terminal-header` 的 `.terminal-hud-cluster` 彈性排版容器中。
- 與綠色 Ping 值標籤並列（帶有 12px 留白與呼吸綠點），在排版物理結構上徹底杜絕任何文字與圖形重疊的可能。
- 終端機底線 (`border-bottom`) 統一延展於雷達與 Ping 標籤下方，日誌區域獲得 100% 完整寬度，文字不再被遮擋。
- 心跳探針每 4 秒動態更新 Ping 延遲，模擬搶票觸發瞬間降至 18ms，強化狀態即時反饋。
- 針對窄螢幕（<=480px）自適應縮減為 36px 並簡化為 `● 38ms`；矮螢幕縮減為 32px。

### 🧹 賽博日常展館邊緣殘留 HUD 框線清除 (Cyber Pavilion Cleanup)
- 徹底清除殘留在展館四周的 4 個絕對定位 `.hud-corner` 框線元素及其 CSS 規則，恢復純淨現代視野。

---

## [2.0.0] - 2026-09-05

### 🚀 重大重構 (Major Architectural Overhaul)
- **整面無外框畫布 (Full-Bleed Canvas Deck)**：
  - 徹底告別舊式容器卡片瀑布流（`gap: 120px` 垂直長滾動），全站改由 `#viewport-deck` 掌控 `100vw × 100dvh` 整面鋪展。
  - 導入 CSS 原生 `scroll-snap-type: y mandatory` 與 `scroll-snap-stop: always`，實現「滑動一次即精準吸附並切換一整座展館」的沉浸式動線。
- **全域氛圍即時連動機制 (Dynamic Atmosphere Linkage)**：
  - 透過 `IntersectionObserver` 即時監聽當前展示展館，動態更新 `body[data-active-theme]`。
  - 頂部導航欄（`.hub-header`）、背景環境光（`.hub-ambient-glow`）與右側指示條隨展館即時切換主題風格（越前和紙生成色、黑曜微晶琉璃、深空量子紫、航管雷達橘、賽博螢光綠）。
- **懸浮全景指示條 (Indicator Dock)**：
  - 新增螢幕右側微型全景指示條，支援 Tooltip 懸浮標籤提示、膠囊伸縮呼吸燈動畫、點擊直接跳轉與鍵盤快速鍵換館（`PageDown`/`PageUp`/方向鍵）。
  - 同步 `history.replaceState` 實現平滑零跳動之 URL Hash 錨點記憶。

### ✨ 新增特性 (Added)
- **啟動預覽批次檔 (`啟動預覽.bat`)**：
  - 解決現代瀏覽器 CORS 安全性政策對 `file:///` 協議阻擋 ES 模組（`js/app.js`）載入的問題。
  - 內建智慧環境探測（Python ➔ Node.js ➔ uv），一鍵自動於背景啟動本地 HTTP 伺服器並開啟瀏覽器。
- **CORS 友善提示橫幅 (`index.html`)**：
  - 針對使用者直接以 `file:///` 開啟的情境，自動浮現琥珀金高質感提示橫幅，引導使用 `啟動預覽.bat`。
- **日本館「和風行旅三欄橫向對開」手帳佈局**：
  - 採用日系雜誌排版風格（左欄導覽操作、中欄相片拼貼主角、右欄御朱印）。
  - **手作和紙相片拼貼框**：居中展示 1 張主拍立得寫真（-1.5° 微傾）與 2 張錯落疊合拍立得（+2° / -2°），具備手撕白邊、櫻粉半透明和紙膠帶與拍攝資訊。
  - **關西三景切換膠囊**：提供青丹吉、草屋根、法式千層三景切換，點選時相片拼貼以平滑淡入淡出（Cross-fade）切換。
- **Showcase HTML5 Canvas 格線隨機流金脈衝引擎**：
  - 覆蓋於背景 80px 藍圖格線上的透明 Canvas，隨機於經緯格線激發高速流金脈衝（650~950px/s），帶有高斯平滑漸層淡出與 GPU 離開視窗節能暫停機制。

### 🔄 變更 (Changed)
- **Experiment 實驗展館內容導正**：
  - 標題直接命名為簡潔有力的「Experiment」，剔除冗長論文作者、指導教授與系所學位等個人資訊。
  - 依據原始論文限制，全面將不實的「SOTA Baseline」修正為「Strong Baseline（強基準模型）」，成果晶片標記為「+31.6% 顯著增益」。
  - 導正 94.2% 與 Fidelity（忠實度）的因果本質：澄清 94.2% 為正向必要性路徑比例，實證論述注意力權重僅為「部分忠實度（Partial Fidelity）」，非泛化因果決策。
- **Showcase 當代藝廊色系重塑**：
  - 徹底剔除偏離原設計的冰藍色調（`#60a5fa`），全面回歸原創專案 MUSEUM 之「黑曜微晶琉璃（`#0B0C10`）+ 香檳流金漸層（`#C5A059` / `#DFBA73`）」。
- **日本館美學體系翻新**：
  - 拋棄暗黑科技色調，改以鳥之子紙淡黃底溫（`#FAF8F2` / `#F4EEDF`）、越前和紙纖維噪點紋理、松煙墨黑與薄櫻粉（`#F4A7B9`）。
- **後三館 (SHOW / TIC / CYB) 徹底去容器化**：
  - 剝除外層卡片外殼與邊框陰影，滿版鋪展至 100vw × 100dvh 全螢幕畫布。

### 🐛 修復 (Fixed)
- **日本館上下留白過多問題**：
  - 修復先前過度壓縮 Padding（僅 16px）導致內容物如窄條懸浮於螢幕中央、上下產生巨大空洞的缺陷。
  - 外層 Padding 統一對齊全站標準（`clamp(70px, 8vh, 100px) clamp(24px, 5vw, 80px)`），主拍立得相框提升至 235px、副相框 106px、御朱印紙本 290px、引言字級提升至 0.92rem，在 100dvh 零滾動下視覺飽滿大器。
- **日本館相片拼貼高度溢出問題**：
  - 將垂直堆疊改為橫向三欄對開手帳，消除標準筆電（768px 高度）產生的內部垂直滾動條。
- **Showcase 頂部突兀水平光線修復**：
  - 徹底移除硬編碼在卡片頂部的靜態光條（`.showcase-stream-line`），消除與 Canvas 網格流光的重疊突兀感。
- **流光貼圖直角硬邊修復**：
  - 移除舊版由 CSS 色塊平移產生的貼圖感硬邊（`.showcase-shimmer-sweep`），全面改由 Canvas 高斯羽化端點繪製。

### ❌ 移除 (Removed)
- 移除所有展館的外圍卡片邊框（`.card-container`、獨立圓角與外部大陰影）。
- 移除各展館舊版長滾動 `gap: 120px` 間隙。
- 移除 Experiment 中虛構的「NeuroTopo」詞彙與所有非必要學術作者簡歷。
- 移除 Showcase 中舊版固定水平光線 DOM 與相關 keyframes。

---

## [1.0.0] - 2026-08-20

### ✨ 初始版本 (Initial Release)
- 建立 AeschyJ Hub 個人多專案統一入口門戶。
- 支援 Experiment、Osaka Trip、Showcase、Ticket Bot、Cyber-Routine 五大展館展示。
- 建立 GitHub Pages 智慧發布管線（`deploy.py` / `deploy.bat`）與同源快取隔離規範。
- 實作 Web Audio 微頻合成音效與 PWA 離線快取功能。
