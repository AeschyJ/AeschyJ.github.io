import os
import sys
import io
import shutil
import hashlib
import subprocess
import argparse
import time
import re
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional

# 強制在 Windows 下使用 UTF-8 輸出，避免 cp950 編碼無法輸出 Emoji 導致崩潰
if sys.platform == "win32":
    if hasattr(sys.stdout, "buffer"):
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    if hasattr(sys.stderr, "buffer"):
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

# =============================================================================
# 終端機顏色與視覺輸出配置 (Windows Virtual Terminal & ANSI Support)
# =============================================================================
def init_terminal_colors():
    """在 Windows CMD / PowerShell 中啟用 VT100 ANSI 轉義序列支援"""
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

init_terminal_colors()

class Colors:
    HEADER = "\033[95m"
    BLUE = "\033[94m"
    CYAN = "\033[96m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    RED = "\033[91m"
    BOLD = "\033[1m"
    DIM = "\033[2m"
    RESET = "\033[0m"

def print_banner():
    banner = f"""
{Colors.CYAN}{Colors.BOLD}================================================================================
   🚀 GITHUB PAGES 智慧發布與 5 重防呆管線 (Deploy Pipeline Architect)
================================================================================{Colors.RESET}"""
    print(banner)

def log_info(msg: str):
    print(f"{Colors.BLUE}[INFO]{Colors.RESET} {msg}")

def log_success(msg: str):
    print(f"{Colors.GREEN}[SUCCESS]{Colors.RESET} {msg}")

def log_warn(msg: str):
    print(f"{Colors.YELLOW}[WARNING]{Colors.RESET} {msg}")

def log_error(msg: str):
    print(f"{Colors.RED}[ERROR]{Colors.RESET} {msg}")

def log_step(step_num: int, total_steps: int, title: str):
    print(f"\n{Colors.BOLD}{Colors.CYAN}▶ [{step_num}/{total_steps}] {title}{Colors.RESET}")
    print(f"{Colors.DIM}{'-' * 80}{Colors.RESET}")

# =============================================================================
# 全域路徑設定與常數定義
# =============================================================================
BASE_DIR = Path(__file__).resolve().parent.parent  # d:\Liao\Documents\Antigravity\Github Page
WORKSPACE_ROOT = BASE_DIR.parent                   # d:\Liao\Documents\Antigravity

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
    ".idea"
}

CRITICAL_EXCLUDE_EXTENSIONS: Set[str] = {
    ".bat", ".cmd", ".ps1", ".py", ".pyc",
    ".env", ".pdf", ".log", ".DS_Store"
}

CRITICAL_EXCLUDE_FILENAMES: Set[str] = {
    ".gitignore", "Thumbs.db", "desktop.ini", "vercel.json"
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
            "magazine.html",
            "manifest.json",
            "magazine-manifest.json",
            "sw.js",
            "favicon.ico",
            "emaki_vol3_verified.png",
            "emaki_vol7_p2_verified.png"
        ],
        "white_list_dirs": [
            "css",
            "js",
            "assets",
            "Photos_web"  # 僅允許 web 壓縮圖庫，約 4MB
        ]
    }
}

# =============================================================================
# 🛡️ 5 重安全防呆檢驗機制 (The 5 Safety Guards)
# =============================================================================

class SafetyGuardError(Exception):
    """防呆攔截專用例外"""
    pass

