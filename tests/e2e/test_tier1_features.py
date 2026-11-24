"""
tests/e2e/test_tier1_features.py
--------------------------------
Tier 1: Feature Coverage Test Suite.
Covers all 20 features from PROJECT.md Feature Inventory.
Strictly requires >= 5 assertions per feature.
Integrated with Progressive Testability and Authoritative Oracle Derivation.
"""

import os
import re
import unittest
import pathlib
from tests.e2e.dom_engine import parse_html, parse_html_file
from tests.e2e.state_simulator import DOMStateSimulator
from tests.e2e.test_context import (
    CHANGELOG_PATH,
    CTL_PS1_PATH,
    GITHUB_PAGE_DIR,
    GITIGNORE_PATH,
    HANDOVER_PATH,
    INDEX_HTML_PATH,
    LEGACY_INDEX_PATH,
    PREVIEW_BAT_PATH,
    PREVIEW_SERVER_PATH,
    PROJECT_MD_PATH,
    PUSH_BAT_PATH,
    README_PATH,
    SW_JS_PATH,
    TestEnvironment,
    WORKSPACE_ROOT,
    milestone,
    tier,
)
from tests.e2e import oracle
from tests.e2e.spec_fixture import (
    generate_compliant_portal_html,
    generate_compliant_sw_js,
    generate_compliant_push_bat,
)


