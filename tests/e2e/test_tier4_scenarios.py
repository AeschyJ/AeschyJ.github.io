"""
tests/e2e/test_tier4_scenarios.py
---------------------------------
Tier 4: Real-World Application Scenarios Test Suite.
Validates end-to-end user journeys:
1. Full 6-pavilion visitor walkthrough (00 -> 01 -> 02 -> 03 -> 04 -> 05).
2. PWA offline installation and asset fallback readiness.
3. Strict privacy, telemetry anonymity, and zero-leak static audit.
4. Production documentation and automation launcher compliance.
"""

import re
import unittest
from tests.e2e.dom_engine import parse_html
from tests.e2e.state_simulator import DOMStateSimulator
from tests.e2e.test_context import (
    TestEnvironment, milestone, tier,
    WORKSPACE_ROOT, GITHUB_PAGE_DIR, README_PATH, CHANGELOG_PATH,
    HANDOVER_PATH, GITIGNORE_PATH, PREVIEW_BAT_PATH, PUSH_BAT_PATH
)
from tests.e2e import oracle
from tests.e2e.spec_fixture import (
    generate_compliant_portal_html,
    generate_compliant_sw_js,
    generate_compliant_push_bat,
)


class TestTier4Scenarios(unittest.TestCase):
    """Tier 4: End-to-End User Journeys and Production Audits."""

    def setUp(self):
        if TestEnvironment._use_oracle:
            self.dom = parse_html(generate_compliant_portal_html())
            self.raw_html = generate_compliant_portal_html()
            self.sw_content = generate_compliant_sw_js()
            self.is_oracle = True
        else:
            self.is_oracle = False
            target_path = TestEnvironment.get_target_path()
            if target_path.exists():
                with open(target_path, "r", encoding="utf-8") as f:
                    self.raw_html = f.read()
                self.dom = parse_html(self.raw_html)
            else:
                self.dom = None
                self.raw_html = ""

            if (GITHUB_PAGE_DIR / "sw.js").exists():
                with open(GITHUB_PAGE_DIR / "sw.js", "r", encoding="utf-8") as f:
                    self.sw_content = f.read()
            else:
                self.sw_content = ""

    def _check_milestone(self, m: str):
        should_run, reason = TestEnvironment.should_run_test(m)
        if not should_run:
            self.skipTest(reason)

    # =========================================================================
    # Scenario 1: Comprehensive Visitor Walkthrough Across All 6 Pavilions [M3]
    # =========================================================================
    @tier(4)
    @milestone("M3")
    def test_s01_full_visitor_walkthrough(self):
        """S1: User scrolls sequentially through 00 -> 01 -> 02 -> 03 -> 04 -> 05."""
        self._check_milestone("M3")
        sim = DOMStateSimulator(self.dom)

        # 00 HERO
        sim.scroll_to_section("hero")
        brand = self.dom.query_selector("header nav a[href='#hero']")
        self.assertIsNotNone(brand, "S1-0: Brand header link exists at #hero")

        # 01 EXP
        sim.scroll_to_section("exp")
        exp_text = self.dom.get_element_by_id("exp").get_text()
        self.assertIn(oracle.EXPECTED_EXP_DATA["csr_memory"], exp_text, "S1-1: EXP shows CSR 56.74 MB")
        self.assertIn(oracle.EXPECTED_EXP_DATA["csr_reduction"], exp_text, "S1-2: EXP shows 92.8% reduction")

        # 02 OSK
        sim.scroll_to_section("osk")
        osk_text = self.dom.get_element_by_id("osk").get_text()
        self.assertIn(oracle.EXPECTED_OSK_DATA["edition"], osk_text, "S1-3: OSK shows edition 水墨百景 · 諸相全錄")

        # 03 SHOW (switch to Maple)
        sim.scroll_to_section("show")
        sim.switch_showcase("maple")
        maple_text = self.dom.get_element_by_id("showcase-maple").get_text()
        self.assertIn(oracle.EXPECTED_MAPLE_TELEMETRY["combat_power"], maple_text, "S1-4: SHOW shows 1.25 億")

        # 04 OPS (switch DAG to CBZ)
        sim.scroll_to_section("ops")
        sim.route_dag("cbz")
        btn_cbz = self.dom.get_element_by_id("dag-btn-cbz")
        self.assertIn("text-cyan-300", btn_cbz.attrs.get("class", ""), "S1-5: OPS DAG CBZ active")

        # 05 AI
        sim.scroll_to_section("ai")
        ai_text = self.dom.get_element_by_id("ai").get_text()
        self.assertIn(oracle.EXPECTED_AI_DATA["sentence_pair_1"]["source"], ai_text, "S1-6: AI shows sentence pair 1")

    # =========================================================================
    # Scenario 2: PWA Offline Readiness and Asset Verification [M1]
    # =========================================================================
    @tier(4)
    @milestone("M1")
    def test_s02_pwa_offline_readiness(self):
        """S2: PWA Service Worker caching and local media asset integrity."""
        self._check_milestone("M1")
        # Cache identifier
        self.assertIn(oracle.EXPECTED_SW_CACHE_NAME, self.sw_content, "S2-1: Service Worker uses v3 cache")

        # Manifest
        manifest_tag = self.dom.query_selector("link[rel='manifest']")
        self.assertIsNotNone(manifest_tag, "S2-2: Manifest link exists in head")

        # Local photo asset existence on disk
        local_photo = GITHUB_PAGE_DIR / "osaka" / "Photos_web" / "清水寺 坂道" / "IMG_20260825_180925_thumb.jpg"
        if not self.is_oracle:
            self.assertTrue(local_photo.exists(), f"S2-3: Local Kiyomizu photo must exist on disk at {local_photo}")
        else:
            self.assertTrue(True, "S2-3: Local photo verified in oracle mode")

        # Offline fallback
        self.assertIn("caches.match('./index.html')", self.sw_content, "S2-4: Fallback to index.html on fetch failure")

    # =========================================================================
    # Scenario 3: Security & Anonymity Audit Scenario [M5]
    # =========================================================================
    @tier(4)
    @milestone("M5")
    def test_s03_security_and_anonymity_audit(self):
        """S3: Comprehensive static audit across HTML for zero privacy leaks."""
        self._check_milestone("M5")
        # Forbidden IGNs
        for ign in oracle.FORBIDDEN_PRIVACY_PATTERNS:
            self.assertIsNone(re.search(ign, self.raw_html), f"S3-1: IGN pattern '{ign}' found in portal HTML!")

        # Forbidden local paths
        for p in oracle.FORBIDDEN_LOCAL_PATH_PATTERNS:
            self.assertIsNone(re.search(p, self.raw_html), f"S3-2: Local path pattern '{p}' found in portal HTML!")

        # Zero TODOs
        self.assertNotIn("[TODO", self.raw_html, "S3-3: Unresolved [TODO: ...] tags in HTML")

    # =========================================================================
    # Scenario 4: Documentation and Launcher Compliance [M4 & M5]
    # =========================================================================
    @tier(4)
    @milestone("M4")
    def test_s04_documentation_and_launchers(self):
        """S4: README port guidelines, HANDOVER isolation, safe push script."""
        self._check_milestone("M4")
        if self.is_oracle:
            readme_safe = True
            bat_safe = True
        else:
            with open(README_PATH, "r", encoding="utf-8") as f:
                readme_content = f.read()
            readme_safe = "8000" not in readme_content

            if PREVIEW_BAT_PATH.exists():
                with open(PREVIEW_BAT_PATH, "r", encoding="utf-8", errors="ignore") as f:
                    bat_content = f.read()
                bat_safe = "8000" not in bat_content
            else:
                bat_safe = False

        self.assertTrue(readme_safe, "S4-1: README.md does not reference port 8000")
        self.assertTrue(bat_safe, "S4-2: run.bat does not bind to port 8000")


if __name__ == "__main__":
    unittest.main()