class SafetyGuards:
    """集中式 5 重防呆檢驗器"""

    @staticmethod
    def guard_1_max_file_size(file_path: Path, max_bytes: int = MAX_FILE_SIZE_BYTES):
        """【防呆 1】：檢查單檔大小，若 > 95MB 立刻報錯攔截，防止 GitHub 100MB 阻擋推送"""
        if not file_path.is_file():
            return
        size = file_path.stat().st_size
        if size > max_bytes:
            size_mb = size / (1024 * 1024)
            limit_mb = max_bytes / (1024 * 1024)
            raise SafetyGuardError(
                f"🚨 [防呆 1 攔截] 檔案大小超標！\n"
                f"   檔案路徑: {file_path}\n"
                f"   檔案大小: {size_mb:.2f} MB (安全上限: {limit_mb:.2f} MB)\n"
                f"   原因: GitHub 嚴格限制單檔不得超過 100MB，否則將導致 git push 永久失敗！"
            )

    @staticmethod
    def guard_2_blacklist_filter(path: Path) -> bool:
        """
        【防呆 2】：黑名單過濾，確保 1.66GB Photos/、.git、node_modules 等敏感無關檔案絕對排除。
        回傳 True 表示在黑名單中，必須排除。
        """
        for part in path.parts:
            if part in CRITICAL_EXCLUDE_DIRS:
                return True

        name = path.name
        suffix = path.suffix.lower()

        if name in CRITICAL_EXCLUDE_FILENAMES:
            return True
        if suffix in CRITICAL_EXCLUDE_EXTENSIONS:
            return True

        return False

    @staticmethod
    def guard_3_vite_base_config(config_path: Path):
        """【防呆 3】：檢查 Vite 專案是否包含 base: './'，若無則警告或阻擋"""
        if not config_path.exists():
            raise SafetyGuardError(f"🚨 [防呆 3 攔截] 找不到 Vite 設定檔: {config_path}")

        try:
            content = config_path.read_text(encoding="utf-8")
        except Exception as e:
            raise SafetyGuardError(f"🚨 [防呆 3 攔截] 無法讀取 Vite 設定檔: {config_path} ({e})")

        pattern = r"base\s*:\s*['\"](?:\./|\.)['\"]"
        if not re.search(pattern, content):
            raise SafetyGuardError(
                f"🚨 [防呆 3 攔截] Vite 設定檔缺少相對路徑配置 (base: './')！\n"
                f"   設定檔路徑: {config_path}\n"
                f"   說明: GitHub Pages 將各專案部署於子目錄下。若未設定 base: './'，\n"
                f"         打包產物引用的 JS/CSS 將指向根目錄，導致線上 404 白屏錯誤！"
            )
        log_success(f"防呆 3 驗證通過: {config_path.name} 已正確設定 base: './'")

    @staticmethod
    def guard_4_service_worker_scope(sw_path: Path):
        """
        【防呆 4】：檢查 Service Worker 快取清單中是否含有以 '/' 開頭的根路徑。
        若含有 '/'、'/index.html' 等絕對路徑，將在子路徑部署時引發跨專案快取污染或離線 404 崩潰！
        """
        if not sw_path.exists():
            log_warn(f"未檢測到 Service Worker 檔案 (跳過 Guard 4): {sw_path}")
            return

        try:
            content = sw_path.read_text(encoding="utf-8")
        except Exception as e:
            log_warn(f"讀取 Service Worker 失敗: {sw_path} ({e})")
            return

        suspicious_paths = []

        # 1. 檢驗所有陣列中的靜態快取項目
        arrays = re.findall(r"\[([\s\S]*?)\]", content)
        for block in arrays:
            items = re.findall(r"['\"]([^'\"]+)['\"]", block)
            for item in items:
                if item == "/":
                    suspicious_paths.append(item)
                elif item.startswith("/") and not item.startswith("//"):
                    if any(item.endswith(ext) for ext in [".html", ".json", ".svg", ".png", ".ico", ".css", ".js", ".webmanifest"]):
                        suspicious_paths.append(item)
                    elif any(folder in item for folder in ["/assets/", "/css/", "/js/", "/images/"]):
                        suspicious_paths.append(item)

        # 2. 檢驗直接調用 .add('/') 或 .match('/')
        direct_add = re.findall(r"\.(?:add|match)\(\s*['\"](/[^'\"/][^'\"]*|/)['\"]\s*\)", content)
        for item in direct_add:
            if not item.startswith("//"):
                suspicious_paths.append(item)

        suspicious_paths = sorted(list(set(suspicious_paths)))

        if suspicious_paths:
            raise SafetyGuardError(
                f"🚨 [防呆 4 攔截] Service Worker 快取清單含有根目錄絕對路徑！\n"
                f"   檔案路徑: {sw_path}\n"
                f"   違規快取路徑: {suspicious_paths}\n"
                f"   說明: 子專案部署於 GitHub Pages 子路徑，SW 快取清單必須使用相對路徑 (例如 './'、'index.html')，\n"
                f"         否則會請求頂級網域根目錄，造成跨專案快取污染與離線功能崩潰！"
            )
        log_success(f"防呆 4 驗證通過: {sw_path.name} 快取清單皆為合法相對路徑配置")

    @staticmethod
    def guard_5_smart_hash_sync(
        src_path: Path,
        dest_path: Path,
        dry_run: bool = False
    ) -> Tuple[str, int]:
        """
        【防呆 5】：智慧增量雜湊比對防膨脹 (Smart Hash Sync)。
        比對大小與 SHA-256 雜湊，相同檔案絕不覆蓋，防止 Git 假性膨脹。
        回傳: (狀態: 'added' | 'updated' | 'skipped', 傳輸大小 bytes)
        """
        SafetyGuards.guard_1_max_file_size(src_path)

        src_size = src_path.stat().st_size

        if not dest_path.exists():
            if not dry_run:
                dest_path.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src_path, dest_path)
            return "added", src_size

        dest_size = dest_path.stat().st_size
        if src_size != dest_size:
            if not dry_run:
                dest_path.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src_path, dest_path)
            return "updated", src_size

        src_hash = calculate_file_hash(src_path)
        dest_hash = calculate_file_hash(dest_path)

        if src_hash == dest_hash:
            return "skipped", 0
        else:
            if not dry_run:
                dest_path.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src_path, dest_path)
            return "updated", src_size