class TestTier1Features(unittest.TestCase):
    """Tier 1: Feature Coverage (Features 1 through 20)."""

    def setUp(self):
        if TestEnvironment._use_oracle:
            self.dom = parse_html(generate_compliant_portal_html())
            self.raw_html = generate_compliant_portal_html()
            self.sw_content = generate_compliant_sw_js()
            self.is_oracle = True
        else:
            self.is_oracle = False
            # Resolve target HTML
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

    def _check_milestone(self, m: str):
        should_run, reason = TestEnvironment.should_run_test(m)
        if not should_run:
            self.skipTest(reason)

    # =========================================================================
    # Feature 1: Legacy Index Backup [M1]
    # =========================================================================
    @tier(1)
    @milestone("M1")
    def test_f01_legacy_index_backup(self):
        """F1: Backup existing index.html to index_legacy.html."""
        self._check_milestone("M1")
        if self.is_oracle:
            legacy_exists = True
            legacy_size = 18837
            legacy_text = "研析成文，行旅作卷"
            has_ambient = True
            has_pavilions = True
        else:
            self.assertTrue(LEGACY_INDEX_PATH.exists(), "F1-1: index_legacy.html must exist")
            legacy_size = LEGACY_INDEX_PATH.stat().st_size
            with open(LEGACY_INDEX_PATH, "r", encoding="utf-8") as f:
                content = f.read()
            legacy_exists = True
            legacy_text = content
            has_ambient = "css/ambient.css" in content
            has_pavilions = "css/pavilions/experiment.css" in content

        self.assertTrue(legacy_exists, "F1-1: Legacy index backup exists")
        self.assertGreaterEqual(legacy_size, 10000, "F1-2: Legacy index preserves full file size (>10KB)")
        self.assertIn("研析成文，行旅作卷", legacy_text, "F1-3: Legacy index contains original subtitle")
        self.assertTrue(has_ambient, "F1-4: Legacy index retains ambient.css stylesheet reference")
        self.assertTrue(has_pavilions, "F1-5: Legacy index retains pavilions CSS stylesheet references")

    # =========================================================================
    # Feature 2: New Portal Migration [M1]
    # =========================================================================
    @tier(1)
    @milestone("M1")
    def test_f02_new_portal_migration(self):
        """F2: Migrate ai_studio_code.html structure to index.html."""
        self._check_milestone("M1")
        snap_container = self.dom.get_element_by_id("snap-container")
        self.assertIsNotNone(snap_container, "F2-1: #snap-container exists in DOM")
        self.assertIn("100dvh", snap_container.get_attribute("class", ""), "F2-2: Container uses 100dvh snap height")

        # Verify all 6 section IDs exist
        for sec_id in oracle.EXPECTED_SECTIONS:
            sec_el = self.dom.get_element_by_id(sec_id)
            self.assertIsNotNone(sec_el, f"F2-3: Section #{sec_id} must exist in portal DOM")

        # Verify right-side snap dots
        dots = self.dom.query_selector_all(".snap-dot")
        self.assertEqual(len(dots), 6, "F2-4: Right-side snap indicator has 6 dots corresponding to 6 sections")

        # Verify directory drawer
        drawer = self.dom.get_element_by_id("directory-drawer")
        self.assertIsNotNone(drawer, "F2-5: Directory drawer modal #directory-drawer exists")

    # =========================================================================
    # Feature 3: Service Worker Cache Upgrade [M1]
    # =========================================================================
    @tier(1)
    @milestone("M1")
    def test_f03_sw_cache_upgrade(self):
        """F3: Update sw.js cache name to hub-portal-cache-v3 and isolate namespaces."""
        self._check_milestone("M1")
        self.assertIn(oracle.EXPECTED_SW_CACHE_NAME, self.sw_content, "F3-1: sw.js defines hub-portal-cache-v3")
        self.assertNotIn("hub-portal-cache-v2", self.sw_content, "F3-2: Obsolete hub-portal-cache-v2 string removed")
        self.assertIn("hub-portal-cache-", self.sw_content, "F3-3: Purge regex/filter targets hub-portal-cache- namespace")
        self.assertIn("navigate", self.sw_content, "F3-4: Navigation fallback handler present")
        self.assertIn("index.html", self.sw_content, "F3-5: Fallback targets index.html")

    # =========================================================================
    # Feature 4: HUD Navbar & Scroll Observer [M2]
    # =========================================================================
    @tier(1)
    @milestone("M2")
    def test_f04_hud_navbar_and_scroll_observer(self):
        """F4: HUD navbar IntersectionObserver and .nav-pill active highlight sync."""
        self._check_milestone("M2")
        nav_pills = self.dom.query_selector_all(".nav-pill")
        self.assertEqual(len(nav_pills), 5, "F4-1: HUD navbar contains 5 .nav-pill links (01..05)")

        expected_hrefs = ["#exp", "#osk", "#show", "#ops", "#ai"]
        actual_hrefs = [p.get_attribute("href") for p in nav_pills]
        self.assertEqual(actual_hrefs, expected_hrefs, "F4-2: Nav pills link to exact section anchors")

        # Brand anchor links to #hero
        brand = self.dom.query_selector("header nav a[href='#hero']")
        self.assertIsNotNone(brand, "F4-3: Brand anchor links to #hero")

        # Simulate observer scroll to #exp
        sim = DOMStateSimulator(self.dom)
        res = sim.scroll_to_section("exp")
        active_pills = res["active_pills"]
        self.assertEqual(len(active_pills), 1, "F4-4: Exactly one .nav-pill is active on scroll to #exp")
        self.assertEqual(active_pills[0].get_attribute("href"), "#exp", "F4-5: Active pill matches #exp")

    # =========================================================================
    # Feature 5: Showcase Desktop Display Conflict [M2]
    # =========================================================================
    @tier(1)
    @milestone("M2")
    def test_f05_showcase_desktop_display_conflict(self):
        """F5: Inline style.display dominates Tailwind md:grid desktop conflict."""
        self._check_milestone("M2")
        phys_el = self.dom.get_element_by_id("showcase-physical")
        maple_el = self.dom.get_element_by_id("showcase-maple")
        self.assertIsNotNone(phys_el, "F5-1: Physical showcase container exists")
        self.assertIsNotNone(maple_el, "F5-2: MapleStory showcase container exists")

        sim = DOMStateSimulator(self.dom)
        # Switch to Maple
        sim.switch_showcase("maple")
        self.assertEqual(phys_el.style.get("display"), "none", "F5-3: Physical container hidden via inline style.display='none'")
        self.assertNotEqual(maple_el.style.get("display"), "none", "F5-4: Maple container visible")

        # Switch back to Physical
        sim.switch_showcase("physical")
        self.assertNotEqual(phys_el.style.get("display"), "none", "F5-5: Physical container visible and maple hidden")

    # =========================================================================
    # Feature 6: Compression DAG State Machine [M2]
    # =========================================================================
    @tier(1)
    @milestone("M2")
    def test_f06_compression_dag_state_machine(self):
        """F6: routeDag state machine clears MKV highlight on CBZ/SHA and updates nodes."""
        self._check_milestone("M2")
        btn_mkv = self.dom.get_element_by_id("dag-btn-mkv")
        btn_cbz = self.dom.get_element_by_id("dag-btn-cbz")
        btn_sha = self.dom.get_element_by_id("dag-btn-sha")
        self.assertIsNotNone(btn_mkv, "F6-1: MKV DAG button exists")
        self.assertIsNotNone(btn_cbz, "F6-2: CBZ DAG button exists")
        self.assertIsNotNone(btn_sha, "F6-3: SHA DAG button exists")

        sim = DOMStateSimulator(self.dom)
        sim.route_dag("cbz")
        self.assertNotIn("text-cyan-300", btn_mkv.attrs.get("class", ""), "F6-4: MKV button highlight stripped when CBZ selected")
        self.assertIn("text-cyan-300", btn_cbz.attrs.get("class", ""), "F6-5: CBZ button receives active highlight")

    # =========================================================================
    # Feature 7: Additional UI Edge Fixes [M2]
    # =========================================================================
    @tier(1)
    @milestone("M2")
    def test_f07_additional_ui_edge_fixes(self):
        """F7: UI edge fixes: waveform mouseleave, drawer #hero entry, xai path switcher."""
        self._check_milestone("M2")
        # Drawer contains #hero
        drawer_hero = self.dom.query_selector("#directory-drawer a[href='#hero']")
        self.assertIsNotNone(drawer_hero, "F7-1: Directory drawer includes #hero entry")

        # Audio waveform container
        waveform = self.dom.get_element_by_id("ai-waveform")
        self.assertIsNotNone(waveform, "F7-2: Audio waveform spectrum container exists")

        # Waveform bars
        sim = DOMStateSimulator(self.dom)
        sim.hover_ai_wave(0, 10)
        sim.leave_ai_wave()
        bars = self.dom.query_selector_all(".ai-wave-bar")
        self.assertTrue(all("bg-white/20" in b.attrs.get("class", "") for b in bars), "F7-3: Audio wave bars reset on mouseleave")

        # XAI Buttons
        xai_1 = self.dom.get_element_by_id("xai-btn-1")
        xai_2 = self.dom.get_element_by_id("xai-btn-2")
        self.assertIsNotNone(xai_1, "F7-4: XAI Path 1 button exists")
        self.assertIsNotNone(xai_2, "F7-5: XAI Path 2 button exists")

    # =========================================================================
    # Feature 8: 01 Research (EXP) Content Backfill [M3]
    # =========================================================================
    @tier(1)
    @milestone("M3")
    def test_f08_research_exp_backfill(self):
        """F8: NTU ESOE GNN thesis, CSR metrics, Fidelity, GitHub repo link."""
        self._check_milestone("M3")
        exp_sec = self.dom.get_element_by_id("exp")
        self.assertIsNotNone(exp_sec, "F8-1: #exp section exists")
        exp_text = exp_sec.get_text()

        self.assertIn(oracle.EXPECTED_EXP_DATA["institution"], exp_text, "F8-2: Institution ESOE present")
        self.assertIn(oracle.EXPECTED_EXP_DATA["csr_memory"], exp_text, "F8-3: CSR Memory 56.74 MB present")
        self.assertIn(oracle.EXPECTED_EXP_DATA["csr_reduction"], exp_text, "F8-4: CSR Reduction 92.8% present")
        self.assertIn(oracle.EXPECTED_EXP_DATA["csr_speedup"], exp_text, "F8-5: CSR Speedup 190.82 ms present")

    # =========================================================================
    # Feature 9: 02 Travel (OSK) Content Backfill [M3]
    # =========================================================================
    @tier(1)
    @milestone("M3")
    def test_f09_travel_osk_backfill(self):
        """F9: Kansai travel journal, dual-track emaki & magazine links."""
        self._check_milestone("M3")
        osk_sec = self.dom.get_element_by_id("osk")
        self.assertIsNotNone(osk_sec, "F9-1: #osk section exists")
        osk_text = osk_sec.get_text()

        self.assertIn(oracle.EXPECTED_OSK_DATA["title"], osk_text, "F9-2: Travel title present")
        self.assertIn(oracle.EXPECTED_OSK_DATA["edition"], osk_text, "F9-3: Edition 水墨百景 · 諸相全錄 present")
        self.assertIn(oracle.EXPECTED_OSK_DATA["season"], osk_text, "F9-4: Season 2026 盛夏 present")

        # Links
        emaki_link = self.dom.query_selector(f"#osk a[href='{oracle.EXPECTED_OSK_DATA['link_emaki']}']")
        self.assertIsNotNone(emaki_link, "F9-5: Direct link to ./osaka/emaki.html exists")
        mag_link = self.dom.query_selector(f"#osk a[href='{oracle.EXPECTED_OSK_DATA['link_magazine']}']")
        self.assertIsNotNone(mag_link, "F9-6: Direct link to ./osaka/magazine.html exists")

    # =========================================================================
    # Feature 10: 03 Physical Showcase Backfill [M3]
    # =========================================================================
    @tier(1)
    @milestone("M3")
    def test_f10_physical_showcase_backfill(self):
        """F10: Le Labo Santal 33, Guerlain, Beyerdynamic DT 770 Pro, showcase link."""
        self._check_milestone("M3")
        phys_el = self.dom.get_element_by_id("showcase-physical")
        self.assertIsNotNone(phys_el, "F10-1: Physical showcase container exists")
        text = phys_el.get_text()

        self.assertIn(oracle.EXPECTED_PHYSICAL_SHOWCASE["perfume_1"], text, "F10-2: Le Labo Santal 33 present")
        self.assertIn(oracle.EXPECTED_PHYSICAL_SHOWCASE["perfume_2"], text, "F10-3: Guerlain present")
        self.assertIn(oracle.EXPECTED_PHYSICAL_SHOWCASE["headphone"], text, "F10-4: Beyerdynamic DT 770 Pro present")

        link = self.dom.query_selector(f"#showcase-physical a[href='{oracle.EXPECTED_PHYSICAL_SHOWCASE['link']}']")
        self.assertIsNotNone(link, "F10-5: Direct link to ./showcase/ exists")

    # =========================================================================
    # Feature 11: 03 MapleStory Privacy Telemetry [M3]
    # =========================================================================
    @tier(1)
    @milestone("M3")
    def test_f11_maplestory_privacy_telemetry(self):
        """F11: Anonymous simulation stats (1.25 億, 9000, 302★), STRICT zero IGN leaks."""
        self._check_milestone("M3")
        maple_el = self.dom.get_element_by_id("showcase-maple")
        self.assertIsNotNone(maple_el, "F11-1: Maple showcase container exists")
        text = maple_el.get_text()

        self.assertIn(oracle.EXPECTED_MAPLE_TELEMETRY["combat_power"], text, "F11-2: Combat power 1.25 億 simulated")
        self.assertIn(oracle.EXPECTED_MAPLE_TELEMETRY["legion"], text, "F11-3: Legion 9000 simulated")
        self.assertIn(oracle.EXPECTED_MAPLE_TELEMETRY["star_force"], text, "F11-4: Star force 302★ simulated")

        # Strict privacy check: zero Jaes / 琉德
        for forbidden in oracle.FORBIDDEN_PRIVACY_PATTERNS:
            self.assertIsNone(re.search(forbidden, self.raw_html), f"F11-5: Forbidden privacy pattern '{forbidden}' found in HTML!")

    # =========================================================================
    # Feature 12: 04 Ops Pipeline Content Backfill [M3]
    # =========================================================================
    @tier(1)
    @milestone("M3")
    def test_f12_ops_pipeline_backfill(self):
        """F12: Tixplus bot (Cloudflare Worker) & DriveStore HEVC/CBZ/7-Zip/Rclone."""
        self._check_milestone("M3")
        ops_sec = self.dom.get_element_by_id("ops")
        self.assertIsNotNone(ops_sec, "F12-1: #ops section exists")
        text = ops_sec.get_text()

        self.assertIn(oracle.EXPECTED_OPS_DATA["tix_relay"], text, "F12-2: Cloudflare Worker relay present")
        self.assertIn("Discord", text, "F12-3: Notification channels present")
        self.assertIn(oracle.EXPECTED_OPS_DATA["drivestore_mkv"], text, "F12-4: HEVC remux present")
        self.assertIn(oracle.EXPECTED_OPS_DATA["drivestore_7zip"], text, "F12-5: 7-Zip AES-256 present")

    # =========================================================================
    # Feature 13: 05 AI Live Workstation Backfill [M3]
    # =========================================================================
    @tier(1)
    @milestone("M3")
    def test_f13_ai_workstation_backfill(self):
        """F13: SenseVoice (50ms) + Gemma 4 MTP (80-110 t/s), WASAPI, real sentence pairs."""
        self._check_milestone("M3")
        ai_sec = self.dom.get_element_by_id("ai")
        self.assertIsNotNone(ai_sec, "F13-1: #ai section exists")
        text = ai_sec.get_text()

        self.assertIn(oracle.EXPECTED_AI_DATA["cpu"], text, "F13-2: Ryzen 7500F hardware spec present")
        self.assertIn(oracle.EXPECTED_AI_DATA["gpu"], text, "F13-3: Intel Arc A750 hardware spec present")
        self.assertIn(oracle.EXPECTED_AI_DATA["asr_latency"], text, "F13-4: 50ms ASR latency present")
        self.assertIn(oracle.EXPECTED_AI_DATA["sentence_pair_1"]["source"], text, "F13-5: Real sentence pair 1 present")

    # =========================================================================
    # Feature 14: External README & CHANGELOG [M4]
    # =========================================================================
    @tier(1)
    @milestone("M4")
    def test_f14_external_readme_and_changelog(self):
        """F14: External README.md and CHANGELOG.md updated with preview on 5173."""
        self._check_milestone("M4")
        if self.is_oracle:
            readme_text = "5173 Scroll-Snap"
            cl_text = "## [3.0.0]"
        else:
            self.assertTrue(README_PATH.exists(), "F14-1: README.md exists")
            self.assertTrue(CHANGELOG_PATH.exists(), "F14-2: CHANGELOG.md exists")
            with open(README_PATH, "r", encoding="utf-8") as f:
                readme_text = f.read()
            with open(CHANGELOG_PATH, "r", encoding="utf-8") as f:
                cl_text = f.read()

        self.assertNotIn("8000", readme_text, "F14-3: README.md avoids port 8000")
        self.assertTrue("5173" in readme_text or "PORT" in readme_text, "F14-4: README.md documents 5173 or $env:PORT")
        self.assertTrue(any(w in cl_text for w in ["Added", "Changed", "Fixed", "[3.0.0]"]), "F14-5: CHANGELOG.md has keep-a-changelog sections")

    # =========================================================================
    # Feature 15: Internal HANDOVER Snapshot [M4]
    # =========================================================================
    @tier(1)
    @milestone("M4")
    def test_f15_internal_handover_snapshot(self):
        """F15: HANDOVER.md exists and is strictly excluded via .gitignore."""
        self._check_milestone("M4")
        if self.is_oracle:
            handover_exists = True
            gitignore_text = "HANDOVER.md"
        else:
            self.assertTrue(HANDOVER_PATH.exists(), "F15-1: HANDOVER.md exists")
            self.assertTrue(GITIGNORE_PATH.exists(), "F15-2: .gitignore exists in Github Page directory")
            with open(GITIGNORE_PATH, "r", encoding="utf-8") as f:
                gitignore_text = f.read()
            handover_exists = True

        self.assertTrue(handover_exists, "F15-3: HANDOVER.md exists")
        self.assertIn("HANDOVER.md", gitignore_text, "F15-4: .gitignore explicitly contains HANDOVER.md")
        self.assertNotIn("HANDOVER.md" in gitignore_text and "# HANDOVER.md", gitignore_text, "F15-5: Rule is active and not commented out")

    # =========================================================================
    # Feature 16: Local Preview Script Port Fix [M4]
    # =========================================================================
    @tier(1)
    @milestone("M4")
    def test_f16_local_preview_script_port_fix(self):
        """F16: run.bat and preview_server.py bind to 5173 / dynamic %PORT%, strictly avoiding 8000."""
        self._check_milestone("M4")
        if self.is_oracle:
            bat_content = '@echo off\ncd /d "%~dp0"\nif "%PORT%"=="" set "PORT=5173"\n'
            server_content = 'PORT = int(os.environ.get("PORT", "5173"))\n'
        else:
            self.assertTrue(PREVIEW_BAT_PATH.exists(), "F16-1: run.bat exists")
            self.assertTrue(PREVIEW_SERVER_PATH.exists(), "F16-1b: scripts/preview_server.py exists")
            with open(PREVIEW_BAT_PATH, "r", encoding="utf-8", errors="ignore") as f:
                bat_content = f.read()
            with open(PREVIEW_SERVER_PATH, "r", encoding="utf-8", errors="ignore") as f:
                server_content = f.read()

        self.assertNotIn("8000", bat_content, "F16-2: run.bat does NOT bind to port 8000")
        self.assertNotIn("8000", server_content, "F16-2b: preview_server.py does NOT bind to port 8000")
        self.assertTrue("5173" in bat_content or "%PORT%" in bat_content, "F16-3: run.bat uses 5173 or %PORT%")
        self.assertIn("5173", server_content, "F16-3b: preview_server.py defaults to 5173")
        self.assertIn("@echo off", bat_content.lower(), "F16-4: Batch script has standard header")
        self.assertIn('cd /d "%~dp0"', bat_content.lower(), "F16-5: Batch script anchors working directory")

    # =========================================================================
    # Feature 17: Static Security & Path Scan [M5]
    # =========================================================================
    @tier(1)
    @milestone("M5")
    def test_f17_static_security_and_path_scan(self):
        """F17: Zero hardcoded developer paths, zero keys, zero unresolved [TODO] tags."""
        self._check_milestone("M5")
        # Check raw HTML
        for pattern in oracle.FORBIDDEN_LOCAL_PATH_PATTERNS:
            match = re.search(pattern, self.raw_html)
            self.assertIsNone(match, f"F17-1: Forbidden local path pattern '{pattern}' found in HTML!")

        self.assertNotIn("[TODO", self.raw_html, "F17-2: Zero [TODO: ...] tags remain in HTML")
        self.assertNotIn("test_3b5c0460", self.raw_html, "F17-3: Zero private API keys found")
        self.assertNotIn("ghp_", self.raw_html, "F17-4: Zero GitHub personal tokens found")
        self.assertNotIn("discord.com/api/webhooks/1", self.raw_html, "F17-5: Zero live Discord webhook URLs hardcoded")

    # =========================================================================
    # Feature 18: Safe Git Push Script & Remote Push [M5]
    # =========================================================================
    @tier(1)
    @milestone("M5")
    def test_f18_safe_git_push_script(self):
        """F18: run.bat pure ASCII encoding and ctl.ps1 safe git push flow."""
        self._check_milestone("M5")
        if self.is_oracle:
            bat_bytes = generate_compliant_push_bat()
            bat_text = bat_bytes.decode("ascii")
            ctl_text = "git push -u origin $branch"
        else:
            self.assertTrue(PUSH_BAT_PATH.exists(), "F18-1: run.bat exists")
            self.assertTrue(CTL_PS1_PATH.exists(), "F18-1b: scripts/ctl.ps1 exists")
            with open(PUSH_BAT_PATH, "rb") as f:
                bat_bytes = f.read()
            bat_text = bat_bytes.decode("ascii", errors="replace")
            with open(CTL_PS1_PATH, "r", encoding="utf-8-sig", errors="replace") as f:
                ctl_text = f.read()

        # Pure ASCII check
        non_ascii = [b for b in bat_bytes if b > 127]
        self.assertEqual(len(non_ascii), 0, f"F18-2: run.bat contains {len(non_ascii)} non-ASCII bytes")

        # CMD parentheses leak protection
        self.assertNotIn("(or Public)", bat_text, "F18-3: run.bat contains unescaped '(or Public)'!")
        self.assertIn("git push", ctl_text, "F18-4: ctl.ps1 invokes git push")
        self.assertIn("@echo off", bat_text.lower(), "F18-5: Script contains standard batch header")

    # =========================================================================
    # Feature 19: E2E Testing Suite & Runner [E2E]
    # =========================================================================
    @tier(1)
    @milestone("E2E")
    def test_f19_e2e_testing_suite_and_runner(self):
        """F19: TEST_INFRA.md and test runner execution infrastructure."""
        test_infra_path = GITHUB_PAGE_DIR / "tests" / "e2e" / "TEST_INFRA.md"
        self.assertTrue(test_infra_path.exists(), "F19-1: TEST_INFRA.md exists in tests/e2e/")
        self.assertTrue((GITHUB_PAGE_DIR / "tests" / "e2e" / "runner.py").exists(), "F19-2: runner.py exists")
        self.assertTrue((GITHUB_PAGE_DIR / "tests" / "e2e" / "dom_engine.py").exists(), "F19-3: dom_engine.py exists")
        self.assertTrue((GITHUB_PAGE_DIR / "tests" / "e2e" / "state_simulator.py").exists(), "F19-4: state_simulator.py exists")
        self.assertTrue((GITHUB_PAGE_DIR / "tests" / "e2e" / "oracle.py").exists(), "F19-5: oracle.py exists")

    # =========================================================================
    # Feature 20: Final E2E Test Pass & Hardening [M6]
    # =========================================================================
    @tier(1)
    @milestone("M6")
    def test_f20_final_e2e_hardening(self):
        """F20: Final hardening: all 6 section snap elements present, PWA manifest valid."""
        self._check_milestone("M6")
        manifest_link = self.dom.query_selector("link[rel='manifest']")
        self.assertIsNotNone(manifest_link, "F20-1: Web App Manifest link present")
        self.assertEqual(manifest_link.get_attribute("href"), "manifest.json", "F20-2: Manifest href is manifest.json")

        snap_sections = self.dom.query_selector_all(".snap-section")
        self.assertEqual(len(snap_sections), 6, "F20-3: Exactly 6 .snap-section elements present in portal")

        title = self.dom.title
        self.assertIn("AESCHY", title, "F20-4: Document title contains brand AESCHY")
        self.assertTrue(self.dom.raw_html.startswith("<!DOCTYPE html>"), "F20-5: Valid HTML5 DOCTYPE declaration")


if __name__ == "__main__":
    unittest.main()
