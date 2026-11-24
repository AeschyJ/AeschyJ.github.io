# TEST_INFRA — GitHub Pages 門戶改版與遷移 E2E 測試基礎架構說明書

## 1. 測試架構概述 (Architecture Overview)

本專案之 E2E 測試基礎架構專為「GitHub Pages 改版與門戶遷移專案（`hub-portal-cache-v3`）」量身打造。遵循專案規範與「E2E Testing Track 4-Tier 方法論」，具備 **100% 本機離線可執行、零外部套件/網路依賴、毫秒級極速執行** 特性。

### 核心分層架構 (4-Tier Methodology)
- **Tier 1: Feature Coverage (功能覆蓋層)**：覆蓋 `PROJECT.md` Feature Inventory 全部 20 項功能，每項特性均保證至少 5 個具體明確斷言（Total $\ge 100$ 個斷言）。
- **Tier 2: Boundary & Corner Cases (邊界與極端狀況層)**：針對 Tailwind `md:grid` 與行內 `style.display` 權重優先級、狀態機循環切換、HUD Observer 滾動邊界、楓谷 5x6 裝備缺陷槽位、Service Worker 命名空間隔離、純 ASCII 編碼與 CMD 括號安全進行邊界壓測。
- **Tier 3: Cross-Feature Combinations (跨功能組合交互層)**：驗證成對功能間的狀態協同與持久化（例如：展館切換 ⇄ HUD 導航聯動、壓縮 DAG 切換 ⇄ 全頁 Snap 滾動、抽屜開啟 ⇄ 錨點平滑滾動、頻譜 Hover ⇄ 句對聚焦）。
- **Tier 4: Real-World Application Scenarios (真實端到端場景層)**：模擬真實使用者完整漫遊 6 大展館（00 大廳 ➔ 01 碩論 ➔ 02 旅誌 ➔ 03 典藏 ➔ 04 腳本 ➔ 05 智算）、離線 PWA 快取回退驗證、零個資/金鑰洩漏靜態稽核、雙軌文檔與雙擊腳本相容性檢驗。

---

## 2. 測試環境與執行器規範 (Runtime & Runner Contract)

- **執行環境**：Python 3.13（透過本機 `uv run python` 呼叫），純標準庫開發（`unittest`, `html.parser`, `re`, `pathlib`, `json`, `argparse`）。
- **網路約束**：**100% 離線隔離**，嚴禁發起外部 HTTP/HTTPS 請求或依賴 npm/pip 線上下載。
- **退出碼約定 (Exit Code Contract)**：
  - `0`：測試全數通過（或未啟動里程碑之測試依 Progressive Testability 正常略過）。
  - `1`：偵測到功能缺陷、斷言失敗或異常崩潰。

---

## 3. 測試套件目錄結構 (Directory Layout)

```
tests/
└── e2e/
    ├── __init__.py                  # 測試套件識別
    ├── dom_engine.py                # 純標準庫輕量級 DOM 樹解析器與 CSS 選擇器引擎
    ├── state_simulator.py          # 前端 DOM 狀態機模擬器 (HUD/Showcase/DAG/Spotlight)
    ├── oracle.py                    # 權威規格標準庫 (衍生自 ORIGINAL_REQUEST.md & survey)
    ├── spec_fixture.py              # 全規格合規 Synthetic Portal 與資源 Fixture
    ├── test_context.py              # 執行上下文、路徑動態錨定與里程碑 Decorator
    ├── test_tier1_features.py       # Tier 1 功能覆蓋測試 (Features 1..20, >=5 斷言/項)
    ├── test_tier2_boundaries.py     # Tier 2 邊界、CSS 權重與異常防護測試
    ├── test_tier3_combinations.py   # Tier 3 跨組件交互與狀態機循環測試
    ├── test_tier4_scenarios.py      # Tier 4 真實使用者旅程與全站漫遊測試
    ├── runner.py                    # 統一測試執行器 (支援 --tier, --milestone, --oracle)
    ├── run_e2e_tests.ps1            # PowerShell 7 / Windows PowerShell 執行引導外殼
    └── run_e2e.bat                  # 純 ASCII Windows 雙擊測試執行腳本
```

---

## 4. 特性清單與測試矩陣 (Feature Coverage Matrix)