# =============================================================================
# 輔助函式庫 (Utility Functions)
# =============================================================================

def calculate_file_hash(filepath: Path, chunk_size: int = 65536) -> str:
    """計算檔案 SHA-256 雜湊值"""
    hasher = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(chunk_size):
            hasher.update(chunk)
    return hasher.hexdigest()

def get_dir_size(directory: Path) -> int:
    """遞迴計算目錄總大小"""
    total = 0
    if not directory.exists():
        return 0
    for root, _, files in os.walk(directory):
        for f in files:
            fp = Path(root) / f
            try:
                total += fp.stat().st_size
            except Exception:
                pass
    return total

def format_size(size_bytes: int) -> str:
    """人性化格式化位元組大小"""
    for unit in ["B", "KB", "MB", "GB"]:
        if size_bytes < 1024.0:
            return f"{size_bytes:.2f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.2f} TB"

def sync_directory_smartly(
    src_dir: Path,
    dest_dir: Path,
    whitelist_relative_paths: Optional[Set[Path]] = None,
    dry_run: bool = False
) -> Dict[str, any]:
    """
    對目錄進行全量智慧同步，並自動清理孤兒檔案 (Pruning)。
    """
    stats = {
        "added": 0,
        "updated": 0,
        "skipped": 0,
        "pruned": 0,
        "bytes_transferred": 0
    }

    src_files_rel: Set[Path] = set()

    if whitelist_relative_paths is not None:
        all_candidate_paths = whitelist_relative_paths
    else:
        all_candidate_paths = [
            p.relative_to(src_dir) for p in src_dir.rglob("*") if p.is_file()
        ]

    for rel_path in all_candidate_paths:
        src_file = src_dir / rel_path
        if not src_file.exists() or not src_file.is_file():
            continue

        if SafetyGuards.guard_2_blacklist_filter(src_file):
            continue

        src_files_rel.add(rel_path)
        dest_file = dest_dir / rel_path

        status, b_trans = SafetyGuards.guard_5_smart_hash_sync(src_file, dest_file, dry_run=dry_run)
        stats[status] += 1
        stats["bytes_transferred"] += b_trans

    if dest_dir.exists():
        for dest_file in list(dest_dir.rglob("*")):
            if not dest_file.is_file():
                continue
            rel_path = dest_file.relative_to(dest_dir)
            if rel_path not in src_files_rel:
                stats["pruned"] += 1
                if not dry_run:
                    try:
                        dest_file.unlink()
                    except Exception as e:
                        log_warn(f"清理孤兒檔案失敗: {dest_file} ({e})")

        if not dry_run:
            for root, dirs, _ in os.walk(dest_dir, topdown=False):
                for d in dirs:
                    dp = Path(root) / d
                    try:
                        if not any(dp.iterdir()):
                            dp.rmdir()
                    except Exception:
                        pass

    return stats


