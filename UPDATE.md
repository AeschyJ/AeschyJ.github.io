# 🏛️ AeschyJ Hub — 版本重大更新文檔 (Changelog & Architecture Update)

> **當前版本**：v2.0.0 (Full-Bleed Canvas & Atmosphere Linkage Release)  
> **更新日期**：2026 年 9 月  
> **更新主旨**：整面無外框畫布全面重構、全域氛圍即時連動、五大展館真實美學與研究文獻對齊、互動光學引擎升級。

---

## 📑 目錄 (Table of Contents)

1. [一、 版本重構背景與目標](#一-版本重構背景與目標)
2. [二、 核心架構突破 (Architecture Overhaul)](#二-核心架構突破-architecture-overhaul)
   - 2.1 100vw × 100dvh 整面無外框畫布 (Full-Bleed Canvas Deck)
   - 2.2 全域環境光與組件即時連動 (Dynamic Atmosphere Linkage)
   - 2.3 懸浮全景指示條與平滑路由同步 (Indicator Dock & Routing)
3. [三、 各展館深度細節翻新 (Pavilion Deep Refinements)](#三-各展館深度細節翻新-pavilion-deep-refinements)
   - 3.1 🔬 Experiment 實驗展館：去學術包袱、導正忠實度與移除 SOTA
   - 3.2 🏯 Osaka 日本館：和紙美學、三欄手帳拼貼、垂直比例舒展
   - 3.3 🏛️ Showcase 當代藝廊：香檳流金回歸、Canvas 格線隨機流光
   - 3.4 🎫 Ticket Bot & 💻 Cyber-Routine：全面無框化鋪展
4. [四、 本地預覽防呆與工程管線 (Dev & Preview Tooling)](#四-本地預覽防呆與工程管線-dev--preview-tooling)
5. [五、 架構決策記錄 (Architecture Decision Records - ADR)](#五-架構決策記錄-architecture-decision-records---adr)
6. [六、 檔案變更地圖 (File Change Map)](#六-檔案變更地圖-file-change-map)

---

## 一、 版本重構背景與目標

在先前的版本（v1.x）中，展示各展館採用的是傳統網頁常見的「容器卡片瀑布流（Card Waterfall）」排版，各專案被框限在具有固定圓角、邊框與陰影的容器內（外層帶有 `gap: 120px` 的垂直大間隙）。

這種設計存在數個核心痛點：
1. **缺乏沉浸感**：在 16:9 或寬螢幕顯示器上，卡片外框切碎了畫面，無法給人「身歷其境走入特定專案世界」的專屬體驗。
2. **切換節奏鬆散**：使用者需要連續漫長地滾動頁面，無法做到「滑動一次即換一個完整專案」的精準視圖切換。
3. **全站風格脫節**：頂部導航欄與背景環境光無法隨當前展館的獨特氛圍動態切換（例如切到和風日本館時，導航欄依舊是冰冷暗黑科技感）。
4. **專案真實度落差**：科研展館充斥過多學術作者個資且宣稱偏離真實論文；日本館底色偏黑暗且拼貼排版導致捲軸溢出；Showcase 偏離原獨立專案 MUSEUM 的香檳流金色系而誤用冰藍色。

本次 v2.0 重構將上述問題全面徹底解決，將全站打造成宛如當代數位藝術博覽會的高端沉浸式門戶。

---

## 二、 核心架構突破 (Architecture Overhaul)

### 2.1 100vw × 100dvh 整面無外框畫布 (Full-Bleed Canvas Deck)
* **視窗鎖定與原生效能**：
  移除舊式長滾動機制，將 `html, body` 設為 `overflow: hidden; height: 100%;`，由核心容器 `#viewport-deck` 掌控全站視圖：
  ```css
  #viewport-deck {
    width: 100vw;
    height: 100dvh;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }
  ```
* **每館剛好佔滿一整面**：
  所有展館容器（`.deck-slide`）皆設置為 `width: 100vw; height: 100dvh; scroll-snap-align: start; scroll-snap-stop: always;`。無論使用者是在橫向桌機、筆電，或是手機直向模式，**滑動一次滾輪即精準吸附並切換至下一個展館**，絕不留上下黑邊或多餘外框縫隙。

### 2.2 全域環境光與組件即時連動 (Dynamic Atmosphere Linkage)
透過 `IntersectionObserver`（閾值 0.55）即時捕捉目前處於螢幕正中央的展館代號（`hero`, `exp`, `osk`, `show`, `tic`, `cyb`），並動態掛載至 `document.body.dataset.activeTheme`。

頂部導航欄（`.hub-header`）、背景光暈（`.hub-ambient-glow`）與懸浮指示條自動觸發 CSS 連動過渡：
* **切至日本館 (`osk`)**：
  * 頂部欄瞬間轉化為**透光越前和紙生成色**（`rgba(250, 248, 242, 0.88)`），底框透出淡赭木色，品牌字體切換為優雅的 **Shippori Mincho 日文書法體**，文字化為松煙墨色，操作按鈕綻放薄櫻粉微光。
* **切至 Showcase (`show`)**：
  * 頂部欄變身為**黑曜微晶琉璃**（`rgba(11, 12, 16, 0.88)`），底部勾勒出一道低調的**香檳流金光軌**（`rgba(197, 160, 89, 0.38)`），字體切換為英倫當代 **Playfair Display**。
* **切至 Experiment (`exp`)**：
  * 頂部欄切換為**深空微孔量子紫**（`rgba(168, 85, 247, 0.25)`），搭配高精度座標十字準星與紫色光暈。

### 2.3 懸浮全景指示條與平滑路由同步 (Indicator Dock & Routing)
* **右側極簡全景指示條（`.viewport-indicator-dock`）**：
  以玻璃擬態垂直懸浮於螢幕右側，呈現各展館的微型圓點指示器。
  * 支援滑鼠 Hover Tooltip 標籤提示。
  * 當前啟動展館具備**拉長呼吸光膠囊動畫**。
  * 支援點選直接平滑滾動跳轉至該館。
* **鍵盤極速導航支援**：
  支援鍵盤 `PageDown`、`PageUp`、`ArrowDown`、`ArrowUp`、`Home`、`End` 快速鍵換館，賦予桌面端最極致流暢的展示切換體驗。
* **URL Hash 零跳動同步**：
  展館切換時透過 `history.replaceState` 自動同步網址（如 `#osaka`、`#showcase`），重新整理頁面時自動定位，且完全不污染使用者的上一頁/下一頁歷史紀錄。

---

## 三、 各展館深度細節翻新 (Pavilion Deep Refinements)

### 3.1 🔬 Experiment 實驗展館：去學術包袱、導正忠實度與移除 SOTA
* **展示視覺無容器化**：
  移除原先卡片外殼與陰影，全螢幕鋪展量子幾何座標網格與半透明 KGAT 注意力傳遞公式浮水印（`\pi(h, r, t)`）。
* **剔除冗長學術作者資訊**：
  捨棄原本類似論文期刊的作者、指導教授、系所學位等個人檔案贅述，標題直接精煉命名為 **「Experiment」**，以當代科技產品發布的簡潔姿態呈現。
* **全面移除 SOTA Baseline 不實宣稱**：
  依據原始研究限制（以 Food.com、留一法與 100 負樣本候選集為基準，不作泛化 SOTA 宣稱），將原本浮誇的「SOTA Baseline」嚴謹修正為 **「Strong Baseline（強基準模型）」**，成果數據明確標記為 **「+31.6% 顯著增益」**。
* **導正 94.2% 與 Fidelity（忠實度）的因果本質**：
  * **原錯誤**：將 94.2% 誤寫為模型的忠實度得分。
  * **修正後真實文獻結論**：抽樣 500 位用戶的預測決策中，模型整體決策路徑覆蓋率為 55.6%。在被萃取出的注意力路徑中，**94.2% 的路徑展現出正向必要性（$F^+ > 0$）**。
  * **核心科學洞察**：實證數據證明注意力權重僅為「**部分忠實（Partial Fidelity）**」，直接路徑與協同路徑可信度高，但知識圖譜語意路徑充分性偏低（$F^- = 0.2449$），直接打破了「注意力權重＝完整因果決策」的傳統迷思。

### 3.2 🏯 Osaka 日本館：和紙美學、三欄手帳拼貼、垂直比例舒展
* **越前和紙與鳥之子美學體系**：
  徹底拋棄暗黑霓虹感，改以日式「侘寂（Wabi-Sabi）」為靈魂：
  * 底色採用溫潤的**鳥之子紙淡黃**（`#FAF8F2` / `#F4EEDF`），疊加和紙長纖維噪點微紋理。
  * 標題與圖說採用**松煙墨黑**（`#1A1715` / `#2B2523`）與 **Shippori Mincho 明朝體**。
  * 點綴**薄櫻粉**（`#F4A7B9`）與漂浮櫻花花瓣粒子。
* **和風行旅三欄橫向對開（Magazine 3-Column Spread）**：
  為徹底消除先前垂直堆疊造成的螢幕溢出與滾動條，重構為三欄橫向開展：
  1. **左欄（導覽與操作）**：日文書法柱「夏之栞」、小標題、精鍊引言、**關西三景切換膠囊標籤**（`01 近鐵特急・青丹吉`、`02 近江八幡・草屋根`、`03 心齋橋・法式千層`），並將全館底部啟動按鈕收攏於此。
  2. **中欄（視覺焦點 - 手作和紙相片拼貼手帳框）**：全館主角！包含 1 張主拍立得寫真（-1.5° 微傾）與 2 張錯落疊合拍立得（+2° / -2° 錯落疊放），搭配白色手撕邊、櫻粉半透明和紙膠帶、拍攝日期與手寫圖說。點選三景膠囊時以 140ms 平滑 Cross-fade 淡入淡出切換。
  3. **右欄（御朱印落款體驗）**：透光和紙御朱印紙本（`osk-goshuin-paper`）與「⛩️ 奉拜・落款刻印」互動按鈕。
* **上下留白比例對齊（消除空洞感）**：
  修正先前過度緊縮的外層 Padding，改回與其他館完全一致的 `padding: clamp(70px, 8vh, 100px) clamp(24px, 5vw, 80px);`；將主相框高度舒展至 `235px`、副相框 `106px`、御朱印紙本 `290px`，內容飽滿均勻居中於 100dvh，完全無垂直滾動條。

### 3.3 🏛️ Showcase 當代藝廊：香檳流金回歸、Canvas 格線隨機流光
* **回歸 MUSEUM 原設計之香檳流金色調**：
  全面剔除偏離原創的冰藍冷色，回歸黑曜琉璃晶底（`#0B0C10`）與香檳流金漸層（`#C5A059` / `#DFBA73`）。
* **HTML5 Canvas 隨機格線光脈衝引擎 (`#showcase-grid-canvas`)**：
  * **消除貼圖直角硬邊**：徹底拔除舊版具有生硬截斷感、緩慢且呆板的 `.showcase-shimmer-sweep` 漸層色塊。
  * **80px 藍圖格線軌道對齊**：在背景雙層藍圖網格上覆蓋一層透明 Canvas，依據螢幕寬高即時計算所有 $y = i \times 80$ 與 $x = j \times 80$ 的精確座標。
  * **隨機激發機制**：每隔 400ms~900ms 隨機在水平或垂直格線上激發一道流金光脈衝，速度高達 650~950px/s，俐落穿越全螢幕。
  * **平滑高斯漸層收束**：光脈衝頭尾兩端平滑淡出至 0% 透明度，線端採 `round` 圓弧收邊，絕無任何硬邊貼圖感。
  * **生命週期節能**：在離開該展館視窗時自動暫停 `requestAnimationFrame` 與清空畫布，達到 0 額外 GPU/CPU 耗電。
* **移除頂部突兀固定流金條**：
  自 JS 與 CSS 中徹底拔除頂部固定位置的硬編碼水平光線（`.showcase-stream-line`），視覺畫面極致俐落通透。

### 3.4 🎫 Ticket Bot & 💻 Cyber-Routine：全面無框化鋪展
* **去容器化整面展開**：
  移除 `.ticket-console-shell` 與 `.cyber-hud-card` 的外框邊界限制，直接將 CRT 掃描線、琥珀橘航管雷達介面、賽博矩陣終端鋪展至 100vw × 100dvh 全螢幕畫布，保留雙方波 Web Audio 音效與打字機微互動。

---

## 四、 本地預覽防呆與工程管線 (Dev & Preview Tooling)

### 瀏覽器 CORS 安全限制與解決方案
現代瀏覽器（Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari）出於本機安全性考量，在直接以 `file:///` 協議雙擊開啟 HTML 檔案時，會強制將 Origin 視為 `null`，進而觸發以下阻擋：
```text
Access to script at 'file:///.../js/app.js' from origin 'null' has been blocked by CORS policy: 
Cross origin requests are only supported for protocol schemes: http, https...
```

為提供最極致順暢的本機開發與預覽體驗，本專案實施兩道全方位防護：
1. **Windows 一鍵啟動批次檔 (`啟動預覽.bat`)**：
   * 遵循 Windows 批次腳本防錯最高標準（UTF-8 編碼、`chcp 65001`、無中文亂碼路徑容錯）。
   * **自動環境探測（Failover Fallback）**：依序偵測系統中是否安裝 `python` ➔ `py` ➔ `node` (http-server/serve) ➔ `uv`，自動選用最佳工具在後台啟動 `http://localhost:8000`。
   * **自動開啟瀏覽器**：伺服器建立後自動開啟預設瀏覽器跳轉至首頁，完全免除 CORS 阻擋。
2. **友善防呆指引橫幅 (`index.html`)**：
   * 若使用者依然直接透過 `file:///` 雙擊開啟 `index.html`，頁面頂部會自動偵測 `window.location.protocol === 'file:'`，並以高質感的琥珀金浮動橫幅溫馨提示使用者點擊 `啟動預覽.bat`。

---

## 五、 架構決策記錄 (Architecture Decision Records - ADR)

### ADR-01: 為什麼從卡片瀑布流轉向 100vw × 100dvh 整面無外框畫布？
* **狀態**：已採納 (Accepted)
* **背景**：原卡片瀑布流具有邊框與外圍間距，在桌機上呈現割裂感，無法體現各展館的強大世界觀與全景氛圍。
* **決策**：採用 CSS 原生 `scroll-snap-type: y mandatory` 與 100vw × 100dvh 整面畫布，結合動態主題連動。
* **折衷考量 (Trade-offs)**：各展館內部高度必須嚴格受控於 100dvh 內以避免在非必要時產生內部次級滾動條；透過三欄對開佈局與靈活的 `clamp()` 成功在筆電 768px 高度與 4K 螢幕上皆達成零滾動滿版展示。

### ADR-02: 為什麼捨棄 CSS 動畫色塊而改用 HTML5 Canvas 渲染格線流光？
* **狀態**：已採納 (Accepted)
* **背景**：原先使用 CSS `@keyframes` 移動包含斜向漸層的 `div` 色塊，當被父容器截斷時產生極為難看的直角硬邊，且流光位置無法精確吻合背景的 80px 經緯網格。
* **決策**：引入輕量透明的 HTML5 Canvas，在 JS 動畫循環中以原生 2D Context 精確計算每條格線的像素座標，以線性漸層繪製帶圓弧端點的光脈衝。
* **折衷考量 (Trade-offs)**：需要維護 Canvas 的 Resize 監聽與 DPR 縮放，以及在展館離開視窗時透過 `IntersectionObserver` 暫停 `requestAnimationFrame`；換來的是 0 切邊貼圖感的高質感光學物理效果與優異的 GPU 效能。

### ADR-03: 為什麼將日本館改為三欄橫向對開，並統一 Padding 規格？
* **狀態**：已採納 (Accepted)
* **背景**：日本館加入相片拼貼框後，若採垂直排列會導致高度超過 650px，在標準筆電螢幕上溢出產生滾動條。後續 Subagent 雖將高度壓制，但過度緊縮外層 Padding（至 16px）導致內容集中成窄條，上下出現近 300px 的空洞空白。
* **決策**：採用「左欄導覽操作、中欄拼貼寫真主角、右欄御朱印」的三欄對開手帳佈局，並將外層 Padding 恢復為全站標準的 `clamp(70px, 8vh, 100px) clamp(24px, 5vw, 80px)`。
* **折衷考量 (Trade-offs)**：手機直向螢幕（寬度 < 960px）無法容納三欄，因此加入 RWD 媒體查詢在小螢幕時優雅降級為單欄流式排版。

### ADR-04: 為什麼在展示科研專案時堅持「誠實揭露論文限制，不宣稱 SOTA」？
* **狀態**：已採納 (Accepted)
* **背景**：原展示文案將基準模型冠上 SOTA，並將部分路徑的正向必要性（94.2%）誇大為模型的完整解釋忠實度。
* **決策**：嚴格查核原始論文元資料，改寫為「Strong Baseline（+31.6% 顯著增益）」，並如實闡述注意力權重僅展現部分因果忠實度的重要學術洞察。
* **效益**：展現高度嚴謹、專業且求真的科研素養，杜絕誇大不實，使作品集的技術說服力倍增。

---

## 六、 檔案變更地圖 (File Change Map)

```text
Github Page/
├── index.html                           # [MODIFIED] 升級為無框 Deck 結構、全景指示條、CORS 友善引導
├── 啟動預覽.bat                         # [NEW]      全自動本機 HTTP 伺服器啟動腳本 (UTF-8 / Failover)
├── UPDATE.md                            # [NEW]      v2.0 完整更新與架構規範說明手冊 (本檔案)
├── README.md                            # [MODIFIED] 同步最新展館規格、配色與一鍵預覽指南
├── css/
│   ├── components.css                   # [MODIFIED] 滿版吸附無框 Deck、全域氛圍即時連動樣式、懸浮指示條
│   └── pavilions/
│       ├── osaka.css                    # [MODIFIED] 和紙美學、三欄對開手帳、相片拼貼框、上下 Padding 對齊
│       ├── showcase.css                 # [MODIFIED] 黑曜流金配色、剔除突兀水平光條、透明 Canvas 樣式
│       ├── experiment.css               # [MODIFIED] 全螢幕去容器化、量子幾何格線、LaTeX 公式浮水印
│       ├── ticket.css                   # [MODIFIED] 全面去容器化、CRT 掃描線與琥珀雷達 HUD 滿版鋪展
│       └── cyber.css                    # [MODIFIED] 全面去容器化、終端霓虹綠與矩陣粒子滿版鋪展
└── js/
    ├── app.js                           # [MODIFIED] 展館 IntersectionObserver 監聽、全域連動與鍵盤導航
    ├── data/
    │   └── pavilionsData.js             # [MODIFIED] 導正 Experiment 數據、移除 SOTA、日本館三景寫真元數據
    └── pavilions/
        ├── osakaPavilion.js             # [MODIFIED] 三欄橫向手帳佈局、相片拼貼淡入淡出、御朱印刻印
        ├── showcasePavilion.js          # [MODIFIED] HTML5 Canvas 80px 格線隨機流金脈衝引擎、移除突兀光線
        └── experimentPavilion.js        # [MODIFIED] 俐落 Experiment 科技展示、部分忠實度與推薦比較條
```

---

*© 2026 AeschyJ. All rights reserved.*
