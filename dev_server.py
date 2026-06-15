#!/usr/bin/env python3
"""
本地開發伺服器：強制送出 no-cache 標頭，避免瀏覽器快取干擾測試。
預設服務 docs/ 目錄在 http://localhost:8080/
用法：
    python3 dev_server.py [PORT] [DIRECTORY]
例如：
    python3 dev_server.py 8080 docs
    python3 dev_server.py 8000 webapp
"""
import http.server
import os
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
DIRECTORY = sys.argv[2] if len(sys.argv) > 2 else "."


class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
        print(f"Serving project root at http://localhost:{PORT}/")
        print("Cache-Control: no-cache, no-store, must-revalidate")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
