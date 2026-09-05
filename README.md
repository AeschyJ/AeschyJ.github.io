# 🏛️ AeschyJ Hub — 中央多專案主題展覽館

[![GitHub Pages Deployment](https://img.shields.io/badge/Deploy-GitHub%20Pages-10b981?logo=github&logoColor=white)](https://aeschyj.github.io/)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline-00ff9d?logo=pwa&logoColor=black)](https://aeschyj.github.io/manifest.json)
[![License](https://img.shields.io/badge/License-MIT-38bdf8)](LICENSE)
[![Built with Modern Web](https://img.shields.io/badge/Stack-ES%20Modules%20%7C%20Web%20Audio%20%7C%20CSS%20Tokens-a855f7)](https://aeschyj.github.io/)

歡迎來到 **AeschyJ Hub**！本儲存庫為個人作品集與多 Web 應用的公開發布託管站點（`https://aeschyj.github.io`）。

本站採用**「深太空黑藝廊基底 + 動態環境光色溫漸變（Ambient Colorflow）」**，在單一頂級網域下集中託管多個獨立應用，並為非前端網頁專案（後端自動化機器人、學術 AI 科研）提供高擬真的互動模擬沙盒。

---

## 🗺️ 全站拓撲與展館導航 (Pavilion Directory)

線上訪問：[https://aeschyj.github.io/](https://aeschyj.github.io/)

| 展館代號 | 專案名稱 | 主題視覺與色溫 | 核心特色與微互動 | 跳轉路徑 / 展示方式 |
| :---: | :--- | :--- | :--- | :--- |
| **Hero** | **門戶星雲大廳** | 深太空黑 `#08090d`<br/>天青藍 `#38bdf8` | 全站 PWA、最近造訪快速通道、釘選抽屜、Web Audio 微頻合成音 | 快速錨點滾動 |
| **`exp`** | **Experiment**<br/>(量子科研實驗室) | 神經元量子紫 `#a855f7`<br/>冰霜銀白 `#e2e8f0` | 幾何拓撲點陣、LaTeX 公式浮水印、**動態 Benchmark 對比長條圖** | 彈出研究論文架構白皮書 |
| **`osk`** | **Osaka Trip**<br/>(名阪行旅手帖) | 鳥居朱紅 `#e11d48`<br/>櫻花粉 `#f43f5e` | 越前和紙質感、直書漢字、**御朱印互動蓋章 (音效+落款動畫)**、繪卷折本 | **雙入口**：<br/>⛩️ [TabiSync 助手](./osaka/)<br/>📜 [夏之栞繪卷](./osaka/magazine.html) |
| **`show`**| **Showcase**<br/>(當代收藏品藝廊) | 建築冰藍 `#60a5fa`<br/>石板霧黑 `#0f172a` | 雙層藍圖工程網格 (Blueprint Grid)、**3D 視差陀螺儀卡片**、極光流星流光邊框 | 進入應用 ➔ [`./showcase/`](./showcase/) |
| **`tic`** | **Ticket Bot**<br/>(雷達票務獵手) | 航管琥珀橘 `#f59e0b`<br/>暗夜黑 `#0a0b0e` | CRT 掃描線、LED 狀態燈、**模擬搶票毫秒日誌串流瀑布**、Webhook 模擬推播 | 彈出系統架構白皮書 |
| **`cyb`** | **Cyber-Routine**<br/>(賽博日常儀表板) | 霓虹螢光綠 `#00ff9d`<br/>終端黑 `#0a0e14` | CRT 終端打字機、**連擊充能 (+1)**、Canvas 2D 金色粒子爆破、8-bit 雙方波金幣音效 | 進入應用 ➔ [`./cyber-routine/`](./cyber-routine/) |

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

> **自動推送整合**：在完成編譯與同步後，腳本會自動偵測變更並主動詢問：  
> `是否立即 Commit 並推送 (git push origin main) 至 GitHub？ [Y/n]:`  
> 按下 **Enter** 即可全自動完成遠端部署！

---

## 📚 完整架構規範手冊

如需深入了解各展館生命週期合約、同源防禦細節、新增 Web App 或非網頁專案的標準 SOP，請參閱完整的架構規範書：  
👉 **[《標準架構規範書與操作手冊 (design_specification.md)》](./design_specification.md)**

---

© 2026 AeschyJ. All rights reserved.
