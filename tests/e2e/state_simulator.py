"""
tests/e2e/state_simulator.py
----------------------------
Simulates DOM state transitions and interactive event handlers in Python
to verify interactive state machines without external headless browser dependencies.
Implements exact behavior specified in PROJECT.md Interface Contracts and R2 requirements.
"""

from __future__ import annotations
from typing import Dict, List, Optional
from tests.e2e.dom_engine import DOMNode, DOMTree


class DOMStateSimulator:
    """Executes state machine transitions on a DOMTree representation."""

    def __init__(self, tree: DOMTree):
        self.tree = tree
        self.current_section: str = "hero"
        self.showcase_mode: str = "physical"
        self.maple_spotlight_active: bool = False
        self.dag_mode: str = "mkv"
        self.drawer_open: bool = False

    def scroll_to_section(self, section_id: str) -> Dict[str, Any]:
        """Simulates IntersectionObserver triggering for section_id."""
        clean_id = section_id.lstrip("#")
        self.current_section = clean_id

        # Update .nav-pill elements in header
        pills = self.tree.query_selector_all(".nav-pill")
        for pill in pills:
            href = pill.get_attribute("href", "")
            is_active = (href == f"#{clean_id}")
            # Mutate classes
            pill_classes = set(pill.class_list)
            if is_active:
                pill_classes.update(["bg-white/15", "text-white", "ring-1", "ring-white/20", "font-medium"])
                pill_classes.difference_update(["text-zinc-300", "font-normal"])
            else:
                pill_classes.difference_update(["bg-white/15", "text-white", "ring-1", "ring-white/20", "font-medium"])
                pill_classes.update(["text-zinc-300", "font-normal"])
            pill.attrs["class"] = " ".join(sorted(pill_classes))

        # Update .snap-dot elements
        dots = self.tree.query_selector_all(".snap-dot")
        for dot in dots:
            dot_target = dot.get_attribute("data-dot", "")
            is_active = (dot_target == clean_id)
            if is_active:
                dot.attrs["class"] = "snap-dot w-1.5 h-6 rounded-full bg-white transition-all duration-300"
            else:
                dot.attrs["class"] = "snap-dot w-1.5 h-1.5 rounded-full bg-white/25 hover:bg-white/60 transition-all duration-300"

        return {"section": clean_id, "active_pills": [p for p in pills if "bg-white/15" in p.classes]}

    def switch_showcase(self, mode: str) -> Dict[str, Any]:
        """Simulates switchShowcase(mode) using inline style.display override."""
        assert mode in ("physical", "maple"), f"Invalid showcase mode: {mode}"
        self.showcase_mode = mode
        is_phys = (mode == "physical")

        phys_el = self.tree.get_element_by_id("showcase-physical")
        maple_el = self.tree.get_element_by_id("showcase-maple")
        show_sec = self.tree.get_element_by_id("show")

        if phys_el:
            # Inline style支配
            phys_style = phys_el.attrs.get("style", "")
            phys_el.attrs["style"] = _update_style_str(phys_style, "display", "" if is_phys else "none")

        if maple_el:
            maple_style = maple_el.attrs.get("style", "")
            maple_el.attrs["style"] = _update_style_str(maple_style, "display", "none" if is_phys else "")

        if show_sec:
            sec_style = show_sec.attrs.get("style", "")
            target_bg = "#11100F" if is_phys else "#09090B"
            show_sec.attrs["style"] = _update_style_str(sec_style, "background-color", target_bg)

        btn_phys = self.tree.get_element_by_id("btn-show-phys")
        btn_maple = self.tree.get_element_by_id("btn-show-maple")
        if btn_phys:
            btn_phys.attrs["class"] = (
                "px-3 py-1.5 rounded-lg text-xs font-mono tabular-nums bg-[#C5A880] text-[#11100F] font-medium transition-all flex items-center gap-1.5"
                if is_phys else
                "px-3 py-1.5 rounded-lg text-xs font-mono tabular-nums text-zinc-400 hover:text-white transition-all flex items-center gap-1.5"
            )
        if btn_maple:
            btn_maple.attrs["class"] = (
                "px-3 py-1.5 rounded-lg text-xs font-mono tabular-nums bg-[#18181D] text-white border border-white/15 font-medium transition-all flex items-center gap-1.5"
                if not is_phys else
                "px-3 py-1.5 rounded-lg text-xs font-mono tabular-nums text-zinc-400 hover:text-white transition-all flex items-center gap-1.5"
            )

        return {
            "mode": mode,
            "phys_display": phys_el.style.get("display", "") if phys_el else None,
            "maple_display": maple_el.style.get("display", "") if maple_el else None,
        }

    def toggle_maple_spotlight(self, explicit_state: Optional[bool] = None) -> bool:
        """Simulates toggleMapleSpotlight()."""
        if explicit_state is not None:
            self.maple_spotlight_active = explicit_state
        else:
            self.maple_spotlight_active = not self.maple_spotlight_active

        active = self.maple_spotlight_active
        nominals = self.tree.query_selector_all(".maple-nominal")
        defects = self.tree.query_selector_all(".maple-defect")

        for el in nominals:
            _toggle_class(el, "opacity-20", active)
            _toggle_class(el, "grayscale", active)

        for el in defects:
            _toggle_class(el, "border-rose-500", active)
            _toggle_class(el, "ring-2", active)
            _toggle_class(el, "ring-rose-500/30", active)

        btn_text = self.tree.get_element_by_id("maple-spotlight-text")
        if btn_text:
            btn_text.text_content = ["關閉抓漏聚光燈" if active else "啟動抓漏聚光燈"]

        return active

    def route_dag(self, mode: str) -> Dict[str, Any]:
        """Simulates routeDag(mode) with proper highlight clearing on buttons."""
        assert mode in ("mkv", "cbz", "sha"), f"Invalid DAG mode: {mode}"
        self.dag_mode = mode

        # Clear highlights across all DAG mode buttons and set target
        buttons = {
            "mkv": self.tree.get_element_by_id("dag-btn-mkv"),
            "cbz": self.tree.get_element_by_id("dag-btn-cbz"),
            "sha": self.tree.get_element_by_id("dag-btn-sha"),
        }
        active_btn_cls = "w-full p-2.5 bg-[#0B0F17] border border-cyan-400/50 text-left text-xs font-mono text-cyan-300 hover:bg-cyan-500/10 active:scale-[0.98] transition-all"
        inactive_btn_cls = "w-full p-2.5 bg-[#0B0F17] border border-white/15 text-left text-xs font-mono text-zinc-300 hover:border-cyan-400/50 active:scale-[0.98] transition-all"

        for b_mode, btn in buttons.items():
            if btn:
                btn.attrs["class"] = active_btn_cls if b_mode == mode else inactive_btn_cls

        # Update DAG nodes
        nodes = {
            "mux": self.tree.get_element_by_id("node-mux"),
            "cbz": self.tree.get_element_by_id("node-cbz"),
            "sha": self.tree.get_element_by_id("node-sha"),
            "rclone": self.tree.get_element_by_id("node-rclone"),
        }
        active_node_cls = "p-2 bg-[#0B0F17] border border-cyan-400 text-xs font-mono tabular-nums flex justify-between"
        idle_node_cls = "p-2 bg-[#0B0F17] border border-white/10 opacity-20 text-xs font-mono tabular-nums flex justify-between"

        if mode == "mkv":
            if nodes["mux"]: nodes["mux"].attrs["class"] = active_node_cls
            if nodes["cbz"]: nodes["cbz"].attrs["class"] = idle_node_cls
            if nodes["sha"]: nodes["sha"].attrs["class"] = active_node_cls
            if nodes["rclone"]: nodes["rclone"].attrs["class"] = active_node_cls
        elif mode == "cbz":
            if nodes["mux"]: nodes["mux"].attrs["class"] = idle_node_cls
            if nodes["cbz"]: nodes["cbz"].attrs["class"] = active_node_cls
            if nodes["sha"]: nodes["sha"].attrs["class"] = active_node_cls
            if nodes["rclone"]: nodes["rclone"].attrs["class"] = active_node_cls
        elif mode == "sha":
            if nodes["mux"]: nodes["mux"].attrs["class"] = idle_node_cls
            if nodes["cbz"]: nodes["cbz"].attrs["class"] = idle_node_cls
            if nodes["sha"]: nodes["sha"].attrs["class"] = active_node_cls
            if nodes["rclone"]: nodes["rclone"].attrs["class"] = active_node_cls

        term = self.tree.get_element_by_id("dag-terminal")
        cmd_text = f"$ archiver --mode={mode}"
        if term:
            term.text_content = [cmd_text]

        return {"mode": mode, "active_nodes": [k for k, n in nodes.items() if n and "border-cyan-400" in n.classes]}

    def toggle_directory_drawer(self, show: bool) -> bool:
        """Simulates toggleDrawer(show)."""
        self.drawer_open = show
        drawer = self.tree.get_element_by_id("directory-drawer")
        if drawer:
            _toggle_class(drawer, "hidden", not show)
        return self.drawer_open

    def hover_ai_wave(self, start_idx: int, end_idx: int):
        """Simulates highlightAiWave(start, end)."""
        bars = self.tree.query_selector_all(".ai-wave-bar")
        for i, bar in enumerate(bars):
            is_active = (start_idx <= i <= end_idx)
            _toggle_class(bar, "bg-sky-400", is_active)
            _toggle_class(bar, "bg-white/20", not is_active)

    def leave_ai_wave(self):
        """Simulates onmouseleave to reset waveform bars."""
        bars = self.tree.query_selector_all(".ai-wave-bar")
        for bar in bars:
            _toggle_class(bar, "bg-sky-400", False)
            _toggle_class(bar, "bg-white/20", True)


def _update_style_str(style_str: str, key: str, val: str) -> str:
    parts: Dict[str, str] = {}
    if style_str:
        for p in style_str.split(";"):
            p = p.strip()
            if ":" in p:
                k, v = p.split(":", 1)
                parts[k.strip().lower()] = v.strip()
    if val:
        parts[key.lower()] = val
    else:
        parts.pop(key.lower(), None)
    return "; ".join(f"{k}: {v}" for k, v in parts.items())


def _toggle_class(node: DOMNode, cls_name: str, enable: bool):
    classes = set(node.class_list)
    if enable:
        classes.add(cls_name)
    else:
        classes.discard(cls_name)
    node.attrs["class"] = " ".join(sorted(classes))
