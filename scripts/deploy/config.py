"""部署管線全域設定、終端機輸出工具與容量格式化函式。"""

from __future__ import annotations

import io
import sys
from pathlib import Path
from typing import Dict, Set, Union

# =============================================================================
# 全域路徑設定與常數定義
# =============================================================================
BASE_DIR = Path(__file__).resolve().parent.parent.parent  # Github Page root
WORKSPACE_ROOT = BASE_DIR.parent  # Workspace root

# 單檔大小安全閾值 (GitHub 單檔上限 100MB，設置 95MB 作為安全警戒線)
MAX_FILE_SIZE_BYTES = 95 * 1024 * 1024

# 嚴格黑名單目錄與檔案模式 (絕不外洩與同步至公開 GitHub Pages)
CRITICAL_EXCLUDE_DIRS: Set[str] = {
    "Photos",         # 🚨 關鍵防呆：1.66GB 原始大圖相簿，嚴禁複製！
    ".git",           # 私人版本控制庫
    "node_modules",   # 相依套件
    "__pycache__",    # Python 快取
    "scratch",        # 臨時草稿
    "api",            # 本地除錯 API
    ".vscode",
    ".idea",
}

CRITICAL_EXCLUDE_EXTENSIONS: Set[str] = {
    ".bat", ".cmd", ".ps1", ".py", ".pyc",
    ".env", ".pdf", ".log", ".DS_Store",
}

CRITICAL_EXCLUDE_FILENAMES: Set[str] = {
    ".gitignore",
    "Thumbs.db",
    "desktop.ini",
    "vercel.json",
    "debug-proofread.js",
    "emaki_vol3_verified.png",
    "emaki_vol7_p2_verified.png",
}

# 專案定義與路徑對照
PROJECT_CONFIGS: Dict[str, dict] = {
    "cyber": {
        "key": "cyber-routine",
        "name": "賽博個人儀表板 (cyber-routine)",
        "type": "vite",
        "src_dir": WORKSPACE_ROOT / "AntigravityHub" / "cyber-routine",
        "dest_dir": BASE_DIR / "cyber-routine",
        "dist_dir": WORKSPACE_ROOT / "AntigravityHub" / "cyber-routine" / "dist",
        "vite_config": WORKSPACE_ROOT / "AntigravityHub" / "cyber-routine" / "vite.config.ts",
        "sw_file": WORKSPACE_ROOT / "AntigravityHub" / "cyber-routine" / "public" / "sw.js",
        "build_cmd": ["npm", "run", "build"],
    },
    "showcase": {
        "key": "showcase",
        "name": "當代收藏品藝廊 (showcase)",
        "type": "vite",
        "src_dir": WORKSPACE_ROOT / "AntigravityHub" / "showcase",
        "dest_dir": BASE_DIR / "showcase",
        "dist_dir": WORKSPACE_ROOT / "AntigravityHub" / "showcase" / "dist",
        "vite_config": WORKSPACE_ROOT / "AntigravityHub" / "showcase" / "vite.config.ts",
        "sw_file": WORKSPACE_ROOT / "AntigravityHub" / "showcase" / "public" / "sw.js",
        "build_cmd": ["npm", "run", "build"],
    },
    "osaka": {
        "key": "osaka",
        "name": "大阪旅行雙入口攻略 (osaka)",
        "type": "static",
        "src_dir": WORKSPACE_ROOT / "Nagoya&Osaka Trip",
        "dest_dir": BASE_DIR / "osaka",
        "sw_file": WORKSPACE_ROOT / "Nagoya&Osaka Trip" / "sw.js",
        "white_list_files": [
            "index.html",
            "emaki.html",
            "itinerary.html",
            "magazine.html",
            "manifest.json",
            "magazine-manifest.json",
            "sw.js",
            "favicon.ico",
        ],
        "white_list_dirs": [
            "css",
            "js",
            "assets",
            "Photos_web",  # 僅允許 web 壓縮圖庫，約 4MB
        ],
    },
}


# =============================================================================
# 終端機顏色與視覺輸出配置 (Windows Virtual Terminal & ANSI Support)
# =============================================================================
def init_terminal_colors() -> None:
    """在 Windows CMD / PowerShell 中啟用 VT100 ANSI 轉義序列支援。"""
    if sys.platform == "win32":
        try:
            import ctypes
            kernel32 = ctypes.windll.kernel32
            h_out = kernel32.GetStdHandle(-11)
            mode = ctypes.c_ulong()
            kernel32.GetConsoleMode(h_out, ctypes.byref(mode))
            kernel32.SetConsoleMode(h_out, mode.value | 0x0004)
        except Exception:
            pass


def configure_console() -> None:
    """冪等設定 Windows 主控台 UTF-8 編碼與 VT100 ANSI 色彩支援。"""
    if sys.platform == "win32":
        for attr in ("stdout", "stderr"):
            stream = getattr(sys, attr, None)
            if stream is None:
                continue
            encoding = (getattr(stream, "encoding", "") or "").lower()
            if encoding != "utf-8" and hasattr(stream, "buffer"):
                setattr(
                    sys,
                    attr,
                    io.TextIOWrapper(stream.buffer, encoding="utf-8", errors="replace"),
                )
    init_terminal_colors()


class Colors:
    """終端機 ANSI 色碼常數集合。"""

    HEADER = "\033[95m"
    BLUE = "\033[94m"
    CYAN = "\033[96m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    RED = "\033[91m"
    BOLD = "\033[1m"
    DIM = "\033[2m"
    RESET = "\033[0m"


def print_banner() -> None:
    """列印部署管線橫幅。"""
    banner = f"""
{Colors.CYAN}{Colors.BOLD}================================================================================
   🚀 GITHUB PAGES 智慧發布與 5 重防呆管線 (Deploy Pipeline Architect)
================================================================================{Colors.RESET}"""
    print(banner)


def log_info(msg: str) -> None:
    """列印一般資訊日誌。"""
    print(f"{Colors.BLUE}[INFO]{Colors.RESET} {msg}")


def log_success(msg: str) -> None:
    """列印成功狀態日誌。"""
    print(f"{Colors.GREEN}[SUCCESS]{Colors.RESET} {msg}")


def log_warn(msg: str) -> None:
    """列印警告日誌。"""
    print(f"{Colors.YELLOW}[WARNING]{Colors.RESET} {msg}")


def log_error(msg: str) -> None:
    """列印錯誤日誌。"""
    print(f"{Colors.RED}[ERROR]{Colors.RESET} {msg}")


def log_step(step_num: int, total_steps: int, title: str) -> None:
    """列印階段進度標題。"""
    print(f"\n{Colors.BOLD}{Colors.CYAN}▶ [{step_num}/{total_steps}] {title}{Colors.RESET}")
    print(f"{Colors.DIM}{'-' * 80}{Colors.RESET}")


def format_size(size_bytes: Union[int, float]) -> str:
    """人性化格式化位元組大小。"""
    size = float(size_bytes)
    for unit in ["B", "KB", "MB", "GB"]:
        if size < 1024.0:
            return f"{size:.2f} {unit}"
        size /= 1024.0
    return f"{size:.2f} TB"
