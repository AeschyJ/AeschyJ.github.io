"""公開倉庫 Git 歷史壓平與互動式提交／推送管理。"""

from __future__ import annotations

import os
import subprocess
from pathlib import Path
from typing import List

from .config import (
    BASE_DIR,
    Colors,
    format_size,
    log_error,
    log_info,
    log_step,
    log_success,
    log_warn,
)


def _run_git(
    args: List[str],
    cwd: Path = BASE_DIR,
    capture_output: bool = True,
) -> subprocess.CompletedProcess:
    """統一使用 UTF-8 編碼與 shell=False 執行 Git 命令。"""
    if capture_output:
        return subprocess.run(
            ["git", *args],
            cwd=cwd,
            shell=False,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
    return subprocess.run(["git", *args], cwd=cwd, shell=False)


def get_dir_size(directory: Path) -> int:
    """遞迴計算目錄總大小。"""
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


def get_current_branch(cwd: Path = BASE_DIR) -> str:
    """取得目前 Git 分支名稱；若處於 detached HEAD 或空值則退回 main。"""
    res = _run_git(["rev-parse", "--abbrev-ref", "HEAD"], cwd=cwd)
    branch = res.stdout.strip()
    if not branch or branch == "HEAD":
        return "main"
    return branch


def _read_confirm(prompt_text: str) -> str:
    """安全讀取互動確認輸入，捕捉 Ctrl+C / EOF。"""
    try:
        return input(prompt_text).strip().lower()
    except (KeyboardInterrupt, EOFError):
        return "n"


def _push_to_remote(
    branch: str,
    cwd: Path,
    *,
    force: bool = False,
    error_label: str = "推送失敗",
    manual_prefix: str = "您可稍後手動推送",
) -> None:
    """執行推送至遠端 origin 並輸出標準狀態訊息。"""
    push_args = ["push", "-f", "origin", branch] if force else ["push", "origin", branch]
    push_cmd_str = " ".join(["git", *push_args])
    action_label = "正在強制推送至遠端 GitHub Pages" if force else "正在推送至遠端 GitHub Pages"
    log_info(f"{action_label} ({push_cmd_str})...")

    push_res = _run_git(push_args, cwd=cwd)
    if push_res.returncode == 0:
        success_msg = (
            "🎉 已成功強制推送至遠端 GitHub Pages！"
            if force
            else "🎉 已成功推送至遠端 GitHub Pages！"
        )
        log_success(success_msg)
    else:
        log_error(f"{error_label}: {push_res.stderr.strip()}")
        log_info(f"{manual_prefix}: {push_cmd_str}")


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

    branch = get_current_branch(BASE_DIR)
    log_info(f"當前工作分支: {Colors.CYAN}{branch}{Colors.RESET}")

    commands = [
        ["git", "checkout", "--orphan", "temp_squash_deploy"],
        ["git", "add", "-A"],
        ["git", "commit", "-m", "deploy: release & squash history"],
        ["git", "branch", "-D", branch],
        ["git", "branch", "-m", branch],
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
            r = _run_git(cmd[1:], cwd=BASE_DIR)
            if r.returncode != 0 and "branch -D" not in " ".join(cmd):
                log_warn(f"Git 命令訊息: {r.stderr.strip()}")

        _run_git(["gc", "--prune=now", "--aggressive"], cwd=BASE_DIR)

        final_size = get_dir_size(git_dir)
        saved = initial_size - final_size
        log_success(
            f"Git 歷史壓平完成！\n"
            f"   壓平前: {format_size(initial_size)}\n"
            f"   壓平後: {format_size(final_size)}\n"
            f"   節省空間: {format_size(saved)}"
        )

        confirm = _read_confirm(
            f"\n{Colors.CYAN}是否立即強制推送 (git push -f origin {branch}) 至遠端 GitHub？ [Y/n]: {Colors.RESET}"
        )
        if confirm in ("", "y", "yes"):
            _push_to_remote(
                branch,
                BASE_DIR,
                force=True,
                error_label="推送至遠端失敗",
                manual_prefix="手動推送指令",
            )
        else:
            log_info(f"已略過推送。您可隨時手動推送: git push -f origin {branch}")

        return True
    except Exception as e:
        log_error(f"壓平歷史失敗: {e}")
        return False


def prompt_commit_and_push(targets: List[str], base_dir: Path = BASE_DIR) -> None:
    """檢查公開部署倉庫狀態，並互動引導使用者提交與推送變更。"""
    branch = get_current_branch(base_dir)
    status_res = _run_git(["status", "--porcelain"], cwd=base_dir)
    has_changes = bool(status_res.stdout.strip())

    ahead_res = _run_git(["status", "-uno"], cwd=base_dir)
    is_ahead = "Your branch is ahead" in ahead_res.stdout

    if has_changes:
        print(f"\n{Colors.CYAN}偵測到公開部署檔案有新增或變更。{Colors.RESET}")
        confirm = _read_confirm(
            f"{Colors.BOLD}{Colors.CYAN}是否立即 Commit 並推送 (git push origin {branch}) 至 GitHub？ [Y/n]: {Colors.RESET}"
        )
        if confirm in ("", "y", "yes"):
            commit_msg = f"deploy: sync updates for {', '.join(targets)}"
            _run_git(["add", "-A"], cwd=base_dir, capture_output=False)
            _run_git(["commit", "-m", commit_msg], cwd=base_dir, capture_output=False)
            _push_to_remote(branch, base_dir, force=False)
        else:
            log_info(f"已略過推送。您可隨時手動推送: git push origin {branch}")
    elif is_ahead:
        print(f"\n{Colors.CYAN}本地有尚未推送至遠端的 Commit。{Colors.RESET}")
        confirm = _read_confirm(
            f"{Colors.BOLD}{Colors.CYAN}是否立即推送 (git push origin {branch}) 至 GitHub？ [Y/n]: {Colors.RESET}"
        )
        if confirm in ("", "y", "yes"):
            _push_to_remote(branch, base_dir, force=False)
        else:
            log_info(f"已略過推送。您可隨時手動推送: git push origin {branch}")
    else:
        log_info("本地檔案與遠端已是最新同步狀態，無須額外推送。")
