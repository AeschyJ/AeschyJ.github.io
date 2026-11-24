"""智慧增量同步與各類型子專案發布處理器。"""

from __future__ import annotations

import os
import shutil
import subprocess
import time
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Set

from .config import (
    Colors,
    format_size,
    log_error,
    log_info,
    log_success,
    log_warn,
)
from .guards import SafetyGuardError, SafetyGuards


def resolve_command(cmd: List[str]) -> List[str]:
    """解析命令的完整執行檔路徑（支援 Windows .CMD 與 POSIX），避免使用 shell=True。"""
    if not cmd:
        return []
    resolved = shutil.which(cmd[0])
    if resolved:
        return [resolved, *cmd[1:]]
    return list(cmd)


def _print_sync_summary(stats: Dict[str, int]) -> None:
    """統一輸出智慧增量同步統計摘要。"""
    print(
        f"  📊 同步結果: "
        f"{Colors.GREEN}+{stats['added']} 新增{Colors.RESET}, "
        f"{Colors.YELLOW}~{stats['updated']} 更新{Colors.RESET}, "
        f"{Colors.BLUE}={stats['skipped']} 略過 (相同無變動){Colors.RESET}, "
        f"{Colors.RED}-{stats['pruned']} 清理孤兒{Colors.RESET} | "
        f"傳輸容量: {format_size(stats['bytes_transferred'])}"
    )


def _prune_orphans_and_empty_dirs(
    dest_dir: Path,
    src_files_rel: Set[Path],
    dry_run: bool,
) -> int:
    """清理目標目錄中已不存在於來源清單的孤兒檔案與空資料夾。"""
    if not dest_dir.exists():
        return 0

    pruned = 0
    for dest_file in list(dest_dir.rglob("*")):
        if not dest_file.is_file():
            continue
        if dest_file.relative_to(dest_dir) in src_files_rel:
            continue
        pruned += 1
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
    return pruned


def sync_directory_smartly(
    src_dir: Path,
    dest_dir: Path,
    whitelist_relative_paths: Optional[Set[Path]] = None,
    dry_run: bool = False,
) -> Dict[str, int]:
    """對目錄進行全量智慧同步，並自動清理孤兒檔案 (Pruning)。"""
    stats: Dict[str, int] = {
        "added": 0,
        "updated": 0,
        "skipped": 0,
        "pruned": 0,
        "bytes_transferred": 0,
    }

    src_files_rel: Set[Path] = set()
    candidates: Iterable[Path] = (
        whitelist_relative_paths
        if whitelist_relative_paths is not None
        else [p.relative_to(src_dir) for p in src_dir.rglob("*") if p.is_file()]
    )

    for rel_path in candidates:
        src_file = src_dir / rel_path
        if not src_file.exists() or not src_file.is_file():
            continue
        if SafetyGuards.guard_2_blacklist_filter(src_file):
            continue

        src_files_rel.add(rel_path)
        status, b_trans = SafetyGuards.guard_5_smart_hash_sync(
            src_file,
            dest_dir / rel_path,
            dry_run=dry_run,
        )
        stats[status] += 1
        stats["bytes_transferred"] += b_trans

    stats["pruned"] = _prune_orphans_and_empty_dirs(dest_dir, src_files_rel, dry_run)
    return stats


def deploy_vite_project(
    config: dict,
    dry_run: bool = False,
    skip_build: bool = False,
) -> bool:
    """處理 Vite 前端專案發布 (cyber-routine, showcase)。"""
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
        cmd_text = " ".join(config["build_cmd"])
        if dry_run:
            log_info(f"[DRY-RUN] 模擬在 {src_dir} 執行命令: {cmd_text}")
        else:
            log_info(f"正在執行打包命令: {cmd_text} (位於 {src_dir}) ...")
            start_t = time.time()
            try:
                res = subprocess.run(
                    resolve_command(config["build_cmd"]),
                    cwd=src_dir,
                    shell=False,
                    capture_output=True,
                    text=True,
                    encoding="utf-8",
                    errors="replace",
                )
            except FileNotFoundError as exc:
                log_error(f"找不到打包執行檔 ({config['build_cmd'][0]}): {exc}")
                return False

            if res.returncode != 0:
                log_error(f"打包失敗！\n{res.stderr}")
                return False
            log_success(f"打包成功！耗時 {time.time() - start_t:.2f} 秒")

    if not dist_dir.exists():
        log_error(f"找不到打包產物目錄: {dist_dir}")
        return False

    log_info(f"正在執行增量防膨脹同步 (Smart Hash Sync): {dist_dir} ➔ {dest_dir}")
    stats = sync_directory_smartly(dist_dir, dest_dir, dry_run=dry_run)
    _print_sync_summary(stats)
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
        if not dirpath.exists() or not dirpath.is_dir():
            continue
        for sub_file in dirpath.rglob("*"):
            if not sub_file.is_file():
                continue
            if not SafetyGuards.guard_2_blacklist_filter(sub_file):
                whitelist_paths.add(sub_file.relative_to(src_dir))

    for rel in whitelist_paths:
        if rel.parts and rel.parts[0] == "Photos":
            raise SafetyGuardError(
                f"🚨 [關鍵防呆攔截] 偵測到原始相簿 Photos/ 檔案試圖進入發布清單: {rel}"
            )

    log_info(
        f"大阪白名單過濾完成，共有 {len(whitelist_paths)} 個有效發布檔案 (已徹底排除 1.66GB 原始圖庫)"
    )

    log_info(f"正在執行增量防膨脹同步: {src_dir} ➔ {dest_dir}")
    stats = sync_directory_smartly(
        src_dir,
        dest_dir,
        whitelist_relative_paths=whitelist_paths,
        dry_run=dry_run,
    )
    _print_sync_summary(stats)
    return True