| # | 特性名稱 (PROJECT.md) | 里程碑 | 測試檔案與方法 | 斷言數 | 驗證重點 |
|---|----------------------|--------|----------------|--------|----------|
| 1 | Legacy Index Backup | M1 | `test_tier1_features.py::test_f01_legacy_index_backup` | 5 | `index_legacy.html` 存在、大小 > 10KB、副標題與樣式表完整保留 |
| 2 | New Portal Migration | M1 | `test_tier1_features.py::test_f02_new_portal_migration` | 5 | `#snap-container`、6 大 Snap 區塊存在、6 顆 Snap Dots、抽屜 Modal |
| 3 | SW Cache Upgrade | M1 | `test_tier1_features.py::test_f03_sw_cache_upgrade` | 5 | `hub-portal-cache-v3`、舊版 v2 移除、namespace purge、導航回退 |
| 4 | HUD Navbar & Scroll Observer | M2 | `test_tier1_features.py::test_f04_hud_navbar_and_scroll_observer` | 5 | 5 顆 `.nav-pill`、品牌標誌、Observer 觸發高光、Inactive 樣式 |
| 5 | Showcase Desktop Conflict | M2 | `test_tier1_features.py::test_f05_showcase_desktop_display_conflict` | 5 | 行內 `style.display` 支配、`md:grid` 權重覆蓋、雙向顯隱隔離 |
| 6 | Compression DAG State Machine | M2 | `test_tier1_features.py::test_f06_compression_dag_state_machine` | 5 | 按鈕 ID 配備、青色高光清除、DAG 節點狀態轉移、終端輸出 |
| 7 | Additional UI Edge Fixes | M2 | `test_tier1_features.py::test_f07_additional_ui_edge_fixes` | 5 | 抽屜 `#hero` 入口、音訊頻譜 mouseleave 重置、XAI 雙路徑切換 |
| 8 | 01 Research (EXP) Backfill | M3 | `test_tier1_features.py::test_f08_research_exp_backfill` | 5 | 臺大生機所題目、CSR 矩陣 (56.74MB, 92.8%, 190.82ms)、Fidelity |
| 9 | 02 Travel (OSK) Backfill | M3 | `test_tier1_features.py::test_f09_travel_osk_backfill` | 5 | 11 日全紀行、305 幀寫真、金閣寺本機圖資、`./osaka/` 雙外鏈 |
| 10 | 03 Physical Showcase Backfill | M3 | `test_tier1_features.py::test_f10_physical_showcase_backfill` | 5 | Santal 33、嬌蘭沙龍香、DT 770 Pro、`./showcase/` 直通 |
| 11 | 03 MapleStory Privacy | M3 | `test_tier1_features.py::test_f11_maplestory_privacy_telemetry` | 5 | 戰力 1.25 億、戰地 9000、302★、創世解放、**嚴格 0 IGN / 個資洩漏** |
| 12 | 04 Ops Pipeline Backfill | M3 | `test_tier1_features.py::test_f12_ops_pipeline_backfill` | 5 | Tixplus / Cloudflare Worker、HEVC remux、7-Zip 4GB 分卷加密、Z: 槽 |
| 13 | 05 AI Workstation Backfill | M3 | `test_tier1_features.py::test_f13_ai_workstation_backfill` | 5 | Ryzen 7500F、Arc A750、50ms ASR、Gemma 4 MTP、兩組真實翻譯句對 |
| 14 | README & CHANGELOG | M4 | `test_tier1_features.py::test_f14_external_readme_and_changelog` | 5 | 避開 8000 端口之 5173 指引、Keep a Changelog 格式、去廢話紀律 |
| 15 | HANDOVER Snapshot | M4 | `test_tier1_features.py::test_f15_internal_handover_snapshot` | 5 | `HANDOVER.md` 存在、`.gitignore` 明確排除推送、高密度快照 |
| 16 | Preview Script Port Fix | M4 | `test_tier1_features.py::test_f16_local_preview_script_port_fix` | 5 | `啟動預覽.bat` 存在、避開 8000 端口、預設 5173、支援動態 `%PORT%` |
| 17 | Static Security & Path Scan | M5 | `test_tier1_features.py::test_f17_static_security_and_path_scan` | 5 | 0 本機絕對路徑、0 私有金鑰/Token、0 [TODO] 佔位符、0 角色洩漏 |
| 18 | Safe Git Push Script | M5 | `test_tier1_features.py::test_f18_safe_git_push_script` | 5 | `push_to_github.bat` 存在、純 ASCII (<=127)、CMD 括號防滲透 |
| 19 | E2E Testing Suite & Runner | E2E | `test_tier1_features.py::test_f19_e2e_testing_suite_and_runner` | 5 | `TEST_INFRA.md`、`runner.py`、`dom_engine.py`、標準退出碼 0 |
| 20 | Final E2E Test & Hardening | M6 | `test_tier1_features.py::test_f20_final_e2e_hardening` | 5 | 6 大 Snap Sections、PWA Manifest 正常、全站綠燈通過 |

---

## 5. 漸進式可測試性與里程碑門禁 (Progressive Testability Protocol)

在專案推進過程中，為落實「測試驅動」且「不因未就緒功能引發假警報」：
1. **里程碑自動感應 (`--milestone auto`)**：
   `runner.py` 解析 `PROJECT.md` 之 Milestone 表格。僅針對標記為 `DONE` 或當前就緒的里程碑執行斷言，未來里程碑測試自動標記為 `[SKIP]`，確保退出碼為 `0`。
2. **手動指定里程碑 (`--milestone M<N>`)**：
   可指定驗證特定里程碑（如 `--milestone M1`），僅執行該里程碑及其相依功能。
3. **權威規格自檢驗證 (`--verify-all` / `--oracle` / `--self-test`)**：
   直接以 `tests/e2e/spec_fixture.py` 產出之全功能標準規約為標的，100% 執行 Tier 1~4 全數 36+ 個測試用例，確認測試套件邏輯自洽且全數 PASS。

---

## 6. 測試執行命令指引 (Execution Guide)

### 1. 權威規格全套自檢 (Oracle Mode, Tier 1~4 100% 驗收)
```powershell
uv run python tests/e2e/runner.py --self-test
```

### 2. 依當前里程碑進度自動驗證 (Default / Progressive)
```powershell
uv run python tests/e2e/runner.py
```

### 3. 指定驗證特定里程碑 (例：M1 完成後驗收)
```powershell
uv run python tests/e2e/runner.py --milestone M1
```

### 4. 指定執行特定分層
```powershell
# 僅執行 Tier 1 功能覆蓋
uv run python tests/e2e/runner.py --tier 1

# 僅執行 Tier 2 邊界壓測
uv run python tests/e2e/runner.py --tier 2

# 僅執行 Tier 3 跨功能交互
uv run python tests/e2e/runner.py --tier 3

# 僅執行 Tier 4 真實使用者旅程
uv run python tests/e2e/runner.py --tier 4
```

### 5. 一鍵雙擊與外殼腳本執行
- PowerShell: `.\tests\e2e\run_e2e_tests.ps1`
- Windows CMD / 雙擊: `.\tests\e2e\run_e2e.bat`
