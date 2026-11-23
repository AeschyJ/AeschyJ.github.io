"""
tests/e2e/dom_engine.py
-----------------------
Pure Python standard-library DOM parser and query engine for E2E testing.
Zero external network or third-party dependencies.
Provides HTML tree navigation, CSS selector querying, attribute inspection,
and state simulation for GitHub Pages redesign E2E tests.
"""

from __future__ import annotations
import re
from html.parser import HTMLParser
from typing import Any, Callable, Dict, List, Optional, Set


class DOMNode:
    """Represents a node in the parsed HTML document."""

    def __init__(self, tag: str, attrs: Dict[str, str], parent: Optional[DOMNode] = None):
        self.tag: str = tag.lower()
        self.attrs: Dict[str, str] = {k.lower(): v for k, v in attrs.items()}
        self.parent: Optional[DOMNode] = parent
        self.children: List[DOMNode] = []
        self.text_content: List[str] = []

    @property
    def id(self) -> Optional[str]:
        return self.attrs.get("id")

    @property
    def classes(self) -> Set[str]:
        cls = self.attrs.get("class", "")
        return set(cls.split()) if cls else set()

    @property
    def class_list(self) -> List[str]:
        cls = self.attrs.get("class", "")
        return cls.split() if cls else []

    @property
    def style(self) -> Dict[str, str]:
        """Parsed inline style attribute as key-value dictionary."""
        style_str = self.attrs.get("style", "")
        styles: Dict[str, str] = {}
        if not style_str:
            return styles
        for part in style_str.split(";"):
            part = part.strip()
            if not part:
                continue
            if ":" in part:
                k, v = part.split(":", 1)
                styles[k.strip().lower()] = v.strip()
        return styles

    def get_attribute(self, name: str, default: Optional[str] = None) -> Optional[str]:
        return self.attrs.get(name.lower(), default)

    def has_attribute(self, name: str) -> bool:
        return name.lower() in self.attrs

    def has_class(self, class_name: str) -> bool:
        return class_name in self.classes

    def get_text(self, recursive: bool = True) -> str:
        """Returns the inner text of this node and descendants."""
        if not recursive:
            return " ".join(" ".join(self.text_content).split())
        texts: List[str] = list(self.text_content)
        for child in self.children:
            t = child.get_text(recursive=True)
            if t:
                texts.append(t)
        return " ".join(" ".join(texts).split())

    def get_element_by_id(self, elem_id: str) -> Optional[DOMNode]:
        if self.id == elem_id:
            return self
        for child in self.children:
            res = child.get_element_by_id(elem_id)
            if res is not None:
                return res
        return None

    def get_elements_by_class_name(self, class_name: str) -> List[DOMNode]:
        results: List[DOMNode] = []
        if self.has_class(class_name):
            results.append(self)
        for child in self.children:
            results.extend(child.get_elements_by_class_name(class_name))
        return results

    def get_elements_by_tag_name(self, tag_name: str) -> List[DOMNode]:
        results: List[DOMNode] = []
        if tag_name == "*" or self.tag == tag_name.lower():
            results.append(self)
        for child in self.children:
            results.extend(child.get_elements_by_tag_name(tag_name))
        return results

    def find_all(
        self,
        tag: Optional[str] = None,
        id: Optional[str] = None,
        class_name: Optional[str] = None,
        attrs: Optional[Dict[str, str]] = None,
        predicate: Optional[Callable[[DOMNode], bool]] = None,
    ) -> List[DOMNode]:
        results: List[DOMNode] = []

        match = True
        if tag and self.tag != tag.lower():
            match = False
        if id and self.id != id:
            match = False
        if class_name and not self.has_class(class_name):
            match = False
        if attrs:
            for ak, av in attrs.items():
                if self.get_attribute(ak) != av:
                    match = False
                    break
        if predicate and not predicate(self):
            match = False

        if match:
            results.append(self)

        for child in self.children:
            results.extend(child.find_all(tag, id, class_name, attrs, predicate))
        return results

    def find(
        self,
        tag: Optional[str] = None,
        id: Optional[str] = None,
        class_name: Optional[str] = None,
        attrs: Optional[Dict[str, str]] = None,
        predicate: Optional[Callable[[DOMNode], bool]] = None,
    ) -> Optional[DOMNode]:
        nodes = self.find_all(tag, id, class_name, attrs, predicate)
        return nodes[0] if nodes else None

    def _matches_simple_selector(self, sel: str) -> bool:
        """Matches a single selector token like 'div#app.active[href='#hero']'."""
        sel = sel.strip()
        if not sel:
            return False

        # Extract and check attribute selectors first
        attr_regex = re.compile(r"\[([a-zA-Z0-9_-]+)(?:([*^$]?=)(?:'([^']*)'|\"([^\"]*)\"|([^\]]+)))?\]")
        attr_matches = attr_regex.findall(sel)
        for ak, op, v1, v2, v3 in attr_matches:
            expected_val = v1 if v1 != "" else (v2 if v2 != "" else (v3 if v3 is not None else ""))
            ak = ak.lower()
            if ak not in self.attrs:
                return False
            actual_val = self.attrs[ak]
            if op == "=":
                if actual_val != expected_val:
                    return False
            elif op == "^=":
                if not actual_val.startswith(expected_val):
                    return False
            elif op == "$=":
                if not actual_val.endswith(expected_val):
                    return False
            elif op == "*=":
                if expected_val not in actual_val:
                    return False

        # Strip attribute expressions so '#' or '.' inside attribute values don't interfere
        remainder = attr_regex.sub("", sel).strip()
        if not remainder:
            return True

        # Tag
        tag_match = re.match(r"^([a-zA-Z0-9]+)", remainder)
        expected_tag = tag_match.group(1).lower() if tag_match else None
        if expected_tag and self.tag != expected_tag:
            return False

        # ID
        id_matches = re.findall(r"#([a-zA-Z0-9_-]+)", remainder)
        for expected_id in id_matches:
            if self.id != expected_id:
                return False

        # Classes
        class_matches = re.findall(r"\.([a-zA-Z0-9_-]+)", remainder)
        for expected_cls in class_matches:
            if not self.has_class(expected_cls):
                return False

        return True

    def query_selector_all(self, selector: str) -> List[DOMNode]:
        """Supports comma-separated selectors and descendant combinators (e.g. 'nav a.nav-pill')."""
        selector = selector.strip()
        if "," in selector:
            res: List[DOMNode] = []
            for sub_sel in selector.split(","):
                for n in self.query_selector_all(sub_sel.strip()):
                    if n not in res:
                        res.append(n)
            return res

        parts = selector.split()
        if not parts:
            return []

        current_nodes = [self]
        for part in parts:
            next_nodes: List[DOMNode] = []
            for node in current_nodes:
                candidates: List[DOMNode] = []
                # Search all descendants
                def collect(n: DOMNode):
                    for c in n.children:
                        candidates.append(c)
                        collect(c)
                collect(node)

                for cand in candidates:
                    if cand._matches_simple_selector(part) and cand not in next_nodes:
                        next_nodes.append(cand)
            current_nodes = next_nodes

        return current_nodes

    def query_selector(self, selector: str) -> Optional[DOMNode]:
        nodes = self.query_selector_all(selector)
        return nodes[0] if nodes else None

    def __repr__(self) -> str:
        id_str = f" id='{self.id}'" if self.id else ""
        cls_str = f" class='{' '.join(self.classes)}'" if self.classes else ""
        return f"<{self.tag}{id_str}{cls_str}>"


