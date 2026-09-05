# 🏛️ AeschyJ Hub — 中央多專案主題展覽館

[![GitHub Pages Deployment](https://img.shields.io/badge/Deploy-GitHub%20Pages-10b981?logo=github&logoColor=white)](https://aeschyj.github.io/)
[![Version](https://img.shields.io/badge/Version-v2.0.0-f59e0b)](CHANGELOG.md)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline-00ff9d?logo=pwa&logoColor=black)](https://aeschyj.github.io/manifest.json)
[![License](https://img.shields.io/badge/License-MIT-38bdf8)](LICENSE)
[![Built with Modern Web](https://img.shields.io/badge/Stack-ES%20Modules%20%7C%20Web%20Audio%20%7C%20HTML5%20Canvas-a855f7)](https://aeschyj.github.io/)

歡迎來到 **AeschyJ Hub**！本儲存庫為個人作品集與多 Web 應用的公開發布託管站點（`https://aeschyj.github.io`）。

全站採用 **100vw × 100dvh 整面無外框畫布（Full-Bleed Canvas Deck）** 與 **全域氛圍即時連動機制（Dynamic Atmosphere Linkage）**，支援原生 `scroll-snap` 滑一次精準切換一個專案。在單一頂級網域下集中託管多個獨立應用，並為非前端網頁專案（後端自動化機器人、學術 AI 科研）提供高擬真的沉浸式沙盒展示。

---

## 🗺️ 全站拓撲與展館導航 (Pavilion Directory)

線上訪問：[https://aeschyj.github.io/](https://aeschyj.github.io/)

| 展館代號 | 專案名稱 | 主題視覺與色溫 | 核心特色與微互動 | 跳轉路徑 / 展示方式 |
| :---: | :--- | :--- | :--- | :--- |
| **Hero** | **門戶星雲大廳** | 深太空黑 `#08090d`<br/>天青藍 `#38bdf8` | 全站 PWA、最近造訪快速通道、釘選抽屜、Web Audio 微頻合成音 | 滑動即吸附切換 |
| **`exp`** | **Experiment**<br/>(科研實驗室) | 神經元量子紫 `#a855f7`<br/>冰霜銀白 `#e2e8f0` | 幾何拓撲座標網格、LaTeX 公式浮水印、**部分忠實度剖析（Partial Fidelity）**、**Strong Baseline 對比長條圖** | 彈出研究論文架構白皮書 |
| **`osk`** | **Osaka Trip**<br/>(夏之栞・名阪行旅手帖) | 鳥之子紙淡黃 `#FAF8F2`<br/>薄櫻粉 `#F4A7B9`<br/>松煙墨 `#1A1715` | 越前和紙長纖維噪點、**三欄橫向對開手帳**、**手作和紙拍立得相片拼貼框**、**關西三景切換膠囊**、**御朱印互動蓋章 (音效+落款動畫)** | **雙入口**：<br/>⛩️ [TabiSync 助手](./osaka/)<br/>📜 [夏之栞繪卷](./osaka/magazine.html) |
| **`show`**| **Showcase**<br/>(當代收藏品藝廊) | 黑曜微晶琉璃 `#0B0C10`<br/>**香檳流金 `#DFBA73` / `#C5A059`** | 雙層 80px 藍圖工程網格 (Blueprint Grid)、**HTML5 Canvas 隨機格線流金脈衝引擎**、**3D 視差陀螺儀卡片** | 進入應用 ➔ [`./showcase/`](./showcase/) |
| **`tic`** | **Ticket Bot**<br/>(雷達票務獵手) | 航管琥珀橘 `#f59e0b`<br/>暗夜黑 `#0a0b0e` | CRT 掃描線、LED 狀態燈、**模擬搶票毫秒日誌串流瀑布**、Webhook 模擬推播、全螢幕無框畫布鋪展 | 彈出系統架構白皮書 |
| **`cyb`** | **Cyber-Routine**<br/>(賽博日常儀表板) | 霓虹螢光綠 `#00ff9d`<br/>終端黑 `#0a0e14` | CRT 終端打字機、**連擊充能 (+1)**、Canvas 2D 金色粒子爆破、8-bit 雙方波金幣音效、全螢幕無框畫布鋪展 | 進入應用 ➔ [`./cyber-routine/`](./cyber-routine/) |

---

## ⚡ v2.0 重大升級亮點

1. **整面無外框畫布（Full-Bleed Canvas Deck）**：
   - 告別舊版容器卡片瀑布流，各展館全尺寸鋪展至 100vw × 100dvh。
   - 原生 `scroll-snap-type: y mandatory`：滑動一次精準吸附並切換一整座展館。
2. **全域氛圍即時連動（Dynamic Atmosphere Linkage）**：
   - 頂部導航欄（`.hub-header`）、全站環境光與右側全景指示條（`.viewport-indicator-dock`）隨當前展館即時連動。
   - 切到日本館變透光越前和紙與松煙墨；切到 Showcase 變黑曜微晶琉璃與香檳流金；切到 Experiment 變深空微孔量子紫。
3. **學術科研真實數據導正**：
   - 移除不實 SOTA 宣稱，改以 Strong Baseline（+31.6% 顯著增益）精準呈現。
   - 導正 94.2% 正向必要性路徑與部分忠實度（Partial Fidelity）因果論述，剔除作者個資。
4. **日本館和紙手帳美學與比例對齊**：
   - 採用鳥之子紙淡黃底溫、薄櫻粉與越前和紙長纖維紋理。
   - 採用「左欄導覽操作、中欄相片拼貼主角、右欄御朱印」之三欄橫向對開手帳佈局。
   - 上下 Padding 嚴格對齊全站標準（`clamp(70px, 8vh, 100px) clamp(24px, 5vw, 80px)`），在 100dvh 零滾動下視覺飽滿大器。
5. **Showcase 藍圖格線 Canvas 隨機脈衝**：
   - 徹底移除頂部突兀的固定流金線，改以 HTML5 Canvas 精準對齊 80px 藍圖經緯格線。
   - 以高斯平滑漸層生成隨機流金脈衝，兼顧 0 切邊貼圖感與 GPU 節能暫停機制。

---

## 🚀 本地開發與免安裝一鍵預覽

現代瀏覽器基於本機安全性規範，在直接雙擊 `index.html`（`file:///` 協議）時會嚴格阻擋 ES 模組（`js/app.js`）的載入（CORS 阻擋）。

### 一鍵啟動方式：
在 Windows 環境下，直接雙擊根目錄的 **[`啟動預覽.bat`](啟動預覽.bat)** 即可：
- 內建智慧環境探測（自動尋找可用之 `python` / `node` / `uv`）。
- 全自動在背景啟動輕量 HTTP 伺服器（`http://localhost:8000`）。
- 自動呼叫系統預設瀏覽器開啟頁面，流暢體驗全站音效、Canvas 動畫與專案切換！

---

## 🛡️ 核心架構防禦與技術亮點

1. **同源 Service Worker 快取隔離**：
   改寫全部子應用的 `sw.js`，快取清除嚴格比對自身專屬前綴（`hub-portal-cache-`, `cyber-routine-cache-`, `museum-showcase-`, `tabisync-`），杜絕子應用間快取互踩互毀。
2. **LocalStorage 命名空間安全**：
   全域儲存強制攜帶前綴（如 `hub_*`, `cyber_routine_*`, `showcase_*`, `TABISYNC_*`），杜絕同源狀態覆寫碰撞。
3. **微縮回航膠囊（Floating Portal Pill）**：
   以 Shadow DOM 隔離封裝注入至所有子應用（`portal-pill.js`），無操作 3.5 秒自動微縮為 40px 半透明極致小圓點，支援 PWA 獨立視窗與手機底部安全區域，隨時一鍵回航主展館。
4. **二進位圖檔增量防膨脹（Smart Hash Sync）**：
   發布管線自動計算檔案 SHA-256 雜湊與大小，未變動檔案略過覆蓋，杜絕 Git 假性膨脹。
5. **歷史壓平瘦身機制（Prune History）**：
   內建孤兒分支壓平功能（`--prune-history`），隨時可一鍵消除歷史累積的舊圖 Blob，永保倉庫輕量健康。

---

## 🛠️ 發布與維護管線 (`deploy.py` / `deploy.bat`)

本儲存庫內建純 Python 3 標準庫實現的智慧發布引擎，具備 5 重安全防呆檢驗（單檔 >95MB 攔截、1.66GB 原始圖庫黑名單排除、Vite 相對路徑檢查、SW Scope 檢查、增量雜湊比對）：

### 快速操作方式：
直接雙擊根目錄下的 [`deploy.bat`](deploy.bat) 即可開啟互動選單：

```text
================================================================================
   🚀 GITHUB PAGES 智慧發布與 5 重防呆管線 (Deploy Pipeline Architect)
================================================================================
  [1] 🚀 全量發布 (All Projects: cyber-routine + showcase + osaka)
  [2] ⚡ 僅發布 賽博日常 (cyber-routine)
  [3] 🎨 僅發布 當代收藏品藝廊 (showcase)
  [4] 🏯 僅發布 大阪旅行攻略 (osaka)
  [5] 🔍 模擬乾跑檢查 (Dry-run All: 僅防呆驗證與比對，不寫入檔案)
  [6] 🧹 壓平公開倉庫 Git 歷史 (Prune History: 清理過往歷史大圖 Blob)
  [0] 🚪 離開 (Exit)
--------------------------------------------------------------------------------
```

---

## 📚 相關文檔與手冊

- 📘 **[《標準架構規範書與操作手冊 (design_specification.md)》](./design_specification.md)**：包含全站拓撲、展館生命週期合約、同源防禦與 SOP。
- 📋 **[《版本重大更新與架構演進指南 (UPDATE.md)》](./UPDATE.md)**：深入剖析 v2.0 重構背景、光學引擎與 ADR 架構決策記錄。
- 📝 **[《版本更新歷程 (CHANGELOG.md)》](./CHANGELOG.md)**：依據 Keep a Changelog 規範編排的完整版本釋出日誌。

---

© 2026 AeschyJ. All rights reserved.