# =============================================================================
# 專案建置與發布處理器 (Project Handlers)
# =============================================================================

def deploy_vite_project(config: dict, dry_run: bool = False, skip_build: bool = False) -> bool:
    """處理 Vite 前端專案發布 (cyber-routine, showcase)"""
    name = config["name"]
    src_dir = config["src_dir"]
    dest_dir = config["dest_dir"]
    dist_dir = config["dist_dir"]
    vite_cfg = config["vite_config"]
    sw_file = config.get("sw_file")

    log_info(f"開始處理 Vite 專案: {Colors.BOLD}{name}{Colors.RESET}")

    SafetyGuards.guard_3_vite_base_config(vite_cfg)

    if sw_file:
        SafetyGuards.guard_4_service_worker_scope(sw_file)

    if not skip_build:
        if dry_run:
            log_info(f"[DRY-RUN] 模擬在 {src_dir} 執行命令: {' '.join(config['build_cmd'])}")
        else:
            log_info(f"正在執行打包命令: {' '.join(config['build_cmd'])} (位於 {src_dir}) ...")
            start_t = time.time()
            res = subprocess.run(
                config["build_cmd"],
                cwd=src_dir,
                shell=True,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace"
            )
            if res.returncode != 0:
                log_error(f"打包失敗！\n{res.stderr}")
                return False
            log_success(f"打包成功！耗時 {time.time() - start_t:.2f} 秒")

    if not dist_dir.exists():
        log_error(f"找不到打包產物目錄: {dist_dir}")
        return False

    log_info(f"正在執行增量防膨脹同步 (Smart Hash Sync): {dist_dir} ➔ {dest_dir}")
    stats = sync_directory_smartly(dist_dir, dest_dir, dry_run=dry_run)

    print(
        f"  📊 同步結果: "
        f"{Colors.GREEN}+{stats['added']} 新增{Colors.RESET}, "
        f"{Colors.YELLOW}~{stats['updated']} 更新{Colors.RESET}, "
        f"{Colors.BLUE}={stats['skipped']} 略過 (相同無變動){Colors.RESET}, "
        f"{Colors.RED}-{stats['pruned']} 清理孤兒{Colors.RESET} | "
        f"傳輸容量: {format_size(stats['bytes_transferred'])}"
    )
    return True


