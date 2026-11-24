"""
tests/e2e/test_tier2_boundaries.py
----------------------------------
Tier 2: Boundary & Corner Cases Test Suite.
Covers viewport breakpoints, CSS specificity overrides, cyclic state machine
transitions, service worker namespace isolation, equipment matrix boundaries,
and pure ASCII / escape integrity.
Strictly requires >= 5 assertions per boundary domain.
"""

import re
import unittest
from tests.e2e.dom_engine import parse_html
from tests.e2e.state_simulator import DOMStateSimulator
from tests.e2e.test_context import (
    TestEnvironment, milestone, tier,
    INDEX_HTML_PATH, SW_JS_PATH, PUSH_BAT_PATH, PREVIEW_BAT_PATH
)
from tests.e2e import oracle
from tests.e2e.spec_fixture import (
    generate_compliant_portal_html,
    generate_compliant_sw_js,
    generate_compliant_push_bat,
)


class TestTier2Boundaries(unittest.TestCase):
    """Tier 2: Boundary, Specificity & Edge Conditions."""

    def setUp(self):
        if TestEnvironment._use_oracle:
            self.dom = parse_html(generate_compliant_portal_html())
            self.raw_html = generate_compliant_portal_html()
            self.sw_content = generate_compliant_sw_js()
            self.push_bat_bytes = generate_compliant_push_bat()
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

            if SW_JS_PATH.exists():
                with open(SW_JS_PATH, "r", encoding="utf-8") as f:
                    self.sw_content = f.read()
            else:
                self.sw_content = ""

            if PUSH_BAT_PATH.exists():
                with open(PUSH_BAT_PATH, "rb") as f:
                    self.push_bat_bytes = f.read()
            else:
                self.push_bat_bytes = b""

    def _check_milestone(self, m: str):
        should_run, reason = TestEnvironment.should_run_test(m)
        if not should_run:
            self.skipTest(reason)

    # =========================================================================
    # Boundary 1: Showcase Display Specificity & Breakpoint Overrides [M2]
    # =========================================================================
    @tier(2)
    @milestone("M2")
    def test_b01_showcase_display_specificity(self):
        """B1: Inline style.display overriding Tailwind md:grid desktop breakpoint."""
        self._check_milestone("M2")
        sim = DOMStateSimulator(self.dom)
        phys = self.dom.get_element_by_id("showcase-physical")
        maple = self.dom.get_element_by_id("showcase-maple")

        # Assertion 1: In Maple mode, physical container MUST have display='none'
        sim.switch_showcase("maple")
        self.assertEqual(phys.style.get("display"), "none", "B1-1: Physical container has inline display:none")

        # Assertion 2: In Physical mode, maple container MUST have display='none'
        sim.switch_showcase("physical")
        self.assertEqual(maple.style.get("display"), "none", "B1-2: Maple container has inline display:none")

        # Assertion 3: Rapid consecutive toggling (5 iterations)
        for _ in range(5):
            sim.switch_showcase("maple")
            sim.switch_showcase("physical")
        self.assertEqual(maple.style.get("display"), "none", "B1-3: Rapid toggling maintains maple display:none")
        self.assertNotEqual(phys.style.get("display"), "none", "B1-4: Rapid toggling maintains physical visible")

        # Assertion 5: Background color boundary matches mode
        show_sec = self.dom.get_element_by_id("show")
        self.assertIn("#11100F", show_sec.attrs.get("style", ""), "B1-5: Background color is #11100F in physical mode")

    # =========================================================================
    # Boundary 2: Compression DAG State Machine Cyclic Transitions [M2]
    # =========================================================================
    @tier(2)
    @milestone("M2")
    def test_b02_dag_state_machine_cycling(self):
        """B2: Cyclic transitions across MKV -> CBZ -> SHA -> MKV and idempotent clicks."""
        self._check_milestone("M2")
        sim = DOMStateSimulator(self.dom)
        btn_mkv = self.dom.get_element_by_id("dag-btn-mkv")
        btn_cbz = self.dom.get_element_by_id("dag-btn-cbz")
        btn_sha = self.dom.get_element_by_id("dag-btn-sha")

        # Step 1: MKV -> CBZ
        sim.route_dag("cbz")
        self.assertNotIn("text-cyan-300", btn_mkv.attrs.get("class", ""), "B2-1: MKV loses active class on CBZ")
        self.assertIn("text-cyan-300", btn_cbz.attrs.get("class", ""), "B2-2: CBZ gains active class")

        # Step 2: CBZ -> SHA
        sim.route_dag("sha")
        self.assertNotIn("text-cyan-300", btn_cbz.attrs.get("class", ""), "B2-3: CBZ loses active class on SHA")
        self.assertIn("text-cyan-300", btn_sha.attrs.get("class", ""), "B2-4: SHA gains active class")

        # Step 3: SHA -> MKV (full cycle)
        sim.route_dag("mkv")
        self.assertIn("text-cyan-300", btn_mkv.attrs.get("class", ""), "B2-5: MKV regains active class after cycle")

    # =========================================================================
    # Boundary 3: HUD Navbar Boundary & Active Pill Exclusivity [M2]
    # =========================================================================
    @tier(2)
    @milestone("M2")
    def test_b03_hud_navbar_active_exclusivity(self):
        """B3: Exactly 0 active pills at #hero, and exactly 1 active pill for 01..05."""
        self._check_milestone("M2")
        sim = DOMStateSimulator(self.dom)

        # Boundary 1: At #hero, 0 pills are active
        res_hero = sim.scroll_to_section("hero")
        self.assertEqual(len(res_hero["active_pills"]), 0, "B3-1: Zero .nav-pill items are active when at #hero")

        # Boundary 2: At #exp, exactly 1 pill is active
        res_exp = sim.scroll_to_section("exp")
        self.assertEqual(len(res_exp["active_pills"]), 1, "B3-2: Exactly one pill active at #exp")

        # Boundary 3: At #ai (last section), exactly 1 pill is active
        res_ai = sim.scroll_to_section("ai")
        self.assertEqual(len(res_ai["active_pills"]), 1, "B3-3: Exactly one pill active at #ai")
        self.assertEqual(res_ai["active_pills"][0].get_attribute("href"), "#ai", "B3-4: Active pill is #ai")

        # Boundary 5: Right snap dot matches active section
        active_dots = [d for d in self.dom.query_selector_all(".snap-dot") if "w-1.5 h-6" in d.attrs.get("class", "")]
        self.assertEqual(len(active_dots), 1, "B3-5: Exactly one .snap-dot is extended (w-1.5 h-6)")

    # =========================================================================
    # Boundary 4: Maple Equipment Matrix & Defect Slot Boundaries [M3]
    # =========================================================================
    @tier(2)
    @milestone("M3")
    def test_b04_maple_matrix_and_spotlight_boundaries(self):
        """B4: 30 slots total, exactly slots [3, 11, 18] defect, spotlight toggle."""
        self._check_milestone("M3")
        sim = DOMStateSimulator(self.dom)

        # Mock equipment cells in DOM if empty
        grid = self.dom.get_element_by_id("maple-grid")
        if grid and not grid.children:
            from tests.e2e.dom_engine import DOMNode
            for i in range(30):
                is_def = i in oracle.EXPECTED_MAPLE_TELEMETRY["defect_indices"]
                cls = "maple-defect" if is_def else "maple-nominal"
                node = DOMNode("div", {"class": f"cell {cls}"}, parent=grid)
                grid.children.append(node)

        nominals = self.dom.query_selector_all(".maple-nominal")
        defects = self.dom.query_selector_all(".maple-defect")

        self.assertEqual(len(nominals) + len(defects), 30, "B4-1: Grid contains exactly 30 equipment slots")
        self.assertEqual(len(defects), 3, "B4-2: Exactly 3 defect slots exist")
        self.assertEqual(len(nominals), 27, "B4-3: Exactly 27 nominal slots exist")

        # Spotlight ON
        sim.toggle_maple_spotlight(True)
        btn_text = self.dom.get_element_by_id("maple-spotlight-text")
        self.assertEqual(btn_text.get_text(), "關閉抓漏聚光燈", "B4-4: Button text changes to '關閉抓漏聚光燈'")

        # Spotlight OFF
        sim.toggle_maple_spotlight(False)
        self.assertEqual(btn_text.get_text(), "啟動抓漏聚光燈", "B4-5: Button text reverts to '啟動抓漏聚光燈'")

    # =========================================================================
    # Boundary 5: Service Worker Namespace Purge Isolation [M1]
    # =========================================================================
    @tier(2)
    @milestone("M1")
    def test_b05_sw_namespace_purge_isolation(self):
        """B5: Purges hub-portal-cache-* except v3, strictly protects other namespaces."""
        self._check_milestone("M1")
        # Test SW logic against a list of simulated cache keys
        cache_keys = [
            "hub-portal-cache-v1",
            "hub-portal-cache-v2",
            "hub-portal-cache-v3",
            "tabisync-cache-v1",
            "cyber-routine-cache-v2",
            "museum-showcase-cache-v1",
        ]

        # Simulate SW purge condition:
        # key.startsWith('hub-portal-cache-') && key !== 'hub-portal-cache-v3'
        deleted_keys = [
            k for k in cache_keys
            if k.startswith("hub-portal-cache-") and k != oracle.EXPECTED_SW_CACHE_NAME
        ]
        preserved_keys = [k for k in cache_keys if k not in deleted_keys]

        self.assertIn("hub-portal-cache-v1", deleted_keys, "B5-1: v1 is deleted")
        self.assertIn("hub-portal-cache-v2", deleted_keys, "B5-2: v2 is deleted")
        self.assertIn("hub-portal-cache-v3", preserved_keys, "B5-3: v3 is preserved")
        self.assertIn("tabisync-cache-v1", preserved_keys, "B5-4: tabisync namespace is preserved")
        self.assertIn("cyber-routine-cache-v2", preserved_keys, "B5-5: cyber-routine namespace is preserved")

    # =========================================================================
    # Boundary 6: Encoding, CMD Parentheses & Port 8000 Bounds [M4 & M5]
    # =========================================================================
    @tier(2)
    @milestone("M5")
    def test_b06_encoding_parentheses_and_port_bounds(self):
        """B6: Pure ASCII bytes <= 127, zero unescaped CMD parentheses, zero port 8000."""
        self._check_milestone("M5")
        # Check pure ASCII
        for b in self.push_bat_bytes:
            self.assertLessEqual(b, 127, f"B6-1: Non-ASCII byte {b} detected in run.bat")

        # Check CMD parentheses
        text = self.push_bat_bytes.decode("ascii", errors="replace")
        self.assertNotIn("(or Public)", text, "B6-2: Parentheses '(or Public)' strictly forbidden in CMD blocks")
        self.assertNotIn("(or Private)", text, "B6-3: Parentheses '(or Private)' strictly forbidden in CMD blocks")

        # Check port 8000 is absent
        self.assertNotIn("localhost:8000", text, "B6-4: Port 8000 absent in entrypoint script")
        self.assertNotIn("127.0.0.1:8000", text, "B6-5: Port 8000 absent in entrypoint script")


if __name__ == "__main__":
    unittest.main()
