"""
tests/e2e/test_context.py
-------------------------
Manages test execution context, target file paths, milestone tagging,
and progressive milestone awareness.
"""

from __future__ import annotations
import pathlib
from typing import Callable, Optional
from tests.e2e.dom_engine import DOMTree, parse_html_file

# Project root resolution (Github Page root, relative to tests/e2e/test_context.py)
GITHUB_PAGE_DIR = pathlib.Path(__file__).resolve().parent.parent.parent
WORKSPACE_ROOT = GITHUB_PAGE_DIR.parent

INDEX_HTML_PATH = GITHUB_PAGE_DIR / "index.html"
LEGACY_INDEX_PATH = GITHUB_PAGE_DIR / "index_legacy.html"
SW_JS_PATH = GITHUB_PAGE_DIR / "sw.js"
README_PATH = GITHUB_PAGE_DIR / "README.md"
CHANGELOG_PATH = GITHUB_PAGE_DIR / "CHANGELOG.md"
HANDOVER_PATH = GITHUB_PAGE_DIR / "HANDOVER.md"
GITIGNORE_PATH = GITHUB_PAGE_DIR / ".gitignore"
PREVIEW_BAT_PATH = GITHUB_PAGE_DIR / "run.bat"
PUSH_BAT_PATH = GITHUB_PAGE_DIR / "run.bat"
CTL_PS1_PATH = GITHUB_PAGE_DIR / "scripts" / "ctl.ps1"
PREVIEW_SERVER_PATH = GITHUB_PAGE_DIR / "scripts" / "preview_server.py"
PROJECT_MD_PATH = GITHUB_PAGE_DIR / "PROJECT.md"


def milestone(name: str) -> Callable:
    """Decorator to attach milestone metadata (e.g. 'M1', 'M2', 'E2E') to a test method."""
    def decorator(func: Callable) -> Callable:
        setattr(func, "__milestone__", name)
        return func
    return decorator


def tier(num: int) -> Callable:
    """Decorator to attach tier level (1..4) to a test method."""
    def decorator(func: Callable) -> Callable:
        setattr(func, "__tier__", num)
        return func
    return decorator


class TestEnvironment:
    """Provides loaded DOM trees and file contents for tests."""

    _target_path: Optional[pathlib.Path] = None
    _target_tree: Optional[DOMTree] = None
    _active_milestone: Optional[str] = None
    _use_oracle: bool = False

    @classmethod
    def set_target(cls, path: pathlib.Path):
        cls._target_path = path
        cls._target_tree = None

    @classmethod
    def set_active_milestone(cls, m: Optional[str]):
        cls._active_milestone = m

    @classmethod
    def set_use_oracle(cls, enabled: bool):
        cls._use_oracle = enabled

    @classmethod
    def get_target_path(cls) -> pathlib.Path:
        if cls._target_path:
            return cls._target_path
        return INDEX_HTML_PATH

    @classmethod
    def get_target_dom(cls) -> DOMTree:
        if cls._target_tree is None:
            p = cls.get_target_path()
            if not p.exists():
                raise FileNotFoundError(f"Target HTML not found at: {p}")
            cls._target_tree = parse_html_file(str(p))
        return cls._target_tree

    @classmethod
    def reload_dom(cls) -> DOMTree:
        cls._target_tree = None
        return cls.get_target_dom()

    @classmethod
    def should_run_test(cls, test_milestone: Optional[str]) -> tuple[bool, str]:
        """Determines if a test should run based on the active milestone filter."""
        if not test_milestone:
            return True, "No milestone constraint"
        if cls._use_oracle:
            return True, "Oracle verification mode (all milestones active)"
        if not cls._active_milestone or cls._active_milestone.lower() == "all":
            return True, "Running all milestones"

        milestone_order = ["E2E", "M1", "M2", "M3", "M4", "M5", "M6"]
        try:
            curr_idx = milestone_order.index(cls._active_milestone.upper())
            test_idx = milestone_order.index(test_milestone.upper())
            if test_idx <= curr_idx:
                return True, f"Milestone {test_milestone} <= active {cls._active_milestone}"
            else:
                return False, f"Milestone {test_milestone} exceeds active milestone {cls._active_milestone} (Progressive Testability)"
        except ValueError:
            return True, "Unknown milestone format"