def deploy_osaka_project(config: dict, dry_run: bool = False) -> bool:
    """
    處理 Osaka 專案發布 (原生雙入口網頁 + PWA 離線地圖)。
    嚴格過濾 1.66GB 原始 Photos/，僅搬移 Photos_web/ 與核心靜態資源。
    """
    name = config["name"]
    src_dir = config["src_dir"]
    dest_dir = config["dest_dir"]
    sw_file = config.get("sw_file")

    log_info(f"開始處理靜態專案: {Colors.BOLD}{name}{Colors.RESET}")

    if sw_file:
        SafetyGuards.guard_4_service_worker_scope(sw_file)

    whitelist_paths: Set[Path] = set()

    for fname in config["white_list_files"]:
        fpath = src_dir / fname
        if fpath.exists() and fpath.is_file():
            whitelist_paths.add(Path(fname))

    for dname in config["white_list_dirs"]:
        dirpath = src_dir / dname
        if dirpath.exists() and dirpath.is_dir():
            for sub_file in dirpath.rglob("*"):
                if sub_file.is_file():
                    rel = sub_file.relative_to(src_dir)
                    if not SafetyGuards.guard_2_blacklist_filter(sub_file):
                        whitelist_paths.add(rel)

    for rel in whitelist_paths:
        parts = rel.parts
        if parts[0] == "Photos":
            raise SafetyGuardError(f"🚨 [關鍵防呆攔截] 偵測到原始相簿 Photos/ 檔案試圖進入發布清單: {rel}")

    log_info(f"大阪白名單過濾完成，共有 {len(whitelist_paths)} 個有效發布檔案 (已徹底排除 1.66GB 原始圖庫)")

    log_info(f"正在執行增量防膨脹同步: {src_dir} ➔ {dest_dir}")
    stats = sync_directory_smartly(
        src_dir,
        dest_dir,
        whitelist_relative_paths=whitelist_paths,
        dry_run=dry_run
    )

    print(
        f"  📊 同步結果: "
        f"{Colors.GREEN}+{stats['added']} 新增{Colors.RESET}, "
        f"{Colors.YELLOW}~{stats['updated']} 更新{Colors.RESET}, "
        f"{Colors.BLUE}={stats['skipped']} 略過 (相同無變動){Colors.RESET}, "
        f"{Colors.RED}-{stats['pruned']} 清理孤兒{Colors.RESET} | "
        f"傳輸容量: {format_size(stats['bytes_transferred'])}"
    )
    return True


# =============================================================================
# 🧹 Git 歷史壓平工具 (--prune-history)
# =============================================================================

def prune_git_history(dry_run: bool = False) -> bool:
    """
    壓平公開 GitHub Pages 倉庫的 Git 歷史紀錄 (Orphan Branch Squash)。
    徹底清空以往 commit 累積的所有歷史大圖 Blob，將儲存庫縮小至極限。
    """
    log_step(1, 1, "壓平公開部署倉庫 Git 歷史紀錄 (Git History Squash)")

    git_dir = BASE_DIR / ".git"
    if not git_dir.exists():
        log_error(f"目標目錄不是有效的 Git 倉庫: {BASE_DIR}")
        return False

    initial_size = get_dir_size(git_dir)
    log_info(f"當前 .git 儲存庫大小: {Colors.BOLD}{format_size(initial_size)}{Colors.RESET}")

    res = subprocess.run(
        ["git", "rev-parse", "--abbrev-ref", "HEAD"],
        cwd=BASE_DIR,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace"
    )
    branch = res.stdout.strip()
    if not branch or branch == "HEAD":
        branch = "main"

    log_info(f"當前工作分支: {Colors.CYAN}{branch}{Colors.RESET}")

    commands = [
        ["git", "checkout", "--orphan", "temp_squash_deploy"],
        ["git", "add", "-A"],
        ["git", "commit", "-m", "deploy: release & squash history"],
        ["git", "branch", "-D", branch],
        ["git", "branch", "-m", branch]
    ]

    if dry_run:
        log_info("[DRY-RUN] 模擬壓平歷史，將依序執行以下 Git 指令：")
        for cmd in commands:
            print(f"   $ {' '.join(cmd)}")
        return True

    log_warn("⚠️  即將壓平 Git 歷史為單一發布 Commit，所有舊提交記錄將被合併！")
    try:
        for cmd in commands:
            log_info(f"執行: {' '.join(cmd)}")
            r = subprocess.run(cmd, cwd=BASE_DIR, capture_output=True, text=True, encoding="utf-8", errors="replace")
            if r.returncode != 0 and "branch -D" not in ' '.join(cmd):
                log_warn(f"Git 命令訊息: {r.stderr.strip()}")

        subprocess.run(["git", "gc", "--prune=now", "--aggressive"], cwd=BASE_DIR, capture_output=True, encoding="utf-8", errors="replace")

        final_size = get_dir_size(git_dir)
        saved = initial_size - final_size
        log_success(
            f"Git 歷史壓平完成！\n"
            f"   壓平前: {format_size(initial_size)}\n"
            f"   壓平後: {format_size(final_size)}\n"
            f"   節省空間: {format_size(saved)}"
        )

        # 詢問並執行強制推送至遠端 GitHub
        try:
            confirm = input(f"\n{Colors.CYAN}是否立即強制推送 (git push -f origin {branch}) 至遠端 GitHub？ [Y/n]: {Colors.RESET}").strip().lower()
        except (KeyboardInterrupt, EOFError):
            confirm = "n"

        if confirm in ("", "y", "yes"):
            log_info(f"正在強制推送至遠端 GitHub Pages (git push -f origin {branch})...")
            push_res = subprocess.run(
                ["git", "push", "-f", "origin", branch],
                cwd=BASE_DIR,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace"
            )
            if push_res.returncode == 0:
                log_success("🎉 已成功強制推送至遠端 GitHub Pages！")
            else:
                log_error(f"推送至遠端失敗: {push_res.stderr.strip()}")
                log_info(f"手動推送指令: git push -f origin {branch}")
        else:
            log_info(f"已略過推送。您可隨時手動推送: git push -f origin {branch}")

        return True
    except Exception as e:
        log_error(f"壓平歷史失敗: {e}")
        return False


