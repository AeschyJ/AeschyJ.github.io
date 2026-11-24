"""GitHub Pages 多專案智慧發布管線薄主入口 (CLI & 互動選單路由)。"""

from __future__ import annotations

import argparse
import sys
import time
from pathlib import Path
from typing import Dict, List

_SCRIPTS_DIR = Path(__file__).resolve().parent
if str(_SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPTS_DIR))

from deploy.config import BASE_DIR, Colors, PROJECT_CONFIGS, configure_console, log_error, log_step, log_success, log_warn, print_banner  # noqa: E402
from deploy.git_ops import prompt_commit_and_push, prune_git_history  # noqa: E402
from deploy.guards import SafetyGuardError  # noqa: E402
from deploy.sync import deploy_osaka_project, deploy_vite_project  # noqa: E402

configure_console()

MENU_ENTRIES = (
    ("1", "🚀 全量發布 (All Projects: cyber-routine + showcase + osaka)", (["cyber", "showcase", "osaka"], False)),
    ("2", "⚡ 僅發布 賽博日常 (cyber-routine)", (["cyber"], False)),
    ("3", "🎨 僅發布 當代收藏品藝廊 (showcase)", (["showcase"], False)),
    ("4", "🏯 僅發布 大阪旅行攻略 (osaka)", (["osaka"], False)),
    ("5", "🔍 模擬乾跑檢查 (Dry-run All: 僅防呆驗證與比對，不寫入檔案)", (["cyber", "showcase", "osaka"], True)),
    ("6", "🧹 壓平公開倉庫 Git 歷史 (Prune History: 清理過往歷史大圖 Blob)", None),
    ("0", "🚪 離開 (Exit)", None),
)


def parse_args() -> argparse.Namespace:
    """解析命令列發布參數。"""
    parser = argparse.ArgumentParser(description="🚀 GitHub Pages 多專案統一智慧發布與防呆管線", formatter_class=argparse.RawTextHelpFormatter)
    for flag, help_text in (
        ("--all", "全量發布所有子專案 (cyber, showcase, osaka)"), ("--cyber", "僅發布賽博日常專案 (cyber-routine)"),
        ("--showcase", "僅發布當代收藏品藝廊 (showcase)"), ("--osaka", "僅發布大阪雙入口旅行攻略 (osaka)"),
        ("--dry-run", "乾跑模式 (只進行 5 重防呆與變更比對，不實際寫入檔案)"), ("--prune-history", "壓平公開倉庫的 Git 歷史紀錄以縮減尺寸"),
        ("--skip-build", "跳過 npm run build (直接使用既有 dist/ 進行同步)"), ("--menu", "啟動互動式選單介面"),
    ):
        parser.add_argument(flag, action="store_true", help=help_text)
    return parser.parse_args()


def _execute_target(cfg: dict, dry_run: bool, skip_build: bool) -> bool:
    """依專案類型派發對應部署處理器並攔截預期例外。"""
    try:
        if cfg["type"] == "vite":
            return deploy_vite_project(cfg, dry_run=dry_run, skip_build=skip_build)
        if cfg["type"] == "static":
            return deploy_osaka_project(cfg, dry_run=dry_run)
        log_error(f"未知的專案類型: {cfg['type']}")
    except SafetyGuardError as sge:
        log_error(str(sge))
    except Exception as ex:
        log_error(f"處理專案時發生未預期錯誤: {ex}")
    return False


def run_deploy(targets: List[str], dry_run: bool = False, skip_build: bool = False) -> bool:
    """執行指定子專案列表的防呆檢查、打包與增量同步。"""
    if dry_run:
        print(f"{Colors.BOLD}{Colors.YELLOW}🔍 【DRY-RUN 模擬乾跑模式】已啟用：僅執行防呆檢查與比對，不更動任何目標檔案。{Colors.RESET}\n")

    results: Dict[str, bool] = {}
    start_time = time.time()
    for idx, target_key in enumerate(targets, start=1):
        cfg = PROJECT_CONFIGS[target_key]
        log_step(idx, len(targets), f"發布專案：{cfg['name']}")
        results[cfg["name"]] = _execute_target(cfg, dry_run=dry_run, skip_build=skip_build)

    elapsed = time.time() - start_time
    divider = f"{Colors.BOLD}{Colors.CYAN}{'=' * 80}{Colors.RESET}"
    print(f"\n{divider}\n{Colors.BOLD}📋 發布作業總結報告 (總耗時: {elapsed:.2f} 秒){Colors.RESET}\n{Colors.DIM}{'-' * 80}{Colors.RESET}")
    for name, ok in results.items():
        status_text = f"{Colors.GREEN}✔ 成功 (SUCCESS){Colors.RESET}" if ok else f"{Colors.RED}✖ 失敗 (FAILED){Colors.RESET}"
        print(f"  • {name.ljust(35)} : {status_text}")
    print(divider)

    if not all(results.values()):
        log_error("⚠️  部分專案未通過發布管線，請檢查上述錯誤日誌進行修正。")
        return False
    log_success("🎉 所有指定專案皆已通過 5 重防呆檢驗並完成發布準備！")
    if not dry_run and (BASE_DIR / ".git").exists():
        prompt_commit_and_push(targets, base_dir=BASE_DIR)
    return True


def _safe_input(prompt_text: str, exit_msg: str = "") -> str:
    """安全讀取終端機輸入，捕捉 Ctrl+C 或 EOF 並優雅結束。"""
    try:
        return input(prompt_text).strip()
    except (KeyboardInterrupt, EOFError):
        if exit_msg:
            print(exit_msg)
        sys.exit(0)


def interactive_menu() -> None:
    """提供終端互動式發布選單。"""
    deploy_actions = {key: action for key, _, action in MENU_ENTRIES if action is not None}
    while True:
        print_banner()
        for key, label, _ in MENU_ENTRIES:
            print(f"  {Colors.BOLD}[{key}]{Colors.RESET} {label}")
        print(f"{Colors.DIM}{'-' * 80}{Colors.RESET}")
        choice = _safe_input(f"{Colors.CYAN}請輸入操作編號 [0-6]: {Colors.RESET}", "\n已退出。")
        if choice == "0":
            print("感謝使用，發布管線已退出。")
            sys.exit(0)
        if choice in deploy_actions:
            targets, dry_run = deploy_actions[choice]
            run_deploy(targets=targets, dry_run=dry_run)
        elif choice == "6":
            prune_git_history(dry_run=False)
        else:
            log_warn("無效的輸入，請輸入 0 至 6！")
        print("\n")
        _safe_input(f"{Colors.DIM}按 Enter 鍵返回選單...{Colors.RESET}")


def main() -> None:
    """CLI 主程式入口。"""
    args = parse_args()
    if args.menu:
        interactive_menu()
        return
    if args.prune_history:
        print_banner()
        sys.exit(0 if prune_git_history(dry_run=args.dry_run) else 1)

    targets = ["cyber", "showcase", "osaka"] if args.all else [
        k for k, flag in (("cyber", args.cyber), ("showcase", args.showcase), ("osaka", args.osaka)) if flag
    ]
    if not targets:
        interactive_menu()
        return
    print_banner()
    sys.exit(0 if run_deploy(targets, dry_run=args.dry_run, skip_build=args.skip_build) else 1)


if __name__ == "__main__":
    main()
