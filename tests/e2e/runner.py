"""
tests/e2e/runner.py
-------------------
Master E2E Test Runner for GitHub Pages Redesign & Portal Migration.
Zero external network dependency, pure Python standard library.
Supports 4-tier filtering, progressive milestone gating, oracle self-test,
and standard exit codes (0 on success, non-zero on failure).
"""

import argparse
import pathlib
import re
import sys
import time
import unittest
from typing import List, Optional

# Ensure Github Page root is in sys.path
_ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

from tests.e2e.test_context import PROJECT_MD_PATH, TestEnvironment


def detect_completed_milestones() -> List[str]:
    """Inspects PROJECT.md to detect completed milestones."""
    completed = ["E2E"]  # E2E test infra is active
    if not PROJECT_MD_PATH.exists():
        return completed

    with open(PROJECT_MD_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Look for milestone table lines: | M1 | ... | DONE | or COMPLETED
    for m in ["M1", "M2", "M3", "M4", "M5", "M6"]:
        pattern = rf"\|\s*{m}\s*\|[^\|]+\|[^\|]+\|[^\|]+\|\s*(?:DONE|COMPLETED)\s*\|"
        if re.search(pattern, content, re.IGNORECASE):
            completed.append(m)

    return completed


def build_suite(tier_filter: Optional[str] = None) -> unittest.TestSuite:
    """Discovers and builds the test suite matching the tier filter."""
    suite = unittest.TestSuite()
    loader = unittest.TestLoader()

    # Import test modules
    from tests.e2e import test_tier1_features
    from tests.e2e import test_tier2_boundaries
    from tests.e2e import test_tier3_combinations
    from tests.e2e import test_tier4_scenarios

    tier_map = {
        "1": [test_tier1_features.TestTier1Features],
        "2": [test_tier2_boundaries.TestTier2Boundaries],
        "3": [test_tier3_combinations.TestTier3Combinations],
        "4": [test_tier4_scenarios.TestTier4Scenarios],
    }

    if tier_filter and tier_filter.lower() != "all":
        t_key = tier_filter.replace("tier", "").strip()
        classes = tier_map.get(t_key, [])
        for cls in classes:
            suite.addTests(loader.loadTestsFromTestCase(cls))
    else:
        for classes in tier_map.values():
            for cls in classes:
                suite.addTests(loader.loadTestsFromTestCase(cls))

    return suite


class ColorTextResult(unittest.TextTestResult):
    """Custom test result formatter with clear milestone gating indicators."""

    def __init__(self, stream, descriptions, verbosity):
        super().__init__(stream, descriptions, verbosity)
        self.successes = []

    def addSuccess(self, test):
        super().addSuccess(test)
        self.successes.append(test)
        if self.showAll:
            self.stream.writeln(" [PASS]")

    def addSkip(self, test, reason):
        super().addSkip(test, reason)
        if self.showAll:
            self.stream.writeln(f" [SKIP] ({reason})")

    def addFailure(self, test, err):
        super().addFailure(test, err)
        if self.showAll:
            self.stream.writeln(" [FAIL]")

    def addError(self, test, err):
        super().addError(test, err)
        if self.showAll:
            self.stream.writeln(" [ERROR]")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="E2E Test Runner for GitHub Pages Redesign (hub-portal-cache-v3)"
    )
    parser.add_argument(
        "--tier",
        choices=["1", "2", "3", "4", "all"],
        default="all",
        help="Run specific test tier (1: Features, 2: Boundaries, 3: Combinations, 4: Scenarios, all: All)",
    )
    parser.add_argument(
        "--milestone",
        default="auto",
        help="Milestone gate (auto, E2E, M1, M2, M3, M4, M5, M6, all)",
    )
    parser.add_argument(
        "--target",
        type=str,
        default=None,
        help="Target HTML file path to verify (defaults to Github Page/index.html)",
    )
    parser.add_argument(
        "--verify-all",
        "--oracle",
        "--self-test",
        action="store_true",
        dest="use_oracle",
        help="Run self-verification of the entire test suite against authoritative oracle specification fixture",
    )
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        default=True,
        help="Verbose test execution output",
    )

    args = parser.parse_args()

    # Configure target path
    if args.target:
        target_file = pathlib.Path(args.target).resolve()
        if not target_file.exists():
            print(f"[ERROR] Target file does not exist: {target_file}")
            return 1
        TestEnvironment.set_target(target_file)

    # Configure oracle mode
    if args.use_oracle:
        TestEnvironment.set_use_oracle(True)
        active_m = "all"
        milestone_info = "ORACLE SPECIFICATION FIXTURE (Full Suite 100% Verification)"
    else:
        # Determine active milestone
        if args.milestone.lower() == "auto":
            completed = detect_completed_milestones()
            # Active milestone is the latest completed milestone
            active_m = completed[-1]
            milestone_info = f"AUTO-DETECTED (Active: {active_m}, Completed: {', '.join(completed)})"
        else:
            active_m = args.milestone.upper()
            milestone_info = f"MANUAL ({active_m})"

    TestEnvironment.set_active_milestone(active_m)

    # Output banner
    print("=" * 72)
    print("  PORTAL E2E TEST RUNNER — 4-TIER ARCHITECTURE")
    print("=" * 72)
    print(f"  Target HTML  : {TestEnvironment.get_target_path()}")
    print(f"  Tier Filter  : Tier {args.tier.upper()}")
    print(f"  Milestone    : {milestone_info}")
    print(f"  Network Mode : 100% OFFLINE (Zero external dependencies)")
    print("=" * 72)
    print()

    suite = build_suite(args.tier)
    start_time = time.time()

    runner = unittest.TextTestRunner(
        verbosity=2 if args.verbose else 1,
        resultclass=ColorTextResult,
    )
    result = runner.run(suite)
    duration = time.time() - start_time

    total_run = result.testsRun
    total_passed = len(getattr(result, "successes", []))
    total_skipped = len(result.skipped)
    total_failed = len(result.failures)
    total_errors = len(result.errors)

    print()
    print("=" * 72)
    print("  TEST EXECUTION SUMMARY")
    print("=" * 72)
    print(f"  Total Executed : {total_run}")
    print(f"  Passed         : {total_passed}")
    print(f"  Skipped        : {total_skipped}")
    print(f"  Failed         : {total_failed}")
    print(f"  Errors         : {total_errors}")
    print(f"  Duration       : {duration:.3f}s")
    print("-" * 72)

    if total_failed == 0 and total_errors == 0:
        print("  STATUS: [ALL TESTS PASSED] — EXIT CODE 0")
        print("=" * 72)
        return 0
    else:
        print("  STATUS: [FAILURES DETECTED] — EXIT CODE 1")
        print("=" * 72)
        return 1


if __name__ == "__main__":
    sys.exit(main())
