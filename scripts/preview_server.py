"""
Central Portal Hub local preview server with MIME overrides and readiness-gated browser launch.
"""

import argparse
import functools
import http.server
import mimetypes
import os
import socket
import sys
import threading
import time
import webbrowser
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

PROJECT_ROOT = Path(__file__).resolve().parent.parent
PORT = int(os.environ.get("PORT", "5173"))

MIME_OVERRIDES = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".mjs": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".webmanifest": "application/manifest+json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".mp4": "video/mp4",
    ".woff2": "font/woff2",
}


class PreviewRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP handler enforcing clean MIME types regardless of Windows registry pollution."""

    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        **MIME_OVERRIDES,
    }


def open_browser_when_ready(port: int, url: str) -> None:
    """Wait until the TCP listener accepts connections before opening the browser."""
    deadline = time.monotonic() + 5.0
    while time.monotonic() < deadline:
        try:
            with socket.create_connection(("127.0.0.1", port), timeout=0.5):
                webbrowser.open(url)
                return
        except OSError:
            time.sleep(0.05)


def main() -> None:
    parser = argparse.ArgumentParser(description="Github Page local preview server")
    parser.add_argument("--port", type=int, default=PORT, help="Listen port (default from PORT env or 5173)")
    parser.add_argument("--no-browser", action="store_true", help="Do not automatically open browser")
    args = parser.parse_args()

    mimetypes.init()
    for ext, mime in MIME_OVERRIDES.items():
        mimetypes.add_type(mime.split(";")[0], ext)

    url = f"http://localhost:{args.port}/"
    handler = functools.partial(PreviewRequestHandler, directory=str(PROJECT_ROOT))
    print("=" * 60)
    print(f"  AESCHY Github Page Preview Server: {url}")
    print("  Press Ctrl+C to stop.")
    print("=" * 60)

    try:
        with http.server.ThreadingHTTPServer(("", args.port), handler) as httpd:
            if not args.no_browser:
                threading.Thread(
                    target=open_browser_when_ready,
                    args=(args.port, url),
                    daemon=True,
                ).start()
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n預覽伺服器已停止。")


if __name__ == "__main__":
    main()
