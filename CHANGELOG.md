# 📝 更新日誌 (Changelog)

本專案的所有重要變更均將記錄於此檔案中。  
本更新日誌嚴格遵循 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/) 格式，並採用 [語意化版本 (Semantic Versioning)](https://semver.org/lang/zh-TW/) 規範。

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
- 心跳探針每 4 秒動態更新 Ping 延遲，模擬搶票觸發瞬間降至 18ms，極致強化科技感。
- 針對窄螢幕（<=480px）自適應縮減為 36px 並簡化為 `● 38ms`；矮螢幕縮減為 32px。

### 🧹 賽博日常展館邊緣殘留 HUD 框線清除 (Cyber Pavilion Cleanup)
- 徹底清除殘留在展館四周的 4 個絕對定位 `.hud-corner` 框線元素及其 CSS 規則，恢復純淨現代視野。

---

## [2.0.0] - 2026-09-05

### 🚀 重大重構 (Major Architectural Overhaul)
- **整面無外框畫布 (Full-Bleed Canvas Deck)**：
  - 徹底告別舊式容器卡片瀑布流（`gap: 120px` 垂直長滾動），全站改由 `#viewport-deck` 掌控 `100vw × 100dvh` 整面無縫鋪展。
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