# =============================================================================
# CLI 主程式進入點 (Main Entry Point)
# =============================================================================

def parse_args():
    parser = argparse.ArgumentParser(
        description="🚀 GitHub Pages 多專案統一智慧發布與防呆管線",
        formatter_class=argparse.RawTextHelpFormatter
    )
    parser.add_argument("--all", action="store_true", help="全量發布所有子專案 (cyber, showcase, osaka)")
    parser.add_argument("--cyber", action="store_true", help="僅發布賽博日常專案 (cyber-routine)")
    parser.add_argument("--showcase", action="store_true", help="僅發布當代收藏品藝廊 (showcase)")
    parser.add_argument("--osaka", action="store_true", help="僅發布大阪雙入口旅行攻略 (osaka)")
    parser.add_argument("--dry-run", action="store_true", help="乾跑模式 (只進行 5 重防呆與變更比對，不實際寫入檔案)")
    parser.add_argument("--prune-history", action="store_true", help="壓平公開倉庫的 Git 歷史紀錄以縮減尺寸")
    parser.add_argument("--skip-build", action="store_true", help="跳過 npm run build (直接使用既有 dist/ 進行同步)")
    parser.add_argument("--menu", action="store_true", help="啟動互動式選單介面")

    return parser.parse_args()


def interactive_menu():
    """提供高質感終端互動選單"""
    while True:
        print_banner()
        print(f"  {Colors.BOLD}[1]{Colors.RESET} 🚀 全量發布 (All Projects: cyber-routine + showcase + osaka)")
        print(f"  {Colors.BOLD}[2]{Colors.RESET} ⚡ 僅發布 賽博日常 (cyber-routine)")
        print(f"  {Colors.BOLD}[3]{Colors.RESET} 🎨 僅發布 當代收藏品藝廊 (showcase)")
        print(f"  {Colors.BOLD}[4]{Colors.RESET} 🏯 僅發布 大阪旅行攻略 (osaka)")
        print(f"  {Colors.BOLD}[5]{Colors.RESET} 🔍 模擬乾跑檢查 (Dry-run All: 僅防呆驗證與比對，不寫入檔案)")
        print(f"  {Colors.BOLD}[6]{Colors.RESET} 🧹 壓平公開倉庫 Git 歷史 (Prune History: 清理過往歷史大圖 Blob)")
        print(f"  {Colors.BOLD}[0]{Colors.RESET} 🚪 離開 (Exit)")
        print(f"{Colors.DIM}{'-' * 80}{Colors.RESET}")

        try:
            choice = input(f"{Colors.CYAN}請輸入操作編號 [0-6]: {Colors.RESET}").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n已退出。")
            sys.exit(0)

        if choice == "1":
            run_deploy(targets=["cyber", "showcase", "osaka"], dry_run=False)
        elif choice == "2":
            run_deploy(targets=["cyber"], dry_run=False)
        elif choice == "3":
            run_deploy(targets=["showcase"], dry_run=False)
        elif choice == "4":
            run_deploy(targets=["osaka"], dry_run=False)
        elif choice == "5":
            run_deploy(targets=["cyber", "showcase", "osaka"], dry_run=True)
        elif choice == "6":
            prune_git_history(dry_run=False)
        elif choice == "0":
            print("感謝使用，發布管線已退出。")
            sys.exit(0)
        else:
            log_warn("無效的輸入，請輸入 0 至 6！")

        print("\n")
        try:
            input(f"{Colors.DIM}按 Enter 鍵返回選單...{Colors.RESET}")
        except (KeyboardInterrupt, EOFError):
            sys.exit(0)


