"""5 重安全防呆檢驗機制與檔案雜湊計算工具。"""

from __future__ import annotations

import hashlib
import re
import shutil
from pathlib import Path
from typing import Tuple

from .config import (
    CRITICAL_EXCLUDE_DIRS,
    CRITICAL_EXCLUDE_EXTENSIONS,
    CRITICAL_EXCLUDE_FILENAMES,
    MAX_FILE_SIZE_BYTES,
    log_success,
    log_warn,
)

_SW_STATIC_EXTS = (
    ".html",
    ".json",
    ".svg",
    ".png",
    ".ico",
    ".css",
    ".js",
    ".webmanifest",
)
_SW_STATIC_FOLDERS = ("/assets/", "/css/", "/js/", "/images/")


def calculate_file_hash(filepath: Path, chunk_size: int = 65536) -> str:
    """計算檔案 SHA-256 雜湊值。"""
    hasher = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(chunk_size):
            hasher.update(chunk)
    return hasher.hexdigest()


class SafetyGuardError(Exception):
    """防呆攔截專用例外。"""


def _is_suspicious_sw_path(item: str) -> bool:
    """判斷 Service Worker 快取陣列中的項目是否為根目錄絕對路徑。"""
    if item == "/":
        return True
    if not item.startswith("/") or item.startswith("//"):
        return False
    return item.endswith(_SW_STATIC_EXTS) or any(
        folder in item for folder in _SW_STATIC_FOLDERS
    )


def _copy_if_not_dry_run(src_path: Path, dest_path: Path, dry_run: bool) -> None:
    """在非 dry-run 模式下建立目標父目錄並保留 metadata 複製檔案。"""
    if dry_run:
        return
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src_path, dest_path)


class SafetyGuards:
    """集中式 5 重防呆檢驗器。"""

    @staticmethod
    def guard_1_max_file_size(
        file_path: Path,
        max_bytes: int = MAX_FILE_SIZE_BYTES,
    ) -> None:
        """【防呆 1】：檢查單檔大小，若 > 95MB 立刻報錯攔截，防止 GitHub 100MB 阻擋推送。"""
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
        if any(part in CRITICAL_EXCLUDE_DIRS for part in path.parts):
            return True

        if path.name in CRITICAL_EXCLUDE_FILENAMES:
            return True

        return path.suffix.lower() in CRITICAL_EXCLUDE_EXTENSIONS

    @staticmethod
    def guard_3_vite_base_config(config_path: Path) -> None:
        """【防呆 3】：檢查 Vite 專案是否包含 base: './'，若無則警告或阻擋。"""
        if not config_path.exists():
            raise SafetyGuardError(f"🚨 [防呆 3 攔截] 找不到 Vite 設定檔: {config_path}")

        try:
            content = config_path.read_text(encoding="utf-8")
        except Exception as e:
            raise SafetyGuardError(
                f"🚨 [防呆 3 攔截] 無法讀取 Vite 設定檔: {config_path} ({e})"
            ) from e

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
    def guard_4_service_worker_scope(sw_path: Path) -> None:
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
        for block in re.findall(r"\[([\s\S]*?)\]", content):
            for item in re.findall(r"['\"]([^'\"]+)['\"]", block):
                if _is_suspicious_sw_path(item):
                    suspicious_paths.append(item)

        # 2. 檢驗直接調用 .add('/') 或 .match('/')
        direct_add = re.findall(
            r"\.(?:add|match)\(\s*['\"](/[^'\"/][^'\"]*|/)['\"]\s*\)",
            content,
        )
        for item in direct_add:
            if not item.startswith("//"):
                suspicious_paths.append(item)

        unique_suspicious = sorted(set(suspicious_paths))

        if unique_suspicious:
            raise SafetyGuardError(
                f"🚨 [防呆 4 攔截] Service Worker 快取清單含有根目錄絕對路徑！\n"
                f"   檔案路徑: {sw_path}\n"
                f"   違規快取路徑: {unique_suspicious}\n"
                f"   說明: 子專案部署於 GitHub Pages 子路徑，SW 快取清單必須使用相對路徑 (例如 './'、'index.html')，\n"
                f"         否則會請求頂級網域根目錄，造成跨專案快取污染與離線功能崩潰！"
            )
        log_success(f"防呆 4 驗證通過: {sw_path.name} 快取清單皆為合法相對路徑配置")

    @staticmethod
    def guard_5_smart_hash_sync(
        src_path: Path,
        dest_path: Path,
        dry_run: bool = False,
    ) -> Tuple[str, int]:
        """
        【防呆 5】：智慧增量雜湊比對防膨脹 (Smart Hash Sync)。
        比對大小與 SHA-256 雜湊，相同檔案絕不覆蓋，防止 Git 假性膨脹。
        回傳: (狀態: 'added' | 'updated' | 'skipped', 傳輸大小 bytes)
        """
        SafetyGuards.guard_1_max_file_size(src_path)

        src_size = src_path.stat().st_size

        if not dest_path.exists():
            _copy_if_not_dry_run(src_path, dest_path, dry_run)
            return "added", src_size

        dest_size = dest_path.stat().st_size
        if src_size != dest_size:
            _copy_if_not_dry_run(src_path, dest_path, dry_run)
            return "updated", src_size

        src_hash = calculate_file_hash(src_path)
        dest_hash = calculate_file_hash(dest_path)

        if src_hash == dest_hash:
            return "skipped", 0

        _copy_if_not_dry_run(src_path, dest_path, dry_run)
        return "updated", src_size
