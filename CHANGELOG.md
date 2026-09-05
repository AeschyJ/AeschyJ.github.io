# 📝 更新日誌 (Changelog)

本專案的所有重要變更均將記錄於此檔案中。  
本更新日誌嚴格遵循 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/) 格式，並採用 [語意化版本 (Semantic Versioning)](https://semver.org/lang/zh-TW/) 規範。

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