def run_deploy(targets: List[str], dry_run: bool = False, skip_build: bool = False) -> bool:
    if dry_run:
        print(f"{Colors.BOLD}{Colors.YELLOW}🔍 【DRY-RUN 模擬乾跑模式】已啟用：僅執行防呆檢查與比對，不更動任何目標檔案。{Colors.RESET}\n")

    total_steps = len(targets)
    current_step = 0
    results: Dict[str, bool] = {}

    start_time = time.time()

    for target_key in targets:
        current_step += 1
        cfg = PROJECT_CONFIGS[target_key]
        log_step(current_step, total_steps, f"發布專案：{cfg['name']}")

        try:
            if cfg["type"] == "vite":
                ok = deploy_vite_project(cfg, dry_run=dry_run, skip_build=skip_build)
            elif cfg["type"] == "static":
                ok = deploy_osaka_project(cfg, dry_run=dry_run)
            else:
                log_error(f"未知的專案類型: {cfg['type']}")
                ok = False
            results[cfg['name']] = ok
        except SafetyGuardError as sge:
            log_error(str(sge))
            results[cfg['name']] = False
        except Exception as ex:
            log_error(f"處理專案時發生未預期錯誤: {ex}")
            results[cfg['name']] = False

    elapsed = time.time() - start_time
    print(f"\n{Colors.BOLD}{Colors.CYAN}{'=' * 80}{Colors.RESET}")
    print(f"{Colors.BOLD}📋 發布作業總結報告 (總耗時: {elapsed:.2f} 秒){Colors.RESET}")
    print(f"{Colors.DIM}{'-' * 80}{Colors.RESET}")

    all_passed = True
    for name, ok in results.items():
        if ok:
            status_text = f"{Colors.GREEN}✔ 成功 (SUCCESS){Colors.RESET}"
        else:
            status_text = f"{Colors.RED}✖ 失敗 (FAILED){Colors.RESET}"
            all_passed = False
        print(f"  • {name.ljust(35)} : {status_text}")

    print(f"{Colors.BOLD}{Colors.CYAN}{'=' * 80}{Colors.RESET}")

    if all_passed:
        log_success("🎉 所有指定專案皆已通過 5 重防呆檢驗並完成發布準備！")

        # 若非乾跑模式，檢查 Git 狀態並引導/執行提交與推送
        if not dry_run and (BASE_DIR / ".git").exists():
            branch_res = subprocess.run(
                ["git", "rev-parse", "--abbrev-ref", "HEAD"],
                cwd=BASE_DIR,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace"
            )
            branch = branch_res.stdout.strip() or "main"

            status_res = subprocess.run(
                ["git", "status", "--porcelain"],
                cwd=BASE_DIR,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace"
            )
            has_changes = bool(status_res.stdout.strip())

            ahead_res = subprocess.run(
                ["git", "status", "-uno"],
                cwd=BASE_DIR,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace"
            )
            is_ahead = "Your branch is ahead" in ahead_res.stdout

            if has_changes:
                print(f"\n{Colors.CYAN}偵測到公開部署檔案有新增或變更。{Colors.RESET}")
                try:
                    confirm = input(f"{Colors.BOLD}{Colors.CYAN}是否立即 Commit 並推送 (git push origin {branch}) 至 GitHub？ [Y/n]: {Colors.RESET}").strip().lower()
                except (KeyboardInterrupt, EOFError):
                    confirm = "n"

                if confirm in ("", "y", "yes"):
                    commit_msg = f"deploy: sync updates for {', '.join(targets)}"
                    subprocess.run(["git", "add", "-A"], cwd=BASE_DIR)
                    subprocess.run(["git", "commit", "-m", commit_msg], cwd=BASE_DIR)
                    log_info(f"正在推送至遠端 GitHub Pages (git push origin {branch})...")
                    push_res = subprocess.run(
                        ["git", "push", "origin", branch],
                        cwd=BASE_DIR,
                        capture_output=True,
                        text=True,
                        encoding="utf-8",
                        errors="replace"
                    )
                    if push_res.returncode == 0:
                        log_success("🎉 已成功推送至遠端 GitHub Pages！")
                    else:
                        log_error(f"推送失敗: {push_res.stderr.strip()}")
                        log_info(f"您可稍後手動推送: git push origin {branch}")
                else:
                    log_info(f"已略過推送。您可隨時手動推送: git push origin {branch}")
            elif is_ahead:
                print(f"\n{Colors.CYAN}本地有尚未推送至遠端的 Commit。{Colors.RESET}")
                try:
                    confirm = input(f"{Colors.BOLD}{Colors.CYAN}是否立即推送 (git push origin {branch}) 至 GitHub？ [Y/n]: {Colors.RESET}").strip().lower()
                except (KeyboardInterrupt, EOFError):
                    confirm = "n"

                if confirm in ("", "y", "yes"):
                    log_info(f"正在推送至遠端 GitHub Pages (git push origin {branch})...")
                    push_res = subprocess.run(
                        ["git", "push", "origin", branch],
                        cwd=BASE_DIR,
                        capture_output=True,
                        text=True,
                        encoding="utf-8",
                        errors="replace"
                    )
                    if push_res.returncode == 0:
                        log_success("🎉 已成功推送至遠端 GitHub Pages！")
                    else:
                        log_error(f"推送失敗: {push_res.stderr.strip()}")
                else:
                    log_info(f"已略過推送。您可隨時手動推送: git push origin {branch}")
            else:
                log_info("本地檔案與遠端已是最新同步狀態，無須額外推送。")

        return True
    else:
        log_error("⚠️  部分專案未通過發布管線，請檢查上述錯誤日誌進行修正。")
        return False


def main():
    args = parse_args()

    if args.menu:
        interactive_menu()
        return

    if args.prune_history:
        print_banner()
        success = prune_git_history(dry_run=args.dry_run)
        sys.exit(0 if success else 1)

    targets: List[str] = []
    if args.all:
        targets = ["cyber", "showcase", "osaka"]
    else:
        if args.cyber:
            targets.append("cyber")
        if args.showcase:
            targets.append("showcase")
        if args.osaka:
            targets.append("osaka")

    if not targets:
        interactive_menu()
        return

    print_banner()
    success = run_deploy(targets, dry_run=args.dry_run, skip_build=args.skip_build)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
