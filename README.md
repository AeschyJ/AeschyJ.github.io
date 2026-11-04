# 🏛️ AESCHY — Works & Archive (中央多專案主題展覽館)

[![GitHub Pages Deployment](https://img.shields.io/badge/Deploy-GitHub%20Pages-10b981?logo=github&logoColor=white)](https://aeschyj.github.io/)
[![Version](https://img.shields.io/badge/Version-v3.0.0-f59e0b)](CHANGELOG.md)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Cache-00ff9d?logo=pwa&logoColor=black)](https://aeschyj.github.io/manifest.json)
[![License](https://img.shields.io/badge/License-MIT-38bdf8)](LICENSE)
[![Built with Modern Web](https://img.shields.io/badge/Stack-ES%20Modules%20%7C%20Web%20Audio%20%7C%20HTML5%20Canvas-a855f7)](https://aeschyj.github.io/)

個人專案與展示作品之公開發布站點（`https://aeschyj.github.io`）。

> *「研析成文，行旅作卷；當代造物，日用常行。」*  
> *AESCHY • From Research to Wanderlust • Since 2026*

全站採用 **100dvh 原生滾動吸附佈局（Scroll-Snap Deck）** 與 **流體毛玻璃 HUD 導航列（Fluid Glass HUD Navbar）**，支援原生 `scroll-snap-type: y mandatory` 滑動精準切換展示展館。在單一網域下集中託管多個展示模組，並支援直屏與橫屏自適應排版。

---

## 🗺️ 全站拓撲與展館導航 (Pavilion Directory)

線上訪問：[https://aeschyj.github.io/](https://aeschyj.github.io/)

| 展館代號 | 展館名稱 | 核心內容與技術架構 | 實證數據 / 展示特徵 | 跳轉路徑 / 展示方式 |
| :---: | :--- | :--- | :--- | :--- |
| **00 // HERO** | **門戶核心** | 中央導航星雲、流體毛玻璃 HUD 導航列 (`.nav-pill`)、懸浮全景指示條 (`.snap-dot`) | PWA 快取、最近造訪通道、釘選抽屜、音效開關 | 滑動吸附切換 |
| **01 // EXP** | **碩論科研** | 國立臺灣大學生物機電工程研究所食譜推薦論文（Recipe-Recommendation-KGAT），GNN 關係感知注意力 | CSR 稀疏矩陣 56.74 MB 核心記憶體、92.8% 精省、190.82 ms 建圖、Fidelity+ 94.2% 可解釋性指標 | [GitHub 開源庫](https://github.com/AeschyJ/Recipe-Recommendation-KGAT) |
| **02 // OSK** | **關西旅誌** | 名阪京奈夏日巡行手帖，手作和紙拍立得相片拼貼框、關西三景切換與御朱印互動 | 11 日全紀行、305 幀高解析度紀行寫真（含金閣寺寫真） | 雙入口：<br/>⛩️ [行程助手](./osaka/)<br/>📜 [旅行繪卷](./osaka/magazine.html) |
| **03 // SHOW** | **虛實典藏** | 實體當代器物藝廊 ⇄ 數位匿名頂級裝備模擬雙軌切換 | 實體：Le Labo Santal 33、Guerlain 沙龍香氛、Beyerdynamic DT 770 Pro 監聽耳機；數位：戰力 1.25 億、戰地 9000、302★、創世解放匿名指標 | 進入應用 ➔ [`./showcase/`](./showcase/) |
| **04 // OPS** | **自動腳本** | Mode 4A Tixplus 票務獵手 ⇄ Mode 4B DriveStore 雲端管線（動態 DAG 狀態機） | 30 秒輪詢探針、Cloudflare Worker 中繼、Discord/LINE/Telegram 毫秒推送；HEVC+ASS remux .mkv、CBZ 封裝、7-Zip AES-256 加密分卷與 Rclone 虛擬磁碟 Z: 槽串流 | 展館內切換 DAG 節點展示 |
| **05 // AI** | **本地智算** | 本地雙軌同傳工作站，硬體配置 AMD Ryzen 5 7500F、32GB DDR5、Intel Arc A750 8GB | Windows WASAPI Loopback 採集、SenseVoice / Faster-Whisper 50ms ASR 辨識、Gemma 4 MTP 80~110 tokens/s 推測解碼展示 | 展館內即時雙軌同傳展示 |

---

## 🏛️ 架構特性與技術實踐

1. **滿版滾動吸附佈局 (100dvh Scroll-Snap)**：
   - 容器採用 `#snap-container` 與 `.snap-section`，透過 `scroll-snap-type: y mandatory` 實現單次滑動對齊展館。
   - 右側配置懸浮全景指示條 (`.snap-dot`)，即時映射當前展館位置並支援點擊定位跳轉。
2. **流體毛玻璃 HUD 導航列 (Fluid Glass HUD Navbar)**：
   - 頂部導航列採用毛玻璃磨砂質感，內嵌 `.nav-pill` 導航項目。
   - 透過 `IntersectionObserver` 即時監聽視窗交會狀態，高光指示當前活躍展館並支援平滑滾動。
3. **展館層疊隔離 (Display Specificity Isolation)**：
   - 在桌機斷點（`>=768px`）下，實體藝廊與數位圖鑑切換採用行內 `style.display` 支配顯示狀態，避免樣式層疊衝突。
4. **管線動態 DAG 狀態機 (Dynamic Pipeline DAG)**：
   - `routeDag(mode)` 支援 MKV、CBZ 與 SHA-256 狀態轉移，精準切換活躍節點與按鈕樣式。
5. **同源快取隔離 (Service Worker Isolation)**：
   - `sw.js` 註冊快取命名空間 `hub-portal-cache-v3`，實施同源前綴隔離與舊版快取清理。

---

## 🚀 本地開發與預覽指引

現代瀏覽器因安全性規範，在直接透過 `file:///` 協議開啟時會限制 ES 模組載入。請使用本地 HTTP 伺服器進行預覽。

### 方式一：雙擊啟動腳本 (Windows)
直接雙擊根目錄下的 **[`啟動預覽.bat`](啟動預覽.bat)**：
- 腳本自動錨定當前目錄。
- 預設綁定 5173 連接埠（`http://localhost:5173`），亦支援讀取 `%PORT%` 環境變數。
- 自動呼叫系統預設瀏覽器開啟預覽頁面。

### 方式二：PowerShell 7 指令啟動
在專案根目錄開啟 `pwsh`，執行以下指令：

```powershell
# 預設使用 5173 連接埠
python -m http.server 5173

# 或透過環境變數指定自訂連接埠
$env:PORT = 5173
python -m http.server $env:PORT
```

伺服器啟動後，使用瀏覽器造訪 `http://localhost:5173` 即可檢視完整功能。

---

## 📚 相關文檔

- 📝 **[《版本更新歷程 (CHANGELOG.md)》](./CHANGELOG.md)**：遵循 Keep a Changelog 規範編排之完整版本日誌。
- 📘 **[《標準架構規範書與操作手冊 (design_specification.md)》](./design_specification.md)**：全站拓撲、展館生命週期合約與同源防禦規範。
- 📋 **[《版本重大更新與架構演進指南 (UPDATE.md)》](./UPDATE.md)**：架構決策記錄 (ADR) 與技術脈絡。

---

© 2026 AeschyJ. All rights reserved.