class _DOMBuilder(HTMLParser):
    VOID_TAGS = {
        "area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr"
    }

    def __init__(self):
        super().__init__()
        self.root = DOMNode("document", {})
        self.current = self.root
        self.raw_scripts: List[str] = []
        self.raw_styles: List[str] = []
        self._in_script = False
        self._in_style = False
        self._current_script_text: List[str] = []
        self._current_style_text: List[str] = []

    def handle_starttag(self, tag: str, attrs: List[tuple[str, Optional[str]]]):
        attr_dict = {k: (v if v is not None else "") for k, v in attrs}
        node = DOMNode(tag, attr_dict, parent=self.current)
        self.current.children.append(node)

        if tag.lower() == "script":
            self._in_script = True
            self._current_script_text = []
        elif tag.lower() == "style":
            self._in_style = True
            self._current_style_text = []

        if tag.lower() not in self.VOID_TAGS:
            self.current = node

    def handle_endtag(self, tag: str):
        tag_lower = tag.lower()
        if tag_lower in self.VOID_TAGS:
            return

        if tag_lower == "script":
            self._in_script = False
            self.raw_scripts.append("".join(self._current_script_text))
            self._current_script_text = []
        elif tag_lower == "style":
            self._in_style = False
            self.raw_styles.append("".join(self._current_style_text))
            self._current_style_text = []

        # Find matching open tag up the ancestry
        ptr = self.current
        while ptr is not None and ptr is not self.root:
            if ptr.tag == tag_lower:
                self.current = ptr.parent if ptr.parent else self.root
                break
            ptr = ptr.parent

    def handle_data(self, data: str):
        if self._in_script:
            self._current_script_text.append(data)
        elif self._in_style:
            self._current_style_text.append(data)
        else:
            self.current.text_content.append(data)


class DOMTree:
    """Wrapper for the entire parsed document tree."""

    def __init__(self, root: DOMNode, raw_scripts: List[str], raw_styles: List[str], raw_html: str):
        self.root = root
        self.raw_scripts = raw_scripts
        self.raw_styles = raw_styles
        self.raw_html = raw_html

    def get_element_by_id(self, elem_id: str) -> Optional[DOMNode]:
        return self.root.get_element_by_id(elem_id)

    def query_selector(self, selector: str) -> Optional[DOMNode]:
        return self.root.query_selector(selector)

    def query_selector_all(self, selector: str) -> List[DOMNode]:
        return self.root.query_selector_all(selector)

    def find_all(self, *args, **kwargs) -> List[DOMNode]:
        return self.root.find_all(*args, **kwargs)

    def get_elements_by_tag_name(self, tag: str) -> List[DOMNode]:
        return self.root.get_elements_by_tag_name(tag)

    @property
    def title(self) -> str:
        title_node = self.query_selector("title")
        return title_node.get_text() if title_node else ""

    @property
    def meta_tags(self) -> List[Dict[str, str]]:
        metas = self.query_selector_all("meta")
        return [m.attrs for m in metas]

    @property
    def scripts(self) -> List[str]:
        return self.raw_scripts

    @property
    def external_script_sources(self) -> List[str]:
        scripts = self.query_selector_all("script[src]")
        return [s.get_attribute("src", "") for s in scripts]

    @property
    def stylesheet_hrefs(self) -> List[str]:
        links = self.query_selector_all("link[rel=stylesheet]")
        return [l.get_attribute("href", "") for l in links]


def parse_html(html_content: str) -> DOMTree:
    """Parses raw HTML text and returns a queryable DOMTree."""
    builder = _DOMBuilder()
    builder.feed(html_content)
    return DOMTree(builder.root, builder.raw_scripts, builder.raw_styles, html_content)


def parse_html_file(file_path: str, encoding: str = "utf-8") -> DOMTree:
    """Reads an HTML file from disk and parses it into a DOMTree."""
    with open(file_path, "r", encoding=encoding) as f:
        content = f.read()
    return parse_html(content)
