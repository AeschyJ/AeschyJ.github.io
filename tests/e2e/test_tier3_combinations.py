"""
tests/e2e/test_tier3_combinations.py
------------------------------------
Tier 3: Cross-Feature Combinations Test Suite.
Verifies pairwise interactions across interactive components, state persistence
during full-page snapping, modal drawer synchronization, and audio-visual cues.
"""

import unittest
from tests.e2e.dom_engine import parse_html
from tests.e2e.state_simulator import DOMStateSimulator
from tests.e2e.test_context import TestEnvironment, milestone, tier
from tests.e2e import oracle
from tests.e2e.spec_fixture import generate_compliant_portal_html, generate_compliant_sw_js


class TestTier3Combinations(unittest.TestCase):
    """Tier 3: Pairwise Interactions & State Synchronization."""

    def setUp(self):
        if TestEnvironment._use_oracle:
            self.dom = parse_html(generate_compliant_portal_html())
            self.sw_content = generate_compliant_sw_js()
            self.is_oracle = True
        else:
            self.is_oracle = False
            target_path = TestEnvironment.get_target_path()
            if target_path.exists():
                with open(target_path, "r", encoding="utf-8") as f:
                    self.dom = parse_html(f.read())
            else:
                self.dom = None

    def _check_milestone(self, m: str):
        should_run, reason = TestEnvironment.should_run_test(m)
        if not should_run:
            self.skipTest(reason)

    # =========================================================================
    # Combination 1: Showcase Mode Switch ⇄ HUD Navbar Scrolling [M2]
    # =========================================================================
    @tier(3)
    @milestone("M2")
    def test_c01_showcase_switch_and_hud_scroll(self):
        """C1: Switching showcase to Maple does not disrupt HUD pill 03 or section background."""
        self._check_milestone("M2")
        sim = DOMStateSimulator(self.dom)

        # Step 1: Scroll to #show
        res = sim.scroll_to_section("show")
        self.assertEqual(len(res["active_pills"]), 1, "C1-1: Pill 03 active after scrolling to #show")
        self.assertEqual(res["active_pills"][0].get_attribute("href"), "#show", "C1-2: Pill href is #show")

        # Step 2: Switch showcase to maple
        sim.switch_showcase("maple")
        maple_el = self.dom.get_element_by_id("showcase-maple")
        phys_el = self.dom.get_element_by_id("showcase-physical")
        self.assertEqual(phys_el.style.get("display"), "none", "C1-3: Physical container hidden")
        self.assertNotEqual(maple_el.style.get("display"), "none", "C1-4: Maple container visible")

        # Step 3: Pill 03 remains active
        pills = self.dom.query_selector_all(".nav-pill")
        active = [p for p in pills if "bg-white/15" in p.attrs.get("class", "")]
        self.assertEqual(len(active), 1, "C1-5: Exactly 1 pill remains active after showcase toggle")
        self.assertEqual(active[0].get_attribute("href"), "#show", "C1-6: Active pill still matches #show")

    # =========================================================================
    # Combination 2: Compression DAG Mode Switch ⇄ Section Snapping [M2]
    # =========================================================================
    @tier(3)
    @milestone("M2")
    def test_c02_dag_mode_switch_and_scroll_snap(self):
        """C2: Switching DAG mode to CBZ, then scrolling away to #ai and back to #ops."""
        self._check_milestone("M2")
        sim = DOMStateSimulator(self.dom)

        # Step 1: Scroll to #ops and switch DAG to cbz
        sim.scroll_to_section("ops")
        sim.route_dag("cbz")
        btn_cbz = self.dom.get_element_by_id("dag-btn-cbz")
        self.assertIn("text-cyan-300", btn_cbz.attrs.get("class", ""), "C2-1: CBZ button active")

        # Step 2: Scroll to #ai
        sim.scroll_to_section("ai")
        active = [p for p in self.dom.query_selector_all(".nav-pill") if "bg-white/15" in p.attrs.get("class", "")]
        self.assertEqual(active[0].get_attribute("href"), "#ai", "C2-2: Pill #ai active")

        # Step 3: Scroll back to #ops
        sim.scroll_to_section("ops")
        active_ops = [p for p in self.dom.query_selector_all(".nav-pill") if "bg-white/15" in p.attrs.get("class", "")]
        self.assertEqual(active_ops[0].get_attribute("href"), "#ops", "C2-3: Pill #ops restored")
        self.assertIn("text-cyan-300", btn_cbz.attrs.get("class", ""), "C2-4: CBZ active styling retained")

    # =========================================================================
    # Combination 3: Directory Drawer ⇄ Smooth Scroll Navigation [M2]
    # =========================================================================
    @tier(3)
    @milestone("M2")
    def test_c03_drawer_open_click_and_scroll(self):
        """C3: Open drawer, select #exp, close drawer, verify HUD highlights #exp."""
        self._check_milestone("M2")
        sim = DOMStateSimulator(self.dom)
        drawer = self.dom.get_element_by_id("directory-drawer")

        # Step 1: Open drawer
        sim.toggle_directory_drawer(True)
        self.assertNotIn("hidden", drawer.attrs.get("class", ""), "C3-1: Drawer opened (hidden class removed)")

        # Step 2: Click #exp link in drawer
        sim.toggle_directory_drawer(False)
        sim.scroll_to_section("exp")

        # Step 3: Drawer closed & #exp active
        self.assertIn("hidden", drawer.attrs.get("class", ""), "C3-2: Drawer closed (hidden class applied)")
        active = [p for p in self.dom.query_selector_all(".nav-pill") if "bg-white/15" in p.attrs.get("class", "")]
        self.assertEqual(active[0].get_attribute("href"), "#exp", "C3-3: Pill #exp active")

    # =========================================================================
    # Combination 4: Audio Waveform Hover ⇄ Audio Sentence Pairs [M2]
    # =========================================================================
    @tier(3)
    @milestone("M2")
    def test_c04_waveform_hover_and_pair_focus(self):
        """C4: Hovering pair 1 highlights bars 0..10; mouseleave resets all bars."""
        self._check_milestone("M2")
        sim = DOMStateSimulator(self.dom)

        # Mock bars if not in static HTML
        wave_cont = self.dom.get_element_by_id("ai-waveform")
        if wave_cont and not wave_cont.children:
            from tests.e2e.dom_engine import DOMNode
            for _ in range(24):
                bar = DOMNode("div", {"class": "ai-wave-bar bg-white/20"}, parent=wave_cont)
                wave_cont.children.append(bar)

        # Hover pair 1 (0..10)
        sim.hover_ai_wave(0, 10)
        bars = self.dom.query_selector_all(".ai-wave-bar")
        self.assertIn("bg-sky-400", bars[0].attrs.get("class", ""), "C4-1: Bar 0 highlighted")
        self.assertIn("bg-sky-400", bars[10].attrs.get("class", ""), "C4-2: Bar 10 highlighted")
        self.assertIn("bg-white/20", bars[11].attrs.get("class", ""), "C4-3: Bar 11 remains default")

        # Mouseleave
        sim.leave_ai_wave()
        self.assertIn("bg-white/20", bars[0].attrs.get("class", ""), "C4-4: Bar 0 reset to bg-white/20")
        self.assertIn("bg-white/20", bars[10].attrs.get("class", ""), "C4-5: Bar 10 reset to bg-white/20")

    # =========================================================================
    # Combination 5: Spotlight Activation ⇄ Showcase Mode Toggling [M3]
    # =========================================================================
    @tier(3)
    @milestone("M3")
    def test_c05_spotlight_and_showcase_toggle(self):
        """C5: Activate spotlight, switch to physical, switch back to maple."""
        self._check_milestone("M3")
        sim = DOMStateSimulator(self.dom)
        sim.switch_showcase("maple")
        sim.toggle_maple_spotlight(True)

        btn_text = self.dom.get_element_by_id("maple-spotlight-text")
        self.assertEqual(btn_text.get_text(), "關閉抓漏聚光燈", "C5-1: Spotlight is ON")

        # Switch to physical and back
        sim.switch_showcase("physical")
        sim.switch_showcase("maple")
        self.assertEqual(btn_text.get_text(), "關閉抓漏聚光燈", "C5-2: Spotlight state preserved without error")

    # =========================================================================
    # Combination 6: PWA Service Worker ⇄ Full SPA Navigation [M1]
    # =========================================================================
    @tier(3)
    @milestone("M1")
    def test_c06_sw_assets_and_spa_integrity(self):
        """C6: All critical assets in portal match manifest and SW cache strategy."""
        self._check_milestone("M1")
        manifest_tag = self.dom.query_selector("link[rel='manifest']")
        self.assertIsNotNone(manifest_tag, "C6-1: Manifest tag exists")
        self.assertEqual(manifest_tag.get_attribute("href"), "manifest.json", "C6-2: Manifest href valid")

        # All sections have IDs
        sections = self.dom.query_selector_all(".snap-section")
        sec_ids = [s.get_attribute("id") for s in sections]
        self.assertEqual(sec_ids, oracle.EXPECTED_SECTIONS, "C6-3: All 6 section IDs align with SPA layout")


if __name__ == "__main__":
    unittest.main()
