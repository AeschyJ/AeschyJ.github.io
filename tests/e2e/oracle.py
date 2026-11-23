"""
tests/e2e/oracle.py
-------------------
Authoritative Specification Oracle derived directly from ORIGINAL_REQUEST.md,
PROJECT.md, and spec_miner_survey_2/handoff.md.
Used as the single source of truth for expected outputs across all E2E test tiers.
"""

from typing import Any, Dict, List, Set

# R1 / Feature 1, 2, 3: Core Architecture & Cache
EXPECTED_SW_CACHE_NAME = "hub-portal-cache-v3"
EXPECTED_SECTIONS = ["hero", "exp", "osk", "show", "ops", "ai"]
EXPECTED_SECTION_IDS = [f"#{s}" for s in EXPECTED_SECTIONS]
EXPECTED_DEFAULT_PORT = 5173
FORBIDDEN_PORT = 8000

# R2 / Feature 4, 5, 6, 7: Frontend Bug Fix Specifications
ACTIVE_NAV_PILL_CLASSES = {"bg-white/15", "text-white", "ring-1", "ring-white/20", "font-medium"}
INACTIVE_NAV_PILL_CLASSES = {"text-zinc-300", "font-normal"}
SHOWCASE_PHYS_BG = "#11100F"
SHOWCASE_MAPLE_BG = "#09090B"

DAG_MODES = ["mkv", "cbz", "sha"]
DAG_NODE_ACTIVE_CLASSES = {"border-cyan-400"}
DAG_NODE_IDLE_CLASSES = {"border-white/10", "opacity-20"}
DAG_ACTIVE_BTN_CLASSES = {"border-cyan-400/50", "text-cyan-300"}
DAG_INACTIVE_BTN_CLASSES = {"border-white/15", "text-zinc-300"}

# R3 / Feature 8: 01 Research (EXP)
EXPECTED_EXP_DATA = {
    "institution": "NTU ESOE",
    "thesis_title": "應用知識圖注意力網路於食譜推薦之效能評估與可解釋性研究",
    "project_name": "Recipe-Recommendation-KGAT",
    "csr_memory": "56.74 MB",
    "csr_reduction": "92.8%",
    "csr_speedup": "190.82 ms",
    "csr_complexity": "CSR O(|E|)",
    "fidelity_pos": "94.2%",
    "github_url": "https://github.com/AeschyJ/Recipe-Recommendation-KGAT",
}

# R3 / Feature 9: 02 Travel (OSK)
EXPECTED_OSK_DATA = {
    "title": "名阪京奈 夏日巡行手帖：古都街廓與日常切面",
    "edition": "水墨百景 · 諸相全錄",
    "season": "2026 盛夏",
    "coordinates": "35.0116° N, 135.7681° E",
    "local_photo_path": "./osaka/Photos_web/清水寺 坂道/IMG_20260825_180925_thumb.jpg",
    "link_emaki": "./osaka/emaki.html",
    "link_magazine": "./osaka/magazine.html",
}

# R3 / Feature 10 & 11: 03 Showcase (SHOW)
EXPECTED_PHYSICAL_SHOWCASE = {
    "perfume_1": "Le Labo Santal 33",
    "perfume_2": "Guerlain",
    "headphone": "Beyerdynamic DT 770 Pro",
    "link": "./showcase/",
}

EXPECTED_MAPLE_TELEMETRY = {
    "combat_power": "1.25 億",
    "legion": "9000",
    "star_force": "302★",
    "genesis_liberated": "創世解放",
    "symbols": "SYMBOLS (6) MAX",
    "spotlight_slots": [
        "苦痛泉源 18★➔22★",
        "魔法之箭 雙傳",
        "露曼眼罩 均2屬2攻",
    ],
    "defect_indices": [3, 11, 18],  # 0-indexed slots 4, 12, 19
    "grid_total_slots": 30,
}

# User Privacy Rules: Strictly Forbidden Names & Patterns
FORBIDDEN_PRIVACY_PATTERNS = [
    r"Jaes",
    r"琉德",
    r"test_3b5c0460",  # Nexon API key prefix
]

FORBIDDEN_LOCAL_PATH_PATTERNS = [
    r"[a-zA-Z]:[\\/](?:Mine|Users[\\/][^\\/]+|Personal|[a-zA-Z0-9_.-]+[\\/]Documents)",
    r"D:\\Liao",
    r"C:\\Users\\Liao",
]

# R3 / Feature 12: 04 Ops Pipeline (OPS)
EXPECTED_OPS_DATA = {
    "tix_target": "https://tradead.tixplus.jp/dragons",
    "tix_relay": "Cloudflare Worker",
    "tix_channels": ["Discord", "LINE", "Telegram"],
    "drivestore_mkv": "HEVC",
    "drivestore_cbz": ".cbz",
    "drivestore_7zip": "AES-256",
    "drivestore_header_enc": "-mhe=on",
    "drivestore_split": "4GB",
    "drivestore_rclone_drive": "Z:",
    "drivestore_max_transfer": "720G",
}

# R3 / Feature 13: 05 AI Workstation (AI)
EXPECTED_AI_DATA = {
    "cpu": "AMD Ryzen 5 7500F",
    "ram": "32GB DDR5",
    "gpu": "Intel Arc A750 8GB",
    "capture": "Windows WASAPI Loopback",
    "asr_engines": ["SenseVoice-Small", "Faster-Whisper"],
    "asr_latency": "50ms",
    "llm_target": "Gemma 4-E4B",
    "llm_draft": "Gemma 4-E2B",
    "llm_decoding": "MTP",
    "llm_throughput": "80~110",
    "opencc": "s2twp",
    "sentence_pair_1": {
        "timestamp": "[00:02.15]",
        "source": "Gemma 4 with multi-token prediction enables ultra-low latency translations.",
        "target": "搭載多標元預測（MTP）的 Gemma 4 實現了極低延遲的即時意譯。",
    },
    "sentence_pair_2": {
        "timestamp": "[00:06.40]",
        "source": "SenseVoice-Small achieves 50 millisecond transcription with rich acoustic tags.",
        "target": "SenseVoice-Small 能以 50 毫秒的極速完成語音辨識，並保留豐富的聲學標籤。",
    },
}

# R4 & R5 / Feature 14, 15, 16, 17, 18
EXPECTED_REMOTE_URL = "https://github.com/AeschyJ/AeschyJ.github.io.git"
